import { useState, useEffect } from 'react';
import { Container } from './style';
import HeaderHome from '../../components/headerhome';
import ContaCorrente from '../../components/contacorrente';
import TotalInvestido from '../../components/totalinvestido';
import BotaoLogout from '../../components/botaologout';
import { OrbitProgress } from "react-loading-indicators";
import ActionButtons from '../../components/actionbuttons';

export default function Home() {
  const [load, setLoad] = useState(true);
  const [reload, setReload] = useState(false); // ← novo estado

  useEffect(() => {
    const timer = setTimeout(() => setLoad(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // função para forçar atualização
  const handleReload = () => setReload(prev => !prev);

  return (
    load 
    ? (
      <Container className="d-flex justify-content-center mt-5">
        <OrbitProgress variant="spokes" color="#FFFF00" size="medium" />
      </Container>
    )
    : (
      <Container>
        <HeaderHome />
        <ActionButtons onReload={handleReload} /> {/* ← passa para os botões */}
        <ContaCorrente reload={reload} />            {/* ← passa para o saldo */}
        <TotalInvestido reload={reload} />          {/* ← passa para investimentos */}
        <BotaoLogout />
      </Container>
    )
  );
}

