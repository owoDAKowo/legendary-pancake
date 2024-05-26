import axios from "axios";
import { AUTH_TOKEN, PROXY_CONFIG } from "../../API";

export const rateContent = async (contentId: string, rating: number, type: 'movie' | 'tv') => {
    const guest_session_id = localStorage.getItem('guest_session_id');

    const response = await axios({
        method: 'POST',
        url: `https://api.themoviedb.org/3/${type}/${contentId}/rating?guest_session_id=${guest_session_id}`,
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: AUTH_TOKEN
        },
        data: `{"value":${rating}}`,
        proxy: PROXY_CONFIG
      });

    console.log('rateContent response', response.status);
    return response.data;
};
