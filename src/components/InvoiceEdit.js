import { calcInvoiceTotal, calcPaymentDue } from "../lib/utilities";

import Form from "./Form";
import iconArrowLeft from "../assets/icon-arrow-left.svg";
import "../styles/InvoiceEdit.css";

function InvoiceEdit(props) {
  const handleSubmit = invoice => {
    props.updateInvoice(invoice.id, {
      ...invoice,
      status: "pending",
      paymentDue: calcPaymentDue(invoice),
      total: calcInvoiceTotal(invoice),
    });
  };
  return (
    <div className="InvoiceEdit">
      <div className="InvoiceEdit-content">
        <div className="mb-large hide-go-back">
          <div className="go-back" onClick={props.closeForm}>
            <img src={iconArrowLeft} alt="left arrow" className="mr-medium" />
            <span className="bold">Go back</span>
          </div>
        </div>
        <h1 className="bold font-size-xlarge mb-xxlarge bold-text-color">
          Edit <span className="color-gray-blue">#</span>
          {props.invoice.id}
        </h1>
        <Form
          type="edit"
          closeForm={props.closeForm}
          handleSubmit={handleSubmit}
          initialValues={props.invoice}
        />
      </div>
    </div>
  );
}

export default InvoiceEdit;
