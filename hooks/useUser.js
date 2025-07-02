import { useState, useEffect } from 'react';

export const useUser = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);
    const [userError, setUserError] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                setUserLoading(true);
                const user = await window.websim.getCurrentUser();
                setCurrentUser(user);
                setUserError(null);
            } catch (error) {
                console.error('Error loading user:', error);
                setUserError(error.message);
                setCurrentUser(null);
            } finally {
                setUserLoading(false);
            }
        };
        loadUser();
    }, []);

    return { currentUser, userLoading, userError };
};