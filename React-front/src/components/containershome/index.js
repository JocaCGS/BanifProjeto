import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import UserContext from '../../contexts/UserContext';
import iconbanco from '../../images/iconbanco.png';
import {
  Container,
  Header,
  HeaderInfo,
  Icon,
  UserName,
  Saldo,
  Actions,
  ActionButton,
  Extrato,
  ExtratoTitle,
  MovimentacaoItem,
  LogoutButton
} from './style';

export default function ContainersHome() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  // Mock de movimentações - substituir pelos dados reais da API
  const movimentacoes = [
    { id: 1, tipo: 'entrada', descricao: 'Depósito', valor: 500.0 },
    { id: 2, tipo: 'saida', descricao: 'Pix', valor: 200.0 },
    { id: 3, tipo: 'entrada', descricao: 'Transferência recebida', valor: 150.0 }
  ];

  const handleLogout = () => {
    // limpar token, contexto etc
    navigate('/login');
  };

  return (
    <Container>
      <Header>
        <HeaderInfo>
          <Icon src={iconbanco} />
          <div>
            <UserName>{user?.nome || 'Usuário'}</UserName>
            <Saldo>Saldo: R$ {user?.saldo?.toFixed(2) || '0,00'}</Saldo>
          </div>
        </HeaderInfo>
      </Header>

      <Extrato>
        <ExtratoTitle>Últimas Movimentações</ExtratoTitle>
        {movimentacoes.map((mov) => (
          <MovimentacaoItem key={mov.id} tipo={mov.tipo}>
            <span>{mov.descricao}</span>
            <span className="valor">
              {mov.tipo === 'saida' ? '-' : '+'}R$ {mov.valor.toFixed(2)}
            </span>
          </MovimentacaoItem>
        ))}
      </Extrato>

      <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
    </Container>
  );
}
