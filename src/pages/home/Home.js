import './home.scss';
import { useContext } from 'react';
import Card from '../../components/Card'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { SidebarWrapperContext } from '../../context/SidebarWrapperContext';
import Widget from '../../components/Widgets';

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
          <h5 className="pb-3">
            Dashboard
          </h5>
          <div className="row">
            <div className="col-lg-4">
              <Widget type="current-month"
                cardContentHome="card-content-home"
              />
            </div>
            <div className="col-lg-4">
              <Widget type="earnings"
                cardContentHome="card-content-home"
              />
            </div>
            <div className="col-lg-4">
              <Widget type="open-business"
                cardContentHome="card-content-home"
              />
            </div>
          </div>
          <Card
            cardContentHome="card-content-home"
            cardTitle="Últimos 6 meses"
          />
          <Card
            cardContentHome="card-content-home"
            cardTitle="Lista de negócios deste mês"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
