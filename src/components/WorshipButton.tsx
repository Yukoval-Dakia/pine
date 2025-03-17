import React, { useState, useRef, useEffect, lazy, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { Scientist } from '../types/scientist';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations';
import EChurch from './EChurch';

// 佛光动画
const glowAnimation = keyframes`
  0% { opacity: 0; }
  100% { opacity: 0.7; }
`;

// 下面的动画暂时未使用，但将来可能会用到
// 修改按钮到卡片的变形动画
/* const buttonToCardAnimation = keyframes`
  0% {
    transform: translate(-50%, 100vh) scale(0.5);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
`;

// 修改卡片到按钮的变形动画
const cardToButtonAnimation = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, 100vh) scale(0.5);
    opacity: 0;
  }
`; */

// 容器样式
const ButtonContainer = styled.div`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
  width: 400px;
  height: 60px;
`;

// 修改按钮样式
const StyledButton = styled.button<{ $isHovered: boolean; $isExpanded: boolean }>`
  min-width: 120px;
  padding: 12px 24px;
  background-color: ${props => props.$isHovered && !props.$isExpanded ? '#1a4b8c' : '#3a7bd5'};
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 18px;
  font-weight: bold;
  cursor: ${props => props.$isExpanded ? 'default' : 'pointer'};
  box-shadow: ${props => props.$isHovered && !props.$isExpanded ? '0 6px 12px rgba(0, 0, 0, 0.3)' : '0 4px 8px rgba(0, 0, 0, 0.2)'};
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transform: ${props => props.$isHovered && !props.$isExpanded ? 'translate(-50%, -10px)' : 'translate(-50%, 0)'};
  position: absolute;
  bottom: 0;
  left: 50%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  visibility: ${props => props.$isExpanded ? 'hidden' : 'visible'};
  opacity: ${props => props.$isExpanded ? 0 : 1};
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: translate(-50%, 0);
    box-shadow: none;
  }
  
  &:hover:not(:disabled) {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

// 修改弹出层样式
const PopupOverlay = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: ${props => props.$isVisible ? 1 : 0};
  transition: opacity 0.3s ease;
  pointer-events: ${props => props.$isVisible ? 'auto' : 'none'};
  backdrop-filter: blur(5px);
`;

// 佛光背景
const BuddhaGlow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(255, 215, 0, 0.5), transparent 70%);
  opacity: 0;
  animation: ${glowAnimation} 2s forwards;
  z-index: 1001;
`;

// 下面的组件暂时未使用，但将来可能会用到
// 科学家照片
/* const ScientistImage = styled.div<{ $image: string }>`
  width: 100%;
  height: 400px;
  background-image: url(${props => props.$image});
  background-size: cover;
  background-position: center;
  margin: 0;
  position: relative;
  border-bottom: 5px solid gold;
  transition: background-image 0.3s ease;
