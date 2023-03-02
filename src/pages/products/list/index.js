import { useContext } from 'react';
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { SidebarWrapperContext } from '../../../context/SidebarWrapperContext';
import '../../pages.scss';
import ProductsDataTable from '../../../components/products-data-table/ProductsDataTable';

const ProductList = () => {
  const { sidebarWrapper } = useContext(SidebarWrapperContext);
  const pageTitle= 'Produtos';
  return (
    <div>
      <Navbar />
      <div className={sidebarWrapper ? "d-flex wrapper toggled" : "d-flex wrapper"}>
        <Sidebar activeButtonProducts='active' />
        <div id="page-content-wrapper" className="container-fluid bg-home py-4">
          <h5 className='pb-3'>{pageTitle}</h5>
          <ProductsDataTable listTitle="Lista de produtos" />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
