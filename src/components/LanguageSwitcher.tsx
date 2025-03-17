import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useLanguage, Language } from '../contexts/LanguageContext';

const SwitcherContainer = styled.div`
  position: relative;
  margin-left: 20px;
`;

const LanguageButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  
  &:hover {
    background: #2980b9;
  }
`;

const DropdownIcon = styled.span`
  margin-left: 5px;
  font-size: 10px;
`;

const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: ${props => props.$isOpen ? 'block' : 'none'};
  z-index: 1000;
  margin-top: 5px;
  overflow: hidden;
`;

const LanguageOption = styled.div<{ $isActive: boolean }>`
  padding: 8px 15px;
  cursor: pointer;
  background: ${props => props.$isActive ? '#f0f0f0' : 'white'};
  color: ${props => props.$isActive ? '#3498db' : '#333'};
  font-weight: ${props => props.$isActive ? 'bold' : 'normal'};
  
  &:hover {
    background: #f0f0f0;
  }
`;

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const languages: { code: Language; label: string; fullName: string }[] = [
    { code: 'zh', label: '中', fullName: '中文' },
    { code: 'en', label: 'En', fullName: 'English' },
    { code: 'ja', label: '日', fullName: '日本語' }
  ];
  
  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const handleLanguageSelect = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false);
  };
  
  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <SwitcherContainer ref={dropdownRef}>
      <LanguageButton onClick={toggleDropdown}>
        {currentLanguage.label}
        <DropdownIcon>▼</DropdownIcon>
      </LanguageButton>
      
      <DropdownMenu $isOpen={isOpen}>
        {languages.map(lang => (
          <LanguageOption
            key={lang.code}
            $isActive={language === lang.code}
            onClick={() => handleLanguageSelect(lang.code)}
          >
            {lang.fullName}
          </LanguageOption>
        ))}
      </DropdownMenu>
    </SwitcherContainer>
  );
};

export default LanguageSwitcher; 