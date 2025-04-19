import { useMemo } from 'react';
import { getUserFromToken } from '../utils/getUserFromToken';

export const useUser = () => {
  const token = localStorage.getItem('token');
  const user = useMemo(() => getUserFromToken(token), [token]);

  return { token, user };
};
