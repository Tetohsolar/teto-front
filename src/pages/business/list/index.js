import { useContext } from 'react';
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { SidebarWrapperContext } from '../../../context/SidebarWrapperContext';
import '../../pages.scss';
import SixMonthsCharts from '../../../components/SixMonthsCharts';
import BusinessDataTable from '../../../components/BusinessDataTable';
import StepByStep from '../../../components/StepByStep';

const data = [
  {
    name: "04/2022",
    amt: 80,
  },
  {
    name: "05/2022",
    amt: 36,
  },
  {
    name: "06/2022",
    amt: 72,
  },
  {
    name: "07/2022",
    amt: 44,
  },
  {
    name: "08/2022",
    amt: 80,
  },
  {
    name: "09/2022",
    amt: 96,
  },
  {
    name: "10/2022",
    amt: 12,
  },
  {
    name: "11/2022",
    amt: 36,
  },
  {
    name: "12/2022",
    amt: 72,
  },
  {
    name: "01/2023",
    amt: 44,
  },
  {
    name: "02/2023",
    amt: 80,
  },
  {
    name: "03/2023",
    amt: 96,
  },
];

const BusinessList = () => {
  const { sidebarWrapper } = useContext(SidebarWrapperContext);
  const pageTitle = "Negócios";
  return (
    <div>
      <Navbar />
      <div
        className={sidebarWrapper ? "d-flex wrapper toggled" : "d-flex wrapper"}
      >
        <Sidebar activeButtonBusiness="active" />
        <div id="page-content-wrapper" className="container-fluid bg-home py-4">
          <h5 className="pb-3">{pageTitle}</h5>
          <SixMonthsCharts listTitle="Últimos 12 meses" dados={data} />
          <BusinessDataTable listTitle="Todos os negócios" filtro={false} typeReport={'normal'} />
          {/* <StepByStep /> */}
        </div>
      </div>
    </div>
  );
};

export default BusinessList;
