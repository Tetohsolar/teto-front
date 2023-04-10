import AnnualVariationChart from "../AnnualVariationChart";
import "./style.scss";

export default function AnnualVariation(props) {

  return (
    <div className="mb-3 bg-white rounded-3">
      <h5 className="card-content-title fw-semibold mb-3">{props.chartTitle}</h5>
      <div className="mb-3 mb-sm-0">
        <div className="card border-light-subtle">
          <div className="card-body pb-5">
            <AnnualVariationChart strokeColor="#A6CDE5" fillColor="#A6CDE5"/>
          </div>
        </div>
      </div>
    </div>
  );
}
