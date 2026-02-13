'use client';

import { useState } from 'react';
import { realizarInscricao } from '@/services/inscricao';
import styles from './inscricao.module.css';

interface Props {
  eventoId: string;
  aoFechar: () => void;
}

export default function InscricaoModal({ eventoId, aoFechar }: Props) {
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await realizarInscricao(eventoId, { nome, email });

    if (res.success) {
      setSucesso(true);
    } else {
      alert(res.error);
    }
    setLoading(false);
  };

  return (
    <div className={styles.overlayStyle}>
      <div className={styles.modalStyle}>
        <button onClick={aoFechar} className={styles.btnx}>
          ✕
        </button>

        {sucesso ? (
          <div style={{ textAlign: 'center', color: 'white' }}>
            <h2 style={{ fontSize: '3rem', margin: 0 }}>🎉</h2>
            <h3>Inscrição Confirmada!</h3>
            <p>Seu nome está na lista.</p>
            <button className={styles.btnSubscribe} onClick={aoFechar}>
              Fechar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <h3 style={{ color: 'white', margin: '0 0 1rem 0' }}>
              Garantir Vaga
            </h3>

            <input
              type="text"
              placeholder="Seu Nome Completo"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              style={{
                padding: '0.8rem',
                borderRadius: '8px',
                border: '1px solid #333',
                background: '#1e293b',
                color: 'white',
              }}
            />

            <input
              type="email"
              placeholder="Seu E-mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: '0.8rem',
                borderRadius: '8px',
                border: '1px solid #333',
                background: '#1e293b',
                color: 'white',
              }}
            />

            <button
              type="submit"
              className={styles.btnSubscribe}
              disabled={loading}
            >
              {loading ? 'Confirmando...' : 'Confirmar Presença'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
