import React, { useState } from 'react';
import {
  TransferContainer,
  TransferTitle,
  Label,
  InputText,
  InputNumber,
  SendBox,
  Submit,
  MsgBox
} from './style';

export default function TransferenciaPix({ onClose, abrirConfirmar }) {
  const [contaDestino, setContaDestino] = useState('');
  const [agenciaDestino, setAgenciaDestino] = useState('');
  const [valor, setValor] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handlePix = () => {
    if (!contaDestino || !agenciaDestino || !valor) {
      setMensagem('Preencha todos os campos!');
      return;
    }

    if (parseFloat(valor) <= 0) {
      setMensagem('Valor inválido!');
      return;
    }

    // Fecha o popup de transferência e abre o popup Confirmar
    if (abrirConfirmar) {
      onClose(); // fecha o popup atual
      abrirConfirmar({
        contaDestino,
        agenciaDestino,
        valor
      }); // abre o Confirmar e passa os dados
    }
  };

  return (
    <TransferContainer>
      <TransferTitle>Transferência Pix</TransferTitle>

      <Label>Conta de Destino</Label>
      <InputText
        value={contaDestino}
        onChange={(e) => setContaDestino(e.target.value)}
        placeholder="Número da conta"
      />

      <Label>Agência de Destino</Label>
      <InputText
        value={agenciaDestino}
        onChange={(e) => setAgenciaDestino(e.target.value)}
        placeholder="Número da agência"
      />

      <Label>Valor</Label>
      <InputNumber
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        placeholder="R$ 0,00"
      />

      {mensagem && <MsgBox>{mensagem}</MsgBox>}
    
      <SendBox>
        <Submit value="Enviar Pix" onClick={handlePix} />
      </SendBox>
    </TransferContainer>
  );
}
