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

    function criarConta() {
        // Apenas log para teste
        console.log({
            numeroConta,
            numeroAgencia,
            saldo
        });
        alert('Conta corrente criada com sucesso! (dados fictícios)');

        // Limpa os campos
        setNumeroConta('');
        setNumeroAgencia('');
        setSaldo('');
    }

    return (
        <Container>


            <Title>Conta Corrente</Title>
            <SubTitle>Preencha os dados para criar a conta</SubTitle>

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
