import axios from "axios";
import { IResponseType } from "../types";
import { FLASK_BASE_URL } from "../constants/constants";

export const scanPlant = async (imageData: File): Promise<IResponseType<any>> => {
    try {
        const formdata = new FormData();
        formdata.append("image", imageData, imageData.name);

        for (const [key, value] of formdata.entries()) {
            console.log(`${key}:`, value);
        }

        const response = await fetch(`${FLASK_BASE_URL}/predict/`, {
            method: "POST",
            headers: {
                'Content-Type' : 'multipart/form-data'
            },
            body: formdata
        });

        console.log(response);

        if (!response.ok) {
            return {
                status: "error",
                message: "Erreur lors du scan de plante",
            };
        }


        return {
            status: "success",
            message: "Plante reconnu créé avec succès",
            data: await response.json()
        };

    } catch (error) {
        console.error("Erreur réseau:", error);
        return {
            status: "error",
            message: "Un erreur s'est produit"
        };
    }
}