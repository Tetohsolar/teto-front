import { useContext } from 'react';
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { SidebarWrapperContext } from '../../../context/SidebarWrapperContext';
import '../../pages.scss';
import ClientForm from '../../../components/clientForm/ClientForm';

const EditClient = ({ childToParent }) => {

  const { sidebarWrapper } = useContext(SidebarWrapperContext);
  const pageTitle = "Atualização de Cliente";

  return (
    <div>
      <Navbar />
      <div className={sidebarWrapper ? "d-flex wrapper toggled" : "d-flex wrapper"}>
        <Sidebar activeButtonProfile="active" />
        <div id="page-content-wrapper" className="container-fluid bg-home py-4">
          <h5 className="pb-3">{pageTitle}</h5>
          <ClientForm listTitle="Atualizando" />
        </div>
      </div>
    </div>
  );
};

export default EditClient;
