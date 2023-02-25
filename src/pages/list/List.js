import { useContext } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { SidebarWrapperContext } from '../../context/SidebarWrapperContext';
import DataTable from '../../components/datatable/DataTable';
import Administrator from '../../components/administrator/Administrator';
import '../pages.scss';
import './list.scss';

const List = () => {
  const { sidebarWrapper } = useContext(SidebarWrapperContext);
  const pageTitle= 'Perfil';
  return (
    <div>
      <Navbar />
      <div className={sidebarWrapper ? "d-flex wrapper toggled" : "d-flex wrapper"}>
        <Sidebar activeButtonProfile='active' />
        <div id="page-content-wrapper" className="container-fluid bg-home py-4">
          <h5 className='pb-3'>{pageTitle}</h5>
          <Administrator listTitle="Minha conta" />
          <DataTable listTitle="Outros usuários" />
        </div>
      </div>
    </div>
  );
};

export default List;
