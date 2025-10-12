import styled from 'styled-components';

export const ConfirmContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 30px;
  background: #141414;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(255, 196, 0, 0.15);
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

export const Title = styled.h2`
  color: #ffc400;
  font-size: 18px;
  text-align: center;
  font-weight: 600;
`;

export const InputSenha = styled.input`
  width: 100%;
  padding: 12px 14px;
  border: 2px solid #ffc400;
  border-radius: 10px;
  background: transparent;
  color: #fff;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    border-color: #ffcc00;
    box-shadow: 0 0 8px rgba(255, 196, 0, 0.5);
  }
`;

export const BotaoConfirmar = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #ffc400, #ff9800);
  border: none;
  border-radius: 10px;
  padding: 12px;
  color: #0f0f0f;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: linear-gradient(135deg, #ffb300, #ffcc00);
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.97);
  }
`;
