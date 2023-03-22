import { useContext } from 'react';
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { SidebarWrapperContext } from '../../../context/SidebarWrapperContext';
import '../../pages.scss';
import AfflitedDataTable from '../../../components/afflited-data-table/AfflitedDataTable';

const AfflitedList = () => {
  const { sidebarWrapper } = useContext(SidebarWrapperContext);
  const pageTitle = 'Afiliados';
  return (
    <div>
      <Navbar activeButtonCustomer />
      <div className={sidebarWrapper ? "d-flex wrapper toggled" : "d-flex wrapper"}>
        <Sidebar activeButtonAffliteds='active' />
        <div id="page-content-wrapper" className="container-fluid bg-home py-4">
          <h5 className='pb-3'>{pageTitle}</h5>
          <AfflitedDataTable listTitle="Dados dos Filiados" />
        </div>
      </div>
    </div>
  );
};

export default AfflitedList;
