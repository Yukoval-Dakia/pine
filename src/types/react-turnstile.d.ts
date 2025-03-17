declare module 'react-turnstile' {
  import * as React from 'react';
  
  export interface TurnstileProps {
    sitekey: string;
    onVerify?: (token: string) => void;
    onError?: () => void;
    onExpire?: () => void;
    theme?: 'light' | 'dark' | 'auto';
    size?: 'normal' | 'compact';
    tabindex?: number;
    language?: string;
    appearance?: 'always' | 'execute' | 'interaction-only';
    refreshExpired?: 'auto' | 'manual';
    responseField?: boolean;
    responseFieldName?: string;
    action?: string;
    cData?: string;
  }
  
  export default function Turnstile(props: TurnstileProps): JSX.Element;
} 