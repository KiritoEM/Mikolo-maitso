import { IResponseType } from "../types";
import { FLASK_BASE_URL } from "../constants/constants";

export const scanPlant = async (
  imageData: File
): Promise<IResponseType<any>> => {
  try {
    const formdata = new FormData();
    formdata.append("image", imageData, imageData.name);

    const response = await fetch(`${FLASK_BASE_URL}/predict/`, {
      method: "POST",
      body: formdata,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erreur API:", errorText);
      return {
        status: "error",
        message: `Erreur lors du scan de plante: ${response.status}`,
      };
    }

    const data = await response.json();
    return {
      status: "success",
      message: "Plante reconnue avec succès",
      data: data,
    };
  } catch (error) {
    console.error("Erreur réseau:", error);
    return {
      status: "error",
      message: "Erreur de connexion au serveur",
    };
  }
};

export const savePlantScanned = async (
  plantName: string,
  userId: number
): Promise<IResponseType<any>> => {
  try {
    const fetchPlantResponse = await fetch(
      `${FLASK_BASE_URL}/api/recuperation/Plant/${plantName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!fetchPlantResponse.ok) {
      const errorText = await fetchPlantResponse.text();
      console.error("Erreur récupération plante:", errorText);
      return {
        status: "error",
        message: `Plante '${plantName}' non trouvée dans la base de données`,
      };
    }

    const plantData = await fetchPlantResponse.json();

    if (!plantData || !plantData.id) {
      return {
        status: "error",
        message: "Données de plante invalides",
      };
    }

    const savePlantResponse = await fetch(
      `${FLASK_BASE_URL}/api/creation/Scanned_plant/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          plant_id: plantData.id,
        }),
      }
    );

    if (!savePlantResponse.ok) {
      const errorText = await savePlantResponse.text();
      console.error("Erreur sauvegarde:", errorText);
      return {
        status: "error",
        message: "Erreur lors de la sauvegarde de la plante scannée",
      };
    }

    const savedData = await savePlantResponse.json();
    return {
      status: "success",
      message: "Plante sauvegardée avec succès",
      data: savedData,
    };
  } catch (error) {
    console.error("Erreur réseau:", error);
    return {
      status: "error",
      message: "Erreur de connexion au serveur",
    };
  }
};
