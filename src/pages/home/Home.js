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
        <Sidebar />
        <div id="page-content-wrapper" className="container-fluid bg-home py-4">
          <div className="row">
              <div className="col-lg-6">
                <Card cardContentHome='card-content-home' cardTitle ='Março' />
              </div>

              <div className="col-lg-6">
                <div className='row'>
                  <div className="col-sm-6">
                    <Card cardContentHome='card-content-home-sm' cardTitle ='Novos clientes' />
                  </div>
                  <div className="col-sm-6">
                    <Card cardContentHome='card-content-home-sm' cardTitle ='Novos projetos' />
                  </div>
                </div>

                <div className='row'>
                  <div className="col-sm-6">
                    <Card cardContentHome='card-content-home-sm' cardTitle ='Últimos 2 meses' />
                  </div>
                  <div className="col-sm-6">
                    <Card cardContentHome='card-content-home-sm' cardTitle ='Últimos 6 meses' />
                  </div>
                </div>
              </div>
          </div>
          <Card cardContentHome='card-content-home' cardTitle ='Clientes' />
        </div>
      </div>
    </div>
  );
};

export default Home;
