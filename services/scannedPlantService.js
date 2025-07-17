import api from "./api";

export const Scanned_plant = async (plant_id,scan_date, image_url,health_status) => {
    try{
        const reponse = await api.post('/api/creation/Scanned_plant/',
        {
          plant_id,
          scan_date,
          image_url,
          health_status,
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