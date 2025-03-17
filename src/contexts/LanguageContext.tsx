import React, { createContext, useState, useContext, ReactNode } from 'react';

// 支持的语言类型
export type Language = 'zh' | 'en' | 'ja';

// 语言上下文类型
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

// 创建语言上下文
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 语言提供者属性
interface LanguageProviderProps {
  children: ReactNode;
}

// 语言提供者组件
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // 从本地存储获取语言设置，默认为中文
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'zh';
  });

  // 更新语言并保存到本地存储
  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// 使用语言的自定义Hook
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 