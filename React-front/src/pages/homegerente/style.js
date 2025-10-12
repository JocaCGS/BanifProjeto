import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh; /* ocupa toda a altura da tela */
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; /* centraliza tudo horizontalmente */
  background-color: #141414; /* fundo igual ao dos formulários */
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center; /* centraliza o header horizontalmente */
  margin-bottom: 25px; /* espaçamento para os formulários */
`;

export const FormsContainer = styled.div`
  display: flex; /* lado a lado */
  gap: 20px; /* espaço entre eles */
  justify-content: center; /* centraliza horizontalmente */
  align-items: flex-start; /* alinha pelo topo */
  flex-wrap: wrap; /* empilha em telas pequenas */
  margin-bottom: 25px;
`;

export const FormWrapper = styled.div`
  flex: 1; /* ocupa espaço proporcional */
  min-width: 300px; 
  max-width: 450px; 
  background-color: #141414; /* mesma cor do container */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(255, 196, 0, 0.1); /* sombra dourada suave */
  color: #ffc400; /* texto dourado */
`;

export const FormTitle = styled.h3`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #ffc400; /* dourado */
  text-align: center;
  border-bottom: 1px solid rgba(255, 196, 0, 0.3);
  padding-bottom: 10px;
`;

export const LogoutWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center; /* centraliza logout */
  margin-top: 25px; /* espaçamento do container de formulários */
`;
