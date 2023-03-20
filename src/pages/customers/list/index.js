import { useContext } from 'react';
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { SidebarWrapperContext } from '../../../context/SidebarWrapperContext';
import '../../pages.scss';
import CustomerDataTable from '../../../components/customer-data-table/CustomerDataTable';

const CustomerList = () => {
  const { sidebarWrapper } = useContext(SidebarWrapperContext);
  const pageTitle = 'Clientes';
  return (
    <div>
      <Navbar />
      <div className={sidebarWrapper ? "d-flex wrapper toggled" : "d-flex wrapper"}>
        <Sidebar activeButtonCustomers='active' />
        <div id="page-content-wrapper" className="container-fluid bg-home py-4">
          <h5 className='pb-3'>{pageTitle}</h5>
          <CustomerDataTable listTitle="Dados dos clientes" />
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
