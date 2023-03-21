import TinyBarChart from "../TinyBarChart/TinyBarChart";
import "./style.scss";

export default function SixMonthsCharts(props) {
  return (
    <div className="p-3 mb-3 bg-white border rounded-3">
      <h5 className="card-content-title fw-semibold">{props.listTitle}</h5>
      <div className="row">
        <div className="col-sm-6 mb-3 mb-sm-0">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Special title treatment</h5>
              <TinyBarChart />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Special title treatment</h5>
              <TinyBarChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
