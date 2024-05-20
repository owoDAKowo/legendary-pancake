import axios from "axios";
export const mutationLogin = async () => {
    const response = await axios.get('https://api.themoviedb.org/3/authentication/guest_session/new',
        {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDY3OTQyYTQ2ZDA3YmNjNGJkZTU4MGQwNWJmYTBlZCIsInN1YiI6IjY2MzhhNTVlY2FhNTA4MDEyOWY1YjJiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4GAxSTzZBZVIb-aDF2xc9hVcwadS7rb8lJc6u2XUUHM'
            },
            proxy: {
                protocol: "http",
                host: "206.189.59.216",
                port: 3128,
                auth: {
                    username: "fetch",
                    password: "fetch_fetch"
                }
            }
        });
    console.log('mutationLogin response', response);
    return response.data;
};