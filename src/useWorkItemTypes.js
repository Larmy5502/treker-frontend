import { useEffect, useState } from 'react';

function useWorkItemTypes() {
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const token = localStorage.getItem('access');
                const response = await fetch('http://localhost:8000/tasks/types/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setTypes(data);
                } else {
                    console.error('Ошибка загрузки типов задач');
                }
            } catch (error) {
                console.error('Ошибка сети:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTypes();
    }, []);

    return { types, loading };
}

export default useWorkItemTypes;
