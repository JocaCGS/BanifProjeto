import styled from 'styled-components';

export const Container = styled.div`
  box-sizing: border-box;
  padding: 60px;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f0f, #1a1a1a);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
`;

export const BoxIcon = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  width: 80%;
  margin-top: 40px;
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const BoxItem = styled.div`
  text-align: center;
`;

export const Icon = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  margin-bottom: 15px;
  border: 2px solid #ffc400;
  box-shadow: 0 0 15px rgba(255, 196, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 25px rgba(255, 196, 0, 0.6);
  }
`;


export const Title = styled.h1`
  font-size: 48px;
  color: #ffc400;
  margin-bottom: 10px;
  letter-spacing: 1px;
  text-align: center;
  text-shadow: 0 0 10px rgba(255, 196, 0, 0.3);
`;

export const SubTitle = styled.h3`
  font-size: 22px;
  color: #f0f0f0;
  font-weight: 300;
  margin-bottom: 40px;
  text-align: center;
`;

export const Label = styled.label`
  display: block;
  font-size: 18px;
  color: #ffc400;
  margin-top: 15px;
  margin-bottom: 8px;
  font-weight: 500;
`;

const inputBase = `
  display: inline-block;
  width: 90%;
  height: 38px;
  background-color: #1c1c1c;
  color: #fff;
  border: 1px solid #444;
  border-left: 2px solid #ffc400;
  border-radius: 6px;
  margin-bottom: 15px;
  padding-left: 12px;
  transition: 0.3s ease;

  &:focus {
    outline: none;
    border: 1px solid #ffc400;
    background-color: #2a2a2a;
    box-shadow: 0 0 10px rgba(255, 196, 0, 0.4);
  }
`;

export const InputEmail = styled.input.attrs({ type: 'email' })`${inputBase}`;
export const InputPassword = styled.input.attrs({ type: 'password' })`${inputBase}`;

export const SendBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  width: 90%;
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(255, 196, 0, 0.3);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const MsgBox = styled.div`
  text-align: center;
  width: 90%;
  padding-top: 15px;
  color: #ff4d4d;
  font-weight: 600;
`;

export const Submit = styled.input.attrs({ type: 'submit' })`
  width: 180px;
  height: 40px;
  background: linear-gradient(135deg, #ffc400, #ff9f00);
  color: #1a1a1a;
  font-size: 16px;
  font-weight: 700;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(255, 196, 0, 0.4);

  &:hover {
    background: linear-gradient(135deg, #ffda33, #ffc400);
    transform: translateY(-3px);
    box-shadow: 0 0 20px rgba(255, 196, 0, 0.6);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const LinkForgot = styled.div`
  cursor: pointer;
  font-size: 16px;
  margin-top: 15px;
  color: #ffc400;
  font-weight: 500;
  transition: 0.3s ease;

  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
`;
