import * as api from './api.js';

const host = 'http://localhost:3030'
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllPets(){
    return await api.get(host + '/data/pets?sortBy=_createdOn%20desc')
}

export async function addPet(data){
    return await api.post(host + '/data/pets', data)
}

export async function getPetById(id){
    return await api.get(host + '/data/pets/' + id)
}

export async function editPet(id, data){
    return await api.put(host + '/data/pets/' + id, data)
}

export async function deletePet(id){
    return await api.del(host + '/data/pets/' + id);
}

export async function myPets(){
    const userId = sessionStorage.getItem('userId')
    return await api.get(host + `/data/pets?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}


export async function likePet(pet){
    return await api.post(host + '/data/likes', pet)
}