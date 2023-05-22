import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import CustomerDataForm from "./CustomerDataForm";
import GeneratorDataForm from "./GeneratorDataForm";
import SystemTypeForm from "./TypeSystemform";
import FinancialSummaryForm from "./FinancialSummaryForm";
import ShareForm from "./ShareForm";
import { BsDatabaseDash } from "react-icons/bs";
import { toast } from "react-toastify";

const steps = [
  "Dados do cliente",
  "Dados da geradora",
  "Rateios",
  "Tipo de sistema",
  "Resumo financeiro",

];


function getStepContent(step, data) {
  switch (step) {
    case 0:
      return <CustomerDataForm dados={data} />;
    case 1:
      return <GeneratorDataForm dados={data} />;
    case 2:
      return <ShareForm dados={data} />;
    case 3:
      return <SystemTypeForm dados={data} />;
    case 4:
      return <FinancialSummaryForm dados={data} />;

    default:
      throw new Error("Unknown step");
  }
}

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);

  const [client, setClient] = React.useState("");
  const [sunIndex, setSunIndex] = React.useState("");

  const [data, setData] = React.useState({});

  const updateData = (newData) => {
    setData({ ...data, ...newData });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Aqui você pode realizar validações, atualizar o contexto, etc.
    updateData({ [name]: value });
  };


  const handleValidCustomer = () => {
    if (data.name === undefined || data.name === "") {
      toast.error("O Nome é obrigatório")
      return false;
    }

    if (data.city === undefined || data.city === "") {
      toast.error("A Cidade é obrigatório")
      return false;
    }
    return true
  }


  const handleValidGerador = () => {


    if (data.lost === undefined || data.lost === "") {
      toast.error("A Perca  é obrigatório")
      return false;
    }

    if (data.typeConnection === undefined || String(data.typeConnection) === "") {
      toast.error("O Tipo de Conexão é obrigatório")
      return false;
    }

    if (data.typeConnection === undefined || data.typeConnection === "") {
      toast.error("O tipo de ligação  é obrigatório")
      return false;
    }

    if (data.type === undefined || data.type === "") {
      toast.error("O Tipo do Sistema  é obrigatório")
      return false;
    }


    if (data.cip === undefined || data.cip === "") {
      toast.error("A CIP  é obrigatório")
      return false;
    }

    if (data.flag === undefined || data.flag === "") {
      toast.error("A Bandeira é obrigatório")
      return false;
    }


    if (data.subgroup === undefined || data.subgroup === "") {
      toast.error("O Sub-Grupo é obrigatório")
      return false;
    }

    if (data.group === undefined || data.group === "") {
      toast.error("O Grupo é obrigatório")
      return false;
    }

    if (data.modality === undefined || data.modality === "") {
      toast.error("A Modalidade  é obrigatório")
      return false;
    }

    if (data.modality === undefined || data.modality === "") {
      toast.error("A modalidade é obrigatória")
      return false;
    }

    if (data.group === "B") {
      if (data.avgconsumption === undefined || data.avgconsumption === "") {
        toast.error("O Consumo Médio é obrigatório")
        return false;
      }
    }

    if (data.subgroup === "A3" || data.subgroup === "A4") {
      if (data.avgconsumption === undefined || data.avgconsumption === "") {
        toast.error("O Consumo Médio é obrigatório")
        return false;
      }
    }

    if (data.suggestedDesired === undefined || data.suggestedDesired === "") {
      toast.error("A Geração Desejada é obrigatório")
      return false;
    }

    return true
  }



  const handleValidShare = () => {

    if (data.cip === undefined || data.cip === "") {
      toast.error("A CIP  é obrigatório")
      return false;
    }

    if (data.flag === undefined || data.flag === "") {
      toast.error("A Bandeira é obrigatório")
      return false;
    }


    if (data.subgroup === undefined || data.subgroup === "") {
      toast.error("O Sub-Grupo é obrigatório")
      return false;
    }

    if (data.group === undefined || data.group === "") {
      toast.error("O Grupo é obrigatório")
      return false;
    }

    if (data.modality === undefined || data.modality === "") {
      toast.error("A Modalidade  é obrigatório")
      return false;
    }

    if (data.modality === undefined || data.modality === "") {
      toast.error("A modalidade é obrigatória")
      return false;
    }

    if (data.group === "B") {
      if (data.avgconsumption === undefined || data.avgconsumption === "") {
        toast.error("O Consumo Médio é obrigatório")
        return false;
      }
    }

    if (data.subgroup === "A3" || data.subgroup === "A4") {
      if (data.avgconsumption === undefined || data.avgconsumption === "") {
        toast.error("O Consumo Médio é obrigatório")
        return false;
      }
    }

    if (data.suggestedDesired === undefined || data.suggestedDesired === "") {
      toast.error("A Geração Desejada é obrigatório")
      return false;
    }

    return true
  }


  const handleNext = () => {
    console.log("passo " + activeStep)
    if (activeStep === 0) {
      if (handleValidCustomer()) {
        setActiveStep(activeStep + 1);
        return

      }
    }else

    if (activeStep === 1) {
      if (handleValidGerador()) {
        setActiveStep(activeStep + 1);
        return

      }
    }

    else {
      setActiveStep(activeStep + 1);
    }
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
          {getStepContent(activeStep, data)}
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
