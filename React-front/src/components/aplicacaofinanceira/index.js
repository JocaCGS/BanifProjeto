import React, { useState } from 'react';
import {
  AppContainer,
  AppTitle,
  Label,
  InputNumber,
  InputPassword,
  SendBox,
  Submit
} from './style';
import { Client } from '../../api/client';

export default function AplicacaoFinanceira({ onClose, reload}) {
  const [valor, setValor] = useState('');
  const [senha, setSenha] = useState('');

  const handleAplicacao = async () => {
    if (!valor || parseFloat(valor) === 0) {
      alert('Informe um valor diferente de zero!');
      return;
    }
    if (!senha) {
      alert('Informe a senha!');
      return;
    }

    const valorNumerico = parseFloat(valor);
    const rota = valorNumerico > 0 ? '/auth/invest' : '/auth/invest/withdraw';

    try {
      const response = await Client.post(rota, {
        value: Math.abs(valorNumerico),
        password: senha
      });

      if (response.data.status === 'success') {
        alert(valorNumerico > 0
          ? 'Investimento realizado com sucesso!'
          : 'Saque realizado com sucesso!');
        onClose(); // fecha popup
      } else {
        alert(`Erro: ${response.data.message}`);
      }
    } catch (error) {
      alert('Erro na comunicação com o servidor');
      console.error(error);
    }
  };

  return (
    <AppContainer>
      <AppTitle>Aplicação Financeira</AppTitle>

      <Label>Valor (negativo para saque)</Label>
      <InputNumber
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        placeholder="R$ 0,00"
      />

      <Label>Senha</Label>
      <InputPassword
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder="Digite sua senha"
      />

      <SendBox>
        <Submit value="Confirmar" onClick={handleAplicacao} />
      </SendBox>
    </AppContainer>
  );
}
