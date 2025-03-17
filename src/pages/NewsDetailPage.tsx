import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
`;

const Meta = styled.div`
  color: #666;
  text-align: center;
  margin-bottom: 2rem;
`;

const Content = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #444;
  
  img {
    max-width: 100%;
    height: auto;
    margin: 1rem 0;
    border-radius: 8px;
  }
  
  p {
    margin-bottom: 1.5rem;
  }
  
  h2 {
    font-size: 1.8rem;
    color: #333;
    margin: 2rem 0 1rem;
  }
`;

const Loading = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
`;

const Error = styled.div`
  text-align: center;
  padding: 2rem;
  color: #dc3545;
  font-size: 1.2rem;
`;

const formatDate = (dateString: string): string => {
  try {
    const timestamp = Date.parse(dateString);
    if (isNaN(timestamp)) {
      return '日期无效';
    }
    const date = new Date(timestamp);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('日期格式化错误:', error);
    return '日期无效';
  }
};

interface NewsPost {
  ID: number;
  title: string;
  content: string;
  date: string;
  author: {
    name: string;
  };
}

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<NewsPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/wordpress/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        setError('获取新闻详情失败，请稍后重试');
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <Loading>加载中...</Loading>;
  }

  if (error) {
    return <Error>{error}</Error>;
  }

  if (!post) {
    return <Error>未找到文章</Error>;
  }

  return (
    <Container>
      <Title dangerouslySetInnerHTML={{ __html: post.title }} />
      <Meta>
        <span>作者: {post.author.name}</span>
        <span>发布时间: {formatDate(post.date)}</span>
      </Meta>
      <Content dangerouslySetInnerHTML={{ __html: post.content }} />
    </Container>
  );
};

export default NewsDetailPage; 