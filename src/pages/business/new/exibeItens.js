import React from 'react'

export default function ExibeItens({ lista }) {
  return (
    <div>

      <ul>
        {lista.map((item) => (
          <li>{item.inv.qtde} - {item.inv.model} - {item.inv.marca} </li>
        ))}
      </ul>

    </div>


  )
}
