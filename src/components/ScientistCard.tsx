import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Scientist } from '../types/scientist';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations';

// 卡片容器样式
const CardContainer = styled.div<{ $isVisible: boolean }>`
  background-color: white;
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
  border-bottom: 5px solid gold;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

// 卡片内容
const CardContent = styled.div`
  padding: 20px;
`;

// 姓名标题
const Name = styled.h2<{ $color: string }>`
  margin: 0;
  color: ${props => props.$color};
  font-size: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  text-align: center;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 3px;
    background-color: ${props => props.$color};
  }
`;

// 学科标签
const Subject = styled.div<{ $color: string }>`
  background-color: ${props => props.$color}22;
  color: ${props => props.$color};
  padding: 10px 25px;
  border-radius: 20px;
  display: block;
  margin: 20px auto;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  width: fit-content;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
  border-bottom: 5px solid #edeef1;
`;

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
    <CardContainer $isVisible={isVisible}>
      <Subject $color={scientist.color || '#3498db'}>
        {t.scientist.subjectPrefix} {scientist.subject || '未知学科'}
      </Subject>
      {isImageLoaded ? (
        <ScientistImage $image={imageSrc} />
      ) : (
        <ImagePlaceholder />
      )}
      <CardContent>
        <Name $color={scientist.color || '#3498db'}>
          {scientist.name}
        </Name>
      </CardContent>
    </CardContainer>
  );
};

export default ScientistCard;