import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const AboutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 30px;
  text-align: center;
  color: #333;
`;

const Content = styled.div`
  font-size: 1.1rem;
  line-height: 1.6;
  
  img.responsive-image {
    max-width: 100%;
    height: auto;
    margin: 20px 0;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.02);
    }
  }
  
  h2, h3, h4, h5, h6 {
    margin-top: 30px;
    margin-bottom: 15px;
    scroll-margin-top: 80px; // 为锚点链接添加滚动边距
    
    &:hover {
      &::after {
        content: ' #';
        color: #666;
        opacity: 0.5;
      }
    }
  }
  
  p {
    margin-bottom: 20px;
  }
  
  a.external-link {
    color: #0066cc;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.3s ease;
    
    &::after {
      content: '↗';
      display: inline-block;
      margin-left: 4px;
      font-size: 0.8em;
    }
    
    &:hover {
      border-bottom-color: #0066cc;
    }
  }
  
  .table-responsive {
    width: 100%;
    overflow-x: auto;
    margin: 20px 0;
    
    table.table {
      width: 100%;
      border-collapse: collapse;
      
      th, td {
        padding: 12px;
        border: 1px solid #ddd;
        text-align: left;
      }
      
      th {
        background-color: #f5f5f5;
      }
      
      tr:nth-child(even) {
        background-color: #f9f9f9;
      }
      
      tr:hover {
        background-color: #f0f0f0;
      }
    }
  }
  
  .code-block {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 4px;
    overflow-x: auto;
    font-family: 'Courier New', Courier, monospace;
    margin: 20px 0;
  }
`;

const Loading = styled.div`
  text-align: center;
  padding: 50px;
  font-size: 1.2rem;
  color: #666;
`;

const Error = styled.div`
  text-align: center;
  padding: 50px;
  font-size: 1.2rem;
  color: #e74c3c;
  background-color: #fdeaea;
  border-radius: 5px;
`;

interface WordPressPage {
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
}

interface AxiosError {
  response?: {
    data: any;
  };
  message: string;
}

const AboutPage: React.FC = () => {
  const [page, setPage] = useState<WordPressPage | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchAboutPage = async () => {
      try {
        console.log('环境变量 REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
        const apiUrl = `${process.env.REACT_APP_API_URL}/wordpress/pages/about`;
        console.log('Fetching about page from:', apiUrl);
        const response = await axios.get(apiUrl);
        console.log('Response data:', response.data);
        
        // 检查响应是否包含必要的数据
        if (response.data && response.data.title && response.data.content) {
          setPage(response.data);
        } else {
          setError('未找到关于页面内容');
        }
        setLoading(false);
      } catch (err) {
        const error = err as AxiosError;
        console.error('获取关于页面失败:', error);
        console.error('错误详情:', error.response?.data || error.message);
        setError('无法加载关于页面内容，请稍后再试。');
        setLoading(false);
      }
    };
    
    fetchAboutPage();
  }, []);
  
  if (loading) {
    return <Loading>正在加载关于页面内容...</Loading>;
  }
  
  if (error) {
    return <Error>{error}</Error>;
  }
  
  return (
    <AboutContainer>
      {page ? (
        <>
          <Title dangerouslySetInnerHTML={{ __html: page.title.rendered }} />
          <Content dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
        </>
      ) : (
        <Error>未找到关于页面内容</Error>
      )}
    </AboutContainer>
  );
};

export default AboutPage; 