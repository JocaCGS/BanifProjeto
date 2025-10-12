import React from 'react';
import {
  ExtratoContainer,
  ExtratoTitle,
  MovimentacoesList,
  MovimentacaoItem,
  TipoMovimentacao,
  ValorMovimentacao
} from './style';

export default function ExtratoMovimentacoes() {
  // Valores fictícios para teste
  const movimentacoes = [
    { tipo: 'Depósito', valor: 500.0, positivo: true },
    { tipo: 'Pix Enviado', valor: 200.0, positivo: false },
    { tipo: 'Saque', valor: 100.0, positivo: false },
    { tipo: 'Depósito', valor: 300.0, positivo: true },
    { tipo: 'Pix Recebido', valor: 150.0, positivo: true },
  ];

  return (
    <ExtratoContainer>
      <ExtratoTitle>Extrato de Movimentações</ExtratoTitle>
      <MovimentacoesList>
        {movimentacoes.map((mov, index) => (
          <MovimentacaoItem key={index}>
            <TipoMovimentacao>{mov.tipo}</TipoMovimentacao>
            <ValorMovimentacao positivo={mov.positivo}>
              {mov.positivo ? '+' : '-'} R$ {mov.valor.toFixed(2)}
            </ValorMovimentacao>
          </MovimentacaoItem>
        ))}
      </MovimentacoesList>
    </ExtratoContainer>
  );
}
