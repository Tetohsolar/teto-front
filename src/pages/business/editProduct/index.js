import { useEffect, useState, useContext } from 'react'
import { SidebarWrapperContext } from '../../../context/SidebarWrapperContext'
import Navbar from '../../../components/navbar/Navbar';
import Sidebar from '../../../components/sidebar/Sidebar';
import { useParams } from 'react-router-dom'
import api from '../../../api';
import { AuthContext } from '../../../context/AuthContext';
import TabelaProdutoEditavel from '../../../components/prods';
import { useNavigate } from "react-router-dom";

const EditBussinessProduct = () => {

    const navigate = useNavigate();
    const [marcas, setMarcas] = useState([])
    const [modeloInversor, setModeloInversor] = useState([])
    const [idSelectedProd, setIdSelectedProd] = useState('')
    const { token } = useContext(AuthContext)
    const { sidebarWrapper } = useContext(SidebarWrapperContext);
    const pageTitle = "Atualização dos Produtos do Projeto";
    const [potenciaModulo, setPotenciaModulo] = useState('465')
    const [listCategory, setListCategory] = useState([])
    const [brands, setBrands] = useState('')
    const [potenciaSistema, setPotenciaSistema] = useState('')
    const [fatorS, setfatorS] = useState(0)
    const [suggestedDesired, setSuggestedDesired] = useState(0)
    const [dadosProdutos, setDadosProdutos] = useState([
        {
            id: 1, type: 3, brand: marcas, model: "", power: potenciaModulo, qtd: 1, brands: [], products: []
        }
    ]);

    async function loadCategorys(type) {
        try {

            await api.get('/typesystem/all', {
                headers: {
                    'Authorization': `Basic ${token}`
                }
            }).then((response) => {
                console.log(response.data.types)
                setListCategory(response.data.types)

            }).catch((error) => {
                // toast.error(error.response.data.message)
            });


        } catch (err) {
            console.log(err)

        }
    }

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
            id: idN, type: 3, brand: '', model: '', power: potenciaModulo, qtd: 1
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

        const filtro = {
            brand: item.brand,
            category: item.TypeSystemId,
            "page": 0,
            "pageSize": 100
        }

        await api.post('/products/byparam', filtro, {
            headers: {
                'Authorization': `Basic ${token}`
            }
        }).then((response) => {
            console.log(response)
            setDadosProdutos(prevDados => {
                const novoDados = [...prevDados];
                const index = novoDados.findIndex(it => it.id === item.id);
                novoDados[index]["products"] = response.data.tutorials;
                return novoDados;
            });
        })

    }
    async function carregaPotencia(item) {

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
                novoDados[index]['power'] = response.data.power;
                novoDados[index]['price'] = response.data.price;

                if (parseInt(item.type) === 3) {
                    let sugg = parseFloat(String(suggestedDesired).replace(".", ''));
                    let potenciaConsiderada = fatorS
                    console.log("potencia")
                    console.log(potenciaConsiderada)
                    let placas = Math.floor((sugg * 12000) / (potenciaConsiderada * response.data.power))
                    console.log("PASSA AQUI " + placas)
                    novoDados[index]["qtd"] = placas;
                    //props.dados.nplacas = placas
                    //props.dados.potenciaSistema = (placas * response.data.power) / 1000
                    //props.dados.panelpower = novoDados[index]["power"]
                    //setPotenciaSistema(props.dados.potenciaSistema)
                    //setNplacas(props.dados.nplacas)
          
                  }

                
                console.log(novoDados)
                return novoDados;
            });
        })

    }
    
    async function onBlurProdutoMarca(item) {


        const filtro = {
            brand: item.brand,
            category: item.TypeSystemId,
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
            products: dadosProdutos
        }
        const t = JSON.stringify(data);
        const saida = JSON.parse(t);
        console.log(saida)

        await api.patch('/business/update/products/' + businessId, saida, {
            headers: {
                'Authorization': `Basic ${token}`
            }

        }).then((response) => {
            navigate("/business/view/" + businessId)

        }).catch((response) => {
            console.log(response)
            //toast.error(response.data.message)
            //throw new Error()
        })

    }
    async function loadbId() {
        console.log('Entrou!!')
        await api.get('/business/get/' + businessId, {
            headers: {
                'Authorization': `Basic ${token}`
            }

        }).then((response) => {
            console.log('Entrou!!')

            loadCategorys()


            if (response.data.products.length > 0) {
                setDadosProdutos(response.data.products)
                for (let i = 0; i < response.data.products.length; i++) {
                    onBlurMarca(response.data.products[i]);
                     onBlurProdutoMarca(response.data.products[i]);
                   // carregaPotencia(response.data.products[i])
                }
            }
            setfatorS(response.data.consideredpower)
            setSuggestedDesired(response.data.suggestedDesired)

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

                                <div className="card-body">
                                    <div className="row d-flex justify-content-start">
                                        <div className="table-responsive">

                                            <TabelaProdutoEditavel token={token} dados={dadosProdutos} handleEdit={handleEditProds}
                                                handleAdd={handleAddProd} setIdSelected={setIdSelectedProd}
                                                handleAfterDel={handleAfterDelProd} marcas={marcas} produtos={modeloInversor} onBlurType={onBlurMarca}
                                                onBlurBrand={onBlurProdutoMarca} carregaPotencia={carregaPotencia} category={listCategory}
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