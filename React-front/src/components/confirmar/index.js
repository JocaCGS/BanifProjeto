import React, { useState } from 'react';
import { ConfirmContainer, Title, InputSenha, BotaoConfirmar } from './style';
import { Client } from '../../api/client';


export default function Confirmar({ onConfirm, dadosOperacao }) {
  const [password, setSenha] = useState('');

  const handleConfirm = async () => {
  if (!dadosOperacao) {
    alert('Dados da transferência não definidos!');
    return;
  }

  if (!password.trim()) {
    alert('Digite sua senha antes de confirmar.');
    return;
  }

  try {
    const token = localStorage.getItem('token') // ou de onde você guardou
    const response = await Client.post('/auth/transfer', {
      receiver_account: dadosOperacao.contaDestino,
      receiver_agency: dadosOperacao.agenciaDestino,
      value: dadosOperacao.valor,
      password
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });


    alert('Transferência realizada com sucesso!');
    if (onConfirm) onConfirm();
  } catch (error) {
    alert('Erro ao realizar a transferência: ' + error.message);
  }
};


  return (
    <ConfirmContainer>
      <Title>Confirme sua senha para concluir</Title>
      <InputSenha
        type="password"
        placeholder="Digite sua senha"
        value={password}
        onChange={(e) => setSenha(e.target.value)}
      />
      <BotaoConfirmar onClick={handleConfirm}>Confirmar</BotaoConfirmar>
    </ConfirmContainer>
  );
}
