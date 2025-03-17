import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// 页面组件
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage'; 
import NewsPage from './pages/NewsPage';
import NewsDetailPage from './pages/NewsDetailPage';
import AdminPage from './pages/AdminPage';
import ForumPage from './pages/ForumPage';

// 组件
import Navbar from './components/Navbar';
import WorshipButton from './components/WorshipButton';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.main`
  flex: 1;
  padding: 20px;
`;

// 添加一个隐藏的管理入口组件
const HiddenAdminTrigger: React.FC = () => {
  const navigate = useNavigate();
  const recentClicksRef = React.useRef<number[]>([]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // 只监听 G 键
      if (event.key.toLowerCase() === 'g') {
        const now = Date.now();
        // 使用useRef来保持点击状态
        recentClicksRef.current = recentClicksRef.current.filter(time => now - time < 1000);
        recentClicksRef.current.push(now);
        
        // 检查是否有三次连击
        if (recentClicksRef.current.length >= 3) {
          navigate('/admin');
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate]);

  return null;
};

const App: React.FC = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppContainer>
        <Navbar />
        <ContentContainer>
          <HiddenAdminTrigger />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:id" element={<NewsDetailPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/forum" element={<ForumPage />} />
          </Routes>
        </ContentContainer>
        <WorshipButton />
      </AppContainer>
    </BrowserRouter>
  );
};

export default App; 
