import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  width: 100%;
  height: 100vh; /* ocupa toda a tela */
  display: flex;
  justify-content: center; /* centraliza horizontalmente */
  align-items: center;     /* centraliza verticalmente */
  background: #0f0f0f;     /* opcional: fundo da tela */
`;

export const HeaderContainer = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
  background-color: #141414;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(255, 196, 0, 0.1);
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const Icon = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 2px solid #ffc400;
  box-shadow: 0 0 12px rgba(255, 196, 0, 0.3);
`;

export const UserName = styled.h2`
  color: #ffc400;
  font-size: 20px;
  margin: 0;
`;
