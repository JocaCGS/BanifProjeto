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

    // Simula carregamento inicial
    useEffect(() => {
        const timer = setTimeout(() => setLoad(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        load 
        ? (
            <Container className="d-flex justify-content-center mt-5">
                <OrbitProgress variant="spokes" color="#FFFF00" size="medium" />
            </Container>
        )
        : (
            <Container>
                <HeaderHome  />
                <ActionButtons />

              

                <ContaCorrente />
                <TotalInvestido />

                <BotaoLogout />
            </Container>
        )
    );
}
