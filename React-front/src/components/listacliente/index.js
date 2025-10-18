import React, { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import ExtratoMovimentacoesGerente from '../extratomovimentacoesgerente';
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
import { Client } from '../../api/client';

export default function ListaCliente() {
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [loading, setLoading] = useState(true);

  const clientesPorPagina = 10;

  // Fetch clientes da API
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token'); // ou onde você guarda
        const response = await Client.get('/auth/list', {
          headers: { Authorization: `Bearer ${token}` }
        });


        setClientes(response.data.data || []); // Ajuste conforme resposta da API
      } catch (err) {
        console.error('Erro ao buscar clientes:', err);
        setClientes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  const totalPaginas = Math.ceil(clientes.length / clientesPorPagina);
  const indiceUltimoCliente = paginaAtual * clientesPorPagina;
  const indicePrimeiroCliente = indiceUltimoCliente - clientesPorPagina;
  const clientesAtuais = clientes.slice(indicePrimeiroCliente, indiceUltimoCliente);

  function mudarPagina(numero) {
    if (numero < 1 || numero > totalPaginas) return;
    setPaginaAtual(numero);
  }

  function gerarPaginas() {
    const paginas = [];
    if (totalPaginas <= 7) {
      for (let i = 1; i <= totalPaginas; i++) paginas.push(i);
    } else {
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

      if (inicio > 2) paginas.push('...');

      for (let i = inicio; i <= fim; i++) paginas.push(i);
      if (fim < totalPaginas - 1) paginas.push('...');
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
          <Celula>{cliente.fullName || cliente.nome}</Celula>
          <Celula>{cliente.cpf}</Celula>
          <Saldo $positivo={Number(cliente.saldo) >= 0}>
            R$ {Number(cliente.saldo || 0).toFixed(2)}
          </Saldo>
          <Celula>
            <button
              onClick={() => setClienteSelecionado(cliente)}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
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
      <BotaoPagina onClick={() => mudarPagina(paginaAtual - 1)} disabled={paginaAtual === 1}>
        Anterior
      </BotaoPagina>

      {gerarPaginas().map((item, index) =>
        item === '...' ? (
          <span key={index} style={{ padding: '6px 12px', color: '#ffc400', userSelect: 'none' }}>
            ...
          </span>
        ) : (
          <BotaoPagina key={index} $ativo={paginaAtual === item} onClick={() => mudarPagina(item)}>
            {item}
          </BotaoPagina>
        )
      )}

      <BotaoPagina onClick={() => mudarPagina(paginaAtual + 1)} disabled={paginaAtual === totalPaginas}>
        Próximo
      </BotaoPagina>
    </PaginacaoContainer>


      {/* Modal de extrato */}
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
          <ExtratoMovimentacoesGerente usuarioCpf={clienteSelecionado.cpf} onClose={() => setClienteSelecionado(null)} />
        </div>
      </div>
    )}
    </TabelaContainer>
  );
}
