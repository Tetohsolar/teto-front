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
              <label>Status </label>
              <br></br>
              <span className="badge rounded-pill text-bg-lightblue text-primary">{"Em Aberto"}</span>
            </div>
            <div className="col-lg-4 card-mateus rounded-3">
              <label>Status </label>
              <br></br>
              <span className="badge rounded-pill text-bg-lightblue text-primary">{"Em Aberto"}</span>
            </div>
            <div className="col-lg-4 card-mateus rounded-3">
              <label>Status </label>
              <br></br>
              <span className="badge rounded-pill text-bg-lightblue text-primary">{"Em Aberto"}</span>
            </div>
            <div className="col-lg-4 card-mateus rounded-3">
              <label>Status </label>
              <br></br>
              <span className="badge rounded-pill text-bg-lightblue text-primary">{"Em Aberto"}</span>
            </div>
           
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBusiness;
