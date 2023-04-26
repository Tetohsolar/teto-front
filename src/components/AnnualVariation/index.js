import AnnualVariationChart from "../AnnualVariationChart";
import "./style.scss";

export default function AnnualVariation(props) {
  return <AnnualVariationChart  data={props.data} strokeColor="#A6CDE5" fillColor="#A6CDE5" />;
}
