import React, { useState } from 'react';
import {
  AppContainer,
  AppTitle,
  Label,
  InputNumber,
  SelectType,
  SendBox,
  Submit,
  MsgBox
} from './style';

export default function AplicacaoFinanceira({ onClose, abrirConfirmar }) {
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('poupanca');
  const [mensagem, setMensagem] = useState('');

  const handleAplicacao = () => {
    if (!valor || parseFloat(valor) <= 0) {
      setMensagem('Informe um valor válido!');
      return;
    }

    // Fecha o popup de aplicação e abre o Confirmar
    if (abrirConfirmar) {
      onClose(); // fecha popup atual
      abrirConfirmar({
        valor,
        tipo
      });
    }
  };

  return (
    <AppContainer>
      <AppTitle>Aplicação Financeira</AppTitle>

      <Label>Valor a Aplicar</Label>
      <InputNumber
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        placeholder="R$ 0,00"
      />

      <Label>Tipo de Aplicação</Label>
      <SelectType value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="poupanca">Poupança</option>
        <option value="investimento">Investimento</option>
        <option value="rendaFixa">Renda Fixa</option>
      </SelectType>

      {mensagem && <MsgBox>{mensagem}</MsgBox>}

      <SendBox>
        <Submit value="Aplicar" onClick={handleAplicacao} />
      </SendBox>
    </AppContainer>
  );
}
