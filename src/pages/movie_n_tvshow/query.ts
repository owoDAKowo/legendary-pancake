import axios from "axios";
import { AUTH_TOKEN, PROXY_CONFIG } from "../../API";

export const fetchDetails = async (id: string, type: 'movie' | 'tv') => {
    const response = await axios.get(`https://api.themoviedb.org/3/${type}/${id}?append_to_response=videos&language=ru-RU`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: AUTH_TOKEN
        },
        proxy: PROXY_CONFIG
    });
    console.log('fetchDetails response ', type, response);
    return response.data;
};
