import './home.scss';
import { useContext } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { SidebarWrapperContext } from '../../context/SidebarWrapperContext';
import Widget from '../../components/Widget';
import SixMonthLargeChart from '../../components/SixMonthLargeChart';
import SixMonthsBusinessDataTable from '../../components/SixMonthsBusinessDataTable';
import { AuthContext } from '../../context/AuthContext';
import { useState } from 'react';
import { useEffect } from 'react';
import api from '../../api';
const meses = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
];
const Home = () => {
  const { sidebarWrapper } = useContext(SidebarWrapperContext);
  const { token, AffiliatedId, profilelogged, idLogged } = useContext(AuthContext)
  const [data, setData] = useState([{ name: 'joel', amt: 18 }])
  const [dataGraph, setDataGraph] = useState([{ name: 'mar', amt: 0 }])
  const [total, setTotal] = useState(0.0)
  const [totalGanho, setTotalGanho] = useState(0.0)

  const [totalEmAberto, setTotalEmAberto] = useState(0.0)

  async function getData(situacao, Opercao) {
    const data = [
      {
        name: "4/2022",
        amt: 0,
      }


    ];

    let filtro = {
      situation: situacao,
      AffiliatedId: AffiliatedId,
      UserId: idLogged,
      Opercao: Opercao
    }

    if (profilelogged === "Admin") {
      filtro = {
        situation: situacao,
        AffiliatedId: AffiliatedId,
        Opercao: Opercao
      }
    }

    if (profilelogged === "Root") {
      filtro = {
        situation: situacao,
        Opercao: Opercao

      }
    }



    await api.post('business/lastMonth', filtro,
      {
        headers: {
          'Authorization': `Basic ${token}`
        }

      }).then(
        (response) => {
          if (response.data && response.data.length !== 0) {
            if (Opercao == "SUM") {
              if (situacao === "Ganhos") {
                const numeroFormatado = response.data[0].soma_total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                setTotalGanho(numeroFormatado)
              }
              else {
                const numeroFormatado = response.data[0].soma_total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                setTotal(numeroFormatado)
              }
            }

            if (Opercao === "COUNT") {
              setTotalEmAberto(response.data[0].soma_total)
            }

          } else {
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const currentYar = currentDate.getFullYear();

            const data = [
              {
                name: currentMonth + "/" + currentYar,
                amt: 0,
              }]
            setData(data)
            console.log(data)
          }
          //setData(response.data)
        }
      ).catch(erro => {
        setData(data)
        console.log("erro")
      })
    //setData(data)


  }

  async function getDataGraph() {
    const data = [
      {
        name: "4/2022",
        amt: 0,
      }


    ];

    let filtro = {
      AffiliatedId: AffiliatedId,
      UserId: idLogged,
    }

    if (profilelogged === "Admin") {
      filtro = {
        AffiliatedId: AffiliatedId,
      }
    }

    if (profilelogged === "Root") {
      filtro = {
    
      }
    }



    await api.post('business/lastsix', filtro,
      {
        headers: {
          'Authorization': `Basic ${token}`
        }

      }).then(
        (response) => {
          if (response.data && response.data.length !== 0) {
            let saida = []
            
            response.data.forEach(objeto => {
              const novo ={
                amt:objeto.amt,
                name: meses[objeto.name-1]
              }
              saida.push(novo)

             });


            setDataGraph(saida)
            


          } else {
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const currentYar = currentDate.getFullYear();

            const data = [
              {
                name: currentMonth + "/" + currentYar,
                amt: 0,
              }]
            setData(data)
            console.log(data)
          }
          //setData(response.data)
        }
      ).catch(erro => {
        setData(data)
        console.log("erro")
      })
    //setData(data)


  }

  useEffect(() => {
    getData(null, 'SUM');
    getData("Ganhos", 'SUM');
    getData("Aberta","COUNT")
    getDataGraph()
    return () => { }
  }, [])

  return (
    <div className="home">
      <Navbar />
      <div
        className={sidebarWrapper ? "d-flex wrapper toggled" : "d-flex wrapper"}
      >
        <Sidebar activeButtonHome="active" />
        <div id="page-content-wrapper" className="container-fluid bg-home py-4">
          <h5 className="pb-3">Dashboard</h5>
          <div className="row">
            <div className="col-lg-4">
              <Widget
                type="current-month"
                cardContentHome="card-content-home"
                valor={total}
              />
            </div>
            <div className="col-lg-4">
              <Widget type="earnings" cardContentHome="card-content-home" valor={totalGanho} />
            </div>
            <div className="col-lg-4">
              <Widget
                type="open-business"
                cardContentHome="card-content-home"
                valor={totalEmAberto}
              />
            </div>
          </div>
          <SixMonthLargeChart chartTitle="Últimos 6 meses" data={dataGraph}/>
          <SixMonthsBusinessDataTable listTitle="Mês atual" />
        </div>
      </div>
    </div>
  );
};

export default Home;
