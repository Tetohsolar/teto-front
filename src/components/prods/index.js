import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsFillTrash3Fill } from 'react-icons/bs';
import MyModal from '../communs/ModalDelete';
import '../prods/products-table.scss';


const TabelaProdutoEditavel = ({ dados, setIdSelected, handleEdit, handleAdd, handleAfterDel, marcas, produtos, onBlurType, onBlurBrand, carregaPotencia }) => {
    return (

        <table className="table caption-top table-sm table-products">
            <thead>
                <tr>
                    <th scope="col" className='column_tipo'>Tipo</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Modelo</th>
                    <th scope="col">Potência</th>
                    <th scope="col">Qtde</th>
                    <th scope="col"></th>
                </tr>
            </thead>

            <tbody>
                {dados.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td>
                                <select className='form-select custom-select tamanhoModalidadenovo' onBlur={(event) => { onBlurType(item) }} onKeyUp={(e) => {
                                    onBlurType(item)
                                }} value={item.type} onChange={e => { handleEdit(item.id, 'type', e.target.value); }}>
                                    <option value="">Selecione</option>
                                    <option value="P">Painéis</option>
                                    <option value="I">Inversor</option>
                                    <option value="M">MicroInversor</option>
                                </select>
                            </td>
                            <td>
                                <select className="form-select custom-select tamanhoModalidadenovo" id="inputGrupo" onBlur={() => { onBlurBrand(item) }} value={item.brand}
                                    onChange={(e) => { handleEdit(item.id, 'brand', e.target.value) }} >
                                    <option value="">Selecione</option>
                                    {item.brands ? item.brands.map((opcao, indice) => (
                                        <option key={indice} value={opcao.name}>
                                            {opcao.name}
                                        </option>
                                    )) : ""}
                                </select>
                            </td>
                            <td>
                                <select className="form-select custom-select tamanhoModel" id="inputGrupo" value={item.model} onChange={(e) => { handleEdit(item.id, 'model', e.target.value) }} onBlur={
                                    () => {
                                        carregaPotencia(item)
                                    }
                                }  onKeyUp={()=>{
                                    carregaPotencia(item)

                                }} >
                                    <option value="">Selecione</option>
                                    {item.products ? item.products.map((opcao, indice) => (
                                        <option key={indice} value={opcao.description}>
                                            {opcao.description}
                                        </option>
                                    )) : ""}

                                </select>
                            </td>
                            <td>
                                <input
                                    type="text" className='form-control tamanhoTabela alinhaDireita '
                                    value={item.power} readOnly
                                    onChange={e => handleEdit(item.id, 'power', e.target.value)}
                                />
                            </td>
                            <td>

                                <input
                                    type="number" className='form-control tamanhoTabela alinhaDireita '
                                    value={item.qtd}
                                    onChange={e => handleEdit(item.id, 'qtd', e.target.value)}

                                />

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
                                            setIdSelected(item.id)
                                        }}
                                    >
                                        <BsFillTrash3Fill />
                                        <MyModal userId={item.id} uc=" o produto" onClick={handleAfterDel} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default TabelaProdutoEditavel;
