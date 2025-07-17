export const login = async (email, password) => {
    try {
        const reponse = await api.post('/api/users/login/', {
            email,
            password,
        });

        console.log("Réponse du serveur :", reponse.data);

        return reponse.data; // ✅ retourne les données, y compris `token`
    } catch (error) {
        if (error.response) {
            // Erreur 4xx/5xx du serveur
            console.error('Détails de l\'erreur:', error.response.data);
            throw new Error(error.response.data.message || 'Erreur lors de la connexion');
        } else if (error.request) {
            // Requête envoyée mais pas de réponse (problème réseau)
            console.error('Pas de réponse du serveur:', error.request);
            throw new Error('Le serveur ne répond pas. Vérifiez votre connexion.');
        } else {
            // Erreur de configuration de la requête
            console.error('Erreur de configuration:', error.message);
            throw new Error('Erreur lors de l\'envoi de la requête.');
        }
    }
};
