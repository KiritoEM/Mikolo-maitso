import axios from "axios";
import { FLASK_BASE_URL } from "../constants/constants";
import { IResponseType, LoginFormData, RegisterFormData, User } from "../types";

type IAuthResponse = {
    token: string
} & Omit<User, "password" | "profilePhoto">

export const login = async (data: LoginFormData): Promise<IResponseType<IAuthResponse>> => {
    try {
        const response = await axios.post(`${FLASK_BASE_URL}/api/users/login/`, {
            email: data.email,
            password: data.password
        });

        if (response.status === 200) {
            return {
                status: "success",
                message: "Utilisateur connecté avec succès",
                data: response.data
            };
        }

        return {
            status: "error",
            message: "Un erreur s'est produit"
        };

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("Erreur Axios:", error.response?.status, error.response?.data);

            if (error.response?.status === 404) {
                return {
                    status: "error",
                    message: "Utilisateur non trouvé"
                };
            }

            if (error.response?.status === 401) {
                return {
                    status: "error",
                    message: "Mot de passe incorrect"
                };
            }

            if (error.response?.status === 400) {
                return {
                    status: "error",
                    message: "Données invalides"
                };
            }

            return {
                status: "error",
                message: error.response?.data?.message || "Erreur lors de la connexion"
            };
        }

        console.error("Erreur réseau:", error);
        return {
            status: "error",
            message: "Erreur de connexion au serveur"
        };
    }
}

export const register = async (data: RegisterFormData): Promise<IResponseType<IAuthResponse>> => {
    try {
        const response = await axios.post(`${FLASK_BASE_URL}/api/users/signin/`, {
            username: data.username,
            email: data.email,
            password: data.password
        });

        if (response.status === 201) {
            return {
                status: "success",
                message: "Compte utilisateur créé avec succès",
                data: response.data
            };
        }

        return {
            status: "error",
            message: "Erreur lors de la création du compte"
        };

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("Erreur Axios:", error.response?.status, error.response?.data);

            if (error.response?.status === 400) {
                return {
                    status: "error",
                    message: "Erreur lors de la création du compte"
                };
            }

            return {
                status: "error",
                message: error.response?.data?.message || "Erreur lors de la connexion"
            };
        }

        console.error("Erreur réseau:", error);
        return {
            status: "error",
            message: "Un erreur s'est produit"
        };
    }
}