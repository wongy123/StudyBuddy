import { jwtDecode } from "jwt-decode";

export const getUserFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return {
      id: decoded.id,
      role: decoded.role, // 'user', 'moderator', or 'admin'
    };
  } catch {
    return { id: null, role: null };
  }
};
