import React, { useState, useEffect } from 'react';
import iconbanco from '../../images/iconbanco.png';
import {
  HeaderContainer,
  UserInfo,
  Icon,
  UserName,
  Saldo
} from './style';
import { Client } from '../../api/client'; // seu axios configurado

export default function HeaderHome() {
  const [nome, setNome] = useState("Usuário");
  const [saldo, setSaldo] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConta = async () => {
      try {
        setLoading(true);
        // Chama rota /conta que já retorna a conta do usuário logado
        const response = await Client.get('/conta');
        const conta = response.data.conta;

        setNome(conta.userId ? `Usuário ${conta.userId}` : "Usuário"); // se quiser, depois pega nome real do backend
        setSaldo(Number(conta.saldo) || 0);
      } catch (err) {
        console.error("Erro ao buscar saldo:", err);
        setSaldo(0);
      } finally {
        setLoading(false);
      }
    };

    fetchConta();
  }, []);

  const saldoNumero = Number(saldo) || 0;

  return (
    <HeaderContainer>
      <UserInfo>
        <Icon src={iconbanco} />
        <div>
          <UserName>{nome}</UserName>
          <Saldo>
            {loading ? "Carregando..." : `Saldo: R$ ${saldoNumero.toFixed(2)}`}
          </Saldo>
        </div>
      </UserInfo>
    </HeaderContainer>
  );
}
