import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
`;

const Section = styled.section`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #444;
  margin-bottom: 15px;
`;

const Content = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 15px;
`;

const PrivacyPolicy: React.FC = () => {
  const { language } = useLanguage();
  
  const content = {
    zh: {
      title: '隐私政策',
      sections: [
        {
          title: '信息收集',
          content: '我们仅收集在讨论区发表内容所必需的信息，包括：您选择提供的用户名（可选择匿名）、发表的内容以及验证码会话信息。我们不会收集您的个人身份信息。',
        },
        {
          title: '信息使用',
          content: '收集的信息仅用于：1) 在讨论区显示您的发言；2) 防止垃圾信息发布；3) 改进网站功能。我们不会将信息用于其他目的，也不会与第三方共享。',
        },
        {
          title: '信息存储',
          content: '您发表的内容将存储在我们的服务器上。我们使用 GitHub Pages 托管网站，相关访问日志可能会被 GitHub 收集。我们不会在本地存储您的个人信息。',
        },
        {
          title: 'Cookie使用',
          content: '我们使用必要的 Cookie 来维持网站基本功能，如：记住您选择的语言偏好。此外，我们使用 Google reCAPTCHA 和 Cloudflare Turnstile 来防止垃圾信息，它们可能会设置自己的 Cookie。',
        },
        {
          title: '第三方服务',
          content: '我们使用以下第三方服务：1) GitHub Pages 用于网站托管；2) Google reCAPTCHA 和 Cloudflare Turnstile 用于防垃圾信息验证。这些服务可能会收集一些技术信息，如 IP 地址。',
        },
        {
          title: '数据安全',
          content: '我们采用适当的技术措施保护您的信息，包括：使用 HTTPS 加密传输、实施访问控制等。但请注意，互联网传输无法保证100%的安全性。',
        },
      ],
    },
    en: {
      title: 'Privacy Policy',
      sections: [
        {
          title: 'Information Collection',
          content: 'We only collect information necessary for posting in the forum, including: your chosen username (anonymous option available), posted content, and verification session data. We do not collect any personally identifiable information.',
        },
        {
          title: 'Information Usage',
          content: 'Collected information is used only for: 1) displaying your posts in the forum; 2) preventing spam; 3) improving website functionality. We do not use the information for other purposes or share it with third parties.',
        },
        {
          title: 'Information Storage',
          content: 'Your posted content is stored on our servers. We use GitHub Pages for website hosting, and related access logs may be collected by GitHub. We do not store your personal information locally.',
        },
        {
          title: 'Cookie Usage',
          content: 'We use necessary cookies to maintain basic website functionality, such as remembering your language preference. Additionally, we use Google reCAPTCHA and Cloudflare Turnstile for spam prevention, which may set their own cookies.',
        },
        {
          title: 'Third-party Services',
          content: 'We use the following third-party services: 1) GitHub Pages for website hosting; 2) Google reCAPTCHA and Cloudflare Turnstile for spam verification. These services may collect technical information such as IP addresses.',
        },
        {
          title: 'Data Security',
          content: 'We implement appropriate technical measures to protect your information, including: HTTPS encryption for data transmission, access controls, etc. However, please note that internet transmission cannot guarantee 100% security.',
        },
      ],
    },
    ja: {
      title: 'プライバシーポリシー',
      sections: [
        {
          title: '情報収集',
          content: '掲示板への投稿に必要な情報のみを収集しています：ユーザー名（匿名可）、投稿内容、認証セッション情報。個人を特定できる情報は収集していません。',
        },
        {
          title: '情報の使用',
          content: '収集した情報は以下の目的でのみ使用されます：1) 掲示板での投稿の表示、2) スパム防止、3) サイト機能の改善。他の目的での使用や第三者との共有は行いません。',
        },
        {
          title: '情報の保管',
          content: '投稿内容は当社のサーバーに保存されます。ウェブサイトは GitHub Pages でホスティングしており、関連するアクセスログは GitHub により収集される可能性があります。個人情報をローカルに保存することはありません。',
        },
        {
          title: 'Cookieの使用',
          content: '言語設定の保存などの基本的な機能維持に必要な Cookie を使用しています。また、スパム防止のために Google reCAPTCHA と Cloudflare Turnstile を使用しており、これらのサービスが独自の Cookie を設定する場合があります。',
        },
        {
          title: 'サードパーティサービス',
          content: '以下のサードパーティサービスを使用しています：1) GitHub Pages（ウェブサイトホスティング）、2) Google reCAPTCHA および Cloudflare Turnstile（スパム防止認証）。これらのサービスは IP アドレスなどの技術情報を収集する場合があります。',
        },
        {
          title: 'データセキュリティ',
          content: 'HTTPS による通信の暗号化、アクセス制御の実施など、適切な技術的対策を講じて情報を保護しています。ただし、インターネット上の通信において100%の安全性を保証することはできません。',
        },
      ],
    },
  };

  const currentContent = content[language];

  return (
    <Container>
      <Title>{currentContent.title}</Title>
      {currentContent.sections.map((section, index) => (
        <Section key={index}>
          <SectionTitle>{section.title}</SectionTitle>
          <Content>{section.content}</Content>
        </Section>
      ))}
    </Container>
  );
};

export default PrivacyPolicy; 