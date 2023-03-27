import React, { useState } from 'react'







export default function NewBusiness(prop) {





  const [tipoPessoa, setTipoPessoa] = useState('null')
  const [nome, setNome] = useState('null')
  const [cpf, setCpf] = useState('null')
  const [email, setEmail] = useState('null')
  const [cnpj, setCnpj] = useState('null')
  const [fone, setFone] = useState('null')
  const [whatsapp, setWhatsapp] = useState('null')
  const [cep, setCep] = useState('null')
  const [numero, setNumero] = useState('null')
  const [estado, setEstado] = useState('null')
  const [cidade, setCidade] = useState('null')
  const [bairro, setBairro] = useState('null')

  const [modalone, setModalOne] = useState(true)
  const [modaltwo, setModalTwo] = useState('')





  return (

    <>
      {/* Dados do */}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="staticBackdropLabel"
        data-bs-keyboard="false" aria-hidden="true" >
        <div className="modal-dialog modal-lg" >
          <div className="modal-content">
            <div className="modal-header">
              <div className="d-flex flex-column">
                <h1 className="modal-title fs-3" id="exampleModalLabel">Proposta de Negócio </h1>
                <h5 className='fs-5'>Dados do Cliente</h5>
              </div>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-3">
                    <label htmlFor="inputCodigo" className="form-label">
                      Tipo de Cliente:
                    </label>
                    <select name="pets" id="input-user-type" className="form-select" value={tipoPessoa} onChange={(e) => setTipoPessoa(e.target.value)}>
                      <option value="" defaultChecked>Selecionar</option>
                      <option value="PF">Pessoa Física</option>
                      <option value="PJ">Pessoa Jurídica</option>

                    </select>

                  </div>
                </div>
                <hr />
                {tipoPessoa === 'PF' ? <>

                  <div className="row">

                    <div className="col-sm-3">

                      <label htmlFor="inputCodigo" className="form-label">
                        CPF:
                      </label>
                      <input type="text" className="form-control" id="inputCodigo" />
                    </div>

                    <div div className="col-sm-5">
                      <label htmlFor="inputCodigo" className="form-label">
                        Nome:
                      </label>
                      <input type="text" className="form-control" id="inputCodigo" />
                    </div>
                    <div className="col-sm-2">
                      <label htmlFor="inputCodigo" className="form-label">
                        Fone:
                      </label>
                      <input type="text" className="form-control" id="inputCodigo" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4">
                      <label htmlFor="inputCodigo" className="form-label">
                        E-mail:
                      </label>
                      <input type="text" className="form-control" id="inputCodigo" />
                    </div>

                    <div className="col-sm-3">
                      <label htmlFor="inputCodigo" className="form-label">
                        Whatsapp:
                      </label>
                      <input type="text" className="form-control" id="inputCodigo" />
                    </div>
                  </div>
                </> :
                  <>
                    <div className="row">

                      <div className="col-sm-3">

                        <label htmlFor="inputCodigo" className="form-label">
                          CNPJ:
                        </label>
                        <input type="text" className="form-control" id="inputCodigo" />
                      </div>

                      <div div className="col-sm-5">
                        <label htmlFor="inputCodigo" className="form-label">
                          Nome Fantasia:
                        </label>
                        <input type="text" className="form-control" id="inputCodigo" />
                      </div>
                      <div className="col-sm-2">
                        <label htmlFor="inputCodigo" className="form-label">
                          Fone:
                        </label>
                        <input type="text" className="form-control" id="inputCodigo" />
                      </div>



                    </div>

                    <div className="row">
                      <div className="col-sm-4">
                        <label htmlFor="inputCodigo" className="form-label">
                          E-mail:
                        </label>
                        <input type="text" className="form-control" id="inputCodigo" />
                      </div>
                      <div className="col-sm-3">
                        <label htmlFor="inputCodigo" className="form-label">
                          Whatsapp:
                        </label>
                        <input type="text" className="form-control" id="inputCodigo" />
                      </div>
                    </div>
                  </>


                }
                <div className="row">
                  <div className="col-sm">
                    <label htmlFor="inputCodigo" className="form-label">
                      Informações Adicionais:
                    </label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>

                  </div>

                </div>
              </div>

            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary text-light d-flex align-items-center gap-2" data-bs-target="#staticBackdrop2" data-bs-toggle="modal"
                data-bs-dismiss="modal">

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                </svg>
                Novo negócio
              </button>
            </div>

          </div>

        </div>

      </div>


      <div className="modal  fade modal-lg" id="staticBackdrop2" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="staticBackdropLabel"
        data-bs-keyboard="false" aria-hidden="true" >
        <div className="modal-dialog" >
          <div className="modal-content">
            <div className="modal-header">
              <div className="d-flex flex-column">
                <h1 className="modal-title fs-3" id="exampleModalLabel">Proposta de Negócio </h1>
                <h5 className='fs-5'>Endereço do Cliente</h5>
              </div>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <div className="container-fluid">
                <div className="row d-flex">
                  <div className="col-md-2">

                    <label htmlFor="inputCodigo" className="form-label">
                      CEP:
                    </label>
                    <input type="text" className="form-control" id="inputCodigo" />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="inputCodigo" className="form-label">
                      Estado:
                    </label>
                    <input type="text" className="form-control" id="inputCodigo" />
                  </div>
                  <div className="col-md-5">
                    <label htmlFor="inputCodigo" className="form-label">
                      Cidade:
                    </label>
                    <input type="text" className="form-control" id="inputCodigo" />
                  </div>

                  <div className="row justify-content-center">
                    <div className="col-md-4">
                      <label htmlFor="inputCodigo" className="form-label">
                        Bairro:
                      </label>
                      <input type="text" className="form-control" id="inputCodigo" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="inputCodigo" className="form-label">
                        Rua:
                      </label>
                      <input type="text" className="form-control" id="inputCodigo" />
                    </div>
                    <div className="col-md-2">
                      <label htmlFor="inputCodigo" className="form-label">
                        Número:
                      </label>
                      <input type="text" className="form-control" id="inputCodigo" />
                    </div>


                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>


    <>
      {/* Dados do */}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="staticBackdropLabel"
        data-bs-keyboard="false" aria-hidden="true" >
        <div className="modal-dialog modal-lg" >
          <div className="modal-content">
            <div className="modal-header">
              <div className="d-flex flex-column">
                <h1 className="modal-title fs-3" id="exampleModalLabel">Proposta de Negócio </h1>
                <h5 className='fs-5'>Dados do Cliente</h5>
              </div>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-3">
                    <label htmlFor="inputCodigo" className="form-label">
                      Tipo de Cliente:
                    </label>
                    <select name="pets" id="input-user-type" className="form-select" value={tipoPessoa} onChange={(e) => setTipoPessoa(e.target.value)}>
                      <option value="" defaultChecked>Selecionar</option>
                      <option value="PF">Pessoa Física</option>
                      <option value="PJ">Pessoa Jurídica</option>

                    </select>

                  </div>
                </div>
                <hr />
                {tipoPessoa === 'PF' ? <>

                  <div className="row">

                    <div className="col-sm-3">

                      <label htmlFor="inputCodigo" className="form-label">
                        CPF:
                      </label>
                      <input type="text" className="form-control" id="inputCodigo" />
                    </div>

                    <div div className="col-sm-5">
                      <label htmlFor="inputCodigo" className="form-label">
                        Nome:
                      </label>
                      <input type="text" className="form-control" id="inputCodigo" />
                    </div>
                    <div className="col-sm-2">
                      <label htmlFor="inputCodigo" className="form-label">
                        Fone:
                      </label>
                      <input type="text" className="form-control" id="inputCodigo" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4">
                      <label htmlFor="inputCodigo" className="form-label">
                        E-mail:
                      </label>
                      <input type="text" className="form-control" id="inputCodigo" />
                    </div>

                    <div className="col-sm-3">
                      <label htmlFor="inputCodigo" className="form-label">
                        Whatsapp:
                      </label>
                      <input type="text" className="form-control" id="inputCodigo" />
                    </div>
                  </div>
                </> :
                  <>
                    <div className="row">

                      <div className="col-sm-3">

                        <label htmlFor="inputCodigo" className="form-label">
                          CNPJ:
                        </label>
                        <input type="text" className="form-control" id="inputCodigo" />
                      </div>

                      <div div className="col-sm-5">
                        <label htmlFor="inputCodigo" className="form-label">
                          Nome Fantasia:
                        </label>
                        <input type="text" className="form-control" id="inputCodigo" />
                      </div>
                      <div className="col-sm-2">
                        <label htmlFor="inputCodigo" className="form-label">
                          Fone:
                        </label>
                        <input type="text" className="form-control" id="inputCodigo" />
                      </div>



                    </div>

                    <div className="row">
                      <div className="col-sm-4">
                        <label htmlFor="inputCodigo" className="form-label">
                          E-mail:
                        </label>
                        <input type="text" className="form-control" id="inputCodigo" />
                      </div>
                      <div className="col-sm-3">
                        <label htmlFor="inputCodigo" className="form-label">
                          Whatsapp:
                        </label>
                        <input type="text" className="form-control" id="inputCodigo" />
                      </div>
                    </div>
                  </>


                }
                <div className="row">
                  <div className="col-sm">
                    <label htmlFor="inputCodigo" className="form-label">
                      Informações Adicionais:
                    </label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>

                  </div>

                </div>
              </div>

            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary text-light d-flex align-items-center gap-2" data-bs-target="#staticBackdrop2" data-bs-toggle="modal"
                data-bs-dismiss="modal">

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                </svg>
                Novo negócio
              </button>
            </div>

          </div>

        </div>

      </div>


      <div className="modal  fade modal-lg" id="staticBackdrop2" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="staticBackdropLabel"
        data-bs-keyboard="false" aria-hidden="true" >
        <div className="modal-dialog" >
          <div className="modal-content">
            <div className="modal-header">
              <div className="d-flex flex-column">
                <h1 className="modal-title fs-3" id="exampleModalLabel">Proposta de Negócio </h1>
                <h5 className='fs-5'>Endereço do Cliente</h5>
              </div>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <div className="container-fluid">
                <div className="row d-flex">
                  <div className="col-md-2">

                    <label htmlFor="inputCodigo" className="form-label">
                      CEP:
                    </label>
                    <input type="text" className="form-control" id="inputCodigo" />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="inputCodigo" className="form-label">
                      Estado:
                    </label>
                    <input type="text" className="form-control" id="inputCodigo" />
                  </div>
                  <div className="col-md-5">
                    <label htmlFor="inputCodigo" className="form-label">
                      Cidade:
                    </label>
                    <input type="text" className="form-control" id="inputCodigo" />
                  </div>

                  <div className="row justify-content-center">
                    <div className="col-md-4">
                      <label htmlFor="inputCodigo" className="form-label">
                        Bairro:
                      </label>
                      <input type="text" className="form-control" id="inputCodigo" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="inputCodigo" className="form-label">
                        Rua:
                      </label>
                      <input type="text" className="form-control" id="inputCodigo" />
                    </div>
                    <div className="col-md-2">
                      <label htmlFor="inputCodigo" className="form-label">
                        Número:
                      </label>
                      <input type="text" className="form-control" id="inputCodigo" />
                    </div>


                  </div>


                </div>


                <div className="row">
                  <div className="col-lg-12">
                    <label htmlFor="inputCodigo" className="form-label">
                      Informações Adicionais:
                    </label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>

                  </div>

                </div>
              </div>

            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary text-light d-flex align-items-center gap-2" data-bs-target="#staticBackdrop" data-bs-toggle="modal"
                data-bs-dismiss="modal">Voltar</button>
              <button
                className="btn btn-primary text-light d-flex align-items-center gap-2" data-bs-target="#staticBackdrop3" data-bs-toggle="modal"
                data-bs-dismiss="modal">

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                </svg>
                Avançar
              </button>
            </div>

          </div>

        </div>

      </div >



      <div className="modal  fade modal-lg" id="staticBackdrop3" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="staticBackdropLabel"
        data-bs-keyboard="false" aria-hidden="true" >
        <div className="modal-dialog" >
          <div className="modal-content">
            <div className="modal-header">
              <div className="d-flex flex-column">
                <h1 className="modal-title fs-3" id="exampleModalLabel">Proposta de Negócio </h1>
                <h5 className='fs-5'>Dados da Geradora</h5>
              </div>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <div className="container-fluid">
                <div className="row d-flex">
                  <div className="col-md-5">
                    <label htmlFor="inputCodigo" className="form-label">
                      Cliente:
                    </label>
                    <input type="text" className="form-control" id="inputCodigo" />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="inputCodigo" className="form-label">
                      Usuário:
                    </label>
                    <input type="text" className="form-control" id="inputCodigo" />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="inputCodigo" className="form-label">
                      Fator Solar:
                    </label>
                    <input type="text" className="form-control" id="inputCodigo" />
                  </div>

                  <div className="row ">




                  </div>




                </div>

                <br />
                <div class="card w-100">
                  <div class="card-header">
                    Demandas
                  </div>
                  <div class="card-body d-flex flex-row  ">

                    <div className="row p-2 d-flex flex-column">
                      <div className="col-md-3 w-100">
                        <label htmlFor="inputCodigo" className="form-label">
                          Tipo de Ligação:
                        </label>
                        <input type="text" className="form-control" id="inputCodigo" />
                      </div>
                      <div className="col-md-4 w-100">
                        <label htmlFor="inputCodigo" className="form-label">
                          Tipo de Telhado:
                        </label>
                        <input type="text" className="form-control" id="inputCodigo" />
                      </div>
                      <div className="col-md-3 w-100">
                        <label htmlFor="inputCodigo" className="form-label">
                          Modalidade:
                        </label>
                        <input type="text" className="form-control" id="inputCodigo" />
                      </div>
                      <div className="col-md-2  w-100">
                        <label htmlFor="inputCodigo" className="form-label">
                          Grupo:
                        </label>
                        <input type="text" className="form-control" id="inputCodigo" />
                      </div>
                      <div className="col-md-3  w-100">
                        <label htmlFor="inputCodigo" className="form-label">
                          Sub-Grupo:
                        </label>
                        <input type="text" className="form-control" id="inputCodigo" />
                      </div>


                    </div>
                    <div className="row p-2  d-flex flex-column">
                      <div className="col-md-2  w-100">
                        <label htmlFor="inputCodigo" className="form-label">
                          Cor:
                        </label>
                        <input type="text" className="form-control" id="inputCodigo" />
                      </div>
                      <div className="col-md-3 w-100 ">
                        <label htmlFor="inputCodigo" className="form-label">
                          Demanda FP:
                        </label>
                        <input type="text" className="form-control" id="inputCodigo" />

                      </div>
                      <div className="col-md-3 w-100">
                        <label htmlFor="inputCodigo" className="form-label">
                          Energia FP:
                        </label>
                        <input type="text" className="form-control" id="inputCodigo" />

                      </div>
                      <div className="col-md-3  w-100">
                        <label htmlFor="inputCodigo" className="form-label">
                          Demanda Ponta:
                        </label>
                        <input type="text" className="form-control" id="inputCodigo" />

                      </div>
                      <div className="col-md-3  w-100">
                        <label htmlFor="inputCodigo" className="form-label">
                          Energia Ponta:
                        </label>
                        <input type="text" className="form-control" id="inputCodigo" />

                      </div>
                    </div>

                    <div className="row p-2  d-flex flex-column">
                      <div className="col-md-3 w-100 ">
                        <label htmlFor="inputCodigo" className="form-label font-weight-bold">

                          <b>Consumo Médio:</b>
                        </label>
                        <input type="text" className="form-control" id="inputCodigo" />
                      </div>
                      <div className="col-md-3 w-100 ">
                        <label htmlFor="inputCodigo" className="form-label">

                          <b> Geração Sugerida:</b>
                        </label>
                        <input type="text" className="form-control" id="inputCodigo" />
                      </div>
                    </div>

                  </div>
                </div>



              </div>

            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary text-light d-flex align-items-center gap-2" data-bs-target="#staticBackdrop3" data-bs-toggle="modal"
                data-bs-dismiss="modal">Voltar</button>
              <button
                className="btn btn-primary text-light d-flex align-items-center gap-2" data-bs-target="#staticBackdrop4" data-bs-toggle="modal"
                data-bs-dismiss="modal">

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                </svg>
                Avançar
              </button>
            </div>

          </div>

        </div>

      </div >



      <div className="modal  fade modal-lg" id="staticBackdrop4" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="staticBackdropLabel"
        data-bs-keyboard="false" aria-hidden="true" >
        <div className="modal-dialog" >
          <div className="modal-content">
            <div className="modal-header">
              <div className="d-flex flex-column">
                <h1 className="modal-title fs-3" id="exampleModalLabel">Proposta de Negócio </h1>
                <h5 className='fs-5'>Equipamentos</h5>
              </div>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <div className="container-fluid">
                <div className="row d-flex justify-content-start">
                  <div className="col-md-4">
                    <label htmlFor="inputCodigo" className="form-label">
                      Tipo:
                    </label>
                    <input type="text" className="form-control" id="inputCodigo" />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="inputCodigo" className="form-label">
                      Módulos:
                    </label>
                    <input type="text" className="form-control" id="inputCodigo" />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="inputCodigo" className="form-label">
                      Consumo(Kwh):
                    </label>
                    <input type="text" className="form-control" id="inputCodigo" />
                  </div>
                </div>

                <div className="row d-flex justify-content-start">
                  <div className="col-md-4">
                    <label htmlFor="inputCodigo" className="form-label">
                      Perda:
                    </label>
                    <input type="text" className="form-control" id="inputCodigo" />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="inputCodigo" className="form-label">
                      Potência(kwp):
                    </label>
                    <input type="text" className="form-control" id="inputCodigo" />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="inputCodigo" className="form-label">
                      Média Mensal(Kwh):
                    </label>
                    <input type="text" className="form-control" id="inputCodigo" />
                  </div>
                </div>

                <div className="row ">
                  <div className="col-md-4">
                    <label htmlFor="inputCodigo" className="form-label">
                      CIP:
                    </label>
                    <input type="text" className="form-control" id="inputCodigo" />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="inputCodigo" className="form-label">
                      Bandeira:
                    </label>
                    <input type="text" className="form-control" id="inputCodigo" />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="inputCodigo" className="form-label">
                      Preço do Kit:
                    </label>
                    <input type="text" className="form-control" id="inputCodigo" />
                  </div>
                </div>
                <div className="row ">
                  <div className="col-md-4">
                    <label htmlFor="inputCodigo" className="form-label">
                      Fator de Simultaneidade:
                    </label>
                    <input type="text" className="form-control" id="inputCodigo" />
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="inputCodigo" className="form-label">
                      Complemento:
                    </label>
                    <input type="text" className="form-control" id="inputCodigo" />
                  </div>

                </div>
              </div>
              <br />

            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary text-light d-flex align-items-center gap-2" data-bs-target="#staticBackdrop3" data-bs-toggle="modal"
                data-bs-dismiss="modal">Voltar</button>
              <button
                className="btn btn-primary text-light d-flex align-items-center gap-2">

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                </svg>
                Gerar Proposta
              </button>
            </div>

          </div>


        </div>

      </div>
















      {/* <div class="modal-content">
            <div class="modal-header">
              <div className="d-flex flex-column">
                <h1 className="modal-title fs-3" id="exampleModalLabel">Nova Proposta de  Negócio </h1>
                <h5 className='fs-5'>Informações da Geradora</h5>
              </div>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
          </div> */}

      {/* <div class="modal-footer">
            <button
              className="btn btn-primary text-light d-flex align-items-center gap-2" data-bs-target="#staticBackdrop2" data-bs-toggle="modal"
              data-bs-dismiss="modal">Voltar</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Avançar</button>



          </div> */}


    </ >





  )

}









