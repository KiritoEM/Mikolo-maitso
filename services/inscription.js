import api from "./api";

export const signin = async (nom,email, password,role) => {
    try{
        const reponse = await api.post('/api/users/signin/',
        {
            nom,
            email,
            password,
            role,
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