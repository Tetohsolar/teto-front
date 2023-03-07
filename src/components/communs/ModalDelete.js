import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react'


export default function MyModal(prop) {


  return (

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Exclusão de {prop.uc}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Deseja Realmente Excluir {prop.uc}?</p>
          </div>
          <div class="modal-footer">

            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={prop.onClick}>Sim</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Não</button>
          </div>
        </div>
      </div>
    </div>

  )
}
