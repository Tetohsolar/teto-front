import "./style.scss";

export default function SingleBusinessDetails(props) {
  return (
    <div className="p-3 mb-3 bg-white rounded-3">
      <h5 className="card-content-title mb-3 fw-semibold">{props.title}</h5>
      <div className="row">
        <div className="col-sm-6 mb-3 mb-sm-0">
          <div className="card border-light-subtle">
            <div className="card-body">
              <h6 className="card-title">Informações básicas</h6>
              <div className="table-responsive">
                <table className="table caption-top table-sm">
                  <tbody>
                    <tr>
                      <td>a</td>
                      <td>b</td>
                    </tr>
                    <tr>
                      <td>c</td>
                      <td>d</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 mb-3 mb-sm-0">
          <div className="card border-light-subtle">
            <div className="card-body">
              <h6 className="card-title">Endereço</h6>
              <div className="table-responsive">
                <table className="table caption-top table-sm">
                  <tbody>
                    <tr>
                      <td>a</td>
                      <td>b</td>
                    </tr>
                    <tr>
                      <td>c</td>
                      <td>d</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
