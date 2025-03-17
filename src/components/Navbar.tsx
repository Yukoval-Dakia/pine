import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations';

const Nav = styled.nav`
  background-color: #2c3e50;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  
  &:hover {
    color: #3498db;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #34495e;
  }
  
  &.active {
    background-color: #3498db;
  }
`;

const Navbar: React.FC = () => {
  const { language } = useLanguage();
  const t = getTranslation(language);

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">{t.siteName}</Logo>
        <NavLinks>
          <NavLink to="/">{t.nav.home}</NavLink>
          <NavLink to="/about">{t.nav.about}</NavLink>
          <NavLink to="/news">{t.nav.news}</NavLink>
          <NavLink to="/forum">{t.nav.forum}</NavLink>
          <LanguageSwitcher />
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navbar; 