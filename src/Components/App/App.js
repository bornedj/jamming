import './App.css';
import { SearchBar } from '../SearchBar/SearchBar.js'
import { SearchResults } from '../SearchResults/SearchResults.js'
import { Playlist } from '../Playlist/Playlist'
import React from 'react';

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
    this.addTrack = this.addTrack.bind(this);//make sure it can be used in the render function
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

  render() {
    return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
          <Playlist playlistName={this.state.playlist} playlistTracks={this.state.playlistTracks}/>
        </div>
      </div>
    </div>
    );
  }
}

export default App;
