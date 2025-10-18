import React, { useState, useEffect } from 'react';
import { Client } from '../../api/client';

import {
  ExtratoContainer,
  ExtratoTitle,
  PaginacaoContainer,
  BotaoPagina,
} from './style';

export default function ExtratoMovimentacoes() {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 8;

  // Pegando usuário logado do localStorage/context (supondo que você salva)
  const userLogado = JSON.parse(localStorage.getItem('user') || '{}');
  const userCpf = userLogado.cpf;

  useEffect(() => {
    async function fetchMovimentacoes() {
      try {
        const response = await Client.get('/auth/showstatement');
        const dados = response.data.data || [];

        const movimentacoesFormatadas = dados.map((mov) => {
          const positivo = mov.receiverCpf === userCpf;
          const tipo = positivo ? 'Entrada' : 'Saída';

          const dataObj = new Date(mov.createdAt);
          const data = `${dataObj.getDate().toString().padStart(2, '0')}/${
            (dataObj.getMonth() + 1).toString().padStart(2, '0')}/${
            dataObj.getFullYear()
          } ${dataObj.getHours().toString().padStart(2, '0')}:${dataObj.getMinutes().toString().padStart(2, '0')}`;

          return { ...mov, positivo, tipo, data };
        });

        setMovimentacoes(movimentacoesFormatadas);
      } catch (error) {
        console.error('Erro ao carregar movimentações:', error);
      }
    }

    fetchMovimentacoes();
  }, [userCpf]);

  // Paginação
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

    if (esquerda > 2) paginas.push('...');
    for (let i = esquerda; i <= direita; i++) paginas.push(i);
    if (direita < totalPaginas - 1) paginas.push('...');
    if (totalPaginas > 1) paginas.push(totalPaginas);

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

      <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '8px' }}>Data</th>
            <th style={{ padding: '8px' }}>Tipo</th>
            <th style={{ padding: '8px', textAlign: 'right' }}>Valor</th>
          </tr>
        </thead>
        <tbody>
          {movimentacoesPagina.map((mov, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px', color: '#fff' }}>{mov.data}</td>
              <td style={{ padding: '8px', color: '#fff' }}>{mov.tipo}</td>
              <td
                style={{
                  padding: '8px',
                  textAlign: 'right',
                  color: mov.positivo ? 'green' : 'red',
                  fontWeight: 'bold',
                }}
              >
                {mov.positivo ? '+' : '-'} R$ {Number(mov.value ?? 0).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
