import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Container } from './style';
import FormLogin from '../../components/formlogin';
import ImageLogin from '../../components/imagelogin';
import { Client, getToken } from '../../api/client';
import { OrbitProgress } from "react-loading-indicators";

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);
            setError('');
            try {
                const token = getToken();
                if (!token) {
                    // Nenhum token, mostrar tela de login
                    setLoading(false);
                    return;
                }

                const response = await Client.get('/auth/me');
                const user = response.data.user;

                // Redireciona baseado no perm_id
                const permId = Number(user.perm_id);
                const routeMap = {
                    1: '/home',        // usuário comum
                    2: '/homegerente', // administrador
                };

                const route = routeMap[permId] || '/home';
                navigate(route);
            } catch (err) {
                console.error('Erro ao verificar autenticação:', err);
                setError('Não foi possível verificar a autenticação. Faça login.');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [navigate]);

    if (loading) {
        return (
            <Container className="d-flex justify-content-center mt-5">
                <OrbitProgress variant="spokes" color="#FFFF00" size="medium" text="" textColor="" />
            </Container>
        );
    }

    return (
        <Container>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <FormLogin />
            <ImageLogin />
        </Container>
    );
}
