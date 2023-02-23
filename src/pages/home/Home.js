import './home.scss';
import { useContext } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { SidebarWrapperContext } from '../../context/SidebarWrapperContext';


const Home = () => {
  const { sidebarWrapper } = useContext(SidebarWrapperContext);

  return (
    <div className="home">
      <Navbar />
      <div
        className={sidebarWrapper ? "d-flex wrapper toggled" : "d-flex wrapper"}
      >
        <Sidebar />
        <div id="page-content-wrapper" className="container-fluid bg-home py-4">
          Cards
        </div>
      </div>
    </div>
  );
};

export default Home;
