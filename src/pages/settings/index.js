import { useContext } from 'react';
import Card from '../../components/card/Card'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { SidebarWrapperContext } from '../../context/SidebarWrapperContext';


const Settings = () => {
  const pageTitle = 'Configurações'
  const { sidebarWrapper } = useContext(SidebarWrapperContext);

  return (
    <div className="home">
      <Navbar />
      <div
        className={sidebarWrapper ? "d-flex wrapper toggled" : "d-flex wrapper"}>
        <Sidebar activeButtonSettings= 'active' />
        <div id= "page-content-wrapper" className= "container-fluid bg-home py-4">
          <h5 className= 'pb-3'>{pageTitle}</h5>
          <Card cardContentHome= 'card-content-home' cardTitle = 'Sed non ipsum felis' />
        </div>
      </div>
    </div>
  );
};

export default Settings;
