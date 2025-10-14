import React, { useState } from 'react';
import { 
    Container, 
    FormBox, 
    Label, 
    InputText, 
    Submit, 
    SendBox, 
    LinkBack 
} from './style';
import iconbanco from '../../images/iconbanco.png';
import { BoxIcon, BoxItem, Icon, Title, SubTitle } from './style';

export default function FormContaCorrente() {
    const [numeroConta, setNumeroConta] = useState('');
    const [numeroAgencia, setNumeroAgencia] = useState('');
    const [saldo, setSaldo] = useState('');
    const [cpf, setCpf] = useState('');
    
    function criarConta() {
            const conta = {
                numero_conta: numeroConta,
                numero_agencia: numeroAgencia,
                saldo: saldo,
                cpf: cpf,
            };
            setView(false);
            setLoad(true);
            return Client.post('auth/accountregister', conta).then((res)=> {
                
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

        }

    return (
        <Container>


            <Title>Conta Corrente</Title>
            <SubTitle>Preencha os dados abaixo</SubTitle>

            <FormBox>
                <Label>Número da Conta</Label>
                <InputText
                    value={numeroConta}
                    onChange={(e) => setNumeroConta(e.target.value)}
                />

                <Label>Número da Agência</Label>
                <InputText
                    value={numeroAgencia}
                    onChange={(e) => setNumeroAgencia(e.target.value)}
                />

                  <Label>CPF</Label>
                <InputText
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                />

                <Label>Saldo Inicial</Label>
                <InputText
                    type="number"
                    value={saldo}
                    onChange={(e) => setSaldo(e.target.value)}
                />


                <SendBox>
                    <Submit value="Criar Conta" onClick={criarConta} />
                </SendBox>
            </FormBox>
        </Container>
    );
}
