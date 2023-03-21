import './home.scss';
import { useContext } from 'react';
import Card from '../../components/card/Card'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { SidebarWrapperContext } from '../../context/SidebarWrapperContext';

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
              <Card
                cardContentHome="card-content-home"
                cardTitle="Negócios deste mês"
              />
            </div>
            <div className="col-lg-4">
              <Card
                cardContentHome="card-content-home"
                cardTitle="Negócios fechados neste mês"
              />
            </div>
            <div className="col-lg-4">
              <Card
                cardContentHome="card-content-home"
                cardTitle="Negócios em aberto"
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
