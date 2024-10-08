import { useEffect, useState } from 'react';
import {UseDataLayerValue } from '../DataLayer';
import '../CSS/Home.css';
import { fetchProfile,redirectToAuthCodeFlow,getAccessToken } from '../components/authUtils';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import Footer from '../components/Footer';


const Home = () => {
  const clientId = import.meta.env.VITE_CLIENT_ID || '';
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
    // console.log("I have a code",code);
    // console.log("I have and access token:",accessToken);
    // console.log("I have a clientId",clientId);
  const [{token}, dispatch] = UseDataLayerValue();
    // console.log("token for datalayer",token);
  const [tracks,setTracks] = useState<any[]>([]);


  useEffect(() => {
    const handleAuth = async () => {
      if (!code) {
        redirectToAuthCodeFlow(clientId);
      } else {
        const token = await getAccessToken(clientId, code);
        dispatch({ type: "SET_ACCESS_TOKEN", token });
        const profile = await fetchProfile(token);
        dispatch({ type: "SET_USER", user: profile });
        // console.log("profile",profile);
        // const getDeviceId = await fetch("https://api.spotify.com/v1/me/player/devices", {
        //   method: "GET",
        //   headers: {
        //     Authorization: `Bearer ${token}`
        //   },
        //   });
        //   const data = await getDeviceId.json();
        //   const deviceId = data.devices[0].id;
        //   console.log("device id", deviceId);
        
      }
    };
    handleAuth();
  }, [clientId, code]);
  
  const fetchTracks = async (playlistId: string) => {
    const result = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=15`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!result.ok) {
      console.error("Failed to fetch tracks:", result.statusText);
      return;
    }
    const data = await result.json();
    console.log("this is the playlist id",playlistId);
    
    console.log("Tracks",data.items);
    
    setTracks(data.items);
    dispatch({ type: "SET_TRACKS", tracks: data.items });
  };

  const onSelectPlaylist = (playlistId: string) => {
    console.log(`Selected Playlist ID: ${playlistId}`);
    fetchTracks(playlistId);
    dispatch({ type: "SET_SELECTED_PLAYLIST_ID", selectedPlaylistId: playlistId });
  };
  // const onSelectTrack = (trackId: string) => {
  //   console.log(`Selected Track ID: ${trackId}`);
  //   dispatch({ type: "SET_PLAYING", playing: true });
  //   dispatch({ type: "SET_SELECTED_TRACK", selectedTrack: trackId }); // Dispatch the new action
  // };




  return (
    <div className="home">
    <div className="home-body">
      <Sidebar onSelectPlaylist={onSelectPlaylist} title={''} />
      <Body tracks={tracks}/>
      <Footer />
    </div>
    </div>
  );
};

export default Home;
