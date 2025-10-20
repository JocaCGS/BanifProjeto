import React, { useState } from 'react';
import {
  ButtonContainer,
  ActionButton,
  ModalOverlay,
  ModalContent,
  CloseButton
} from './style';

import TransferenciaPix from '../transferenciapix';
import AplicacaoFinanceira from '../aplicacaofinanceira';
import ExtratoMovimentacoes from '../extratomovimentacoes';
import Confirmar from '../confirmar';

export default function ActionButtons({ onReload }) {
  const [modalAberto, setModalAberto] = useState(null);
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

    // Aqui você pode chamar a API ou serviço
    // Após operação bem-sucedida:
    if(onReload) onReload(); // 🔹 recarrega o extrato automaticamente

    setModalAberto(null);
  };

  return (
    <>
      <ButtonContainer>
        <ActionButton onClick={() => abrirModal('pix')}>Área Pix e Transferir</ActionButton>
        <ActionButton onClick={() => abrirModal('aplicacao')}>Aplicação Financeira</ActionButton>
        <ActionButton onClick={() => abrirModal('extrato')}>Extrato de Movimentações</ActionButton>
      </ButtonContainer>

      {modalAberto && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={fecharModal}>✖</CloseButton>

            {modalAberto === 'pix' && (
              <TransferenciaPix 
                onClose={fecharModal} 
                abrirConfirmar={abrirConfirmar} 
                onReload={onReload} // 🔹 passa a função pro pix
              />
            )}

            {modalAberto === 'aplicacao' && (
              <AplicacaoFinanceira 
                onClose={fecharModal} 
                abrirConfirmar={abrirConfirmar} 
                onReload={onReload} // 🔹 passa a função pra aplicação
              />
            )}

            {modalAberto === 'extrato' && (
              <ExtratoMovimentacoes onClose={fecharModal} onReload={onReload} />
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
