import styled from 'styled-components';

export const Button = styled.button`
  width: 120px;
  height: 38px;
  background: linear-gradient(135deg, #ff4d4d, #ff0000);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 8px rgba(255, 77, 77, 0.5);

  &:hover {
    background: linear-gradient(135deg, #ff6666, #ff3333);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`;
