import { useContext } from 'react';
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { SidebarWrapperContext } from '../../../context/SidebarWrapperContext';
import '../../pages.scss';

import BusinessForm from '../../../components/business-form';

const EditBusiness = ({ childToParent }) => {

  const { sidebarWrapper } = useContext(SidebarWrapperContext);
  const pageTitle = "Novo Negocio";

  return (
    <div>
      <Navbar />
      <div className={sidebarWrapper ? "d-flex wrapper toggled" : "d-flex wrapper"}>
        <Sidebar activeButtonProfile="active" />
        <div id="page-content-wrapper" className="container-fluid bg-home py-4">
          <h5 className="pb-3">{pageTitle}</h5>
          <BusinessForm listTitle="Atualizando" />
        </div>
      </div>
    </div>
  );
};

export default EditBusiness;
