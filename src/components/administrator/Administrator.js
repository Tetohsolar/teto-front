import './administrator.scss'
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import api from '../../api';
import { AuthContext } from '../../context/AuthContext';

const DataTable = (props) => {
  const [administrator, setAdministrator] = useState([])
  const [idSelected, setIdSelected] = useState([])
  const { token, idLogged } = useContext(AuthContext)

  useEffect(() => {

    //const id = localStorage.getItem('userlog');

    api.get('/user/get/' + idLogged, {
      headers: {
        'Authorization': `Basic ${token}`
      }

    }).then((response) => {
      const administrator = [
        {
          id: response.data.id,
          img: "https://api.dicebear.com/5.x/thumbs/svg?seed=Lucy",
          firstName: response.data.name,
          email: response.data.email,
          userType: response.data.tipo,
        },
      ];
      setIdSelected(response.data.id);

      setAdministrator(administrator)

    }, [])

    return () => { }

  }, [])

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
      <Link to={"/users/edit/" + idSelected} className="btn btn-primary text-light">
        Editar perfil
      </Link>
    </div>
  );
};

export default DataTable;


