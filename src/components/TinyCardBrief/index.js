import "./style.scss";

export default function TinyCardBrief({ type }) {
  let data = {};

  switch (type) {
    case "customer":
      data = {
        title: "Contato",
        info: "João dos Santos",
      };
      break;

    case "seller":
      data = {
        title: "Responsável",
        info: "Ana Silva",
      };
      break;

    case "proposal":
      data = {
        title: "Proposta",
        info: "2023030001",
      };
      break;

    default:
      data = {
        title: "Title",
        info: "Info",
      };
      break;
  }

  return (
    <div>
      <h6 className="card-content-title mb-3 fw-semibold">{data.title}</h6>
      <div>
        <p className="mb-0 text-dark">{data.info}</p>
      </div>
    </div>
  );
}
