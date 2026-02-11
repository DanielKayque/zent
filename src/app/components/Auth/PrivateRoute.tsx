'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/'); // Redireciona se não estiver logado
    }
    if (loading) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return null; // Não mostra nada enquanto redireciona
  }

  return <>{children}</>;
}
