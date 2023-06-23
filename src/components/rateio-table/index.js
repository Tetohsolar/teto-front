import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsFillTrash3Fill } from 'react-icons/bs';
import MyModal from '../communs/ModalDelete';

const TabelaRateioBusiness = ({ dados, setIdSelected, handleEdit, handleAdd, handleAfterDel, calculaGeracaoTotal }) => {
    return (

        <div className="table-responsive">
            <table className="table caption-top table-sm">
                <thead>
                    <tr>
                        <th scope="col">SubGrupo</th>
                        <th scope="col">Grupo</th>
                        <th scope="col" className='tamanhoM'>Modalidade</th>
                        <th scope="col" className='alinhaCenter' >Consumo</th>
                        <th scope="col" className='alinhaCenter'>Dem. FP.</th>
                        <th scope="col" className='alinhaCenter'>Ener. F. P. </th>
                        <th scope="col" className='alinhaCenter'>Dem. P</th>
                        <th scope="col" className='alinhaCenter'>Eng. P</th>
                        <th scope="col" className='alinhaCenter'>G.Sugerida</th>
                        <th scope="col" className='alinhaCenter'>C.I.P</th>
                        <th scope="col"></th>
                    </tr>
                </thead>

                <tbody>
                    {dados.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>
                                    <select  className="form-select" id="inputGrupo" value={item.subgroup} onChange={(e) => { handleEdit(item.id, 'subgroup', e.target.value) }} >
                                        <option value="B1">B1</option>
                                        <option value="B2">B2</option>
                                        <option value="B3">B3</option>
                                        <option value="A3">A3</option>
                                        <option value="A4">A4</option>
                                        
                                    </select>
                                </td>
                                <td>
                                    <select disabled className="form-select tamanhoTabela" id="inputGrupo" value={item.group} onChange={(e) => { handleEdit(item.id, 'group', e.target.value) }} >
                                        <option value="A">A </option>
                                        <option value="B">B </option>
                                    </select>
                                </td>
                                <td>
                                    <select className='form-select custom-select tamanhoModalidadenovo' value={item.modality} onChange={e => { handleEdit(item.id, 'modality', e.target.value); }}>
                                        <option value="Convencional">Convencional</option>
                                        <option value="HA">Horos. Azul</option>
                                        <option value="HV">Horos. Verde</option>
                                        <option value="Rural">Rural</option>
                                        <option value="Outros">Outros</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="text" className='form-control tamanhoTabela alinhaDireita '
                                        value={item.avgconsumption}
                                        onChange={e => handleEdit(item.id, 'avgconsumption', e.target.value)}
                                        onBlur={() => {
                                            calculaGeracaoTotal()
                                        }}

                                    />
                                </td>
                                <td>

                                    <input
                                        type="number" className='form-control tamanhoTabela alinhaDireita '
                                        value={item.demandaFP}
                                        onChange={e => handleEdit(item.id, 'demandaFP', e.target.value)}
                                        onBlur={() => {
                                            calculaGeracaoTotal()
                                        }}

                                    />

                                </td>
                                <td className='alinhaDireita'>
                                    <input
                                        type="text" pattern="[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?" className='form-control tamanhoTabela alinhaDireita '
                                        value={item.energiaFP}
                                        onChange={e => handleEdit(item.id, 'energiaFP', e.target.value)}
                                        onBlur={() => {
                                            calculaGeracaoTotal()
                                        }}

                                    />
                                </td>
                                <td className='alinhaDireita'>
                                    <input
                                        type="text" className='form-control tamanhoTabela alinhaDireita '
                                        value={item.demandaP}
                                        onChange={e => handleEdit(item.id, 'demandaP', e.target.value)}
                                        onBlur={() => {
                                            calculaGeracaoTotal()
                                        }}

                                    />
                                </td>
                                <td className='alinhaDireita'>

                                    <input
                                        type="text" className='form-control tamanhoTabela alinhaDireita '
                                        value={item.energiaP}
                                        onChange={e => handleEdit(item.id, 'energiaP', e.target.value)}
                                        onBlur={() => {
                                            calculaGeracaoTotal()
                                        }}

                                    />
                                </td>
                                <td className='alinhaDireita'>
                                    <input
                                        type="text" className='form-control tamanhoTabela alinhaDireita ' readOnly
                                        value={item.suggestedGeneration}
                                        onChange={e => handleEdit(item.id, 'suggestedGeneration', e.target.value)}

                                    />
                                </td>
                                <td className='alinhaDireita'>
                                    <input
                                        type="text" className='form-control tamanhoTabela alinhaDireita '
                                        value={item.CIP}
                                        onChange={e => handleEdit(item.id, 'CIP', e.target.value)}
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
                                            <MyModal userId={item.id} uc=" o rateio" onClick={handleAfterDel} />
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

export default TabelaRateioBusiness;
