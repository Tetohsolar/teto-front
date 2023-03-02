import { useContext } from 'react';
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { SidebarWrapperContext } from '../../../context/SidebarWrapperContext';
import '../../pages.scss';
import ProjectsDataTable from '../../../components/projects-data-table/ProjectsDataTable';

const ProjectsList = () => {
  const { sidebarWrapper } = useContext(SidebarWrapperContext);
  const pageTitle= 'Projetos';
  return (
    <div>
      <Navbar />
      <div className={sidebarWrapper ? "d-flex wrapper toggled" : "d-flex wrapper"}>
        <Sidebar activeButtonProjects='active' />
        <div id="page-content-wrapper" className="container-fluid bg-home py-4">
          <h5 className='pb-3'>{pageTitle}</h5>
          <ProjectsDataTable listTitle="Lista de projetos" />
        </div>
      </div>
    </div>
  );
};

export default ProjectsList;
