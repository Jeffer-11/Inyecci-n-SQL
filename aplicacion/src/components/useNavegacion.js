import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useNavegacion() {
    const navigate = useNavigate();

    useEffect(() => {
        const handlePopState = (event) => {
            navigate('/menu', { replace: true });
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [navigate]);

    return navigate;
}

export default useNavegacion;