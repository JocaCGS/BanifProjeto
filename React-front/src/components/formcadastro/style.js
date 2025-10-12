import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Poppins', sans-serif;
`;

export const Title = styled.h1`
  font-size: 28px;
  color: #ffc400;
  margin-bottom: 15px;
  text-align: center;
  text-shadow: 0 0 8px rgba(255, 196, 0, 0.3);
`;

export const SubTitle = styled.h3`
  font-size: 16px;
  color: #f0f0f0;
  font-weight: 300;
  margin-bottom: 25px;
  text-align: center;
`;

export const FormBox = styled.div`
  width: 100%;
  min-height: 100%;
  background-color: #141414;
  border-radius: 12px;
  padding: 25px 30px;
  box-shadow: 0 0 20px rgba(255, 196, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  color: #ffc400;
  margin-top: 10px;
  margin-bottom: 6px;
  font-weight: 500;
`;

const inputBase = `
  width: 100%;
  height: 36px;
  background-color: #1c1c1c;
  color: #fff;
  border: 1px solid #333;
  border-left: 2px solid #ffc400;
  border-radius: 6px;
  margin-bottom: 12px;
  padding-left: 12px;
  font-size: 14px;
  transition: 0.3s ease;

  &:focus {
    outline: none;
    border: 1px solid #ffc400;
    background-color: #2a2a2a;
    box-shadow: 0 0 8px rgba(255, 196, 0, 0.4);
  }
`;

export const InputText = styled.input.attrs({ type: 'text' })`${inputBase}`;
export const InputEmail = styled.input.attrs({ type: 'email' })`${inputBase}`;
export const InputPassword = styled.input.attrs({ type: 'password' })`${inputBase}`;
export const InputNumber = styled.input.attrs({ type: 'number' })`${inputBase}`;

export const AddressGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const StreetGroup = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 8px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const MsgBox = styled.div`
  text-align: center;
  width: 100%;
  padding-top: 8px;
  color: #ff4d4d;
  font-weight: 600;
  font-size: 13px;
`;

export const SendBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  flex-wrap: wrap;
  gap: 10px;
`;

export const Submit = styled.input.attrs({ type: 'submit' })`
  flex: 1 1 150px;
  height: 36px;
  background: linear-gradient(135deg, #ffc400, #ff9f00);
  color: #1a1a1a;
  font-size: 14px;
  font-weight: 700;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 6px rgba(255, 196, 0, 0.4);

  &:hover {
    background: linear-gradient(135deg, #ffda33, #ffc400);
    transform: translateY(-1px);
  }
`;

export const LinkBack = styled.div`
  cursor: pointer;
  font-size: 13px;
  color: #ffc400;
  font-weight: 500;
  transition: 0.3s ease;
  text-align: center;

  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
`;
