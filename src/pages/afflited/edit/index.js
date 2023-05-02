import { useContext, useState } from 'react';
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { SidebarWrapperContext } from '../../../context/SidebarWrapperContext';
import '../../pages.scss';

import AfflitedForm from '../../../components/affitedForm/AfflitedForm';
import { AuthContext } from '../../../context/AuthContext';

const EditAfflited = ({ childToParent }) => {

  const { sidebarWrapper } = useContext(SidebarWrapperContext);
  const pageTitle = "Atualização de Filiado";
  const {   profilelogged} = useContext(AuthContext)
  const [active] = useState( profilelogged==="Root"?'false':"active")
  const [activeFiliado] = useState( profilelogged==="Root"?'active':"false")

  return (
    <div>
      <Navbar />
      <div className={sidebarWrapper ? "d-flex wrapper toggled" : "d-flex wrapper"}>
        <Sidebar   activeButtonSettings={active}  activeButtonAffliteds={activeFiliado}/>
        <div id="page-content-wrapper" className="container-fluid bg-home py-4">
          <h5 className="pb-3">{pageTitle}</h5>
          <AfflitedForm listTitle="Atualizando" />
        </div>
      </div>
    </div>
  );
};

export default EditAfflited;
