import { useContext } from 'react';
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { SidebarWrapperContext } from '../../../context/SidebarWrapperContext';
import '../../pages.scss';
import SixMonthsCharts from '../../../components/SixMonthsCharts';
import BusinessDataTable from '../../../components/BusinessDataTable';
import StepByStep from '../../../components/StepByStep';



const BusinessMonthListopen = () => {
  const { sidebarWrapper } = useContext(SidebarWrapperContext);
  const pageTitle = "Negócios em aberto";
  return (
    <div>
      <Navbar />
      <div
        className={sidebarWrapper ? "d-flex wrapper toggled" : "d-flex wrapper"}
      >
        <Sidebar activeButtonBusiness="active" />
        <div id="page-content-wrapper" className="container-fluid bg-home py-4">
          <h5 className="pb-3">{pageTitle}</h5>
          <BusinessDataTable listTitle="Todos os negócios" filtro={true} typeReport={'mes'} situation="Aberta" />
        </div>
      </div>
    </div>
  );
};

export default  BusinessMonthListopen;
