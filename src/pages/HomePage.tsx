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
    </HomeContainer>
  );
};

export default HomePage; 