`; */

// 预加载函数
const preloadImage = (url: string): Promise<void> => {
  if (!url) {
    return Promise.reject(new Error('无效的图片 URL'));
  }

  console.log('开始预加载图片:', url);
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      console.log('图片预加载成功:', url);
      resolve();
    };
    img.onerror = (error) => {
      console.error('图片预加载失败:', url, error);
      reject(error);
    };
    img.src = url;
  });
};

// 预加载组件
const ScientistCard = lazy(() => import('../components/ScientistCard'));

const WorshipButton: React.FC = () => {
  const { language } = useLanguage();
  const t = getTranslation(language);
  const [isHovered, setIsHovered] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedScientist, setSelectedScientist] = useState<Scientist | null>(null);
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());
  const [scientists, setScientists] = useState<Scientist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const preloadTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [showEChurch, setShowEChurch] = useState(false);

  // 获取科学家列表
  useEffect(() => {
    const fetchScientists = async (retryCount = 0) => {
      setLoading(true);
      setError(null);
      
      try {
        console.log('开始获取科学家数据...');
        console.log('拜佛组件获取科学家数据，API URL:', process.env.REACT_APP_API_URL);
        
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/scientists`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          console.error(`API请求失败: ${response.status} ${response.statusText}`);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('成功获取科学家数据，数量:', data.length);
        
        // 处理图片 URL
        const processedData = data.map((scientist: Scientist) => ({
          ...scientist,
          image: scientist.image?.startsWith('http') 
            ? scientist.image 
            : `${process.env.REACT_APP_API_URL}${scientist.image}`,
          thumbnail: scientist.thumbnail?.startsWith('http')
            ? scientist.thumbnail
            : scientist.thumbnail 
              ? `${process.env.REACT_APP_API_URL}${scientist.thumbnail}`
              : scientist.image?.startsWith('http')
                ? scientist.image
                : `${process.env.REACT_APP_API_URL}${scientist.image}`
        }));
        setScientists(processedData);
        setError(null);
      } catch (error) {
        console.error('获取科学家数据失败:', error);
        setError('连接后端服务失败');
        
        // 如果是连接错误并且重试次数小于3，则尝试重试
        if (retryCount < 3 && error instanceof Error && 
            (error.message.includes('fetch') || error.message.includes('network'))) {
          console.log(`将在3秒后重试获取科学家数据 (${retryCount + 1}/3)...`);
          setTimeout(() => fetchScientists(retryCount + 1), 3000);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchScientists();
    
    // 暴露重试方法供按钮使用
    (window as any).retryFetchingScientists = () => fetchScientists();
    
    return () => {
      // 清理全局变量
      delete (window as any).retryFetchingScientists;
    };
  }, []);

  // 预加载所有科学家图片
  const preloadAllImages = useCallback(async () => {
    try {
      const imagePromises = scientists
        .filter(s => s.image)
        .map(s => preloadImage(s.image));

      const thumbnailPromises = scientists
        .filter(s => s.thumbnail)
        .map(s => preloadImage(s.thumbnail));

      await Promise.all([...imagePromises, ...thumbnailPromises]);
      
      const validImages = scientists
        .filter(s => s.image)
        .map(s => s.image);
      const validThumbnails = scientists
        .filter(s => s.thumbnail)
        .map(s => s.thumbnail);
      
      setPreloadedImages(new Set([...validImages, ...validThumbnails]));
    } catch (error) {
      console.error('图片预加载失败:', error);
    }
  }, [scientists]);

  // 预加载下一个科学家的图片
  const preloadNextScientist = async (currentIndex: number) => {
    if (!scientists || scientists.length === 0) {
      console.log('没有科学家数据可供预加载');
      return;
    }
    
    const nextIndex = (currentIndex + 1) % scientists.length;
    const nextScientist = scientists[nextIndex];
    
    if (!nextScientist) {
      console.log('无法获取下一个科学家数据');
      return;
    }

    if (!nextScientist.image) {
      console.log('下一个科学家没有图片');
      return;
    }

    if (preloadedImages.has(nextScientist.image)) {
      console.log('图片已经预加载过:', nextScientist.image);
      return;
    }

    try {
      const promises = [preloadImage(nextScientist.image)];
      if (nextScientist.thumbnail) {
        promises.push(preloadImage(nextScientist.thumbnail));
      }

      await Promise.all(promises);

      const newImages = [nextScientist.image];
      if (nextScientist.thumbnail) {
        newImages.push(nextScientist.thumbnail);
      }
      
      setPreloadedImages(prev => new Set([...Array.from(prev), ...newImages]));
      console.log('成功预加载下一个科学家的图片');
    } catch (error) {
      console.error('预加载下一个科学家的图片失败:', error);
    }
  };

  // 处理鼠标移动
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;
    
    const distanceX = Math.abs(e.clientX - buttonCenterX);
    const distanceY = Math.abs(e.clientY - buttonCenterY);
    
    const isHovering = distanceX < 150 && distanceY < 150;
    setIsHovered(isHovering);

    // 当鼠标靠近按钮时，预加载组件和图片
    if (isHovering && !preloadTimeoutRef.current) {
      preloadTimeoutRef.current = setTimeout(() => {
        // 预加载组件
        void import('../components/ScientistCard').catch(err => {
          console.error('组件预加载失败:', err);
        });
        // 预加载图片
        preloadAllImages();
      }, 200);
    } else if (!isHovering && preloadTimeoutRef.current) {
      clearTimeout(preloadTimeoutRef.current);
      preloadTimeoutRef.current = null;
    }
  }, [preloadAllImages]);

  // 修改点击处理函数
  const handleClick = () => {
    if (scientists.length === 0) return;
    
    setIsExpanded(true);
    
    // 有20%的概率显示EChurch而不是科学家卡片
    const showEChurchRandom = Math.random() < 0.2;
    setShowEChurch(showEChurchRandom);
    
    if (!showEChurchRandom) {
      // 显示科学家卡片
      const randomIndex = Math.floor(Math.random() * scientists.length);
      setSelectedScientist(scientists[randomIndex]);
      // 预加载下一个科学家的图片
      preloadNextScientist(randomIndex);
    }
    
    setShowPopup(true);
  };

  // 修改关闭弹窗处理函数
  const closePopup = () => {
    setShowPopup(false);
    // 等待动画完成后重置状态
    setTimeout(() => {
      setIsExpanded(false);
      setSelectedScientist(null);
      setShowEChurch(false);
    }, 500); // 增加等待时间以匹配动画时长
  };

  // 添加和移除事件监听器
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (preloadTimeoutRef.current) {
        clearTimeout(preloadTimeoutRef.current);
      }
    };
  }, [handleMouseMove]);

  return (
    <>
      <ButtonContainer ref={buttonRef}>
        <StyledButton 
          $isHovered={isHovered} 
          $isExpanded={isExpanded}
          onClick={handleClick}
          disabled={loading || scientists.length === 0}
        >
          {loading ? '连接中...' : error ? '连接失败' : scientists.length === 0 ? '无数据' : t.home.worshipButton}
        </StyledButton>
        {error && (
          <div style={{
            position: 'absolute',
            bottom: '70px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(255, 0, 0, 0.7)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '12px',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            zIndex: 101
          }}>
            后端连接失败，请稍后再试
            <button 
              onClick={(e) => {
                e.stopPropagation();
                (window as any).retryFetchingScientists?.();
              }}
              style={{
                marginLeft: '10px',
                backgroundColor: 'white',
                color: 'red',
                border: 'none',
                borderRadius: '4px',
                padding: '2px 8px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              重试
            </button>
          </div>
        )}
      </ButtonContainer>

      <PopupOverlay $isVisible={showPopup} onClick={closePopup}>
        <BuddhaGlow />
        {showPopup && showEChurch ? (
          <EChurch onClose={closePopup} />
        ) : (
          showPopup && selectedScientist && (
            <React.Suspense fallback={<LoadingContainer><LoadingSpinner /></LoadingContainer>}>
              <ScientistCard
                scientist={{
                  ...selectedScientist,
                  name: selectedScientist.name,
                  subject: selectedScientist.subject || '未设置学科',
                  color: selectedScientist.color || '#3498db',
                  image: selectedScientist.image || '/images/default-scientist.jpg',
                  thumbnail: selectedScientist.thumbnail || selectedScientist.image || '/images/default-scientist.jpg'
                }}
                isVisible={showPopup}
                preloaded={selectedScientist.image ? preloadedImages.has(selectedScientist.image) : true}
              />
            </React.Suspense>
          )
        )}
      </PopupOverlay>
    </>
  );
};

// 添加加载状态组件
const LoadingContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1002;
  color: white;
  text-align: center;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 215, 0, 0.3);
  border-radius: 50%;
  border-top-color: gold;
  animation: ${spin} 1s ease-in-out infinite;
  margin: 0 auto;
`;

export default WorshipButton; 
