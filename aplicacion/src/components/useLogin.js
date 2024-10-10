import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useLogin() {

    const navigate = useNavigate();

    useEffect(() => {
        const handlePopState = (event) => {
            navigate('/login', { replace: true });
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [navigate]);

    return navigate;
}

export default useLogin;

