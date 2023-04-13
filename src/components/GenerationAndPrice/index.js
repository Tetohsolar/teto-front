import GenerationAndPriceDataTable from "../GenerationAndPriceDataTable";
import "./style.scss";

export default function GenerationAndPrice(props) {

  return (
    <div className="mb-3 bg-white rounded-3">
      <h5 className="card-content-title mb-3 fw-semibold">{props.title}</h5>
        <div className="mb-3">
          <div className="card border-light-subtle">
            <div className="card-body">
              <h5 className="card-title">Informações da geração e preço</h5>
              <div className="table-responsive">
                <GenerationAndPriceDataTable />
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}
