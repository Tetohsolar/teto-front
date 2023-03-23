import SynchronizedAreaChart from "../SynchronizedAreaChart";
import "./style.scss";

export default function SixMonthLargeChart(props) {
  return (
    <div className="p-3 mb-3 bg-white rounded-3">
      <h5 className="card-content-title fw-semibold mb-3">{props.chartTitle}</h5>
      <div className="mb-3 mb-sm-0">
        <div className="card border-light-subtle">
          <div className="card-body pb-5">
            <SynchronizedAreaChart strokeColor="#A6CDE5" fillColor="#A6CDE5"/>
          </div>
        </div>
      </div>
    </div>
  );
}
