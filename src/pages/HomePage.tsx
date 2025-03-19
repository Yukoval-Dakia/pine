import React from 'react';
import styled from 'styled-components';
import WorshipButton from '../components/WorshipButton';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
  text-align: center;
  max-width: 800px;
  line-height: 1.6;
`;

const ReservedSection = styled.div`
  margin-top: 50px;
  width: 100%;
  min-height: 300px;
  border: 2px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
`;

const Footer = styled.footer`
  margin-top: 40px;
  padding: 20px;
  text-align: center;
  border-top: 1px solid #eee;
  color: #666;
  font-size: 0.9rem;
`;

const FooterLink = styled.a`
  color: #666;
  text-decoration: underline;
  margin: 0 10px;
  &:hover {
    color: #333;
  }
`;

const OpenSourceDetails = styled.p`
  margin-top: 10px;
  font-size: 0.85rem;
  color: #888;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const HomePage: React.FC = () => {
  const { language } = useLanguage();
  const t = getTranslation(language);

  return (
    <HomeContainer>
      <Title>{t.home.title}</Title>
      <Description>
        {t.home.description}
      </Description>
      
      <WorshipButton />
      
      <ReservedSection>
        {t.home.reservedArea}
      </ReservedSection>

      <Footer>
        <p>© 2024 Yukoval Studios. {t.footer.openSource}</p>
        <OpenSourceDetails>{t.footer.openSourceDetails}</OpenSourceDetails>
        <div>
          <FooterLink href="#/privacy-policy">{t.footer.privacyPolicy}</FooterLink>
          <FooterLink href="#/open-source">{t.openSource.title}</FooterLink>
          <FooterLink href="https://github.com/Yukoval-Dakia/pine" target="_blank" rel="noopener noreferrer">GitHub</FooterLink>
        </div>
      </Footer>
    </HomeContainer>
  );
};

export default HomePage; 