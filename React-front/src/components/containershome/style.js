import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f0f, #1a1a1a);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  font-family: 'Poppins', sans-serif;
`;

export const Header = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 15px 25px;
  background-color: #141414;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(255, 196, 0, 0.1);
`;

export const HeaderInfo = styled.div`
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
  font-size: 22px;
  margin: 0;
`;

export const Saldo = styled.p`
  color: #f0f0f0;
  font-size: 18px;
  font-weight: 500;
  margin: 0;
`;

export const Actions = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 30px;
`;

export const ActionButton = styled.button`
  background: linear-gradient(135deg, #ffc400, #ff9f00);
  color: #1a1a1a;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  padding: 12px 25px;
  cursor: pointer;
  box-shadow: 0 0 8px rgba(255, 196, 0, 0.4);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #ffda33, #ffc400);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const Extrato = styled.div`
  width: 100%;
  max-width: 900px;
  background-color: #141414;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(255, 196, 0, 0.1);
`;

export const ExtratoTitle = styled.h3`
  color: #ffc400;
  font-size: 18px;
  margin-bottom: 15px;
`;

export const MovimentacaoItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 196, 0, 0.1);
  color: #f0f0f0;
  font-size: 16px;

  &:last-child {
    border-bottom: none;
  }

  .valor {
    font-weight: 600;
    color: ${(props) => (props.tipo === 'saida' ? '#ff4d4d' : '#4dff4d')};
  }
`;

export const LogoutButton = styled(ActionButton)`
  margin-top: 25px;
  background: linear-gradient(135deg, #ff4d4d, #ff1a1a);
  color: #fff;

  &:hover {
    background: linear-gradient(135deg, #ff6666, #ff3333);
  }
`;
