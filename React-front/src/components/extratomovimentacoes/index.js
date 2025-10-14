import React, { useState } from 'react';
import {
  ExtratoContainer,
  ExtratoTitle,
  MovimentacoesList,
  MovimentacaoItem,
  TipoMovimentacao,
  ValorMovimentacao,
  DataMovimentacao,
  PaginacaoContainer,
  BotaoPagina,
} from './style';

export default function ExtratoMovimentacoes() {
  const movimentacoes = [
    { tipo: 'Depósito', valor: 500.0, positivo: true, data: '2025-10-01' },
    { tipo: 'Pix Enviado', valor: 200.0, positivo: false, data: '2025-10-02' },
    { tipo: 'Saque', valor: 100.0, positivo: false, data: '2025-10-03' },
    { tipo: 'Depósito', valor: 300.0, positivo: true, data: '2025-10-04' },
    { tipo: 'Pix Recebido', valor: 150.0, positivo: true, data: '2025-10-05' },
    { tipo: 'Depósito', valor: 700.0, positivo: true, data: '2025-10-06' },
    { tipo: 'Pix Enviado', valor: 50.0, positivo: false, data: '2025-10-07' },
    { tipo: 'Saque', valor: 30.0, positivo: false, data: '2025-10-08' },
    { tipo: 'Depósito', valor: 400.0, positivo: true, data: '2025-10-09' },
    { tipo: 'Pix Recebido', valor: 250.0, positivo: true, data: '2025-10-10' },
    { tipo: 'Saque', valor: 80.0, positivo: false, data: '2025-10-11' },
    { tipo: 'Depósito', valor: 600.0, positivo: true, data: '2025-10-12' },
    { tipo: 'Depósito', valor: 500.0, positivo: true, data: '2025-10-13' },
    { tipo: 'Pix Enviado', valor: 200.0, positivo: false, data: '2025-10-14' },
    { tipo: 'Saque', valor: 100.0, positivo: false, data: '2025-10-15' },
    { tipo: 'Depósito', valor: 300.0, positivo: true, data: '2025-10-16' },
    { tipo: 'Pix Recebido', valor: 150.0, positivo: true, data: '2025-10-17' },
    { tipo: 'Depósito', valor: 700.0, positivo: true, data: '2025-10-18' },
    { tipo: 'Pix Enviado', valor: 50.0, positivo: false, data: '2025-10-19' },
    { tipo: 'Saque', valor: 30.0, positivo: false, data: '2025-10-20' },
    { tipo: 'Depósito', valor: 400.0, positivo: true, data: '2025-10-21' },
    { tipo: 'Pix Recebido', valor: 250.0, positivo: true, data: '2025-10-22' },
    { tipo: 'Saque', valor: 80.0, positivo: false, data: '2025-10-23' },
    { tipo: 'Depósito', valor: 600.0, positivo: true, data: '2025-10-24' },
  ];

  const itensPorPagina = 8;
  const [paginaAtual, setPaginaAtual] = useState(1);
  const totalPaginas = Math.ceil(movimentacoes.length / itensPorPagina);

  const indiceUltimoItem = paginaAtual * itensPorPagina;
  const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
  const movimentacoesPagina = movimentacoes.slice(indicePrimeiroItem, indiceUltimoItem);

  function renderizarBotoesPaginacao() {
    const paginas = [];
    const delta = 1;

    paginas.push(1);

    let esquerda = Math.max(2, paginaAtual - delta);
    let direita = Math.min(totalPaginas - 1, paginaAtual + delta);

    if (esquerda > 2) {
      paginas.push('...');
    }

    for (let i = esquerda; i <= direita; i++) {
      paginas.push(i);
    }

    if (direita < totalPaginas - 1) {
      paginas.push('...');
    }

    if (totalPaginas > 1) {
      paginas.push(totalPaginas);
    }

    return paginas.map((p, i) =>
      p === '...' ? (
        <BotaoPagina key={`dots-${i}`} disabled>
          ...
        </BotaoPagina>
      ) : (
        <BotaoPagina
          key={p}
          ativo={paginaAtual === p}
          onClick={() => setPaginaAtual(p)}
        >
          {p}
        </BotaoPagina>
      )
    );
  }

  return (
    <ExtratoContainer>
      <ExtratoTitle>Extrato de Movimentações</ExtratoTitle>
      <MovimentacoesList>
        {movimentacoesPagina.map((mov, index) => (
          <MovimentacaoItem key={index}>
            <DataMovimentacao>{mov.data}</DataMovimentacao>
            <TipoMovimentacao>{mov.tipo}</TipoMovimentacao>
            <ValorMovimentacao positivo={mov.positivo}>
              {mov.positivo ? '+' : '-'} R$ {mov.valor.toFixed(2)}
            </ValorMovimentacao>
          </MovimentacaoItem>
        ))}
      </MovimentacoesList>

      <PaginacaoContainer>
        <BotaoPagina
          onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))}
          disabled={paginaAtual === 1}
        >
          ‹
        </BotaoPagina>

        {renderizarBotoesPaginacao()}

        <BotaoPagina
          onClick={() => setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas))}
          disabled={paginaAtual === totalPaginas}
        >
          ›
        </BotaoPagina>
      </PaginacaoContainer>
    </ExtratoContainer>
  );
}
