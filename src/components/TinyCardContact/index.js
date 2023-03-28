import "./style.scss";

export default function TinyCardContact() {
  const data = {
    status: "Em aberto",
  };

  return (
    <div>
      <h6 className="card-content-title mb-3 fw-semibold">Status</h6>
      <span className="badge rounded-pill text-bg-blue text-primary">
        {data.status}
      </span>
    </div>
  );
}
