import axios from "axios";
import { AUTH_TOKEN, PROXY_CONFIG } from "../../API";

export const mutationLogin = async () => {
    const response = await axios.get('https://api.themoviedb.org/3/authentication/guest_session/new',
        {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: AUTH_TOKEN
            },
            proxy: PROXY_CONFIG

        });
    console.log('mutationLogin response', response);
    return response.data;
};