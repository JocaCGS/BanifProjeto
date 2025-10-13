import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { OrbitProgress } from "react-loading-indicators";
import UserContext  from '../../contexts/UserContext'
import { Client, setToken}  from '../../api/client';
import { setPermissions } from '../../service/PermissionService'
import { setDataUser } from '../../service/UserService'
import { 
    Container, 
    BoxIcon,
    BoxItem,
    Icon,
    Title, 
    SubTitle,
    Label,
    InputPassword,
    InputEmail,
    MsgBox,
    SendBox,
    Submit,
    LinkForgot,
} from "./style"

import iconbanco from '../../images/iconbanco.png';

export default function FormLogin() {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [load, setLoad] = useState(false)
    const [view, setView] = useState(false)
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    function Authenticate() {

        const user = { email: email , password: password }

        setView(false)
        setLoad(true) 
        setTimeout(() => {
             Client.post('auth/login', user).then(res => {
            const data = res.data;

            console.log('Login response:', data); // sempre veja o que vem

            // Context
            setUser(data.user);
            setDataUser(data.user);
            setToken(data.token.value);
            setPermissions(data.permissions);

            const permId = Number(data.user.perm_id); // pega do retorno correto
            const routeMap = {
                1: '/home',        
                2: '/homegerente',
            };

            const route = routeMap[permId] || '/jmmbn';
            navigate(route);
        })

            .catch(function(error) {
                setView(true)
                console.log(error)
            })
            .finally( () => {
                setLoad(false)
            })

        }, 1000)
    }

    return (
        
        <Container>
            <BoxIcon>
                <div></div>
                <BoxItem>
                    <Icon src={iconbanco}/>
                </BoxItem>
                <div></div>
            </BoxIcon>
            <Title>Autenticação</Title>
            <SubTitle>Informe suas Credenciais</SubTitle>
            {
                load 
                ?
                    <Container className="d-flex justify-content-center mt-5">
                        <OrbitProgress variant="spokes" color="#FFFF00" size="medium" text="" textColor="" />
                    </Container>
                :
                    <>
                        <Label>E-mail</Label>
                        <InputEmail 
                            id="email" 
                            name="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    
                        <Label>Senha</Label>
                        <InputPassword 
                            id="password" 
                            name="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        
                        {
                            view
                            ?
                                <MsgBox>
                                    <p>Usuário e Senha Inválidos!</p>
                                </MsgBox>
                            :
                                ''
                        }
                        
                        <SendBox>
                            <Submit value="Autenticar" onClick={() => Authenticate() }/>
                            <LinkForgot onClick={() => navigate('/login')}> Esqueceu sua senha?</LinkForgot>
                        </SendBox>
                    </>
            }
        </Container>
    )
} 