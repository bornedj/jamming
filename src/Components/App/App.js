import './App.css';
import { SearchBar } from '../SearchBar/SearchBar.js'
import { SearchResults } from '../SearchResults/SearchResults.js'
import { Playlist } from '../Playlist/Playlist'
import React from 'react';
import Spotify from '../../util/Spotify'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { searchResults: 
      [
        {name: "bitch don't kill my vibe", artist: "Kendrick Lamar", album: "good kid maad city", id: "idk"},
        {name: "name2", artist: "artist2", album: "album 2", id: "id2"}
      ],
      playlistName: 'test playlist name',
      playlistTracks: [{name: "playlist track name 1", artist: "playlist artist", album: "playlist album", id: "playlist id"}]
    }
    //method binds
    this.addTrack = this.addTrack.bind(this);//make sure it can be used in the render function
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this);
  }

  //update playlist name method
  updatePlaylistName(name) {
    this.setState({playlistName: name})
  }

  //function to create an array full of the playlist uris. will be passed to function that will save it to the users accounts
  savePlaylist() {
    //need to generate an array of trackuri's
    const trackUris =[];
    this.state.playlistTracks.forEach(track => {
      //filler for now since I need to go and read the spotify documentation
      trackUris.push(Math.floor(Math.random() * 500));
    })
    this.setState({playlistUris: trackUris})
  }

  //search function that will be connected with spotify's api 
  search(searchTerm) {
    console.log(searchTerm);
  }

  addTrack(track) {//functon to add a track to the state playlist
    const savedTracks = this.state.playlistTracks
    if (savedTracks.find(savedTrack => savedTrack.id === track.id)) {//checks if the track is in the playlist by ID
      return;
    }

    //update the state of the playlist
    savedTracks.push(track);
    this.setState({playlistTracks: savedTracks})
  }

  //remove track function will work with playlist state and will be passed to the track button
  removeTrack(track) {
    const savedTracks = this.state.playlistTracks;
    const newTrackList = [];

    //if the track is not the one that needs to be removed then we push it to a new array of objects
    savedTracks.forEach(savedTrack => {
      if (savedTrack.id === track.id) {
        return;
      }
      newTrackList.push(savedTrack)
    })
    
    this.setState({playlistTracks: newTrackList})
  }

  render() {
    console.log(process.env.REACT_APP_Spotify_clientID)
    return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={this.search}/>
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
          <Playlist playlistName={this.state.playlist}
          playlistTracks={this.state.playlistTracks}
          onRemove={this.removeTrack}
          onNameChange={this.updatePlaylistName}
          onSave={this.savePlaylist}/>
          <button onClick={Spotify.getAccessToken}>test</button>
        </div>
      </div>
    </div>
    );
  }
}

export default App;
