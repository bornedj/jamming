import spotifyLogin from './SpotifyLogin'
let userAccessToken;
const redirectUri;
const cliendId = process.env.REACT_APP_Spotify_cliendID;
const clientSecret = process.env.REACT_APP_Spotify_clientSecret;

const Spotify = {
    getAccessToken() {
        //check if there is already a userAccessToken if not need to acquire one
        if (userAccessToken) {
            return userAccessToken;
        } else {
            const userAccessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
            const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)

            if (userAccessTokenMatch && expiresInMatch) {
                userAccessToken = userAccessTokenMatch;
                const expiresIn = Number(expiresInMatch);

                //clearing the parameters
                window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
                window.history.pushState('Access token', null, '/')
            }
        }
    }
}

export default Spotify;