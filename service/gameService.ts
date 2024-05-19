import { useAuth } from "../hooks/authContext";

const baseUrl = 'https://malamute-enabled-yak.ngrok-free.app/game';

const baseHeaders = {
    "Content-Type": 'application/json',
    "Accept": 'application/json'
}


export const listGames = async (token: string) => {
    const result = await fetch(`${baseUrl}`, {
        method: 'get',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await result.json();
    return data
}

export const createGame = async (token: string) => {
    const result = await fetch(`${baseUrl}`, {
        method: 'post',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    })
    return result
}
export const joinGame = async (token: string, gameId: string) => {
    const result = await fetch(`${baseUrl}/join/${gameId}`, {
        method: 'post',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    })

    return result
}

export const loadGame = async (token: string, gameId: number) => {
    const result = await fetch(`${baseUrl}/${gameId}`, {
        method: 'get',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await result.json();

    return data
}


export const sendConfiguration = async (token: string, gameId: any, configuration: any) => {
    const result = await fetch(`${baseUrl}/${gameId.gameId}`, {
        method: 'patch',
        headers: {
            ...baseHeaders,
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            ships: configuration
        })
    })

    const data = await result.json();
    if (result.status != 200) {
        alert(data.message)
    }

    return data
}


