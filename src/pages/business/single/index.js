import { useContext } from "react";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import SingleBusinessBrief from "../../../components/SingleBusinessBrief";
import SingleBusinessDataTable from "../../../components/SingleBusinessDataTable";
import SingleBusinessDetails from "../../../components/SingleBusinessDetails";
import SingleBusinessSizing from "../../../components/SingleBusinessSizing";
import { SidebarWrapperContext } from "../../../context/SidebarWrapperContext";

export default function SingleBusiness() {
  const { sidebarWrapper } = useContext(SidebarWrapperContext);
  const pageTitle = "Novo negócio";
  return (
    <div>
      <Navbar />
      <div
        className={sidebarWrapper ? "d-flex wrapper toggled" : "d-flex wrapper"}
      >
        <Sidebar activeButtonSingleBusiness="active" />
        <div id="page-content-wrapper" className="container-fluid bg-home py-4">
          <h5 className="pb-3">{pageTitle}</h5>
          <SingleBusinessBrief listTitle="Resumo" />
          <SingleBusinessDetails title="Detalhes do negócio" />
          <SingleBusinessSizing title="Dimensionamento" />
          <SingleBusinessDataTable title="Propostas deste negócio" />
        </div>
      </div>
    </div>
  );
}
