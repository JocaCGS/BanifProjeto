import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { OrbitProgress } from "react-loading-indicators";
import UserContext from '../../contexts/UserContext';
import { Client, setToken } from '../../api/client';
import { setPermissions } from '../../service/PermissionService';
import { setDataUser } from '../../service/UserService';
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
    InputText,
    MsgBox,
    SendBox,
    Submit,
    FormBox,
    AddressGroup,
    StreetGroup,
    LinkBack
} from "./style";

import iconbanco from '../../images/iconbanco.png';

export default function FormCadastro() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpf, setCpf] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [rua, setRua] = useState('');
    const [numero_casa, setNumero] = useState('');
    const [load, setLoad] = useState(false);
    const [view, setView] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    function Cadastrar() {
        const user = {
            fullName: nome,
            email: email,
            password: password,
            cpf: cpf,
            address: {
                cidade,
                estado,
                rua,
                numero_casa
            }
        };

        setView(false);
        setLoad(true);

        setTimeout(() => {
            Client.post('auth/addressregister', user.address).then(res => {
                const addressId = res.data.id;
                
                const userWithAddress = {
                    fullName: nome,
                    email: email,
                    password: password,
                    cpf: cpf,
                    address: addressId
                }
                return Client.post('auth/register', userWithAddress);
            })
            .then((res)=> {
                
                const load = res.data;
                console.log(load);
                setUser(load.user);
                setDataUser(load.user);
                setToken(load.token.value);
                setPermissions(load.permissions);
            })
            .catch(function (error) {
                setView(true);
                console.log(error);
            })
            .finally(() => {
                setLoad(false);
            });

        }, 1000);
    }

    return (
        <Container>

            <Title>Cadastro de Cliente</Title>
            <SubTitle>Preencha os dados abaixo</SubTitle>

            {
                load
                    ? (
                        <Container className="d-flex justify-content-center mt-5">
                            <OrbitProgress variant="spokes" color="#FFFF00" size="medium" />
                        </Container>
                    )
                    : (
                        <FormBox>
                            <Label>Nome Completo</Label>
                            <InputText
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />

                            <Label>E-mail</Label>
                            <InputEmail
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Label>Senha</Label>
                            <InputPassword
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <Label>CPF</Label>
                            <InputText
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                            />

                            <AddressGroup>
                                <div>
                                    <Label>Cidade</Label>
                                    <InputText
                                        value={cidade}
                                        onChange={(e) => setCidade(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Estado</Label>
                                    <select
                                        value={estado}
                                        onChange={(e) => setEstado(e.target.value)}
                                        style={{
                                            width: '100%',
                                            height: '36px',
                                            backgroundColor: '#1c1c1c',
                                            color: '#fff',
                                            border: '1px solid #333',
                                            borderLeft: '2px solid #ffc400',
                                            borderRadius: '5px',
                                            marginBottom: '12px',
                                            paddingLeft: '10px',
                                            fontSize: '14px',
                                            transition: '0.3s ease'
                                        }}
                                    >
                                        <option value="">Selecione</option>
                                        <option value="AC">Acre</option>
                                        <option value="AL">Alagoas</option>
                                        <option value="AP">Amapá</option>
                                        <option value="AM">Amazonas</option>
                                        <option value="BA">Bahia</option>
                                        <option value="CE">Ceará</option>
                                        <option value="DF">Distrito Federal</option>
                                        <option value="ES">Espírito Santo</option>
                                        <option value="GO">Goiás</option>
                                        <option value="MA">Maranhão</option>
                                        <option value="MT">Mato Grosso</option>
                                        <option value="MS">Mato Grosso do Sul</option>
                                        <option value="MG">Minas Gerais</option>
                                        <option value="PA">Pará</option>
                                        <option value="PB">Paraíba</option>
                                        <option value="PR">Paraná</option>
                                        <option value="PE">Pernambuco</option>
                                        <option value="PI">Piauí</option>
                                        <option value="RJ">Rio de Janeiro</option>
                                        <option value="RN">Rio Grande do Norte</option>
                                        <option value="RS">Rio Grande do Sul</option>
                                        <option value="RO">Rondônia</option>
                                        <option value="RR">Roraima</option>
                                        <option value="SC">Santa Catarina</option>
                                        <option value="SP">São Paulo</option>
                                        <option value="SE">Sergipe</option>
                                        <option value="TO">Tocantins</option>
                                    </select>
                                </div>
                            </AddressGroup>

                            <StreetGroup>
                                <div>
                                    <Label>Rua</Label>
                                    <InputText
                                        value={rua}
                                        onChange={(e) => setRua(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Número</Label>
                                    <InputText
                                        value={numero_casa}
                                        onChange={(e) => setNumero(e.target.value)}
                                    />
                                </div>
                            </StreetGroup>

                            {
                                view && (
                                    <MsgBox>
                                        <p>Erro ao cadastrar! Verifique os dados e tente novamente.</p>
                                    </MsgBox>
                                )
                            }

                            <SendBox>
                                <Submit value="Cadastrar" onClick={() => Cadastrar()} />
                        
                            </SendBox>
                        </FormBox>
                    )
            }
        </Container>
    );
}
