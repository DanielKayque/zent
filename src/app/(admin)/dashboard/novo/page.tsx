'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import styles from './novo-evento.module.css';

export default function NovoEventoPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Estados do Formulário
  const [formData, setFormData] = useState({
    nome: '',
    local: '',
    data: '', // formato string do input datetime-local
    descricao: '',
    bannerUrl: '', // opcional
    capacidade: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      // 1. Converter a string de data para Objeto Date e depois Timestamp
      const dataObjeto = new Date(formData.data);
      const timestamp = Timestamp.fromDate(dataObjeto);

      // 2. Criar o objeto final para o Firestore
      await addDoc(collection(db, 'eventos'), {
        nome: formData.nome,
        local: formData.local,
        data: timestamp,
        descricao: formData.descricao,
        bannerUrl: formData.bannerUrl,
        // Capacidade vira número (ou 0 se vazio)
        capacidade: Number(formData.capacidade) || 0,
        totalInscritos: 0, // Começa zerado
        organizadorId: user.uid, // O CAMPO MAIS IMPORTANTE
        criadoEm: Timestamp.now(),
        ativo: true,
      });

      // 3. Sucesso! Redireciona
      router.push('/dashboard');
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      alert('Erro ao criar evento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Criar Novo Evento</h1>
        <p>Preencha os dados abaixo para lançar seu evento no Zent.</p>
      </header>

      <form onSubmit={handleSubmit} className={styles.formCard}>
        {/* Nome do Evento */}
        <div className={styles.formGroup}>
          <label htmlFor="nome" className={styles.label}>
            Nome do Evento
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            required
            placeholder="Ex: Workshop de React, Festa de Fim de Ano..."
            className={styles.input}
            value={formData.nome}
            onChange={handleChange}
          />
        </div>

        {/* Banner (URL da Imagem) */}
        <div className={styles.formGroup}>
          <label htmlFor="bannerUrl" className={styles.label}>
            URL da Imagem de Capa (Opcional)
          </label>
          <input
            type="url"
            id="bannerUrl"
            name="bannerUrl"
            placeholder="https://..."
            className={styles.input}
            value={formData.bannerUrl}
            onChange={handleChange}
          />
        </div>

        {/* Linha Dupla: Data e Capacidade */}
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="data" className={styles.label}>
              Data e Hora
            </label>
            <input
              type="datetime-local"
              id="data"
              name="data"
              required
              className={styles.input}
              value={formData.data}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="capacidade" className={styles.label}>
              Capacidade Máxima
            </label>
            <input
              type="number"
              id="capacidade"
              name="capacidade"
              placeholder="Ex: 100"
              className={styles.input}
              value={formData.capacidade}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Local */}
        <div className={styles.formGroup}>
          <label htmlFor="local" className={styles.label}>
            Localização
          </label>
          <input
            type="text"
            id="local"
            name="local"
            required
            placeholder="Endereço ou Link da sala virtual"
            className={styles.input}
            value={formData.local}
            onChange={handleChange}
          />
        </div>

        {/* Descrição */}
        <div className={styles.formGroup}>
          <label htmlFor="descricao" className={styles.label}>
            Descrição do Evento
          </label>
          <textarea
            id="descricao"
            name="descricao"
            required
            placeholder="Conte os detalhes: o que vai acontecer, cronograma, atrações..."
            className={styles.textarea}
            value={formData.descricao}
            onChange={handleChange}
          />
        </div>

        {/* Botões de Ação */}
        <div className={styles.actions}>
          <Link href="/dashboard" className={styles.btnCancel}>
            Cancelar
          </Link>
          <button type="submit" className={styles.btnSubmit} disabled={loading}>
            {loading ? 'Criando...' : '🚀 Lançar Evento'}
          </button>
        </div>
      </form>
    </div>
  );
}
