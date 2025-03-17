import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations';
import { Message } from '../types/message';
import { Link } from 'react-router-dom';

interface EChurchProps {
  onClose: () => void;
}

const EChurchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  color: white;
  margin-bottom: 30px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  
  &:hover {
    color: #ccc;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
`;

const MessageContainer = styled.div`
  width: 100%;
  margin: 20px 0;
  max-height: 300px;
  overflow-y: auto;
`;

const MessageItem = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
`;

const MessageContent = styled.p`
  font-size: 1.1rem;
  margin-bottom: 10px;
  line-height: 1.5;
`;

const MessageMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
`;

const NoMessages = styled.div`
  text-align: center;
  padding: 30px;
  color: rgba(255, 255, 255, 0.7);
`;

const ViewMoreLink = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  color: #3498db;
  text-decoration: none;
  padding: 8px 16px;
  border: 1px solid #3498db;
  border-radius: 4px;
  
  &:hover {
    background-color: rgba(52, 152, 219, 0.2);
  }
`;

const EChurch: React.FC<EChurchProps> = ({ onClose }) => {
  const { language } = useLanguage();
  const t = getTranslation(language);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages?limit=3`);
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(language === 'zh' ? 'zh-CN' : language === 'ja' ? 'ja-JP' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <EChurchContainer>
      <CloseButton onClick={onClose}>{t.worship.closeButton}</CloseButton>
      <Title>{t.forum.title}</Title>
      
      <MessageContainer>
        {loading ? (
          <NoMessages>Loading...</NoMessages>
        ) : messages.length === 0 ? (
          <NoMessages>{t.forum.noMessages}</NoMessages>
        ) : (
          messages.map(message => (
            <MessageItem key={message._id}>
              <MessageContent>{message.content}</MessageContent>
              <MessageMeta>
                <span>{message.author}</span>
                <span>{formatDate(message.createdAt)}</span>
              </MessageMeta>
            </MessageItem>
          ))
        )}
      </MessageContainer>
      
      <ViewMoreLink to="/forum">{t.forum.loadMore}</ViewMoreLink>
    </EChurchContainer>
  );
};

export default EChurch; 