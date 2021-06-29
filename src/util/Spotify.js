let userAccessToken;
const redirectUri = "http://localhost:3000/";


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
                //just cleared if expired
                return userAccessToken;
            } else {
            //sending users to authenticate their spotify account
            window.location = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`

            }
        }
    },


    //search function will return a promise accepts a search term
    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
        {headers: {Authorization: `Bearer ${accessToken}`}})
        .then(
            response => { 
                console.log(response)
                return response.json();
            }
        )
        .then(jsonResponse => {
            console.log(jsonResponse);
            if (!jsonResponse.tracks) {
                return [];
            } 

            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album,
                uri: track.uri
            }))
        })
    }
}

export default Spotify;