import api from "./api";

export const login = async (email, password) => {
    try{
        const reponse = await api.post('/api/users/login/',
        {
            email,
            password,
        })
    }
    catch (error){
        if(error.reponse){
            //Erreur du reponse
            throw new Error(error.reponse.data.message);
        } else {
            // erreur serveur
            throw new Error('Erreur de connexion serveur');
        }
    }
}