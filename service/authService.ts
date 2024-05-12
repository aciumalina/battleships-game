import { useAuth } from "../hooks/authContext";

const baseUrl = 'https://malamute-enabled-yak.ngrok-free.app';

const baseHeaders = {
    "Content-Type": 'application/json',
    "Accept": 'application/json'
}

export const login = async (email: string, password: string): Promise<any> => {
    const result = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
            ...baseHeaders,

        },
        body: JSON.stringify({
            email, password
        })
    })

    const data = await result.json()
    if (result.status !== 200) {
        alert(data.message)
    }

    return data;
};

export const register = async (email: string, password: string) => {
    const result = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
            ...baseHeaders
        },
        body: JSON.stringify({
            email, password
        })
    })

    const data = await result.json()
    if (result.status !== 200) {
        alert(data.message)
    }


    return data;
};

export const getUserDetails = async (token: string) => {
    try {
        const result = await fetch(`${baseUrl}/user/details/me`, {
            method: 'GET',
            headers: {
                ...baseHeaders,
                'Authorization': `Bearer ${token}`
            },

        })
        const data = await result.json()
        if (result.status !== 200) {
            alert(data.message)
        }
        return data;


    }
    catch (error) {
        console.log(error)
    }


}