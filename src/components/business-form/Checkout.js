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
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

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
  const { token, afflitedId, idLogged, afflited } = useContext(AuthContext)

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
    
    
    if (data.tipoPessoa==="F"){
    if (data.name === undefined || data.name === "") {
      toast.error("O Nome é obrigatório")
      return false;

    }}

    if (data.tipoPessoa==="J"){
      
      if (data.name === undefined || data.name === "") {
        toast.error("O Campo Fantasia é obrigatório")
        return false;
  
      }
      if (data.corporateName === undefined || data.corporateName===""){
        toast.error("O Campo Razão Social é obrigatório")
        return false;
      }

      if (data.doc === undefined|| data.doc===""){
        toast.error("O Campo CNPJ é obrigatório")
        return false;
      }

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
      toast.error("O Tipo de Ligação é obrigatório")
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
    console.log("passo ")
    if (activeStep === 0) {
      if (handleValidCustomer()) {
        setActiveStep(activeStep + 1);
        return

      }
    } else

      if (activeStep === 1) {
        if (handleValidGerador()) {
          setActiveStep(activeStep + 1);
          return

        }
      }

      if (activeStep === 2 ||activeStep === 3 ) {
        
          setActiveStep(activeStep + 1);
          return

      }

      if (activeStep === 4) {
        if (handleValidGerador()) {
          saveBusiness(data)
          
          return

        }
      }

     /* else {
        setActiveStep(activeStep + 1);
      }*/


  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };


  const navigate = useNavigate();

  async function saveBusiness(dados,  number, consumption,
    panelpower, avgmonth, validate) {

    
    
    let shares = []
    
    if (dados.possuirateio!==undefined && dados.possuirateio === "S") {

      if (dados.rmodality==='Horos. Azul'){
        dados.rmodality="HA"
    }
    if (dados.rmodality==='Horos. Verde'){
      dados.rmodality="HV"
    }

      const Sahres = 
      {
        id: 1, modality: dados.rmodality, group: dados.rgroup, subgroup: dados.subgroupr, 
        demandaFP: dados.rdemadaFp===''?0: dados.rdemadaFp, 
        energiaFP: dados.renergiaFP===''?0:dados.renergiaFP,
        demandaP: dados.rdemandaP===''?0:  dados.rdemandaP, 
        energiaP: dados.renergiaP===''?0:  dados.renergiaP, 
        avgconsumption: dados.ravgconsumption, suggestedGeneration: dados.rsuggestedGeneration, 
        CIP: parseFloat(String(dados.rcip).replace(",",'.')),
      }


      shares[0] = Sahres; 
    }
    console.log(shares)

    const clientData = {
      id: dados.IdClient,
      fantasy: dados.name?dados.name:"",
      corporatename: dados.corporateName?dados.corporateName:"",
      phone: dados.phone,
      document: dados.doc?dados.doc:"",
      email: dados.email,
      tipo: dados.tipoPessoa,
      zap: dados.zap,
      addInformation: dados.addInformation,
      AffiliatedId: afflitedId,
      Addresses: [
        {
          id: dados.idAdd ? dados.idAdd : undefined,
          street: dados.street?dados.street:"",
          postcode: dados.cep?dados.cep:"", 
          city: dados.city?dados.city:"",
          state: dados.state?dados.state:"",
          neighborhood: dados.neighborhood?dados.neighborhood:"",
          number: dados.number?dados.number:"",
        }
      ]
    }

    if (dados.demadaFp ===''){
      dados.demadaFp = 0
    }
    if (dados.energiaFP ===''){
      dados.energiaFP = 0
    }
    if (dados.demandaP ===''){
      dados.demandaP = 0
    }
    if (dados.energiaP ===''){
      dados.energiaP = 0
    }

    if (dados.cip!==''){
       dados.cip = String(dados.cip).replace(".","")
       dados.cip = String(dados.cip).replace(",",".")
       dados.cip = parseFloat(dados.cip)
    }
    if (dados.flag!==''){
      dados.flag = String(dados.flag).replace(".","")
      dados.flag = String(dados.flag).replace(",",".")
      dados.flag = parseFloat(dados.flag)
   }

   if (dados.modality==='Horos. Azul'){
       dados.modality="HA"
   }
   if (dados.modality==='Horos. Verde'){
     dados.modality="HV"
   }

   let suggestedDesired = 0
   let suggGera = 0
   if (dados.possuirateio!==undefined &&dados.possuirateio==="S" ){
    suggestedDesired = parseFloat(dados['rsuggestedDesired'])
    suggGera =  parseFloat(dados['rsuggestedGeneration'])  + parseFloat(dados['suggestedGeneration']) 
  } else {
     suggGera = dados.suggestedGeneration
     suggestedDesired = parseFloat(dados['suggestedDesired'])
     //console.log("no else"+suggestedDesired, suggGera)
    }
//   console.log("dados do cliente")
  // console.log(suggGera , suggestedDesired)
   
   //return 

    const save = {
      sunIndex: dados.sunIndex, number: number, roof: dados.roof, typeConnection: dados.typeConnection,
      modality: dados.modality, group: dados.group, subgroup: dados.subgroup, demadaFp: dados.demadaFp,
      energiaFp: dados.energiaFP, demandaP: dados.demandaP, energiaP: dados.energiaP,
      avgconsumption: dados.avgconsumption, suggestedGeneration: suggGera,
      suggestedDesired: suggestedDesired, situation: 'Aberta',
      cip: dados.cip, flag: dados.flag, syncindex: dados.synIndex, lost: dados.lost,
      consideredpower: dados.consideredpower, numberborder: dados.numberborder,
      systempower: dados.systempower, consumption: consumption,
      panelpower: dados.panelpower, avgmonth: avgmonth,
      kitprice: dados.kitprice,
      sellercomission: dados.sellercomission,  amountcost: dados.precoCusto, 
      amount: dados.amount, valuesellercomission: dados.valuesellercomission,
      profit: dados.profit, realProfit: dados.realProfit,
      validate: validate, AffiliatedId: afflitedId, ClientId: dados.IdClient,
      type: dados.type, UserId: idLogged, shares: shares, products: dados.produtos, ClientData: clientData
    };

    
    await api.post('/business/create', save
      , {
        headers: {
          'Authorization': `Basic ${token}`
        }

      }).then((response) => {

        navigate("/business/view/" + response.data.business.id)
      }).catch(
        (response) => {
          toast.error(response.response.data.message)
          throw new Error()
        }
      )

  }

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
