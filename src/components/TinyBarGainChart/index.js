import "./style.scss";
import React, { useState, useCallback, useEffect, useContext } from "react";
import { BarChart, Bar, Cell, ResponsiveContainer } from "recharts";
import api from "../../api";
import { AuthContext } from "../../context/AuthContext";


export default function TinyBarGainChart() {

  const { token, afflitedId, profilelogged, idLogged } = useContext(AuthContext)
  const [data, setData] = useState([{ name: 'joel', amt: 18 }])
  useEffect(() => {
    getData();
    return () => { }
  }, [])

  async function getData() {
    const data = [
      {
        name: "4/2022",
        amt: 0,
      }


    ];

    let filtro = {
      situation: "Ganhos",
      AffiliatedId: afflitedId,
      UserId: idLogged
    }

    if (profilelogged === "Admin") {
      filtro = {
        situation: "Ganhos",
        AffiliatedId: afflitedId
      }
    }

    if (profilelogged === "Root") {
      filtro = {
        situation: "Ganhos",

      }
    }


    console.log(filtro)

    await api.post('business/lastYear', filtro,
      {
        headers: {
          'Authorization': `Basic ${token}`
        }

      }).then(
        (response) => {
          

          if (response.data && response.data.length !== 0) {
            setData(response.data)
            console.log(response.data)
            
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


  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = data[activeIndex];
  const handleClick = useCallback(
    (entry, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <div>
      <ResponsiveContainer width="100%" height={100} >
        <BarChart data={data}>
          <Bar dataKey="amt" onClick={handleClick}>
            {data.map((entry, index) => (
              <Cell
                cursor="pointer"
                fill={index === activeIndex ? "#1B9D67" : "#7AD9B1"}
                key={`cell-${index}`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <span className="content">{`${activeItem.name}: ${activeItem.amt}`}</span>
    </div>
  );
}
