import User from "../models/user_model";

export const Register = async (firebaseToken: string, newUser: User) => {
    const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${firebaseToken}`,
        },
        body: JSON.stringify(newUser),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao registar no servidor');
    }

    return response.json();
}

export const Login = async (firebaseToken: string) => {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${firebaseToken}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao autenticar no servidor');
    }

    return response.json();
}   