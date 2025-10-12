import React from 'react';
import { Button } from './style';
import { useNavigate } from 'react-router';

export default function BotaoLogout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aqui você pode limpar o contexto, localStorage, token, etc.
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Button onClick={handleLogout}>
      Logout
    </Button>
  );
}
