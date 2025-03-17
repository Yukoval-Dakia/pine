declare module 'react-google-recaptcha' {
  import * as React from 'react';
  
  export interface ReCAPTCHAProps {
    sitekey: string;
    onChange?: (token: string | null) => void;
    grecaptcha?: any;
    theme?: 'dark' | 'light';
    size?: 'compact' | 'normal' | 'invisible';
    tabindex?: number;
    stoken?: string;
    hl?: string;
    badge?: 'bottomright' | 'bottomleft' | 'inline';
    ref?: React.RefObject<ReCAPTCHA>;
    onExpired?: () => void;
    onErrored?: () => void;
  }
  
  export default class ReCAPTCHA extends React.Component<ReCAPTCHAProps> {
    reset(): void;
    execute(): Promise<string>;
    executeAsync(): Promise<string>;
    getResponse(): string;
  }
} 