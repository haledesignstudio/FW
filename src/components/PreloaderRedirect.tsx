'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function PreloaderRedirect() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only redirect if:
    // 1. User is on the homepage
    // 2. Preloader hasn't been shown in this session
    if (
      pathname === '/' && 
      !sessionStorage.getItem('preloaderShown')
    ) {
      router.push('/preloader');
    }
  }, [pathname, router]);

  return null; 
}
