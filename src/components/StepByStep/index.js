import { useState } from "react";
import BusinessFormStep1 from '../BusinessFormStep1'
import BusinessFormStep2 from '../BusinessFormStep2'
import BusinessFormStep3 from '../BusinessFormStep3'
import BusinessFormStep4 from '../BusinessFormStep4'

export default function StepByStep() {
  let [step, setStep] = useState(1);
  function formSteps() {
    switch (step) {
      case 1:
        return <BusinessFormStep1 />;
      case 2:
        return <BusinessFormStep2 />;
      case 3:
        return <BusinessFormStep3 />;
      case 4:
        return <BusinessFormStep4 />;
      default:
        return <BusinessFormStep1 />;
    }
  }

  return (
    <div>
      {/*<!-- Button trigger modal -->*/}
      <button onClick={() => setStep(step = 1)}
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalSbs"
      >
        Launch demo modal
      </button>

      {/*<!-- Modal -->*/}
      <div
        class="modal fade"
        id="exampleModalSbs"
        tabindex="-1"
        aria-labelledby="exampleModalSbsLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalSbsLabel">
                Modal title
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">

              {formSteps()}
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setStep(step - 1)}
                disabled={step === 1}
              >
                Voltar
              </button>
              <button
                className="btn btn-primary"
                onClick={() => step !== 4 && setStep(step + 1)}
              >
                {step === 4 ? "Salvar" : "Próximo"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
