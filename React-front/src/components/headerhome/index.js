import React from 'react';
import iconbanco from '../../images/iconbanco.png';
import {
  HeaderContainer,
  UserInfo,
  Icon,
  UserName,
  Saldo
} from './style';

export default function HeaderHome() {
  // Dados fictícios só para teste
  const nome = "Daniel Bode";
  const saldo = 100000000000000000;

  return (
    <HeaderContainer>
      <UserInfo>
        <Icon src={iconbanco} />
        <div>
          <UserName>{nome}</UserName>
          <Saldo>Saldo: R$ {saldo.toFixed(2)}</Saldo>
        </div>
      </UserInfo>
    </HeaderContainer>
  );
}
