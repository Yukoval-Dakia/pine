import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations';
import { Message, NewMessage } from '../types/message';
import Turnstile from 'react-turnstile';

const ForumContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
  text-align: center;
  color: #333;
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
  text-align: center;
  color: #666;
`;

const MessagesContainer = styled.div`
  margin-bottom: 30px;
  max-height: 600px;
  overflow-y: auto;
  padding: 10px;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const MessageItem = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  color: #888;
`;

const LoadMoreButton = styled.button`
  background-color: transparent;
  border: 1px solid #ddd;
  color: #666;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px auto;
  display: block;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const NoMessages = styled.div`
  text-align: center;
  padding: 30px;
  color: #888;
`;

const FormContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #666;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const SubmitButton = styled.button<{ $isLoading?: boolean }>`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 1rem;
  cursor: ${props => props.$isLoading ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$isLoading ? 0.7 : 1};
  
  &:hover:not(:disabled) {
    background-color: #2980b9;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-top: 10px;
  font-size: 0.9rem;
`;

const SuccessMessage = styled.div`
  color: #2ecc71;
  margin-top: 10px;
  font-size: 0.9rem;
`;

const RecaptchaContainer = styled.div`
  margin: 15px 0;
`;

const ForumPage: React.FC = () => {
  const { language } = useLanguage();
  const t = getTranslation(language);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [oldestTimestamp, setOldestTimestamp] = useState<string | null>(null);
  
  // 表单状态
  const [formData, setFormData] = useState<{
    content: string;
    author: string;
    isAnonymous: boolean;
  }>({
    content: '',
    author: '',
    isAnonymous: true,
  });
  
  const [turnstileToken, setTurnstileToken] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  
  // 获取最新消息
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`);
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      
      const data = await response.json();
      setMessages(data);
      
      if (data.length > 0) {
        setOldestTimestamp(data[data.length - 1].createdAt);
      }
      
      setHasMore(data.length >= 5);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // 加载更多消息
  const loadMoreMessages = async () => {
    if (!oldestTimestamp || loadingMore) return;
    
    try {
      setLoadingMore(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/messages/history?before=${new Date(oldestTimestamp).getTime()}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch more messages');
      }
      
      const data = await response.json();
      
      if (data.length > 0) {
        setMessages(prev => [...prev, ...data]);
        setOldestTimestamp(data[data.length - 1].createdAt);
      }
      
      setHasMore(data.length >= 10);
    } catch (error) {
      console.error('Error loading more messages:', error);
    } finally {
      setLoadingMore(false);
    }
  };
  
  // 处理表单输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // 处理复选框变化
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  // 处理Turnstile验证
  const handleTurnstileVerify = (token: string) => {
    setTurnstileToken(token);
  };
  
  // 处理Turnstile错误
  const handleTurnstileError = () => {
    setError(t.forum.errorMessages.captchaFailed);
  };
  
  // 处理Turnstile过期
  const handleTurnstileExpire = () => {
    setTurnstileToken('');
  };
  
  // 提交新消息
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 重置状态
    setError('');
    setSuccess('');
    
    // 验证表单
    if (!formData.content.trim()) {
      setError(t.forum.errorMessages.contentEmpty);
      return;
    }
    
    if (!turnstileToken) {
      setError(t.forum.errorMessages.captchaFailed);
      return;
    }
    
    try {
      setSubmitting(true);
      
      const newMessage: NewMessage = {
        content: formData.content,
        isAnonymous: formData.isAnonymous,
        recaptchaToken: turnstileToken,
      };
      
      if (!formData.isAnonymous && formData.author) {
        newMessage.author = formData.author;
      }
      
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || t.forum.errorMessages.serverError);
      }
      
      // 重置表单
      setFormData({
        content: '',
        author: '',
        isAnonymous: true,
      });
      
      // Turnstile会自动重置
      setTurnstileToken('');
      
      setSuccess(t.forum.successMessage);
      
      // 重新获取消息
      fetchMessages();
    } catch (error) {
      console.error('Error posting message:', error);
      setError(error instanceof Error ? error.message : t.forum.errorMessages.serverError);
    } finally {
      setSubmitting(false);
    }
  };
  
  // 初始加载
  useEffect(() => {
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
    <ForumContainer>
      <Title>{t.forum.title}</Title>
      <Description>{t.forum.description}</Description>
      
      <MessagesContainer ref={messagesContainerRef}>
        {loading ? (
          <NoMessages>Loading...</NoMessages>
        ) : messages.length === 0 ? (
          <NoMessages>{t.forum.noMessages}</NoMessages>
        ) : (
          <>
            {messages.map(message => (
              <MessageItem key={message._id}>
                <MessageContent>{message.content}</MessageContent>
                <MessageMeta>
                  <span>{message.author}</span>
                  <span>{formatDate(message.createdAt)}</span>
                </MessageMeta>
              </MessageItem>
            ))}
            
            {hasMore && (
              <LoadMoreButton 
                onClick={loadMoreMessages} 
                disabled={loadingMore}
              >
                {loadingMore ? '...' : t.forum.loadMore}
              </LoadMoreButton>
            )}
          </>
        )}
      </MessagesContainer>
      
      <FormContainer>
        <FormTitle>{t.forum.postMessage}</FormTitle>
        
        <form onSubmit={handleSubmit}>
          <CheckboxContainer>
            <Checkbox
              type="checkbox"
              name="isAnonymous"
              checked={formData.isAnonymous}
              onChange={handleCheckboxChange}
              id="isAnonymous"
            />
            <Label htmlFor="isAnonymous">{t.forum.anonymous}</Label>
          </CheckboxContainer>
          
          {!formData.isAnonymous && (
            <FormGroup>
              <Label htmlFor="author">{t.forum.yourName}</Label>
              <Input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                maxLength={50}
              />
            </FormGroup>
          )}
          
          <FormGroup>
            <Label htmlFor="content">{t.forum.yourMessage}</Label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              maxLength={500}
              required
            />
          </FormGroup>
          
          <RecaptchaContainer>
            <Turnstile
              sitekey="0x4AAAAAABBGVIU5urUrMvEg" // 替换为您的Cloudflare Turnstile站点密钥
              onVerify={handleTurnstileVerify}
              onError={handleTurnstileError}
              onExpire={handleTurnstileExpire}
              theme="light"
              language={language === 'zh' ? 'zh-CN' : language === 'ja' ? 'ja' : 'en'}
            />
          </RecaptchaContainer>
          
          <SubmitButton 
            type="submit" 
            disabled={submitting || !turnstileToken}
            $isLoading={submitting}
          >
            {submitting ? t.forum.verifying : t.forum.submit}
          </SubmitButton>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}
        </form>
      </FormContainer>
    </ForumContainer>
  );
};

export default ForumPage; 