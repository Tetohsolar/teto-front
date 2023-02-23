import './home.scss';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className={"d-flex wrapper"}>
        <Sidebar />
      </div>
    </div>
  );
};

export default Home;
