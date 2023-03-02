import { useContext } from 'react';
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { SidebarWrapperContext } from '../../../context/SidebarWrapperContext';
import '../../pages.scss';
import SizingDataTable from '../../../components/sizing-data-table/SizingDataTable';

const SizingList = () => {
  const { sidebarWrapper } = useContext(SidebarWrapperContext);
  const pageTitle= 'Dimensionamentos';
  return (
    <div>
      <Navbar />
      <div className={sidebarWrapper ? "d-flex wrapper toggled" : "d-flex wrapper"}>
        <Sidebar activeButtonSizings='active' />
        <div id="page-content-wrapper" className="container-fluid bg-home py-4">
          <h5 className='pb-3'>{pageTitle}</h5>
          <SizingDataTable listTitle="Lista de dimensionamentos" />
        </div>
      </div>
    </div>
  );
};

export default SizingList;
