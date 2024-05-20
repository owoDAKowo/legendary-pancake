import axios from "axios";

const AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDY3OTQyYTQ2ZDA3YmNjNGJkZTU4MGQwNWJmYTBlZCIsInN1YiI6IjY2MzhhNTVlY2FhNTA4MDEyOWY1YjJiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4GAxSTzZBZVIb-aDF2xc9hVcwadS7rb8lJc6u2XUUHM';
const PROXY_CONFIG = {
    protocol: "http",
    host: "206.189.59.216",
    port: 3128,
    auth: {
        username: "fetch",
        password: "fetch_fetch"
    }
};

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
