import { useEffect, useState, useContext } from 'react'
import { SidebarWrapperContext } from '../../../context/SidebarWrapperContext'
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { useLocation, useParams } from 'react-router-dom'
import api from '../../../api';
import { AuthContext } from '../../../context/AuthContext';
import TabelaProdutoEditavel from '../../../components/prods';
import { toast } from 'react-toastify';
import {useNavigate } from "react-router-dom";


const EditBussinessProduct = () => {

    const navigate = useNavigate();
    const [marcas, setMarcas] = useState([])
    const [modeloInversor, setModeloInversor] = useState([])
    const [idSelectedProd, setIdSelectedProd] = useState('')
    const { token } = useContext(AuthContext)
    const { sidebarWrapper } = useContext(SidebarWrapperContext);
    const pageTitle = "Atualização dos Produtos do Projeto";
    const [potenciaModulo, setPotenciaModulo] = useState('465')
    const [dadosProdutos, setDadosProdutos] = useState([
        {
            id: 1, type: "", brand: marcas, model: "", power: potenciaModulo, qtd: 1, brands: [], products: []
        }
    ]);

    const handleEditProds = async (id, campo, valor) => {
        setDadosProdutos(prevDados => {
            const novoDados = [...prevDados];
            const index = novoDados.findIndex(item => item.id === id);
            novoDados[index][campo] = valor;
            return novoDados;
        });
    };
    const handleAddProd = () => {
        let idN = idProd + 1

        let novoItem =
        {
            id: idN, type: "Placa", brand: '', model: '', power: potenciaModulo, qtd: 1
        }
        setIdProd(idN)
        setDadosProdutos(prevDados => [...prevDados, novoItem]);
    };
    const handleAfterDelProd = () => {

        const quantidadeItens = dadosProdutos.length;
        if (quantidadeItens > 1) {
            setDadosProdutos(prevDados => prevDados.filter(item => item.id !== idSelectedProd));
        }

    }
    const [idProd, setIdProd] = useState(1)

    const { businessId } = useParams();

    useEffect(() => {

        loadbId(businessId)
    }, [])

    async function onBlurMarca(item) {

        if (item.type !== "") {
            let type = "M"
            if (item.type === "P") {
                type = "P";
            }
            const filtro = {
                "type": type
            }

            console.log(filtro)
            await api.post('/brands/all', filtro, {
                headers: {
                    'Authorization': `Basic ${token}`

                }
            }).then((response) => {
                setDadosProdutos(prevDados => {
                    const novoDados = [...prevDados];
                    const index = novoDados.findIndex(it => it.id === item.id);
                    novoDados[index]["brands"] = response.data.brand;
                    return novoDados;
                });
            }).catch((error) => {
            });

        }
        else {
            item["brands"] = []
        }
    }
    async function onBlurProdutoMarca(item) {

        let category = "Nenhum"
        if (item.type === "P") {
            category = "Placa"
        }
        else if (item.type === "I") {
            category = "Inversor"
        } else if (item.type === "M") {
            category = "Microinversor"
        }

        const filtro = {
            brand: item.brand,
            category: category,
            "page": 0,
            "pageSize": 100
        }

        console.log(filtro)
        await api.post('/products/byparam', filtro, {
            headers: {
                'Authorization': `Basic ${token}`
            }
        }).then((response) => {

            setDadosProdutos(prevDados => {
                const novoDados = [...prevDados];
                const index = novoDados.findIndex(it => it.id === item.id);
                novoDados[index]["products"] = response.data.tutorials;
                return novoDados;
            });
        })

    }
    async function carregaPotencia(item) {

        console.log(item.model)
        const filtro = {
            codef: item.model.trim()
        }
        await api.post('/products/getpowerbycod/', filtro, {
            headers: {
                'Authorization': `Basic ${token}`
            }
        }).then((response) => {

            setDadosProdutos(prevDados => {
                const novoDados = [...prevDados];
                const index = novoDados.findIndex(it => it.id === item.id);
                novoDados[index]["power"] = response.data.power;
                return novoDados;
            });
        })

    }
    async function onBlurProdutoMarca(item) {

        let category = "Nenhum"
        if (item.type === "P") {
            category = "Placa"
        }
        else if (item.type === "I") {
            category = "Inversor"
        } else if (item.type === "M") {
            category = "Microinversor"
        }

        const filtro = {
            brand: item.brand,
            category: category,
            "page": 0,
            "pageSize": 100
        }

        console.log(filtro)
        await api.post('/products/byparam', filtro, {
            headers: {
                'Authorization': `Basic ${token}`
            }
        }).then((response) => {

            setDadosProdutos(prevDados => {
                const novoDados = [...prevDados];
                const index = novoDados.findIndex(it => it.id === item.id);
                novoDados[index]["products"] = response.data.tutorials;
                return novoDados;
            });
        })

    }

    async function updateDimensionamento(e) {
        e.preventDefault();

        const data = {
          products:dadosProdutos   
        }
        const t = JSON.stringify(data);
        const saida = JSON.parse(t);
        console.log(saida)
    
        await api.patch('/business/update/' + businessId, saida, {
          headers: {
            'Authorization': `Basic ${token}`
          }
    
        }).then((response) => {
            navigate("/business/view/" + businessId)
    
        }).catch((response) => {console.log(response)
            //toast.error(response.data.message)
            //throw new Error()
          })
    
    }
    async function loadbId() {

        await api.get('/business/get/' + businessId, {
            headers: {
                'Authorization': `Basic ${token}`
            }

        }).then((response) => {

            setDadosProdutos(response.data.products)
            for (let i = 0; i<response.data.products.length; i++) {
                onBlurMarca(response.data.products[i]);
                onBlurProdutoMarca(response.data.products[i] );
            }

        }).catch((error) => { console.log(error) })

    }
    return (
        <div>
            <Navbar />
            <div className={sidebarWrapper ? "d-flex wrapper toggled" : "d-flex wrapper"}>
                <Sidebar activeButtonProfile="active" />
                <div id="page-content-wrapper" className="container-fluid bg-home py-4">
                    <h5 className="pb-3">{pageTitle}</h5>


                    <form >
                        <div className='p-3 bg-white border rounded-1'>

                            <div className="row g-3 p2" >

                                <div class="card-body">
                                    <div className="row d-flex justify-content-start">
                                        <div className="table-responsive">

                                            <TabelaProdutoEditavel token={token} dados={dadosProdutos} handleEdit={handleEditProds}
                                                handleAdd={handleAddProd} setIdSelected={setIdSelectedProd}
                                                handleAfterDel={handleAfterDelProd} marcas={marcas} produtos={modeloInversor} onBlurType={onBlurMarca}
                                                onBlurBrand={onBlurProdutoMarca} carregaPotencia={carregaPotencia}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-2">
                                    <button className="btn btn-primary text-light" type="submit" onClick={updateDimensionamento}>
                                        Atualizar
                                    </button>
                                </div>

                            </div>

                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default EditBussinessProduct