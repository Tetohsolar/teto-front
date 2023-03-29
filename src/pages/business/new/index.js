import React, { useState, useContext, useEffect } from 'react'
import api from '../../../api'
import { AuthContext } from '../../../context/AuthContext'
import InputMask from 'react-input-mask';
import { ToastContainer, toast } from 'react-toastify'





export default function NewBusiness(prop) {





  const [tipoPessoa, setTipoPessoa] = useState('')
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [fone, setFone] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [cep, setCep] = useState('')
  const [numero, setNumero] = useState('')
  const [estado, setEstado] = useState('')
  const [cidade, setCidade] = useState('')
  const [bairro, setBairro] = useState('')
  const [rua, setRua] = useState('')
  const [inf_Adicionais, setInf_Adicionais] = useState('')
  const [nomeFantasia, setNomeFantasia] = useState('')
  const [razaoSocial, setRazaosocial] = useState('')
  const [cliente, setCliente] = useState('')
  const [usuario, setUsuario] = useState('')
  const [fatorSolar, setFatorSolar] = useState('')
  const [tipoTelhado, setTipoTelhado] = useState('')
  const [tipoLigacao, setTipoLigacao] = useState('')
  const [modalidade, setModalidade] = useState('')
  const [grupo, setGrupo] = useState('')
  const [subgrupo, setSubgrupo] = useState('')
  const [demandaFP, setDemandaFP] = useState('')
  const [energia_FP, setEnergia_FP] = useState('')
  const [demPonta, setDem_ponta] = useState('')
  const [energiaPonta, setEnergia_ponta] = useState('')
  const [energiaPontaTratada, setEnergiaPontaTratada] = useState('')
  const [consumoMedio, setConsumoMedio] = useState('')
  const [geracaoSugerida, setGeracaoSugerida] = useState('')
  const [geracaoDesejada, setGeracaoDesejada] = useState('')
  const [tipoSistema, setTipoSistema] = useState('')
  const [potenciaModulo, setPotenciaModulo] = useState('')
  const [perdas, serPerdas] = useState('')
  const [potenciaConsiderada, setPotenciaConsiderada] = useState('')
  const [qtdeModulos, setQtdeModulos] = useState('')
  const [potenciaSistema, setPotenciaSistema] = useState('')
  const [mediaMensal, setMediaMensal] = useState('')
  const [cip, setCip] = useState('')
  const [bandeira, setbandeira] = useState('')
  const [fatorSimult, setFatorSimult] = useState('')
  const [precoKit, setPrecoKit] = useState('')
  const [complemento, setComplemento] = useState('')
  const [projeto, setprojeto] = useState('')
  const [imposto, setImposto] = useState('')
  const [montagem, seMontagem] = useState('')
  const [comissao, setComissao] = useState('')
  const [margem, setMargem] = useState('')
  const [custo_total, setCustoTotal] = useState('')
  const [margemCalculada, setMargemCalculada] = useState('')
  const [valorTotalProjeto, setValorTotalProjeto] = useState('')
  const [valorComissao, setValorComissao] = useState('')
  const [lucroProjeto, setLucroProjeto] = useState('')
  const [lucroReal, setLucroReal] = useState('')
  const [projetoDesconto2, setprojetoDesconto2] = useState('')
  const [projetoDesconto4, setprojetoDesconto4] = useState('')
  const [marcaModulo, setMarcaModulo] = useState('')
  const [modeloModulo, setModeloModulo] = useState('')
  const [marcaInversor, setMarcaInversor] = useState('')
  const [marcaMicroInversor, setMarcaMicroInversor] = useState('')
  const [garantia_inv_micro, setGarantia_inv_micro] = useState('')
  const [qtde_inv_micro, setQtde_inv_micro] = useState('')
  const [taxa, setTaxa] = useState('')
  const { token, userName } = useContext(AuthContext)

  //USESTATES DO PRODUTO
  const [codigo, setCodigo] = useState()
  const [descricao, setDescricao] = useState()
  const [marca, setMarca] = useState()
  const [categoria, setCategoria] = useState()
  const [descricaoTec, setDescricaoTec] = useState()
  const [descricaoAmigavel, setDescricaoAmigavel] = useState()
  const [garantia, setGarantia] = useState()
  const [fornecedor, setFornecedor] = useState()
  const [preco, setPreco] = useState()
  const [dimensao, setDimensao] = useState()
  const [idSelected, setIdSelected] = useState()
  const [peso, setPeso] = useState()


  async function loadById(id) {
    try {

      await api.get('/products/get/' + id, {
        headers: {
          'Authorization': `Basic ${token}`
        }

      }).then((response) => {
        setCodigo(response.data.codef)
        setDescricao(response.data.description)
        setMarca(response.data.brand)
        setCategoria(response.data.category)
        setDescricaoTec(response.data.descriptionTec)
        setDescricaoAmigavel(response.data.descriptionFriendly)
        setGarantia(response.data.guarantee)
        setFornecedor(response.data.supplier)
        setPreco(response.data.price)
        setPeso(response.data.weight)
        setDimensao(response.data.dimenssion)
        setIdSelected(response.data.id)

      }).catch((error) => {
        toast.error(error.response.data.message)
      });

    } catch (err) {
      console.log(err)

    }
  }





  function handleCaptureEP() {
    console.log(subgrupo)
    console.log(energiaPonta)
    console.log(energia_FP)
    if (subgrupo === "subA3Azul" && energiaPonta !== null && energia_FP !== null) {
      setConsumoMedio(energiaPonta + energia_FP)
    }
    console.log('chamou')

  }








  //{"document":"666.641.953-80"}
  async function handleFindClient(e) {
    e.preventDefault();

    try {
      await api.post('/client/getbydocument',
        { "document": `${cpf}` }, {
        headers: {
          'Authorization': `Basic ${token}`
        }

      }).then((response) => {
        console.log(response)
        setNome(response.data.fantasy)
        setEmail(response.data.email)
        setFone(response.data.phone)
        setWhatsapp(response.data.zap)
        setInf_Adicionais(response.data.addInformation)
        setEstado(response.data.Addresses[0].state)
        setCidade(response.data.Addresses[0].city)
        setCep(response.data.Addresses[0].postcode)
        setRua(response.data.Addresses[0].street)
        setBairro(response.data.Addresses[0].neighborhood)
        setUsuario(userName)



      }).catch((error) => {
        toast.error(error.response.data.message)
      });

    } catch (err) {
      console.log(err)

    }
  }

  // async function handleCreateBusiness(e) {
  //   e.preventDefault()
  //   if (tipoPessoa === 'PF') {
  //     try {
  //       await api.post('/business/create',
  //         {
  //           fatorSolar, number, nome, tipoTelhado, tipoLigacao, modalidade, grupo, subgrupo, demandaFP, energia_FP, demPonta, energiaPonta, consumoMedio, geracaoSugerida, geracaoDesejada, modoProposta, cip, bandeira, fatorSimult, perdas, potenciaConsiderada, qtdeModulos, potenciaSistema, consumoMedio, potenciaModulo, mediaMensal, precoKit, complemento, projeto, taxa, montagem, comissao, margem, custo_total, margemCalculada, valorTotalProjeto, valorComissao, lucroProjeto, lucroReal,


  //         } catch (error) {

  //         }


  //     }


  //  }

  async function buscaGeracaoSugerida() {
    setEnergiaPontaTratada('')
    if (parseInt(energiaPonta) > 99) {

      await api.post('/taxkhw/byparam', {
        "subgroup": "A3",
        "modal": "HA",
        "ep": energiaPonta,
        "state": "CE"

      }, {
        headers: {
          'Authorization': `Basic ${token}`
        }
      }
      ).then((response) => {
        setEnergiaPontaTratada(response.data.Taxkwh)
        console.log(response.data.Taxkwh)

      })

    }

  }




  //calculos Geração Média
  function handleGrupoAConsMedio(e) {
    if (modalidade === "HA" && subgrupo === "A3" && energia_FP !== null && energiaPonta !== null) {
      const valor = parseFloat(energia_FP) + parseFloat(energiaPonta)
      setConsumoMedio(valor)
      //Geração sugerida
      // buscaGeracaoSugerida()
      // const data = []
      // data.push(energiaPontaTratada)
      // const sum = parseInt(energia_FP) + parseInt(data[data.length - 1])
      // console.log(data)
      // // setGeracaoSugerida(sum)
    }

    else if (modalidade === "HV" && subgrupo === "A4" && energia_FP !== null && energiaPonta !== null) {
      const valor = parseFloat(energia_FP) + parseFloat(energiaPonta)
      setConsumoMedio(valor)

    }
    else if (modalidade === "HA" && subgrupo === "A4" && demandaFP !== null && energia_FP !== null && energiaPonta !== null) {
      const valor = parseFloat(demandaFP) + parseFloat(energia_FP) + parseFloat(energiaPonta)
      setConsumoMedio(valor)

    }
    else {
      setConsumoMedio('')
    }

  }






  return (




    <>
      {/* Dados do  MODAL 1*/}
      <form>
        <ToastContainer />
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="staticBackdropLabel"
          data-bs-keyboard="false" aria-hidden="true" >
          <div className="modal-dialog modal-lg w-100" >
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
                  <div className="row d-flex flex-row align-items-end ">
                    <div className="col-md-3 ">
                      <label htmlFor="inputCodigo" className="form-label">
                        Tipo de Cliente:
                      </label>
                      <select name="pets" id="input-user-type" className="form-select" value={tipoPessoa} onChange={(e) => setTipoPessoa(e.target.value)}>
                        <option value="" defaultChecked>Selecione</option>
                        <option value="PF" defaultChecked>Pessoa Física</option>
                        <option value="PJ">Pessoa Jurídica</option>

                      </select>

                    </div>
                    {tipoPessoa === 'PF' ? <>
                      <div className="col-md-3">

                        <label htmlFor="inputcpf" className="form-label">
                          CPF:
                        </label>
                        <InputMask
                          className="form-control" id="inputcpf"
                          onChange={(e) => setCpf(e.target.value)}
                          mask='999.999.999-99'
                          value={cpf || ''}>
                        </InputMask>

                      </div>

                      <div div className="col-md-4">
                        <label htmlFor="inputNome" className="form-label">
                          Nome:
                        </label>
                        <input type="text" className="form-control" id="inputNome" value={nome} onChange={(e) => setNome(e.target.value)} />
                      </div>


                    </>
                      :
                      <>

                        <div className="col-md-4">

                          <label htmlFor="inputCnpj" className="form-label">
                            CNPJ:
                          </label>

                          <InputMask
                            className="form-control" id="inputCnpj"
                            onChange={(e) => setCnpj(e.target.value)}
                            mask='99.999.999/9999-999'
                            value={cnpj || ''}>
                          </InputMask>

                        </div>


                      </>}
                    <div className="col-md-3">
                      <button className='btn btn-primary text-light gap-2' onClick={handleFindClient} >

                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <br />
                  <hr />
                  <div className="row">
                    <div div className="col-md-6">
                      <label htmlFor="inputNomeFantasia" className="form-label">
                        Nome Fantasia:
                      </label>
                      <input type="text" className="form-control" id="inputNomeFantasia" value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)} />
                    </div>

                    <div className="col-md-5">
                      <label htmlFor="inputEmail" className="form-label">
                        E-mail:
                      </label>
                      <input type="text" className="form-control" id="inputEmail" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <label htmlFor="inputFone" className="form-label">
                        Fone:
                      </label>
                      <InputMask
                        className="form-control"
                        onChange={(e) => setFone(e.target.value)} id="inputFone"
                        mask='(99)99999-9999'
                        value={fone || ''}>
                      </InputMask>

                    </div>
                    <div className="col-md-3">
                      <label htmlFor="inputWhatsapp" className="form-label">
                        Whatsapp:
                      </label>

                      <InputMask
                        className="form-control"
                        onChange={(e) => setWhatsapp(e.target.value)} id="inputWhatsapp"
                        mask='(99)99999-9999'
                        value={whatsapp || ''}>
                      </InputMask>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md">
                      <label htmlFor="inputInformAdicio" className="form-label">
                        Informações Adicionais:
                      </label>
                      <textarea class="form-control" id="inputInformAdicio" rows="3" value={inf_Adicionais} onChange={(e) => setInf_Adicionais(e.target.value)}  >

                      </textarea>

                    </div>



                  </div>

                </div>

              </div>
              <div className="modal-footer">
                <button type="button"
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

        {/* Dados do  MODAL 2*/}
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

                      <label htmlFor="inputCEP" className="form-label">
                        CEP:
                      </label>
                      <input type="text" className="form-control" id="inputCEP" value={cep} onChange={(e) => setCep(e.target.value)} />
                    </div>
                    <div className="col-md-2">
                      <label htmlFor="inputEstado" className="form-label">
                        Estado:
                      </label>
                      <input type="text" className="form-control" id="inputEstado" value={estado} onChange={(e) => setEstado(e.target.value)} />
                    </div>
                    <div className="col-md-5">
                      <label htmlFor="inputCidade" className="form-label">
                        Cidade:
                      </label>
                      <input type="text" className="form-control" id="inputCidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
                    </div>

                    <div className="row justify-content-center">
                      <div className="col-md-4">
                        <label htmlFor="inputBairro" className="form-label">
                          Bairro:
                        </label>
                        <input type="text" className="form-control" id="inputBairro" value={bairro} onChange={(e) => setBairro(e.target.value)} />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="inputRua" className="form-label">
                          Rua:
                        </label>
                        <input type="text" className="form-control" id="inputRua" value={rua} onChange={(e) => setRua(e.target.value)} />
                      </div>
                      <div className="col-md-2">
                        <label htmlFor="inputNumero" className="form-label">
                          Número:
                        </label>
                        <input type="text" className="form-control" id="inputNumero" value={numero} onChange={(e) => setNumero(e.target.value)} />
                      </div>


                    </div>


                  </div>


                  <div className="row">
                    <div className="col-lg-12">
                      <label htmlFor="inputInformAdicio" className="form-label">
                        Informações Adicionais:
                      </label>
                      <textarea class="form-control" id="inputInformAdicio" rows="3" value={inf_Adicionais} onChange={(e) => setInf_Adicionais(e.target.value)}  ></textarea>

                    </div>

                  </div>
                </div>

              </div>
              <div className="modal-footer">
                <button type="button"
                  className="btn btn-secondary text-light d-flex align-items-center gap-2" data-bs-target="#staticBackdrop" data-bs-toggle="modal"
                  data-bs-dismiss="modal">Voltar</button>
                <button type="button"
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


        {/* Dados do  MODAL.. 3*/}
        <div className="modal  fade modal-lg w-100" id="staticBackdrop3" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="staticBackdropLabel"
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
                      <input type="text" className="form-control" id="inputCodigo" value={nome} onChange={(e) => setNome(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="inputCodigo" className="form-label">
                        Usuário:
                      </label>
                      <input type="text" className="form-control" id="inputCodigo" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                    </div>
                    <div className="col-md-2">
                      <label htmlFor="inputCodigo" className="form-label">
                        Fator Solar:
                      </label>
                      <input type="text" className="form-control" id="inputCodigo" value={fatorSolar} onChange={(e) => setFatorSolar(e.target.value)} />
                    </div>
                    <div className="col-md-3 ">
                      <label htmlFor="tipoLigacao" className="form-label">
                        Tipo de Ligação:
                      </label>
                      <select name="tipoLigacao" className="form-control" id="tipoLigacao" value={tipoLigacao} onChange={(e) => setTipoLigacao(e.target.value)}>
                        <option value="">Selecione</option>
                        <option value="tri">Trifásico</option>
                        <option value="mono">Monofásico</option>

                      </select>
                    </div>
                    <div className="col-md-4 ">
                      <label htmlFor="tipoTelhado" className="form-label">
                        Tipo de Telhado:
                      </label>

                      <select name="tipoLigacao" className="form-control" id="tipoTelhado" value={tipoTelhado} onChange={(e) => setTipoTelhado(e.target.value)}>
                        <option value="">Selecione</option>
                        <option value="ceramico">Cerâmico</option>
                        <option value="metalico">Metálico</option>
                        <option value="solo">Solo</option>
                        <option value="fibrocimento">Fibrocimento</option>
                        <option value="laje">Laje</option>

                      </select>
                    </div>

                  </div>

                  <br />
                  <div class="card w-100">
                    <div class="card-header">
                      Demandas
                    </div>
                    <div class="card-body d-flex flex-row ">

                      <div className="row p-2 d-flex flex-column">


                        <div className="col-md-3 w-100">
                          <label htmlFor="modalidade" className="form-label">
                            Modalidade:
                          </label>
                          {/* <input type="text" className="form-control" id="modalidade" value={modalidade} onChange={(e) => setModalidade(e.target.value)} /> */}
                          <select className="form-control" id="modalidade" value={modalidade} onChange={(e) => setModalidade(e.target.value)}>
                            <option value="">Selecione</option>
                            <option value="Convencional">Convencional</option>
                            <option value="HA">Horos. Azul</option>
                            <option value="HV">Horos. Verde</option>
                            <option value="Rural">Rural</option>

                          </select>
                        </div>
                        <div className="col-md-2 w-100">
                          <label htmlFor="inputGrupo" className="form-label">
                            Grupo:
                          </label>


                          <select className="form-control" id="inputGrupo" value={grupo} onChange={(e) => setGrupo(e.target.value)} >
                            <option value="">Selecione</option>
                            <option value="A">Grupo A</option>
                            <option value="B">Grupo B</option>
                          </select>
                        </div>
                        <div className="col-md-3   w-100">
                          <label htmlFor="inputSubgrupo" className="form-label">
                            Sub-Grupo:
                          </label>
                          <select className="form-control" id="inputSubgrupo" value={subgrupo} onChange={(e) => setSubgrupo(e.target.value)} >
                            <option value="">Selecione</option>
                            {grupo === "A" ? <>
                              <option value="A3">A3</option>
                              <option value="A4">A4</option>

                            </>
                              :
                              <>
                                <option value="B1">B1</option>
                                <option value="B2">B2</option>
                                <option value="B3">B3</option>
                              </>}
                          </select>
                        </div>



                      </div>
                      <div className="row p-2  d-flex flex-column">

                        <div className="col-md-3  w-100 ">
                          <label htmlFor="inputDemandaFP" className="form-label">
                            Demanda FP:
                          </label>
                          <input type="text" className="form-control" id="inputDemandaFP" value={demandaFP} onChange={(e) => setDemandaFP(e.target.value)} />

                        </div>
                        <div className="col-md-3 w-100">
                          <label htmlFor="inputEnergiaFP" className="form-label">
                            Energia FP:
                          </label>
                          <input type="text" className="form-control" id="inputEnergiaFP" value={energia_FP} onChange={(e) => setEnergia_FP(e.target.value)} onKeyUp={handleGrupoAConsMedio} />

                        </div>
                        <div className="col-md-3  w-100 ">
                          <label htmlFor="inputConsMedio" className="form-label font-weight-bold">
                            Consumo Médio(KWh):
                          </label>
                          <input type="text" className="form-control" id="inputConsMedio" value={consumoMedio || ''} onChange={(e) => setConsumoMedio(e.target.value)} />

                        </div>

                      </div>
                      <div className="row p-2  d-flex flex-column">
                        <div className="col-md-3  w-100">
                          <label htmlFor="inputDemandaPonta" className="form-label">
                            Demanda Ponta:
                          </label>
                          <input type="text" className="form-control" id="inputDemandaPonta" value={demPonta} onChange={(e) => setDem_ponta(e.target.value)} onKeyUp={handleGrupoAConsMedio} />
                        </div>
                        <div className="col-md-3   w-100">
                          <label htmlFor="inputEnergiaPonta" className="form-label">
                            Energia Ponta:
                          </label>
                          <input type="text" className="form-control" id="inputEnergiaPonta" value={energiaPonta} onChange={(e) => setEnergia_ponta(e.target.value)} onKeyUp={handleGrupoAConsMedio} />
                        </div>

                        <div className="col-md-3 w-100">
                          <label htmlFor="inputGeracaoSugerida" className="form-label">
                            Geração Sugerida:
                          </label>
                          <input type="text" className="form-control" id="inputGeracaoSugerida" value={geracaoSugerida || ''} onChange={(e) => setGeracaoSugerida(e.target.value)} />
                        </div>
                      </div>

                    </div>
                  </div>



                </div>

              </div>
              <div className="modal-footer">
                <button type="button"
                  className="btn btn-secondary text-light d-flex align-items-center gap-2" data-bs-target="#staticBackdrop2" data-bs-toggle="modal"
                  data-bs-dismiss="modal">Voltar</button>
                <button type="button"
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


        {/* Dados do  MODAL 4*/}
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
                      <label htmlFor="inputTipoSistema" className="form-label">
                        Tipo de Sistema:
                      </label>
                      <input type="text" className="form-control" id="inputTipoSistema" value={tipoSistema} onChange={(e) => setTipoSistema(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="inputPotModulos" className="form-label">
                        Módulos:
                      </label>
                      <input type="text" className="form-control" id="inputPotModulos" value={potenciaModulo} onChange={(e) => setPotenciaModulo(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="inputConsumo" className="form-label">
                        Consumo(Kwh):
                      </label>
                      <input type="text" className="form-control" id="inputConsumo" value={consumoMedio} onChange={(e) => setConsumoMedio(e.target.value)} />
                    </div>
                  </div>

                  <div className="row d-flex justify-content-start">
                    <div className="col-md-4">
                      <label htmlFor="inputPerda" className="form-label">
                        Perda:
                      </label>
                      <input type="text" className="form-control" id="inputPerda" value={perdas} onChange={(e) => serPerdas(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="inputPotenciaSist" className="form-label">
                        Potência(kwp):
                      </label>
                      <input type="text" className="form-control" id="inputPotenciaSist" value={potenciaSistema} onChange={(e) => setPotenciaSistema(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="inputmediaMensal" className="form-label">
                        Média Mensal(Kwh):
                      </label>
                      <input type="text" className="form-control" id="inputCodigo" value={mediaMensal} onChange={(e) => setMediaMensal(e.target.value)} />
                    </div>
                  </div>

                  <div className="row ">
                    <div className="col-md-4">
                      <label htmlFor="inputCIP" className="form-label">
                        CIP:
                      </label>
                      <input type="text" className="form-control" id="inputCIP" value={cip} onChange={(e) => setCip(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="inputbandeira" className="form-label">
                        Bandeira:
                      </label>
                      <input type="text" className="form-control" id="inputbandeira" value={bandeira} onChange={(e) => setbandeira(e.target.value)} />
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="inputPreco" className="form-label">
                        Preço do Kit:
                      </label>
                      <input type="text" className="form-control" id="inputCodigo" value={precoKit} onChange={(e) => setPrecoKit(e.target.value)} />
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-4">
                      <label htmlFor="inputFatorSimult" className="form-label" >
                        Fator de Simultaneidade:
                      </label>
                      <input type="text" className="form-control" id="inputFatorSimult" value={fatorSimult} onChange={(e) => setFatorSimult(e.target.value)} />
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="inputComplem" className="form-label">
                        Complemento:
                      </label>
                      <input type="text" className="form-control" id="inputComplem" value={complemento} onChange={(e) => setComplemento(e.target.value)} />
                    </div>

                  </div>
                </div>
                <br />

              </div>
              <div className="modal-footer">
                <button type="button"
                  className="btn btn-secondary text-light d-flex align-items-center gap-2" data-bs-target="#staticBackdrop3" data-bs-toggle="modal"
                  data-bs-dismiss="modal">Voltar</button>
                <button type="button"
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


      </form >

    </ >





  )

}








