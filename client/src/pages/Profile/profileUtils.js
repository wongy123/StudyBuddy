import { getUserFromToken } from '../../utils/getUserFromToken';

export const profileOwnerOrAdmin = (profileUserId) => {


    if (!profileUserId) return false;
    const token = localStorage.getItem('token');
    const { id: loggedInId, role } = getUserFromToken(token);

    const isOwner = loggedInId === profileUserId;
    const isAdmin = role === 'admin';

    return isOwner || isAdmin;
};
