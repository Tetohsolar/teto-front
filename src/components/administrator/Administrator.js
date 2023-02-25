import './administrator.scss'
import { Link } from 'react-router-dom';

const administrator = [
  {
    id: 1,
    img: "https://api.dicebear.com/5.x/thumbs/svg?seed=Lucy",
    firstName: "Ana Silva",
    email: "anna@domain.com",
    userType: "Admin",
  },
];

const DataTable = (props) => {
  return (
    <div className="p-3 mb-3 bg-white border rounded-3">
      <h5 className="card-content-title fw-semibold">{props.listTitle}</h5>
      <div className="admin-table-w">
        <div className="table-responsive">
          <table className="table table-borderless">
            <tbody>
              {administrator.map((row) => {
                return (
                  <tr key={row.id}>
                    <td className="td-img">
                      <img className="admin-avatar" src={row.img} alt="Avatar"
                      />
                    </td>
                    <td>{row.firstName}</td>
                    <td>{row.email}</td>
                    <td>
                      <span className="badge bg-light text-success">
                        {row.userType}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Link to={"/users/new"} className="btn btn-primary text-light">
        Editar perfil
      </Link>
    </div>
  );
};

export default DataTable;


