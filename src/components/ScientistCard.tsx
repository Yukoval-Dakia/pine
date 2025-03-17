import React, { useState, useEffect, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { Scientist } from '../types/scientist';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations';

// 彩虹动画效果
const rainbowBorder = keyframes`
  0% { border-color: #ff0000; }
  14% { border-color: #ff7f00; }
  28% { border-color: #ffff00; }
  42% { border-color: #00ff00; }
  57% { border-color: #0000ff; }
  71% { border-color: #4b0082; }
  85% { border-color: #9400d3; }
  100% { border-color: #ff0000; }
`;

// 卡片容器样式
const CardContainer = styled.div<{ $isVisible: boolean; $bgColor: string }>`
  background-color: ${props => props.$bgColor};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  width: 80%;
  max-width: 500px;
  position: relative;
  z-index: 1002;
  opacity: ${props => props.$isVisible ? 1 : 0};
  transform: ${props => props.$isVisible ? 'scale(1)' : 'scale(0.9)'};
  transition: opacity 0.3s ease, transform 0.3s ease;
  border: 6px solid #ff0000;
  animation: ${rainbowBorder} 5s linear infinite;
`;

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

// 科学家照片
const ScientistImage = styled.div<{ $image: string }>`
  width: 100%;
  height: 350px;
  background-image: url(${props => props.$image});
  background-size: cover;
  background-position: center;
  margin: 0;
  position: relative;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

// 卡片内容
const CardContent = styled.div<{ $bgColor: string }>`
  padding: 10px 20px;
  background-color: ${props => props.$bgColor};
`;

// 姓名标题 - 加大字号
const Name = styled.h2<{ $textColor: string }>`
  margin: 0;
  color: ${props => props.$textColor};
  font-size: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  text-align: center;
  padding: 5px 0;
  }
`;

// 学科标签 - 修改为不遮挡图片并加大字号
const Subject = styled.div<{ $textColor: string; $bgColor: string }>`
  color: ${props => props.$textColor};
  padding: 10px 25px;
  display: block;
  margin: 0 auto;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  width: fit-content;
`;

// 科目容器
const SubjectContainer = styled.div<{ $bgColor: string }>`
  padding: 20px 10px 10px 10px;
  background-color: ${props => props.$bgColor};
  width: 100%;
`;

// 占位符加载动画
const ShimmerAnimation = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 350px;
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
  background-size: 800px 104px;
  animation: ${ShimmerAnimation} 1.5s infinite linear forwards;
`;

// 更鲜艳的背景颜色数组
const backgroundColors = [
  '#4A90E2', // 亮蓝
  '#50E3C2', // 青绿
  '#F5A623', // 橙黄
  '#D0021B', // 红色
  '#9013FE', // 紫色
  '#417505', // 绿色
  '#8B572A', // 棕色
  '#000000', // 黑色
];

// 获取颜色的反色函数
const getInverseColor = (hexColor: string): string => {
  // 移除#前缀
  const hex = hexColor.replace('#', '');
  
  // 将颜色转换为RGB
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  
  // 计算反色
  const inverseR = 255 - r;
  const inverseG = 255 - g;
  const inverseB = 255 - b;
  
  // 转回十六进制格式
  return `#${inverseR.toString(16).padStart(2, '0')}${inverseG.toString(16).padStart(2, '0')}${inverseB.toString(16).padStart(2, '0')}`;
};

// 科学家卡片组件
interface ScientistCardProps {
  scientist: Scientist;
  isVisible: boolean;
  preloaded?: boolean;
}

const ScientistCard: React.FC<ScientistCardProps> = ({ scientist, isVisible, preloaded = false }) => {
  const { language } = useLanguage();
  const t = getTranslation(language);
  const [isImageLoaded, setIsImageLoaded] = useState(preloaded);
  const [imageSrc, setImageSrc] = useState(scientist.image || '');
  
  // 为依赖数组提取唯一标识符
  const scientistIdentifier = scientist._id || scientist.name;
  
  // 生成背景颜色和文字颜色
  const { bgColor, textColor } = useMemo(() => {
    // 使用科学家标识符的字符串生成一个数字哈希
    let hash = 0;
    for (let i = 0; i < scientistIdentifier.length; i++) {
      hash = scientistIdentifier.charCodeAt(i) + ((hash << 5) - hash);
    }
    // 使用哈希值确定背景颜色的索引
    const index = Math.abs(hash % backgroundColors.length);
    const bgColor = backgroundColors[index];
    // 生成文字颜色（背景的反色）
    const textColor = getInverseColor(bgColor);
    
    return { bgColor, textColor };
  }, [scientistIdentifier]);
  
  // 检查图片是否加载成功
  useEffect(() => {
    if (!scientist.image || preloaded) {
      setIsImageLoaded(true);
      return;
    }
    
    const img = new Image();
    img.onload = () => {
      setIsImageLoaded(true);
    };
    img.onerror = () => {
      // 当主图片加载失败时，尝试使用备用图片
      console.log('使用备用图片:', scientist.fallbackImage);
      setImageSrc(scientist.fallbackImage || '');
      
      // 检查备用图片是否能加载
      const fallbackImg = new Image();
      fallbackImg.onload = () => {
        setIsImageLoaded(true);
      };
      fallbackImg.onerror = () => {
        // 即使备用图片失败也设置为已加载，显示空图片区域总比无限加载好
        setIsImageLoaded(true);
      };
      fallbackImg.src = scientist.fallbackImage || '';
    };
    img.src = scientist.image;
  }, [scientist.image, scientist.fallbackImage, preloaded]);

  return (
    <CardContainer $isVisible={isVisible} $bgColor={bgColor}>
      <SubjectContainer $bgColor={bgColor}>
        <Subject $textColor={textColor} $bgColor={`${bgColor}`}>
          {t.scientist.subjectPrefix} {scientist.subject || '未知学科'}
        </Subject>
      </SubjectContainer>
      {isImageLoaded ? (
        <ScientistImage $image={imageSrc} />
      ) : (
        <ImagePlaceholder />
      )}
      <CardContent $bgColor={bgColor}>
        <Name $textColor={textColor}>
          {scientist.name}
        </Name>
      </CardContent>
    </CardContainer>
  );
};

export default ScientistCard; 