import styled, { keyframes } from 'styled-components';

const glow = keyframes`
  0% { box-shadow: 0 0 8px rgba(255, 196, 0, 0.4); }
  50% { box-shadow: 0 0 20px rgba(255, 196, 0, 0.8); }
  100% { box-shadow: 0 0 8px rgba(255, 196, 0, 0.4); }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin: 30px 0;
  flex-wrap: wrap;
`;

export const ActionButton = styled.button`
  background: linear-gradient(135deg, #ffc400, #ff9800);
  color: #0f0f0f;
  border: none;
  border-radius: 14px;
  padding: 18px 36px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${glow} 2s infinite ease-in-out;
  min-width: 260px;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: linear-gradient(135deg, #ffb300, #ffcc00);
    transform: translateY(-4px);
  }

  &:active {
    transform: scale(0.96);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContent = styled.div`
  background: #1a1a1a;
  border-radius: 15px;
  padding: 25px;
  width: 90%;
  max-width: 800px;
  box-shadow: 0 0 25px rgba(255, 196, 0, 0.4);
  position: relative;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: #ffc400;
  font-size: 22px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: #fff;
    transform: scale(1.1);
  }
`;
