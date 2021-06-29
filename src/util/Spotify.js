let userAccessToken;
const redirectUri = "http://localhost:3000/";
const cliendId = process.env.REACT_APP_Spotify_cliendID;
const clientSecret = process.env.REACT_APP_Spotify_clientSecret;

const Spotify = {
    clientId: process.env.REACT_APP_Spotify_cliendID,
    clientSecret: process.env.REACT_APP_Spotify_clientSecret,
    redirectUri: "http://localhost:3000/",
    
    getAccessToken() {
        //check if there is already a userAccessToken if not need to acquire one
        if (userAccessToken) {
            return userAccessToken;
        } else {

            //just testing right now
            console.log(process.env.REACT_APP_Spotify_cliendID);
            return;
            //sending users to authenticate their spotify account
            // window.location = `https://accounts.spotify.com/authorize?client_id=${this.clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
            window.location = "https://accounts.spotify.com/authorize?client_id=" + this.cliendId + "&response_type=token&scope=playlist-modify-public&redirect_uri=" + this.redirectUri; 

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
    },


    //search function will return a promise
    search() {
        fetch("GET",)
    }
}

export default Spotify;