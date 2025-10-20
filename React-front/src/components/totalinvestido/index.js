import React, { useEffect, useState } from 'react';
import { Container, Title, ChartWrapper } from './style';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Client } from '../../api/client';

export default function TotalInvestido({reload}) {
  const [dadosInvestimentos, setDadosInvestimentos] = useState([{ tipo: "Investimento", total: 0 }]);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const response = await Client.get('/auth/investments'); // rota para pegar todos os investimentos
        const investments = response.data;

        // soma todos os valores
        const totalInvestido = investments.reduce((acc, inv) => acc + Number(inv.value), 0);

        setDadosInvestimentos([{ tipo: "Investimento", total: totalInvestido }]);
      } catch (error) {
        console.error("Erro ao buscar investimentos:", error);
      }
    };

    fetchInvestments();
  }, [reload]);

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
