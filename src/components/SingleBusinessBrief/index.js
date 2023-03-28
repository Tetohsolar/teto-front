import TinyBarGainChart from "../TinyBarGainChart";
import TinyBarLossesChart from "../TinyBarLossesChart";
import "./style.scss";

export default function SingleBusinessBrief(props) {
  return (
    <div className="p-3 mb-3 bg-white rounded-3">
      <h5 className="card-content-title fw-semibold mb-3">{props.listTitle}</h5>
      <div className="row">
        <div className="col-sm-6 mb-3 mb-sm-0">
          <div className="card border-light-subtle">
            <div className="card-body">
              <h6 className="card-title">Negócios fechados</h6>
              <TinyBarGainChart />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card border-light-subtle">
            <div className="card-body">
              <h6 className="card-title">Negócios perdidos</h6>
              <TinyBarLossesChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
