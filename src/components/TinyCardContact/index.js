import "./style.scss";

const data = [
  {
    id: 1,
    status: "Em aberto",
  },
];

export default function TinyCardContact(props) {
  return (
    <div>
      <h6 className="card-content-title mb-3 fw-semibold">{props.title}</h6>
      <div className="widget">
        {data.map((item) => {
          return (
            <span
              key={item.id}
              className="badge rounded-pill text-bg-blue text-primary"
            >
              {item.status}
            </span>
          );
        })}
      </div>
    </div>
  );
}
