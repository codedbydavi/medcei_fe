export const getUserRole = () => {
    return localStorage.getItem('role') || null;
}

export const isUserAuthenticated = () => {
    return localStorage.getItem('isAuthenticated') === 'true';
}

export const clearUserData = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('role');
}