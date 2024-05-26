// url: 'https://api.themoviedb.org/3/guest_session/123/rated/movies?language=ru-RU',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDY3OTQyYTQ2ZDA3YmNjNGJkZTU4MGQwNWJmYTBlZCIsInN1YiI6IjY2MzhhNTVlY2FhNTA4MDEyOWY1YjJiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4GAxSTzZBZVIb-aDF2xc9hVcwadS7rb8lJc6u2XUUHM'
//   }

import axios from "axios";
import { AUTH_TOKEN, PROXY_CONFIG } from "../../API";

export const fetchRated = async (type: 'movies' | 'tv') => {
    const guest_session_id= localStorage.getItem('guest_session_id');

    const response = await axios.get(`https://api.themoviedb.org/3/guest_session/${guest_session_id}/rated/${type}?language=ru-RU`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: AUTH_TOKEN
        },
        proxy: PROXY_CONFIG
    });
    console.log('fetchRated response ', type, response);
    return response.data;
};
