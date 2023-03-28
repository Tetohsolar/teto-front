import { useContext } from "react";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import SixMonthsCharts from "../../../components/SixMonthsCharts";
import { SidebarWrapperContext } from "../../../context/SidebarWrapperContext";

export default function SingleBusiness() {
  const { sidebarWrapper } = useContext(SidebarWrapperContext);
  const pageTitle = "Resumo";
  return (
    <div>
      <Navbar />
      <div
        className={sidebarWrapper ? "d-flex wrapper toggled" : "d-flex wrapper"}
      >
        <Sidebar activeButtonSingleBusiness="active" />
        <div id="page-content-wrapper" className="container-fluid bg-home py-4">
          <h5 className="pb-3">{pageTitle}</h5>
          <SixMonthsCharts listTitle="Resumo" />
        </div>
      </div>
    </div>
  );
}
