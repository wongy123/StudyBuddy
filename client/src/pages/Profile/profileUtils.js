import { getUserFromToken } from '../../utils/getUserFromToken';

export const profileOwnerOrAdmin = (profileUserId, token) => {


    if (!profileUserId) return false;
    const { id: loggedInId, role } = getUserFromToken(token);

    const isOwner = loggedInId === profileUserId;
    const isAdmin = role === 'admin';

    return isOwner || isAdmin;
};
