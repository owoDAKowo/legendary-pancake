import axios from "axios";
import { AUTH_TOKEN, PROXY_CONFIG } from "../../API";

export const fetchMovieDetails = async (movieId: string) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=videos&language=ru-RU`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: AUTH_TOKEN
        },
        proxy: PROXY_CONFIG
    });
    console.log('fetchMovieDetails response', response);
    return response.data;
};

export const fetchTvShowDetails = async (tvShowId: string) => {
    const response = await axios.get(`https://api.themoviedb.org/3/tv/${tvShowId}?append_to_response=videos&language=ru-RU`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: AUTH_TOKEN
        },
        proxy: PROXY_CONFIG
    });
    console.log('fetchMovieDetails response', response);
    return response.data;
};