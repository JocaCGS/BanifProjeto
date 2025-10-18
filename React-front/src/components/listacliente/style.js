import styled from 'styled-components';

export const TabelaContainer = styled.div`
  width: 100%;
  max-width: 900px;
  background-color: #141414;
  border-radius: 10px;
  padding: 20px 25px;
  box-shadow: 0 0 20px rgba(255, 196, 0, 0.1);
  margin-bottom: 25px;
`;

export const TabelaTitle = styled.h2`
  font-size: 20px;
  color: #ffc400;
  margin-bottom: 10px;
`;

export const Tabela = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TabelaHeader = styled.tr`
  color: #ffc400; /* cabeçalho amarelo */
  font-weight: 700;
  text-align: left;
  font-size: 14px;
`;

export const TabelaLinha = styled.tr`
  color: #ffffff; /* texto branco nas linhas */
  &:nth-child(even) {
    background-color: #121212;
  }
  border-bottom: 1px solid #ffc400;
`;

export const Celula = styled.td`
  padding: 12px 5px;
  color: #ffffff; /* texto branco nas células */
`;

export const Saldo = styled.td`
  color: ${({ $positivo }) => ($positivo ? '#37b437' : '#ff0000')};
  padding: 12px 5px;
`;

export const PaginacaoContainer = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
`;

export const BotaoPagina = styled.button`
  background-color: ${({ $ativo }) => ($ativo ? '#ffc400' : 'transparent')};
  color: ${({ $ativo }) => ($ativo ? '#000' : '#ffc400')};
  border: 1px solid #ffc400;
  border-radius: 5px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  min-width: 38px;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;
