import { useContext } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { SidebarWrapperContext } from '../../context/SidebarWrapperContext';
import ProfileForm from '../../components/profileform/ProfileForm';
import '../pages.scss';
import './new.scss';

const New = () => {
  const { sidebarWrapper } = useContext(SidebarWrapperContext);
  const pageTitle = "Informações do usuário";
  return (
    <div>
      <Navbar />
      <div className={sidebarWrapper ? "d-flex wrapper toggled" : "d-flex wrapper"}>
        <Sidebar activeButtonProfile="active" />
        <div id="page-content-wrapper" className="container-fluid bg-home py-4">
          <h5 className="pb-3">{pageTitle}</h5>
          <ProfileForm listTitle="Editar perfil" />
        </div>
      </div>
    </div>
  );
};

export default New;
