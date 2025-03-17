import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Scientist } from '../types/scientist';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations';

interface ScientistCardProps {
  scientist: Scientist;
  isVisible: boolean;
  preloaded?: boolean;
}

// 修改科学家容器样式
const ScientistContainer = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1002;
  text-align: center;
  color: white;
  width: 400px;
  border: 5px solid gold;
  border-radius: 20px;
  overflow: hidden;
  background-color: #1a1a1a;
  opacity: ${props => props.$isVisible ? 1 : 0};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  animation: ${props => props.$isVisible ? buttonToCardAnimation : cardToButtonAnimation} 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  will-change: transform;
`;

// 科学家照片
const ScientistImage = styled.div<{ image?: string }>`
  width: 100%;
  height: 400px;
  background-image: url(${props => props.image || '/images/default-scientist.jpg'});
  background-size: cover;
  background-position: center;
  margin: 0;
  position: relative;
  border-bottom: 5px solid gold;
  transition: background-image 0.3s ease;
`;

// 科目信息栏
const SubjectBar = styled.div<{ color: string }>`
  width: 100%;
  padding: 20px;
  background-color: #3498db;
  color: white;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

// 科学家名称
const ScientistName = styled.h2`
  margin: 0;
  padding: 20px;
  font-size: 28px;
  color: white;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.7);
  background-color: #1a1a1a;
`;

// 按钮到卡片的变形动画
const buttonToCardAnimation = keyframes`
  0% {
    transform: translate(-50%, 100vh) scale(0.5);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
`;

// 卡片到按钮的变形动画
const cardToButtonAnimation = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, 100vh) scale(0.5);
    opacity: 0;
  }
`;

const LazyScientistImage: React.FC<{ scientist: Scientist; preloaded?: boolean }> = ({ scientist, preloaded = false }) => {
  const [isLoaded, setIsLoaded] = useState(preloaded);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (preloaded || !scientist.image) {
      setIsLoaded(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && scientist.image) {
            const img = new Image();
            img.src = scientist.image;
            img.onload = () => setIsLoaded(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, [scientist.image, preloaded]);

  return (
    <ScientistImage
      ref={imageRef}
      image={isLoaded && scientist.image ? scientist.image : (scientist.thumbnail || '/images/default-scientist.jpg')}
      style={{
        willChange: 'transform, opacity',
        transition: 'background-image 0.3s ease'
      }}
    />
  );
};

const ScientistCard: React.FC<ScientistCardProps> = ({ scientist, isVisible, preloaded = false }) => {
  const { language } = useLanguage();
  const t = getTranslation(language);

  return (
    <ScientistContainer 
      $isVisible={isVisible}
      style={{ willChange: 'transform, opacity' }}
    >
      <LazyScientistImage scientist={scientist} preloaded={preloaded} />
      <SubjectBar color={scientist.color || '#3498db'}>
        {t.scientist.subjectPrefix}{scientist.subject || '未设置学科'}
      </SubjectBar>
      <ScientistName>{scientist.name}</ScientistName>
    </ScientistContainer>
  );
};

export default ScientistCard; 