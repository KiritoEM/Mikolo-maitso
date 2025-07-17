import Cookies from "js-cookie";
import { SESSION_ID } from "../constants/constants";
import { jwtDecode, JwtPayload } from "jwt-decode";

export const createSession = (token: string) => {
    return Cookies.set(SESSION_ID, token, { expires: 30 });
}

export const getSession = () => {
    const token = Cookies.get(SESSION_ID) ?? "";

    if (!token) return null;

    return jwtDecode(token) as JwtPayload;
}