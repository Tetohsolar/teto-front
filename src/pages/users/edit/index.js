import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { SidebarWrapperContext } from '../../../context/SidebarWrapperContext';
import EditProFileForm from '../../../components/editProfileForm'
import '../../pages.scss';
import './new.scss';

const EditUser = (props) => {
  const { sidebarWrapper } = useContext(SidebarWrapperContext);
  const pageTitle = "Informações do usuário";
  const { userId } = useParams();

  return (
    <div>
      <Navbar />
      <div className={sidebarWrapper ? "d-flex wrapper toggled" : "d-flex wrapper"}>
        <Sidebar activeButtonProfile="active" />
        <div id="page-content-wrapper" className="container-fluid bg-home py-4">
          <h5 className="pb-3">{pageTitle}</h5>
          <EditProFileForm listTitle="Editar perfil do usuário" userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default EditUser;
