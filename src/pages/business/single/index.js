import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import SingleBusinessBrief from "../../../components/SingleBusinessBrief";
import { SidebarWrapperContext } from "../../../context/SidebarWrapperContext";

export default function SingleBusiness() {
  const pageTitle = "Novo negócio";
  return (
    <div>
      <Navbar />
      <div
        className={SidebarWrapperContext ? "d-flex wrapper toggled" : "d-flex wrapper"}
      >
        <Sidebar activeButtonBusiness="active" />
        <div id="page-content-wrapper" className="container-fluid bg-home py-4">
          <h5 className="pb-3">{pageTitle}</h5>
          <SingleBusinessBrief listTitle="Resumo" />
        </div>
      </div>
    </div>
  );
}
