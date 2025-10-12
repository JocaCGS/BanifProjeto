import styled from 'styled-components';

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
  margin-bottom: 25px;
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

export const Saldo = styled.p`
  color: #f0f0f0;
  font-size: 16px;
  font-weight: 500;
  margin: 0;
`;
