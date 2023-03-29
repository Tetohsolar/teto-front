import './home.scss';
import { useContext } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { SidebarWrapperContext } from '../../context/SidebarWrapperContext';
import Widget from '../../components/Widgets';
import SixMonthLargeChart from '../../components/SixMonthLargeChart';
import SixMonthsBusinessDataTable from '../../components/SixMonthsBusinessDataTable';

const Home = () => {
  const { sidebarWrapper } = useContext(SidebarWrapperContext);

  return (
    <div className="home">
      <Navbar />
      <div
        className={sidebarWrapper ? "d-flex wrapper toggled" : "d-flex wrapper"}
      >
        <Sidebar activeButtonHome="active" />
        <div id="page-content-wrapper" className="container-fluid bg-home py-4">
          <h5 className="pb-3">Dashboard</h5>
          <div className="row">
            <div className="col-lg-4">
              <Widget
                type="current-month"
                cardContentHome="card-content-home"
              />
            </div>
            <div className="col-lg-4">
              <Widget type="earnings" cardContentHome="card-content-home" />
            </div>
            <div className="col-lg-4">
              <Widget
                type="open-business"
                cardContentHome="card-content-home"
              />
            </div>
          </div>
          <SixMonthLargeChart chartTitle="Últimos 6 meses"/>
          <SixMonthsBusinessDataTable listTitle="Mês atual" />
        </div>
      </div>
    </div>
  );
};

export default Home;
