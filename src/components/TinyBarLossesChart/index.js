import "./style.scss";
import React, { useState, useCallback, useContext, useEffect } from "react";
import { BarChart, Bar, Cell, ResponsiveContainer } from "recharts";
import api from "../../api";
import { AuthContext } from "../../context/AuthContext";


const data = [
  {
    name: "04/2022",
    amt: 80,
  },
  {
    name: "05/2022",
    amt: 36,
  },
  {
    name: "06/2022",
    amt: 72,
  },
  {
    name: "07/2022",
    amt: 44,
  },
  {
    name: "08/2022",
    amt: 80,
  },
  {
    name: "09/2022",
    amt: 96,
  },
  {
    name: "10/2022",
    amt: 12,
  },
  {
    name: "11/2022",
    amt: 36,
  },
  {
    name: "12/2022",
    amt: 72,
  },
  {
    name: "01/2023",
    amt: 44,
  },
  {
    name: "02/2023",
    amt: 80,
  },
  {
    name: "03/2023",
    amt: 96,
  },
];

export default function TinyBarLossesChart(props) {

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
      situation: "Perdas",
      AffiliatedId: afflitedId,
      UserId: idLogged
    }

    if (profilelogged == "Admin") {
      filtro = {
        situation: "Perdas",
        AffiliatedId: afflitedId
      }
    }

    if (profilelogged == "Root") {
      filtro = {
        situation: "Perdas",

      }
    }



    await api.post('business/lastYear', filtro,
      {
        headers: {
          'Authorization': `Basic ${token}`
        }

      }).then(
        (response) => {
          if (response.data && response.data.length!==0) {
              setData(response.data)
         } else{
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth()+1;
          const currentYar = currentDate.getFullYear();

          const data = [
            {
              name: currentMonth+"/"+currentYar,
              amt: 0,
            }]
            setData(data)
         }
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
                fill={index === activeIndex ? "#B02A37" : "#E2868F"}
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
