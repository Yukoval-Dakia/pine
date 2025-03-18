import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 40px;
  text-align: center;
  line-height: 1.6;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const ProjectCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProjectTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProjectVersion = styled.span`
  font-size: 0.9rem;
  color: #666;
  font-weight: normal;
`;

const ProjectDescription = styled.p`
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 15px;
  line-height: 1.5;
`;

const ProjectMeta = styled.div`
  font-size: 0.85rem;
  color: #888;
`;

const ProjectLink = styled.a`
  color: #3498db;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const OpenSourcePage: React.FC = () => {
  const { language } = useLanguage();
  const t = getTranslation(language);

  const projects = [
    {
      name: 'React',
      version: '^18.2.0',
      description: {
        zh: '用于构建用户界面的 JavaScript 库',
        en: 'A JavaScript library for building user interfaces',
        ja: 'ユーザーインターフェースを構築するための JavaScript ライブラリ',
      },
      license: 'MIT',
      author: 'Facebook',
      repository: 'https://github.com/facebook/react',
    },
    {
      name: 'React Router',
      version: '^6.14.0',
      description: {
        zh: 'React 的声明式路由库',
        en: 'Declarative routing for React',
        ja: 'React の宣言的ルーティングライブラリ',
      },
      license: 'MIT',
      author: 'Remix Software',
      repository: 'https://github.com/remix-run/react-router',
    },
    {
      name: 'Styled Components',
      version: '^6.0.7',
      description: {
        zh: 'React 的视觉原语，使用 ES6 标记的模板文字来设置组件样式',
        en: 'Visual primitives for React using tagged template literals',
        ja: 'タグ付きテンプレートリテラルを使用した React のビジュアルプリミティブ',
      },
      license: 'MIT',
      author: 'styled-components team',
      repository: 'https://github.com/styled-components/styled-components',
    },
    {
      name: 'Axios',
      version: '^1.6.0',
      description: {
        zh: '基于 Promise 的 HTTP 客户端',
        en: 'Promise based HTTP client',
        ja: 'Promise ベースの HTTP クライアント',
      },
      license: 'MIT',
      author: 'Matt Zabriskie',
      repository: 'https://github.com/axios/axios',
    },
    {
      name: 'TypeScript',
      version: '^4.9.5',
      description: {
        zh: 'JavaScript 的超集，添加了可选的静态类型',
        en: 'A typed superset of JavaScript',
        ja: 'JavaScript のスーパーセット、オプションの静的型付けを追加',
      },
      license: 'Apache-2.0',
      author: 'Microsoft',
      repository: 'https://github.com/microsoft/TypeScript',
    },
    {
      name: 'React Google reCAPTCHA',
      version: '^3.1.0',
      description: {
        zh: 'React 的 Google reCAPTCHA 组件',
        en: 'React component for Google reCAPTCHA',
        ja: 'Google reCAPTCHA の React コンポーネント',
      },
      license: 'MIT',
      author: 'Douglas Eggleton',
      repository: 'https://github.com/dozoisch/react-google-recaptcha',
    },
    {
      name: 'React Turnstile',
      version: '^1.1.4',
      description: {
        zh: 'Cloudflare Turnstile 的 React 组件',
        en: 'React component for Cloudflare Turnstile',
        ja: 'Cloudflare Turnstile の React コンポーネント',
      },
      license: 'MIT',
      author: 'Marvin Schopf',
      repository: 'https://github.com/marsidev/react-turnstile',
    },
  ];

  return (
    <Container>
      <Title>{t.openSource.title}</Title>
      <Description>{t.openSource.description}</Description>
      <ProjectGrid>
        {projects.map((project, index) => (
          <ProjectCard key={index}>
            <ProjectTitle>
              {project.name}
              <ProjectVersion>{project.version}</ProjectVersion>
            </ProjectTitle>
            <ProjectDescription>
              {project.description[language]}
            </ProjectDescription>
            <ProjectMeta>
              <div>License: {project.license}</div>
              <div>Author: {project.author}</div>
              <ProjectLink 
                href={project.repository} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {t.openSource.viewSource}
              </ProjectLink>
            </ProjectMeta>
          </ProjectCard>
        ))}
      </ProjectGrid>
    </Container>
  );
};

export default OpenSourcePage; 