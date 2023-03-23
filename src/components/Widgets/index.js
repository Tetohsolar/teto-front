import { Link } from 'react-router-dom';
import './style.scss';

const Widget = ({ type }) => {

  let data = {};

  switch (type) {
    case "current-month":
      data = {
        title: "Negócios deste mês",
        isMoney: true,
        link: <Link to={"/"}>Ver todos</Link>,
        icon: (
          <div className="widget-icon widget-wallet-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-hand-thumbs-up-fill"
              viewBox="0 0 16 16"
            >
              <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
            </svg>
          </div>
        ),
        amount: 999.999,
      };
      break;

    case "earnings":
      data = {
        title: "Negócios fechados neste mês",
        isMoney: true,
        link: <Link to={"/"}>Ver todos</Link>,
        icon: (
          <div className="widget-icon widget-hand-thumbs-up-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-wallet-fill"
              viewBox="0 0 16 16"
            >
              <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v2h6a.5.5 0 0 1 .5.5c0 .253.08.644.306.958.207.288.557.542 1.194.542.637 0 .987-.254 1.194-.542.226-.314.306-.705.306-.958a.5.5 0 0 1 .5-.5h6v-2A1.5 1.5 0 0 0 14.5 2h-13z" />
              <path d="M16 6.5h-5.551a2.678 2.678 0 0 1-.443 1.042C9.613 8.088 8.963 8.5 8 8.5c-.963 0-1.613-.412-2.006-.958A2.679 2.679 0 0 1 5.551 6.5H0v6A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-6z" />
            </svg>
          </div>
        ),
        amount: 123.999,
      };
      break;

    case "open-business":
      data = {
        title: "Negócios em aberto",
        isMoney: false,
        link: <Link to={"/"}>Ver todos</Link>,
        icon: (
          <div className="widget-icon widget-basket3-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-basket3-fill"
              viewBox="0 0 16 16"
            >
              <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.468 15.426.943 9h14.114l-1.525 6.426a.75.75 0 0 1-.729.574H3.197a.75.75 0 0 1-.73-.574z" />
            </svg>
          </div>
        ),
        amount: 123,
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
              class="bi bi-emoji-smile-fill"
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

  const totalAmount = 999.999;

  return (
    <div className="p-3 mb-3 bg-white rounded-3">
      <h6 className="card-content-title mb-3 fw-semibold">{data.title}</h6>
      <div className="widget">
        <div>
          <h2 className="fw-light">{ data.isMoney && "R$"} {data.amount}</h2>
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
