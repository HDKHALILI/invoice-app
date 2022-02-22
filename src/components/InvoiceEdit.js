import Form from "./Form";
import { calcInvoiceTotal, calcPaymentDue } from "../lib/utilities";
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
        <h1 className="bold font-size-xlarge mb-xxlarge">Edit</h1>
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
