import iconArrowRight from "../assets/icon-arrow-right.svg";
import "../styles/Invoice.css";

function Invoice(props) {
  const { id, paymentDue, clientName, total, status } = props;
  return (
    <a href="/" className="Invoice">
      <div className="Invoice-basic-info color-gray-blue">
        <div className="Invoice-id-duedate">
          <div>
            <span>#</span>
            <span className="color-black-900 bold">{id}</span>
          </div>
          <span>Due {paymentDue}</span>
        </div>
        <span>{clientName}</span>
      </div>
      <div className="Invoice-amount-info">
        <div className="Invoice-amount">
          <span className="color-black-900 bold">&pound;{total}</span>
        </div>
        <div className={`Invoice-status bold bg-${status} color-${status}`}>
          <span>&#9679;</span>
          {status}
        </div>
        <div className="Invoice-arrow-left">
          <img src={iconArrowRight} alt="arrow right" />
        </div>
      </div>
    </a>
  );
}

export default Invoice;
