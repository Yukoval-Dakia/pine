import React, { useState, useEffect } from 'react';
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

const AdminPage: React.FC = () => {
  const [scientists, setScientists] = useState<Scientist[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    image: null as File | null,
    imageUrl: '',
    imageSource: 'upload' // 'upload' 或 'url'
  });

  useEffect(() => {
    fetchScientists();
  }, []);

  const fetchScientists = async () => {
    try {
      console.log('管理页面获取科学家数据，API URL:', process.env.REACT_APP_API_URL);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/scientists`, {
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
    } catch (error) {
      console.error('获取科学家列表失败:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === 'image' && files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ 
      ...prev, 
      imageSource: e.target.value,
      // 切换时清空另一种输入方式的值
      image: e.target.value === 'url' ? null : prev.image,
      imageUrl: e.target.value === 'upload' ? '' : prev.imageUrl
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('subject', formData.subject);
    
    if (formData.imageSource === 'upload' && formData.image) {
      formDataToSend.append('image', formData.image);
    } else if (formData.imageSource === 'url' && formData.imageUrl) {
      formDataToSend.append('image', formData.imageUrl);
    } else {
      alert('请提供科学家图片');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/scientists`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '添加科学家失败');
      }

      setFormData({
        name: '',
        subject: '',
        image: null,
        imageUrl: '',
        imageSource: 'upload'
      });
      fetchScientists();
    } catch (error) {
      console.error('添加科学家失败:', error);
      alert(error instanceof Error ? error.message : '添加科学家失败');
    }
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id || !window.confirm('确定要删除这位科学家吗？')) return;

    try {
      console.log('正在删除科学家:', id);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/scientists/${id}`, {
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
      
      <ScientistForm onSubmit={handleSubmit}>
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
          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '15px' }}>
              <input
                type="radio"
                name="imageSource"
                value="upload"
                checked={formData.imageSource === 'upload'}
                onChange={handleImageSourceChange}
                style={{ marginRight: '5px' }}
              />
              上传图片
            </label>
            <label>
              <input
                type="radio"
                name="imageSource"
                value="url"
                checked={formData.imageSource === 'url'}
                onChange={handleImageSourceChange}
                style={{ marginRight: '5px' }}
              />
              使用外部URL
            </label>
          </div>
        </FormGroup>
        
        {formData.imageSource === 'upload' ? (
          <FormGroup>
            <Label>上传照片</Label>
            <Input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleInputChange}
              required={formData.imageSource === 'upload'}
            />
          </FormGroup>
        ) : (
          <FormGroup>
            <Label>图片URL</Label>
            <Input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              required={formData.imageSource === 'url'}
            />
          </FormGroup>
        )}
        
        <Button type="submit">添加科学家</Button>
      </ScientistForm>

      <ScientistList>
        {scientists.map(scientist => (
          <ScientistCard key={scientist._id || scientist.name}>
            <ScientistImage 
              src={scientist.image 
                ? (scientist.image.startsWith('http') 
                    ? scientist.image 
                    : `http://localhost:3001${scientist.image}`)
                : '/images/default-scientist.jpg'
              } 
              alt={scientist.name} 
            />
            <ScientistInfo>
              <h3>{scientist.name}</h3>
              <p>{scientist.subject || '未设置学科'}</p>
              {scientist._id && (
                <Button onClick={() => handleDelete(scientist._id)}>删除</Button>
              )}
            </ScientistInfo>
          </ScientistCard>
        ))}
      </ScientistList>
    </AdminContainer>
  );
};

export default AdminPage; 