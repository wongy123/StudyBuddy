import { jwtDecode } from 'jwt-decode';

export const getUserIdFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.id;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
};