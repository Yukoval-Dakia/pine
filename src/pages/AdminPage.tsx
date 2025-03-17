import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Scientist } from '../types/scientist';

const AdminContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 30px;
`;

const ScientistForm = styled.form`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
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
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #2980b9;
  }
`;

const ScientistList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const ScientistCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ScientistImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ScientistInfo = styled.div`
  padding: 15px;
`;

const RadioGroup = styled.div`
  margin-bottom: 10px;
  display: flex;
  gap: 15px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const AdminPage: React.FC = () => {
  const [scientists, setScientists] = useState<Scientist[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    image: null as File | null,
    imageUrl: '',
    imageSource: 'upload' as 'upload' | 'url'
  });

  const fetchScientists = useCallback(async (retryCount = 0) => {
    setLoading(true);
    setError(null);
    
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'https://the-center-believers-backend.onrender.com';
      console.log('管理页面获取科学家数据，API URL:', apiUrl);
      
      const response = await fetch(`${apiUrl}/api/scientists`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        console.error(`API请求失败: ${response.status} ${response.statusText}`);
        throw new Error(`获取科学家列表失败，状态码: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('成功获取科学家数据，数量:', data.length);
      setScientists(data);
      setError(null);
    } catch (error) {
      console.error('获取科学家列表失败:', error);
      setError('连接后端服务失败。后端服务可能正在启动中，请稍后再试。');
      
      if (retryCount < 3 && error instanceof Error && 
          (error.message.includes('fetch') || error.message.includes('network'))) {
        console.log(`将在3秒后重试 (${retryCount + 1}/3)...`);
        setTimeout(() => fetchScientists(retryCount + 1), 3000);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchScientists();
  }, [fetchScientists]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === 'image' && files) {
      setFormData(prev => ({ ...prev, [name]: files[0], imageUrl: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const source = e.target.value as 'upload' | 'url';
    setFormData(prev => ({
      ...prev,
      imageSource: source,
      image: source === 'url' ? null : prev.image,
      imageUrl: source === 'upload' ? '' : prev.imageUrl
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('subject', formData.subject);

      if (formData.imageSource === 'upload' && formData.image) {
        console.log('准备上传文件:', formData.image.name);
        formDataToSend.append('image', formData.image);
      } else if (formData.imageSource === 'url' && formData.imageUrl) {
        if (!formData.imageUrl.startsWith('http')) {
          alert('请输入有效的图片 URL');
          return;
        }
        console.log('准备上传 URL:', formData.imageUrl);
        formDataToSend.append('image', formData.imageUrl);
      } else {
        alert('请选择图片或输入图片 URL');
        return;
      }

      const apiUrl = process.env.REACT_APP_API_URL || 'https://the-center-believers-backend.onrender.com';
      console.log('发送请求到:', `${apiUrl}/api/scientists`);
      
      const response = await fetch(`${apiUrl}/api/scientists`, {
        method: 'POST',
        body: formDataToSend,
      });

      console.log('服务器响应状态:', response.status);
      
      if (!response.ok) {
        let errorMessage = '添加科学家失败';
        try {
          const errorData = await response.json();
          console.error('服务器错误响应:', errorData);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          console.error('解析错误响应失败:', e);
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('添加科学家成功:', result);

      // 重置表单
      setFormData({
        name: '',
        subject: '',
        image: null,
        imageUrl: '',
        imageSource: 'upload'
      });
      
      // 刷新列表
      await fetchScientists();
      
      // 显示成功消息
      alert('科学家添加成功！');
    } catch (error) {
      console.error('添加科学家失败:', error);
      alert(error instanceof Error ? error.message : '添加科学家失败，请稍后重试');
    }
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id || !window.confirm('确定要删除这位科学家吗？')) return;

    try {
      console.log('正在删除科学家:', id);
      const apiUrl = process.env.REACT_APP_API_URL || 'https://the-center-believers-backend.onrender.com';
      const response = await fetch(`${apiUrl}/api/scientists/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '删除科学家失败');
      }

      console.log('删除成功，刷新列表');
      fetchScientists();
    } catch (error) {
      console.error('删除科学家失败:', error);
      alert(error instanceof Error ? error.message : '删除科学家失败');
    }
  };

  return (
    <AdminContainer>
      <Title>科学家管理</Title>
      
      {error && (
        <div style={{ 
          padding: '10px', 
          marginBottom: '20px', 
          backgroundColor: '#ff9994', 
          color: '#721c24',
          borderRadius: '4px'
        }}>
          <p>{error}</p>
          <Button 
            onClick={() => fetchScientists()} 
            style={{ marginTop: '10px', backgroundColor: '#dc3545' }}
          >
            重试连接
          </Button>
        </div>
      )}
      
      {loading && (
        <div style={{ 
          padding: '10px', 
          marginBottom: '20px', 
          backgroundColor: '#e2e3e5', 
          color: '#383d41',
          borderRadius: '4px'
        }}>
          正在加载数据，请稍候...
        </div>
      )}

      <ScientistForm onSubmit={onSubmit}>
        <FormGroup>
          <Label>姓名</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label>学科</Label>
          <Input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label>图片来源</Label>
          <RadioGroup>
            <RadioLabel>
              <input
                type="radio"
                name="imageSource"
                value="upload"
                checked={formData.imageSource === 'upload'}
                onChange={handleImageSourceChange}
              />
              上传图片
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                name="imageSource"
                value="url"
                checked={formData.imageSource === 'url'}
                onChange={handleImageSourceChange}
              />
              图片 URL
            </RadioLabel>
          </RadioGroup>
        </FormGroup>

        {formData.imageSource === 'upload' ? (
          <FormGroup>
            <Label>上传图片</Label>
            <Input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleInputChange}
              required
            />
          </FormGroup>
        ) : (
          <FormGroup>
            <Label>图片 URL</Label>
            <Input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              required
            />
          </FormGroup>
        )}

        <Button type="submit">添加科学家</Button>
      </ScientistForm>

      <ScientistList>
        {scientists.map(scientist => (
          <ScientistCard key={scientist._id}>
            <ScientistImage src={scientist.image} alt={scientist.name} />
            <ScientistInfo>
              <h3>{scientist.name}</h3>
              <p>{scientist.subject}</p>
              <Button 
                onClick={() => handleDelete(scientist._id)}
                style={{ backgroundColor: '#dc3545' }}
              >
                删除
              </Button>
            </ScientistInfo>
          </ScientistCard>
        ))}
      </ScientistList>
    </AdminContainer>
  );
};

export default AdminPage; 
