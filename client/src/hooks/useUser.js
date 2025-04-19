import { useMemo } from 'react';
import { getUserFromToken } from '../utils/getUserFromToken';
import { useAuth } from '../context/AuthContext';

export const useUser = () => {
    const { token } = useAuth();
    const user = useMemo(() => getUserFromToken(token), [token]);

  return { token, user };
};
