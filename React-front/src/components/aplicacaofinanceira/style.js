import styled from 'styled-components';

export const AppContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #141414;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 0 20px rgba(255, 196, 0, 0.1);
  margin-top: 20px;
`;

export const AppTitle = styled.h2`
  font-size: 24px;
  color: #ffc400;
  margin-bottom: 20px;
  text-align: center;
`;

export const Label = styled.label`
  display: block;
  font-size: 15px;
  color: #ffc400;
  margin-bottom: 5px;
  font-weight: 500;
`;

const inputBase = `
  width: 100%;
  height: 36px;
  background-color: #1c1c1c;
  color: #fff;
  border: 1px solid #333;
  border-left: 2px solid #ffc400;
  border-radius: 5px;
  margin-bottom: 15px;
  padding-left: 10px;
  transition: 0.3s ease;

  &:focus {
    outline: none;
    border: 1px solid #ffc400;
    background-color: #2a2a2a;
    box-shadow: 0 0 6px rgba(255, 196, 0, 0.4);
  }
`;

export const InputNumber = styled.input.attrs({ type: 'number' })`${inputBase}`;

export const SelectType = styled.select`
  width: 100%;
  height: 38px;
  background-color: #1c1c1c;
  color: #fff;
  border: 1px solid #333;
  border-left: 2px solid #ffc400;
  border-radius: 5px;
  margin-bottom: 15px;
  padding-left: 10px;
  transition: 0.3s ease;

  &:focus {
    outline: none;
    border: 1px solid #ffc400;
    background-color: #2a2a2a;
    box-shadow: 0 0 6px rgba(255, 196, 0, 0.4);
  }
`;

export const SendBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
`;

export const Submit = styled.input.attrs({ type: 'submit' })`
  width: 160px;
  height: 38px;
  background: linear-gradient(135deg, #ffc400, #ff9f00);
  color: #1a1a1a;
  font-size: 15px;
  font-weight: 700;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 8px rgba(255, 196, 0, 0.4);

  &:hover {
    background: linear-gradient(135deg, #ffda33, #ffc400);
    transform: translateY(-2px);
  }
`;

export const MsgBox = styled.div`
  text-align: center;
  width: 100%;
  padding-top: 10px;
  color: #ff4d4d;
  font-weight: 600;
`;

export const InputPassword = styled.input.attrs({ type: 'password' })`
  ${inputBase}
`;
