/// <reference types="next" />

import 'next/types/global';

declare module 'next' {
  export interface PageProps {
    params: {
      [key: string]: string;
    };
    searchParams?: {
      [key: string]: string | string[] | undefined;
    };
  }
}