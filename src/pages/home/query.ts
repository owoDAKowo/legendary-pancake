import axios from "axios";
import { AUTH_TOKEN, PROXY_CONFIG } from "../../API";

export const fetchMovie = async () => {
    const response = await axios.get('https://api.themoviedb.org/3/movie/popular?language=ru-RU&page=1', {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: AUTH_TOKEN
        },
        proxy: PROXY_CONFIG
    });
    console.log('fetchMovie response', response);
    return response.data;
};

export const fetchTvShows = async () => {
    const response = await axios.get('https://api.themoviedb.org/3/tv/popular?language=ru-RU&page=1', {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: AUTH_TOKEN
        },
        proxy: PROXY_CONFIG
    });
    console.log('fetchTvShows response', response);
    return response.data;
};
