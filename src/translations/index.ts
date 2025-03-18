import { Language } from '../contexts/LanguageContext';

// 翻译内容类型
interface TranslationContent {
  // 网站名称
  siteName: string;
  // 导航栏
  nav: {
    home: string;
    about: string;
    news: string;
    forum: string;
  };
  // 主页
  home: {
    title: string;
    description: string;
    worshipButton: string;
    reservedArea: string;
  };
  // 拜佛功能
  worship: {
    title: string;
    message: string;
    closeButton: string;
  };
  // 科学家卡片
  scientist: {
    subjectPrefix: string;
  };
  // 讨论版
  forum: {
    title: string;
    description: string;
    loadMore: string;
    noMessages: string;
    postMessage: string;
    yourName: string;
    yourMessage: string;
    anonymous: string;
    submit: string;
    verifying: string;
    errorMessages: {
      captchaFailed: string;
      contentEmpty: string;
      serverError: string;
    };
    successMessage: string;
  };
  footer: {
    openSource: string;
    privacyPolicy: string;
    openSourceDetails: string;
  };
  // 开源页面
  openSource: {
    title: string;
    description: string;
    viewSource: string;
  };
}

// 翻译类型
type Translations = {
  [key in Language]: TranslationContent;
};

// 翻译内容
const translations: Translations = {
  // 中文翻译
  zh: {
    siteName: '拜中心会',
    nav: {
      home: '主页',
      about: '关于',
      news: '新闻',
      forum: '讨论区',
    },
    home: {
      title: '欢迎来到拜中心会',
      description: '我们是学校"未来中心"地点的信仰者团体，以娱乐为主要目的。加入我们，一起探索未来中心的奥秘！',
      worshipButton: '拜佛',
      reservedArea: '此区域预留用于后续功能扩展',
    },
    worship: {
      title: '电子教堂',
      message: '欢迎来到电子教堂，瞻仰未来中心的伟大科学家。通过科学与信仰的结合，我们探索未来的无限可能。',
      closeButton: '关闭',
    },
    scientist: {
      subjectPrefix: '学科：',
    },
    forum: {
      title: '信徒讨论区',
      description: '在这里，信徒们可以分享对未来中心的感悟和体验。',
      loadMore: '加载更多',
      noMessages: '暂无消息，成为第一个发言的信徒吧！',
      postMessage: '发表感言',
      yourName: '您的名称',
      yourMessage: '您的感言',
      anonymous: '匿名发表',
      submit: '提交',
      verifying: '验证中...',
      errorMessages: {
        captchaFailed: '人机验证失败，请重试',
        contentEmpty: '消息内容不能为空',
        serverError: '服务器错误，请稍后重试',
      },
      successMessage: '发表成功！',
    },
    footer: {
      openSource: '本项目基于 MIT 许可证开源',
      privacyPolicy: '隐私政策',
      openSourceDetails: '本项目使用了以下开源项目：React、React Router、Styled Components、Axios、TypeScript、React Google reCAPTCHA、React Turnstile 等。感谢开源社区的贡献。',
    },
    openSource: {
      title: '开源项目',
      description: '本项目使用了许多优秀的开源项目。在此列出所有主要依赖项目，以表示感谢。',
      viewSource: '查看源码',
    },
  },
  
  // 英文翻译
  en: {
    siteName: 'The Future Association',
    nav: {
      home: 'Home',
      about: 'About',
      news: 'News',
      forum: 'Forum',
    },
    home: {
      title: 'Welcome to The Future Association',
      description: 'We are a group of believers in the school\'s "Future Center" location, with entertainment as our main purpose. Join us to explore the mysteries of the Future Center!',
      worshipButton: 'Worship',
      reservedArea: 'This area is reserved for future expansion',
    },
    worship: {
      title: 'Electronic Temple',
      message: 'Welcome to the Electronic Temple, where we admire the great scientists of the Future Center. Through the combination of science and faith, we explore the infinite possibilities of the future.',
      closeButton: 'Close',
    },
    scientist: {
      subjectPrefix: 'Subject: ',
    },
    forum: {
      title: 'Believers\' Forum',
      description: 'Here, believers can share their insights and experiences about the Future Center.',
      loadMore: 'Load More',
      noMessages: 'No messages yet. Be the first to post!',
      postMessage: 'Post a Message',
      yourName: 'Your Name',
      yourMessage: 'Your Message',
      anonymous: 'Post Anonymously',
      submit: 'Submit',
      verifying: 'Verifying...',
      errorMessages: {
        captchaFailed: 'Human verification failed, please try again',
        contentEmpty: 'Message content cannot be empty',
        serverError: 'Server error, please try again later',
      },
      successMessage: 'Posted successfully!',
    },
    footer: {
      openSource: 'This project is open source under the MIT License',
      privacyPolicy: 'Privacy Policy',
      openSourceDetails: 'This project uses the following open source projects: React, React Router, Styled Components, Axios, TypeScript, React Google reCAPTCHA, React Turnstile, and more. Thanks to the open source community.',
    },
    openSource: {
      title: 'Open Source Projects',
      description: 'This project uses many excellent open source projects. Listed here are all major dependencies to express our gratitude.',
      viewSource: 'View Source',
    },
  },
  
  // 日文翻译
  ja: {
    siteName: '未来巡礼教会',
    nav: {
      home: 'ホーム',
      about: '概要',
      news: 'ニュース',
      forum: '掲示板',
    },
    home: {
      title: '未来巡礼教会へようこそ',
      description: '私たちは学校の「未来センター」を信仰する団体で、娯楽を主な目的としています。未来センターの神秘を一緒に探求しましょう！',
      worshipButton: '参拝',
      reservedArea: 'このエリアは将来の機能拡張のために予約されています',
    },
    worship: {
      title: '電子寺院',
      message: '電子寺院へようこそ。未来センターの偉大な科学者たちを崇拝します。科学と信仰の融合を通じて、未来の無限の可能性を探求します。',
      closeButton: '閉じる',
    },
    scientist: {
      subjectPrefix: '分野：',
    },
    forum: {
      title: '信者掲示板',
      description: 'ここでは、信者が未来センターについての洞察や体験を共有できます。',
      loadMore: 'もっと読み込む',
      noMessages: 'まだメッセージはありません。最初の投稿者になりましょう！',
      postMessage: 'メッセージを投稿',
      yourName: 'お名前',
      yourMessage: 'メッセージ',
      anonymous: '匿名で投稿',
      submit: '送信',
      verifying: '確認中...',
      errorMessages: {
        captchaFailed: '人間確認に失敗しました。もう一度お試しください',
        contentEmpty: 'メッセージ内容は空にできません',
        serverError: 'サーバーエラー。後でもう一度お試しください',
      },
      successMessage: '投稿に成功しました！',
    },
    footer: {
      openSource: 'このプロジェクトは MIT ライセンスのもとでオープンソースです',
      privacyPolicy: 'プライバシーポリシー',
      openSourceDetails: '本プロジェクトは以下のオープンソースプロジェクトを使用しています：React、React Router、Styled Components、Axios、TypeScript、React Google reCAPTCHA、React Turnstile など。オープンソースコミュニティに感謝いたします。',
    },
    openSource: {
      title: 'オープンソースプロジェクト',
      description: '本プロジェクトは多くの優れたオープンソースプロジェクトを使用しています。主要な依存関係をすべて記載し、感謝の意を表します。',
      viewSource: 'ソースを表示',
    },
  },
};

// 获取翻译的函数
export const getTranslation = (language: Language): TranslationContent => {
  return translations[language];
};

export default translations; 