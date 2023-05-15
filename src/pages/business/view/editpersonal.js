import { useContext, useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import { ToastContainer, toast } from 'react-toastify'
import api from "../../../api";
import { AuthContext } from "../../../context/AuthContext";
import { cpfMask } from "../../../components/clientForm/cpfmask";
import { cnpjMask } from "../../../components/clientForm/cnpjmask";


const EditPersonalData = (prop) => {
  const [ClientId, setClientId] = useState('')
  const [tipoPessoa, setTipoPessoa] = useState('')
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
  const [doc, setDoc] = useState('')
  const { token } = useContext(AuthContext)

  function validaCampos(name, phone, documento, cep) {

    if (name === "") {
      toast.error("Nome É obrigatório", {
        autoClose: 1000,
      })
      return false;
    }
    if (fone === "") {
      toast.error("Telefone É obrigatório", {
        autoClose: 1000,
      })
      return false;
    }

    let phonenomask = phone.replace('_', '');


    if (phonenomask.length < 14) {
      toast.error("Telefone é invalido", {
        autoClose: 1000,
      })
      return false;
    }

    console.log(cep)

    if (cep) {
      let cepnomask = cep.replace('_', '');

      if (cepnomask.length < 9) {
        toast.error("Cep é invalido", {
          autoClose: 1000,
        })
        return false;
      }
    }

    if (documento !== '') {
      if (documento.length <= 14 && !cpf.isValid(documento)) {
        toast.error("CPF inválido", {
          autoClose: 1000,
        }
        ); throw new Error;

      } else if (documento.length > 14 && !cnpj.isValid(documento)) {
        toast.error("CNPJ inválido", {
          autoClose: 1000,
        });
        throw new Error;

      }

    }
    return true;
  }

  function handleMask(e) {
    if (tipoPessoa === "F" || tipoPessoa === "") {
      const formatado = cpfMask(doc);
      setDoc(formatado);
    } else {
      const formatado = cnpjMask(doc);
      setDoc(formatado);
    }

  }

  async function salvar() {
    let nof = prop.client.fantasy
    let phone = prop.client.phone
    let tipoPessoaInt = prop.client.tipo

    if (!nomeFantasia) {
      setNomeFantasia(nof)
    } else {
      nof = nomeFantasia
    }
    !fone ? setFone(phone) : phone = fone
    !fone ? setFone(phone) : phone = fone
    if (!tipoPessoa) {
      if (prop.client.tipo === "Fisico") {
        tipoPessoaInt = "F"
        setTipoPessoa("F")
      }
      else {
        setTipoPessoa("J")
        tipoPessoaInt = "J"
      }

    }

    await save(tipoPessoaInt, nof, "", cpf, phone, whatsapp, cep, estado, cidade, rua, bairro, inf_Adicionais,
      email, ClientId, '0', numero).then()
  }

  async function save(tipoPesoa, name, corpName, documento, phone, zap, cep, estado, cidade, logradouro, bairro, inform, email, id, idAdd, num) {

    const json = {
      fantasy: name,
      corporatename: corpName,
      phone: phone,
      document: documento,
      email: email,
      tipo: tipoPesoa,
      zap: zap,
      addInformation: inform,
      Addresses: [
        {
          id: idAdd ? idAdd : undefined,
          street: logradouro,
          postcode: cep,
          city: cidade,
          state: estado,
          neighborhood: bairro,
          number: num
        }
      ]
    }
    const t = JSON.stringify(json);
    const saida = JSON.parse(t);

    if (await validaCampos(name, phone, documento)) {

      if (id) {
        await api.patch('/client/update/' + id, saida
          , {
            headers: {
              'Authorization': `Basic ${token}`
            }

          }).then((response) => {
            document.getElementById("CloseModal").click()
          }).catch(
            (response) => {
              toast.error(response.response.data.message)
              throw new Error()

            }
          );

      } else {
        await api.post('/client/create', saida
          , {
            headers: {
              'Authorization': `Basic ${token}`
            }

          }).then((response) => {
          }).catch(
            (response) => {
              toast.error(response.response.data.message)
              throw new Error()
            }
          )
      }
    }
  }

  return (
    <>

      <ToastContainer />
      <div className="modal fade" id="staticBackdropMateus" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="staticBackdropLabel"
        data-bs-keyboard="false" aria-hidden="true" >
        <div className="modal-dialog modal-lg w-100" >
          <div className="modal-content">
            <div className="modal-header">
              <div className="d-flex flex-column">
                <h1 className="modal-title fs-3" id="exampleModalLabel">Proposta de Negócio </h1>
                <h5 className='fs-5'>Dados do Cliente</h5>
              </div>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="CloseModal"></button>
            </div>
            <div className="modal-body">

              <div className="container-fluid">
                <div className="row d-flex flex-row align-items-end ">
                  <div className="col-md-3 ">
                    <label htmlFor="inputCodigo" className="form-label">
                      Tipo de Cliente:
                    </label>
                    <select name="pets" id="input-user-type" className="form-select" value={tipoPessoa || prop.client.tipo == "Fisico" ? "PF" : "PJ"} onChange={(e) => setTipoPessoa(e.target.value)}>
                      <option value="" defaultChecked>Selecione</option>
                      <option value="PF" defaultChecked>Pessoa Física</option>
                      <option value="PJ">Pessoa Jurídica</option>

                    </select>

                  </div>
                  {tipoPessoa === 'F' || prop.client.tipo == "Fisico" ? <>
                    <div className="col-md-3">

                      <label htmlFor="inputcpf" className="form-label">
                        CPF:
                      </label>
                      <InputMask
                        className="form-control" id="inputcpf"
                        onChange={(e) => setCpf(e.target.value)}
                        mask='999.999.999-99'
                        value={cpf || prop.client.document}>
                      </InputMask>

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
                          value={cnpj || prop.client.document}>
                        </InputMask>

                      </div>

                    </>}
                  <div className="col-md-3">
                    <button className='btn btn-primary text-light gap-2'  >
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
                      Nome do Cliente:
                    </label>
                    <input type="text" className="form-control" id="inputNomeFantasia" value={nomeFantasia || prop.client.fantasy} onChange={(e) => setNomeFantasia(e.target.value)} />
                  </div>
                  <div className="col-md-5">
                    <label htmlFor="inputEmail" className="form-label">
                      E-mail:
                    </label>
                    <input type="text" className="form-control" id="inputEmail" value={email || prop.client.email} onChange={(e) => setEmail(e.target.value)} />
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
                      value={fone || prop.client.phone}>
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
                      value={whatsapp || prop.client.phone}>
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
                <br />
                <div class="card">
                  <div class="card-header">
                    Endereço do Cliente
                  </div>
                  <div class="card-body">
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
                </div>

              </div>

            </div>
            <div className="modal-footer">
              <button type="button" class="btn btn-primary" onClick={() => {
                salvar()
              }}>Save changes</button>
            </div>

          </div>

        </div>

      </div>



    </ >
  )
};

export default EditPersonalData;
