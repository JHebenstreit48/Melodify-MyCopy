import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Player from '../components/Player';
import '../CSS/Playlist.css';
const playlist = () => {
  return (
    <div className="playlist">
      <div className="playlist-body">
        <Sidebar title={''} />
        <Player />
        <Footer/>
      </div>
    </div>
  );
};
export default playlist;
