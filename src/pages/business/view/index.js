import './home.scss';
import { useContext } from 'react';
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { SidebarWrapperContext } from '../../../context/SidebarWrapperContext';
import Widget from '../../../components/Widgets';


const ViewBusiness = () => {
  const { sidebarWrapper } = useContext(SidebarWrapperContext);

  return (
    <div className="home">
      <Navbar />
      <div
        className={sidebarWrapper ? "d-flex wrapper toggled" : "d-flex wrapper"}
      >
        <Sidebar activeButtonHome="active" />
        <div id="page-content-wrapper" className="container-fluid bg-home py-4">
          <div class="p-3 mb-3 bg-white border rounded-3 container" >
          <h5 className="pb-3">Resumo</h5>
          <div className="row topResume">
            <div className="col-lg-4 card-mateus rounded-3">
              <h6 class="card-content-title mb-3 fw-semibold">Status </h6> 
              <br></br>
              <span className="badge rounded-pill text-bg-lightblue text-primary">{"Em Aberto"}</span>
            </div>
            <div className="col-lg-4 card-mateus rounded-3">
              <h6 class="card-content-title mb-3 fw-semibold"> Contato </h6>
              <br></br>
              <label> Mateus alves Vieira Neto </label>
            </div>
            <div className="col-lg-4 card-mateus rounded-3">
              <h6 class="card-content-title mb-3 fw-semibold">Dono do negócio </h6>
              <br></br>
             
             <label> Raiane Darla </label>
            </div>
            <div className="col-lg-4 card-mateus rounded-3">
              <h6 class="card-content-title mb-3 fw-semibold">Número da proposta </h6>
              <br></br> 
              <label> 20230393084</label>
              
            </div>
           
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBusiness;
