import { useState, useEffect } from 'react';
import { 
    Container, 
    FormsContainer, 
    FormWrapper, 
    FormTitle, 
    HeaderWrapper,
    LogoutWrapper
} from './style';
import HeaderHomeGerente from '../../components/headerhomegerente';
import BotaoLogout from '../../components/botaologout';
import { OrbitProgress } from "react-loading-indicators";
import FormCadastro from '../../components/formcadastro';
import FormContaCorrente from '../../components/formcontacorrente';
import ActionButtonGerente from '../../components/actionbuttongerente';

export default function HomeGerente() {
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
                <HeaderWrapper>
                    <HeaderHomeGerente />
                </HeaderWrapper>

                <ActionButtonGerente />

                <FormsContainer>
                    <FormWrapper>
                        <FormTitle>Cadastro</FormTitle>
                        <FormCadastro />
                    </FormWrapper>

                            {/* <FormWrapper>
                                <FormTitle>Conta Corrente</FormTitle>
                                <FormContaCorrente />
                            </FormWrapper> */}
                </FormsContainer>

                <LogoutWrapper>
                    <BotaoLogout />
                </LogoutWrapper>
            </Container>
        )
    );
}
