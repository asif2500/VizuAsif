import type React from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        'ios-src'?: string;
        ar?: boolean | string;
        'camera-controls'?: boolean | string;
        'touch-action'?: string;
        [key: string]: any;
      };
    }
  }
}

