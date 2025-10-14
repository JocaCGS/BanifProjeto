import React, { useState } from 'react';
import {
  ButtonContainer,
  ActionButton,
  ModalOverlay,
  ModalContent,
  CloseButton
} from './style';

import TransferenciaPix from '../transferenciapix';
import ListaCliente from '../listacliente';
import Confirmar from '../confirmar';

export default function ActionButtonGerente() {
  const [modalAberto, setModalAberto] = useState(null); // "pix", "aplicacao", "extrato", "confirmar"
  const [dadosOperacao, setDadosOperacao] = useState(null);

  const abrirModal = (tipo) => setModalAberto(tipo);
  const fecharModal = () => setModalAberto(null);

  const abrirConfirmar = (dados) => {
    setDadosOperacao(dados);
    setModalAberto('confirmar');
  };

  const confirmarTransacao = (senha) => {
    console.log("✅ Senha confirmada:", senha);
    console.log("💸 Dados da operação:", dadosOperacao);

    let tipoOperacao = dadosOperacao.tipo ? "Aplicação" : "Pix";
    alert(`${tipoOperacao} de R$${parseFloat(dadosOperacao.valor).toFixed(2)} confirmado com sucesso!`);

    setModalAberto(null);
  };

  return (
    <>
      <ButtonContainer>
        <ActionButton onClick={() => abrirModal('pix')}>Área Pix e Transferir</ActionButton>
        <ActionButton onClick={() => abrirModal('listacliente')}>Lista de Clientes</ActionButton>
    
      </ButtonContainer>

      {modalAberto && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={fecharModal}>✖</CloseButton>

            {modalAberto === 'pix' && (
              <TransferenciaPix onClose={fecharModal} abrirConfirmar={abrirConfirmar} />
            )}

            {modalAberto === 'listacliente' && (
              <ListaCliente
                onClose={fecharModal} 
                abrirConfirmar={abrirConfirmar} 
              />
            )}

            {modalAberto === 'confirmar' && (
              <Confirmar
                onClose={fecharModal}
                onConfirm={confirmarTransacao}
                dadosOperacao={dadosOperacao} 
              />
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}
