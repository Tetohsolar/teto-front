import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react'


export default function MyModal(prop) {

  const { deleteUser } = useContext(AuthContext)

  async function handleDeleteUser(userId) {
    console.log(userId)
    deleteUser(userId)

  }

  return (

    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Exclusão de usuário</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>Deseja realmente excluir o usuário?</p>
          </div>
          <div className="modal-footer">

            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => handleDeleteUser(prop.userId)}>Sim</button>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Não</button>
          </div>
        </div>
      </div>
    </div>

  )
}
