import styled from 'styled-components';

export const ExtratoContainer = styled.div`
  width: 100%;
  max-width: 900px;
  background-color: #141414;
  border-radius: 10px;
  padding: 20px 25px;
  box-shadow: 0 0 20px rgba(255, 196, 0, 0.1);
  margin-bottom: 25px;
`;

export const ExtratoTitle = styled.h2`
  font-size: 20px;
  color: #ffc400;
  margin-bottom: 15px;
`;

export const MovimentacoesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const MovimentacaoItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px 12px;
  border-bottom: 1px solid rgba(255, 196, 0, 0.15);
  font-size: 16px;
  color: #f0f0f0;
  transition: background 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: rgba(255, 196, 0, 0.05);
  }
`;

export const DataMovimentacao = styled.span`
  flex-basis: 20%;
  color: #bfbfbf;
  font-size: 14px;
  font-weight: 400;
`;

export const TipoMovimentacao = styled.span`
  flex-basis: 50%;
  font-weight: 500;
  color: #ffc400;
`;

export const ValorMovimentacao = styled.span`
  flex-basis: 30%;
  font-weight: 700;
  color: ${(props) => (props.positivo ? '#4caf50' : '#ff4d4d')};
  text-align: right;
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
  background-color: ${(props) => (props.ativo ? '#ffc400' : 'transparent')};
  color: ${(props) => (props.ativo ? '#000' : '#ffc400')};
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
