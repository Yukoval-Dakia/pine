import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
`;

const Card = styled(Link)`
  text-decoration: none;
  color: inherit;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
`;

interface ImageContainerProps {
  $imageUrl: string;
}

const ImageContainer = styled.div<ImageContainerProps>`
  width: 100%;
  height: 200px;
  background-image: url(${props => props.$imageUrl});
  background-size: cover;
  background-position: center;
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h2`
  margin: 0 0 1rem;
  font-size: 1.5rem;
  color: #333;
`;

const Excerpt = styled.p`
  margin: 0;
  color: #666;
  line-height: 1.6;
`;

const DateText = styled.div`
  margin-top: 1rem;
  color: #999;
  font-size: 0.9rem;
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

interface NewsPost {
  ID: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  featured_image: string;
}

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

const NewsPage: React.FC = () => {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/wordpress/posts?_embed`);
        setPosts(response.data);
      } catch (err) {
        setError('获取新闻列表失败，请稍后重试');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Loading>加载中...</Loading>;
  }

  if (error) {
    return <Error>{error}</Error>;
  }

  return (
    <Container>
      <Grid>
        {posts.map(post => (
          <Card key={post.ID} to={`/news/${post.ID}`}>
            <ImageContainer 
              $imageUrl={post.featured_image || '/images/default-news.jpg'} 
            />
            <Content>
              <Title dangerouslySetInnerHTML={{ __html: post.title }} />
              <Excerpt dangerouslySetInnerHTML={{ __html: post.excerpt }} />
              <DateText>{formatDate(post.date)}</DateText>
            </Content>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default NewsPage; 