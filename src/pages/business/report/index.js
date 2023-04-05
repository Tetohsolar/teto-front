import { useContext } from "react";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { SidebarWrapperContext } from "../../../context/SidebarWrapperContext";
import SingleBusinessReport from "../../../components/SingleBusinessReport";

export default function BusinessReport() {
  const { sidebarWrapper } = useContext(SidebarWrapperContext);
  const pageTitle = "Relatório";
  return (
    <div>
      <Navbar />
      <div
        className={sidebarWrapper ? "d-flex wrapper toggled" : "d-flex wrapper"}
      >
        <Sidebar activeButtonBusiness="active" />
        <div id="page-content-wrapper" className="container-fluid bg-home py-4">
          <h5 className="pb-3">{pageTitle}</h5>
          <SingleBusinessReport />
        </div>
      </div>
    </div>
  );
}
