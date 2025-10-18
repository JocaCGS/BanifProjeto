import React, { useState } from 'react';
import { 
    Container, 
    FormBox, 
    Label, 
    InputText, 
    Submit, 
    SendBox 
} from './style';
import { Title, SubTitle } from './style';
import { Client } from '../../api/client';

export default function FormContaCorrente() {
    const [numeroConta, setNumeroConta] = useState('');
    const [numeroAgencia, setNumeroAgencia] = useState('');
    const [saldo, setSaldo] = useState('');
    const [cpf, setCpf] = useState('');
    const [load, setLoad] = useState(false);
    const [view, setView] = useState(false);
    
    async function criarConta() {
        const conta = {
            numero_conta: numeroConta,
            numero_agencia: numeroAgencia,
            saldo,
            cpf,
        };

        setView(false);
        setLoad(true);

        try {
            const res = await Client.post('auth/accountregister', conta);
            console.log('Conta criada com sucesso:', res.data);
            alert('Conta criada com sucesso!');
        } catch (error) {
            setView(true);
            console.error('Erro ao criar conta:', error);
            alert('Erro ao criar conta. Verifique o console.');
        } finally {
            setLoad(false);
        }
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
                    <Submit value={load ? 'Criando...' : 'Criar Conta'} onClick={criarConta} disabled={load} />
                </SendBox>
            </FormBox>
        </Container>
    );
}
