import './style.scss';

const Card = (props) => {
  return (
    <div className="p-3 mb-3 bg-white rounded-3">
      <h6 className="card-content-title fw-semibold">{props.cardTitle}</h6>
      <div className={props.cardContentHome}></div>
    </div>
  );
};

export default Card;
