import React, { useState, useEffect } from 'react'
import { Container, Title, InfoBox, Label, Value } from './style'
import { Client } from '../../api/client' // ajuste o caminho

export default function ContaCorrente() {
  const [conta, setConta] = useState({
    numeroConta: '',
    numeroAgencia: '',
    saldo: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchConta = async () => {
      try {
        setLoading(true)
        const response = await Client.get('/conta') // rota do backend
        setConta(response.data) // response.data deve ser { numeroConta, numeroAgencia, saldo }
      } catch (err) {
        console.error('Erro ao buscar dados da conta:', err)
        setError('Não foi possível carregar os dados da conta.')
      } finally {
        setLoading(false)
      }
    }

    fetchConta()
  }, [])

  if (loading) return <Container>Carregando dados da conta...</Container>
  if (error) return <Container>{error}</Container>

  return (
    <Container>
      <Title>Conta Corrente</Title>

      <InfoBox>
        <Label>Agência:</Label>
        <Value>{conta.numeroAgencia}</Value>
      </InfoBox>

      <InfoBox>
        <Label>Número da Conta:</Label>
        <Value>{conta.numeroConta}</Value>
      </InfoBox>

      <InfoBox>
        <Label>Saldo:</Label>
        <Value>R$ {conta.saldo.toFixed(2)}</Value>
      </InfoBox>
    </Container>
  )
}
