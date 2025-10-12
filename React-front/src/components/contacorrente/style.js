import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 750px;
  background-color: #141414;
  border-radius: 14px;
  padding: 30px 35px;
  margin: 25px 0;
  box-shadow: 0 0 25px rgba(255, 196, 0, 0.15);
`;

export const Title = styled.h2`
  font-size: 28px;
  color: #ffc400;
  margin-bottom: 20px;
`;

export const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const Label = styled.span`
  font-size: 18px;
  color: #f0f0f0;
  font-weight: 600;
`;

export const Value = styled.span`
  font-size: 18px;
  color: #ffc400;
  font-weight: 700;
`;
