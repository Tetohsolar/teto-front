import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react'


export default function MyModal(prop) {

  const { deleteUser } = useContext(AuthContext)

  async function handleDeleteUser(userId) {
    console.log(userId)
    deleteUser(userId)

  }

  return (

    <div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Exclusão de Usuário</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Deseja Realmente Excluir o Usuário?</p>
          </div>
          <div class="modal-footer">

            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => handleDeleteUser(prop.userId)}>Sim</button>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Não</button>
          </div>
        </div>
      </div>
    </div>

  )
}
