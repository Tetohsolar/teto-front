import TinyCardBrief from "../TinyCardBrief";
import TinyCardContact from "../TinyCardContact";
import "./style.scss";

export default function SingleBusinessBrief(props) {
  return (
    <div className="p-3 mb-3 bg-white rounded-3">
      <h5 className="card-content-title fw-semibold mb-3">{props.listTitle}</h5>
      <div className="row">
        <div className="col-lg-3 col-sm-6 mb-3 mb-lg-0">
          <div className="card border-0 bg-card height-card">
            <div className="card-body">
              <TinyCardContact />
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6 mb-3 mb-lg-0">
          <div className="card border-0 bg-card height-card">
            <div className="card-body">
              <TinyCardBrief type="customer" />
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6 mb-3 mb-sm-0">
          <div className="card border-0 bg-card height-card">
            <div className="card-body">
              <TinyCardBrief type="seller" />
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="card border-0 bg-card height-card"> 
            <div className="card-body">
              <TinyCardBrief type="proposal"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
