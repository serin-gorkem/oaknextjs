// react-splide.d.ts
declare module '@splidejs/react-splide' {
  import * as React from 'react';

  interface SplideProps extends React.HTMLAttributes<HTMLElement> {
    options?: Record<string, any>;
    children?: React.ReactNode;
    // Diğer propsları ekleyebilirsin veya generic bırakabilirsin
  }

  export class Splide extends React.Component<SplideProps> {}
  export class SplideSlide extends React.Component<{ children?: React.ReactNode }> {}
}
