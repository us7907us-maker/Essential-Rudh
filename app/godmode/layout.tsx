'use client';

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function GodmodeLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not authenticated or not SUPER_ADMIN
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && (session?.user as any)?.role !== 'SUPER_ADMIN') {
      router.push('/');
    }
  }, [status, session, router]);

  // Show loading state while checking auth
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#050505] w-full flex items-center justify-center">
        <div className="text-white text-lg">Verifying Admin Access...</div>
      </div>
    );
  }

  // Don't render if not authorized
  if (!session || (session?.user as any)?.role !== 'SUPER_ADMIN') {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#050505] w-full">
      {children}
    </div>
  );
}