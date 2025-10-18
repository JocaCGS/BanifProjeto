import React from 'react';
import iconbanco from '../../images/iconbanco.png';
import {
  HeaderContainer,
  UserInfo,
  Icon,
  UserName,
} from './style';

export default function HeaderHome() {
  // Dados fictícios só para teste
  const nome = "Gerenciar Clientes";

  return (
    <HeaderContainer>
      <UserInfo>
        <Icon src={iconbanco} />
        <div>
          <UserName>{nome}</UserName>
        </div>
      </UserInfo>
    </HeaderContainer>
  );
}
