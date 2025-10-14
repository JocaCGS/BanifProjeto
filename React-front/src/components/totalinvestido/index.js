import React from 'react';
import { Container, Title, ChartWrapper } from './style';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function TotalInvestido() {
  const dadosInvestimentos = [
    { tipo: "Poupança", total: 0},
    { tipo: "Investimento", total: 0},
    { tipo: "Renda Fixa", total: 0},
  ];

  return (
    <Container>
      <Title>Total Investido</Title>
      <ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={dadosInvestimentos}
            margin={{ top: 20, right: 50, left: 50, bottom: 50 }}
            barCategoryGap="30%"
          >
            <XAxis dataKey="tipo" stroke="#ffc400" tick={{ fontSize: 18 }} />
            <YAxis stroke="#ffc400" tick={{ fontSize: 16 }} />
            <Tooltip formatter={(value) => `R$ ${value.toLocaleString()}`} />
            <Legend wrapperStyle={{ color: '#fff', fontSize: 16 }} />
            <Bar dataKey="total" name="Total Investido" fill="#ffc400" barSize={80} />
          </BarChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </Container>
  );
}
