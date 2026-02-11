'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  AuthErrorMap,
  AuthErrorCodes,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
// import { Navbar } from "@/components/Navbar/Navbar";
import styles from './Login.module.css';
import { FirebaseError } from 'firebase/app';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [carregamento, setCarregamento] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setError(null);
    setCarregamento(true);

    try {
      setError(null);
      if (!email.trim() || !password.trim()) {
        setError('Preencha e-mail e senha.');
        return;
      }
      if (password.length < 6) {
        setError('A senha deve ter pelo menos 6 caracteres.');
        return;
      }
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (e) {
      const error = e as FirebaseError;
      switch (error.code) {
        // CASO 1: Erro de Credenciais (Senha errada ou Email não existe)
        // Nota: O Firebase moderno as vezes retorna 'invalid-credential' para não revelar se o email existe.
        case AuthErrorCodes.INVALID_LOGIN_CREDENTIALS:
        case 'auth/wrong-password':
        case 'auth/user-not-found':
          setError('Email ou senha incorretos. Verifique seus dados.');
          break;

        // CASO 2: O Email é inválido (ex: faltou o @ ou .com)
        case AuthErrorCodes.INVALID_EMAIL:
          setError('O endereço de email é inválido!');
          break;

        // CASO 3: Muitas tentativas falhas (Proteção contra Brute Force)
        case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
          setError(
            'Muitas tentativas de login. Sua conta foi temporariamente bloqueada. Tente novamente mais tarde.',
          );
          break;

        // CASO 4: Usuário desativado pelo Administrador
        case AuthErrorCodes.USER_DISABLED:
          setError(
            'Esta conta foi desativada. Entre em contato com o suporte.',
          );
          break;

        // CASO 5: Sem internet
        case 'auth/network-request-failed':
          setError('Erro de conexão. Verifique sua internet.');
          break;

        // CASO PADRÃO: Algum erro desconhecido
        default:
          console.log('Erro desconhecido no login:', error.message);
          setError('Ocorreu um erro ao fazer login. Tente novamente.');
      }
    } finally {
      setCarregamento(false);
    }
  }

  async function handleGoogleLogin() {
    // 1. Instancia o "Cartucho" do Google
    const provider = new GoogleAuthProvider();

    try {
      setCarregamento(true);
      setError(null);

      // 2. Abre a Janelinha
      const result = await signInWithPopup(auth, provider);

      // Se chegou aqui, deu sucesso!
      // O usuário: result.user
      console.log('Logado com Google:', result.user.displayName);
      router.push('/dashboard');
    } catch (e) {
      const error = e as FirebaseError;

      // 3. Tratamento de Erros Específicos do Google
      switch (error.code) {
        // CASO 1: O usuário clicou no "X" e fechou a janelinha (Muito comum!)
        case 'auth/popup-closed-by-user':
          // Não é exatamente um erro, é uma desistência.
          // Geralmente não mostramos alert, só paramos o loading.
          console.log('Login cancelado pelo usuário.');
          break;

        // CASO 2: O navegador bloqueou o Pop-up (Comum em mobile/Safari)
        case 'auth/popup-blocked':
          setError(
            'O navegador bloqueou a janela de login. Por favor, habilite os pop-ups.',
          );
          break;

        // CASO 3: Cancelado porque abriu dois pop-ups ao mesmo tempo
        case 'auth/cancelled-popup-request':
          console.log('Conflito de pop-ups.');
          break;

        // CASO 4: Sem internet no meio do processo
        case 'auth/network-request-failed':
          setError('Erro de conexão. Verifique sua internet.');
          break;

        // Outros erros
        default:
          console.log('Erro Google:', error.message);
          setError('Não foi possível entrar com o Google.');
      }
    } finally {
      setCarregamento(false);
    }
  }

  return (
    <>
      <main>
        <section className={styles.section}>
          <div className={styles.glow} aria-hidden />
          <div className={styles.card}>
            <h1 className={styles.title}>Fazer Login</h1>
            <p className={styles.subtitle}>
              Use e-mail e senha ou continue com Google.
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.fieldGroup}>
                <label htmlFor="email" className={styles.label}>
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  className={styles.input}
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  disabled={loading || googleLoading}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="password" className={styles.label}>
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  className={styles.input}
                  placeholder="******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading || googleLoading}
                />
              </div>
              {error && (
                <p className={styles.error} role="alert">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className={styles.submit}
                disabled={loading || googleLoading}
              >
                {loading ? 'Logando...' : 'Entrar'}
              </button>
            </form>

            <div className={styles.divider}>
              <span className={styles.dividerLine} />
              <span className={styles.dividerText}>ou</span>
              <span className={styles.dividerLine} />
            </div>

            <button
              type="button"
              className={styles.googleButton}
              onClick={handleGoogleLogin}
              disabled={loading || googleLoading}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {googleLoading ? 'Entrando…' : 'Continuar com Google'}
            </button>

            <p className={styles.footerLink}>
              Não é registrado? <Link href="/cadastro">Criar conta</Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
