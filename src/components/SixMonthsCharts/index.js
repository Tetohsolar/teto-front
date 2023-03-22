import TinyBarGainChart from "../TinyBarGainChart";
import TinyBarLossesChart from "../TinyBarLossesChart";
import "./style.scss";

export default function SixMonthsCharts(props) {
  return (
    <div className="p-3 mb-3 bg-white rounded-3">
      <h5 className="card-content-title fw-semibold mb-4">{props.listTitle}</h5>
      <div className="row">
        <div className="col-sm-6 mb-3 mb-sm-0">
          <div className="card border-light-subtle">
            <div className="card-body">
              <h6 className="card-title">Fechados</h6>
              <TinyBarGainChart barChartFill="#4AA96C" />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card border-light-subtle">
            <div className="card-body">
              <h6 className="card-title">Perdidos</h6>
              <TinyBarLossesChart barChartFill="#F55C47" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
