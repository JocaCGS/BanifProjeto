import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import ExtratoMovimentacoes from '../extratomovimentacoes';
import {
  TabelaContainer,
  TabelaTitle,
  Tabela,
  TabelaHeader,
  TabelaLinha,
  Celula,
  Saldo,
  PaginacaoContainer,
  BotaoPagina
} from './style';

export default function ListaCliente() {
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);

  const clientes = [
    { nome: 'Flakes Power', cpf: '123.456.789-00', saldo: -67.00 },
    { nome: 'Daniel Lenda', cpf: '987.654.321-00', saldo: 15000.50 },
    { nome: 'Toninho', cpf: '456.789.123-99', saldo: 2800.00 },
    { nome: 'Rhuan Beta', cpf: '321.654.987-11', saldo: 0.00 },
  ];

  const clientesPorPagina = 10;
  const totalPaginas = Math.ceil(clientes.length / clientesPorPagina);

  // Índices para fatiar os clientes da página atual
  const indiceUltimoCliente = paginaAtual * clientesPorPagina;
  const indicePrimeiroCliente = indiceUltimoCliente - clientesPorPagina;
  const clientesAtuais = clientes.slice(indicePrimeiroCliente, indiceUltimoCliente);

  function mudarPagina(numero) {
    if (numero < 1) return;
    if (numero > totalPaginas) return;
    setPaginaAtual(numero);
  }

  function gerarPaginas() {
    const paginas = [];

    if (totalPaginas <= 7) {
      // poucas páginas, mostra todas
      for (let i = 1; i <= totalPaginas; i++) {
        paginas.push(i);
      }
    } else {
      // sempre mostra primeira página
      paginas.push(1);

      let inicio = paginaAtual - 2;
      let fim = paginaAtual + 2;

      if (inicio <= 2) {
        inicio = 2;
        fim = 5;
      }

      if (fim >= totalPaginas - 1) {
        fim = totalPaginas - 1;
        inicio = fim - 3;
      }

      if (inicio > 2) {
        paginas.push('...');
      }

      for (let i = inicio; i <= fim; i++) {
        paginas.push(i);
      }

      if (fim < totalPaginas - 1) {
        paginas.push('...');
      }

      paginas.push(totalPaginas);
    }

    return paginas;
  }

  return (
    <TabelaContainer>
      <TabelaTitle>Lista de Clientes</TabelaTitle>
      <Tabela>
        <thead>
          <TabelaHeader>
            <Celula>Nome</Celula>
            <Celula>CPF</Celula>
            <Celula>Saldo</Celula>
            <Celula>Extrato</Celula>
          </TabelaHeader>
        </thead>
        <tbody>
          {clientesAtuais.map((cliente, index) => (
            <TabelaLinha key={index}>
              <Celula>{cliente.nome}</Celula>
              <Celula>{cliente.cpf}</Celula>
              <Saldo positivo={cliente.saldo >= 0}>
                R$ {cliente.saldo.toFixed(2)}
              </Saldo>
              <Celula>
                <button
                  onClick={() => setClienteSelecionado(cliente)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <FaEye size={20} color="#007bff" />
                </button>
              </Celula>
            </TabelaLinha>
          ))}
        </tbody>
      </Tabela>

      {/* Paginação */}
      <PaginacaoContainer>
        <BotaoPagina
          onClick={() => mudarPagina(paginaAtual - 1)}
          disabled={paginaAtual === 1}
        >
          Anterior
        </BotaoPagina>

        {gerarPaginas().map((item, index) => {
          if (item === '...') {
            return (
              <span
                key={index}
                style={{ padding: '6px 12px', color: '#ffc400', userSelect: 'none' }}
              >
                ...
              </span>
            );
          }
          return (
            <BotaoPagina
              key={index}
              ativo={paginaAtual === item}
              onClick={() => mudarPagina(item)}
            >
              {item}
            </BotaoPagina>
          );
        })}

        <BotaoPagina
          onClick={() => mudarPagina(paginaAtual + 1)}
          disabled={paginaAtual === totalPaginas}
        >
          Próximo
        </BotaoPagina>
      </PaginacaoContainer>

      {/* Popup (Modal) simples */}
      {clienteSelecionado && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setClienteSelecionado(null)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <ExtratoMovimentacoes
              cliente={clienteSelecionado}
              onClose={() => setClienteSelecionado(null)}
            />
          </div>
        </div>
      )}
    </TabelaContainer>
  );
}
