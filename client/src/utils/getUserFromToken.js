import { jwtDecode } from "jwt-decode";

export const getUserFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return {
      id: decoded.id,
      role: decoded.role, // 'user', 'moderator', or 'admin'
      displayName: decoded.displayName,
    };
  } catch {
    return { id: null, role: null, displayName: null };
  }
};
