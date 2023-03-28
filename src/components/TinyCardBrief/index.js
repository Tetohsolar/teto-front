import "./style.scss";

const data = [
  {
    id: 1,
    customer: "João dos Santos",
    seller: "Ana Silva",
    proposal: "2023030001",
  },
];

export default function TinyCardBrief(props) {
  return (
    <div>
      <h6 className="card-content-title mb-3 fw-semibold">{props.title}</h6>
      <div className="widget">
        {data.map((item) => {
          return (
            <span
              key={item.id}
            >
              {item.customer}
            </span>
          );
        })}
      </div>
    </div>
  );
}
