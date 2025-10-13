import React from 'react';
import { Button } from './style';
import { useNavigate } from 'react-router';
import { removeToken } from '../../api/client'; // usar função do Client

export default function BotaoLogout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpa apenas o token, sem tocar em outras chaves importantes
    removeToken();

    // Opcional: forçar refresh de dados de usuário no frontend
    window.location.href = '/login';
  };

  return (
    <Button onClick={handleLogout}>
      Logout
    </Button>
  );
}
