'use client'; // Só aqui!

import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    // Lógica de limpar cookies/token
    await signOut(auth);
    console.log('Deslogando...');
    router.push('/cadastro');
  };

  return (
    <button onClick={handleLogout} className='text-gradient-fuchsia ml-4'>
      <LogOut />
    </button>
  );
}
