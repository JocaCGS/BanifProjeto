import React, { useState } from 'react';
import { ConfirmContainer, Title, InputSenha, BotaoConfirmar } from './style';

export default function Confirmar({ onConfirm }) {
  const [senha, setSenha] = useState('');

  const handleConfirm = () => {
    if (senha.trim() === '') {
      alert('Digite sua senha antes de confirmar.');
      return;
    }
    if (onConfirm) onConfirm(senha); // callback opcional
  };

  return (
    <ConfirmContainer>
      <Title>Confirme sua senha para concluir</Title>
      <InputSenha
        type="password"
        placeholder="Digite sua senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <BotaoConfirmar onClick={handleConfirm}>Confirmar</BotaoConfirmar>
    </ConfirmContainer>
  );
}
