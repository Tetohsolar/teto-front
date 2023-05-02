import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsFillTrash3Fill } from 'react-icons/bs';
import MyModal from '../communs/ModalDelete';
import { NumericFormat } from 'react-number-format';

const TabelaComposePrice = ({ dados, setIdSelected, handleEdit, handleAdd, handleAfterDel }) => {
    return (

        <div className="table-responsive">
            <table className="table caption-top table-sm">
                <thead>
                    <tr>
                        <th scope="col" className='tamanhoM'>Descrição</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Tipo</th>
                        <th scope="col"></th>
                    </tr>
                </thead>

                <tbody>
                    {dados.map((item) => {
                        return (
                            <tr key={item.idInt}>
                                <td>
                                <input
                                        type="text" className='form-control tabela_coluna_precos '
                                        value={item.name}
                                        onChange={e => handleEdit(item.idInt, 'name', e.target.value)}
                                    />
                                </td>
                                <td>

                                <NumericFormat decimalScale={6} placeholder="" decimalSeparator="," 
                                className="form-control number" value={item.value} onChange={(e) => handleEdit(item.idInt, 'value', e.target.value)} />
                                </td>

                                <td>
                                    <select className="form-select" id="inputGrupo" value={item.type} onChange={(e) => { handleEdit(item.idInt, 'type', e.target.value) }} >
                                        <option value="P">%</option>
                                        <option value="F">R$</option>
                                        <option value="M">* N° de Placas</option>
                                    </select>
                                </td>
                               
                                <td>

                                    <div className="d-flex gap-2 justify-content-end">
                                        <button
                                            type="button"
                                            className="btn btn-light btn-sm text-primary d-flex align-items-center" onClick={handleAdd}
                                        >
                                            <AiOutlinePlus />
                                        </button>


                                        <button
                                            type="button"
                                            className="btn btn-light btn-sm text-danger d-flex align-items-center"
                                            data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {
                                                setIdSelected(item.idInt)
                                            }}
                                        >
                                            <BsFillTrash3Fill />
                                            <MyModal userId={item.idInt} uc=" Composição de Preço" onClick={handleAfterDel} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default TabelaComposePrice;
