import SpotifyLogin from './SpotifyKeys'
let userAccessToken;
const redirectUri = "http://localhost:3000/";
const clientId = SpotifyLogin.clientID;


const Spotify = {
    getAccessToken() {
        //check if there is already a userAccessToken if not need to acquire one
        if (userAccessToken) {
            return userAccessToken;
        } else {
            //sending users to authenticate their spotify account
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`

            const userAccessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
            const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)

            if (userAccessTokenMatch && expiresInMatch) {
                userAccessToken = userAccessTokenMatch;
                const expiresIn = Number(expiresInMatch);

                console.log(userAccessToken)
                console.log(expiresIn)
                //clearing the parameters
                window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
                window.history.pushState('Access token', null, '/')
            }
        }
    },


    //search function will return a promise
    search() {
        fetch("GET",)
    }
}

export default Spotify;