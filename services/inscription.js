import api from "./api";

export const signin = async (username, email, password) => {
  try {
    const response = await api.post('/api/users/signin/', {
      username,
      email,
      password,
    
    });
    return response;
  } catch (error) {
    if (error.response) {
        console.log("👉 ERREUR serveur", error.response.status, error.response.data);
      throw new Error(error.response.data.message || "Erreur côté serveur");
    } else if (error.request) {
      throw new Error("Pas de réponse du serveur.");
    } else {
      throw new Error("Erreur inconnue : " + error.message);
    }
  }
};
