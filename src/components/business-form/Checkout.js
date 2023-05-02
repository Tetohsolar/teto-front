import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import CustomerDataForm from "./CustomerDataForm";
import GeneratorDataForm from "./GeneratorDataForm";
import SystemTypeForm from "./SystemTypeform";
import FinancialSummaryForm from "./FinancialSummaryForm";

const steps = [
  "Dados do cliente",
  "Dados da geradora",
  "Tipo de sistema",
  "Resumo financeiro",
];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <CustomerDataForm />;
    case 1:
      return <GeneratorDataForm />;
    case 2:
      return <SystemTypeForm />;
    case 3:
      return <FinancialSummaryForm />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Container component="main" sx={{ mb: 4 }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ pt: 3, pb: 5 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <h3>Configurar direcionamento de página ao salvar</h3>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {getStepContent(activeStep)}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                Voltar
              </Button>
            )}

            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ mt: 3, ml: 1 }}
              type="submit"
            >
              {activeStep === steps.length - 1 ? "Salvar" : "Próximo"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Container>
  );
}
