import { Link } from "react-router-dom";
import iconArrowRight from "../assets/icon-arrow-right.svg";
import "../styles/Invoice.css";

function Invoice(props) {
  const { id, paymentDue, clientName, total, status } = props;
  return (
    <Link to={`details/${id}`} href="/" className="Invoice">
      <div className="Invoice-basic-info color-gray-blue">
        <div className="Invoice-id-duedate">
          <div className="Invoice-id">
            <span>#</span>
            <span className="color-black-900 bold">{id}</span>
          </div>
          <span className="Invoice-duedate">Due {paymentDue}</span>
        </div>
        <span className="Invoice-client-name">{clientName}</span>
      </div>
      <div className="Invoice-amount-info">
        <div className="Invoice-amount">
          <span className="color-black-900 bold">&pound;{total}</span>
        </div>
        <div className={`Invoice-status bold bg-${status} color-${status}`}>
          <span>&#9679;</span>
          {status}
        </div>
        <div className="Invoice-arrow-left hidden">
          <img src={iconArrowRight} alt="arrow right" />
        </div>
      </div>
    </Link>
  );
}

export default Invoice;
