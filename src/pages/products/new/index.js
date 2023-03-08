import { useContext } from 'react';
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { SidebarWrapperContext } from '../../../context/SidebarWrapperContext';

import ProductForm from '../../../components/productForm/productForm';
import './index.scss';

const NewProduct = () => {
  const { sidebarWrapper } = useContext(SidebarWrapperContext);
  const pageTitle = "Informações do produto";
  return (
    <div>
      <Navbar />
      <div className={sidebarWrapper ? "d-flex wrapper toggled" : "d-flex wrapper"}>
        <Sidebar activeButtonProfile="active" />
        <div id="page-content-wrapper" className="container-fluid bg-home py-4">
          <h5 className="pb-3">{pageTitle}</h5>
          <ProductForm listTitle="Editar produto" />
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
