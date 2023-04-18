import { Link } from 'react-router-dom';
import './style.scss';
import {BsHandThumbsUpFill, BsFillWalletFill, BsBasket3Fill} from "react-icons/bs";

const Widget = ({ type,valor }) => {
  

  let data = {};

  switch (type) {
    case "current-month":
      data = {
        title: "Negócios deste mês",
        isMoney: true,
        link: <Link to={"/"}>Ver todos</Link>,
        icon: (
          <div className="widget-icon widget-wallet-icon">
          <BsHandThumbsUpFill size={25}/>
          </div>
        ),
        amount: valor,
      };
      break;

    case "earnings":
      data = {
        title: "Negócios ganhos neste mês",
        isMoney: true,
        link: <Link to={"/"}>Ver todos</Link>,
        icon: (
          <div className="widget-icon widget-hand-thumbs-up-icon">
            <BsFillWalletFill size={25}/>
          </div>
        ),
        amount: valor,
      };
      break;

    case "open-business":
      data = {
        title: "Negócios em aberto",
        isMoney: false,
        link: <Link to={"/"}>Ver todos</Link>,
        icon: (
          <div className="widget-icon widget-basket3-icon">
            <BsBasket3Fill size={25}/>
          </div>
        ),
        amount: valor,
      };
      break;
    default:
      data = {
        title: "Título",
        isMoney: true,
        link: <Link to={"/"}>Link</Link>,
        icon: (
          <div className="widget-icon widget-basket3-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-emoji-smile-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zM4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z" />
            </svg>
          </div>
        ),
        amount: 0,
      };
      break;
  }

  return (
    <div className="p-3 mb-3 bg-white rounded-3">
      <h6 className="card-content-title mb-3 fw-semibold">{data.title}</h6>
      <div className="widget">
        <div>
          <h2 className="fw-light alinhaDireita">{ data.isMoney && "R$"} {data.amount}</h2>
        </div>
        <div className="d-flex justify-content-between align-items-end">
          <div>{data.link}</div>
          <div>
            {data.icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
