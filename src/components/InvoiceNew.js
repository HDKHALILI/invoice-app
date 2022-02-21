import getId from "../lib/generateId";
import { calcInvoiceTotal, calcPaymentDue } from "../lib/utilities";
import Form from "./Form";

import "../styles/InvoiceNew.css";

const INITIAL_VALUE = {
  createdAt: "",
  description: "",
  paymentTerms: "",
  clientName: "",
  clientEmail: "",
  senderAddress: {
    street: "",
    city: "",
    postCode: "",
    country: "",
  },
  clientAddress: {
    street: "",
    city: "",
    postCode: "",
    country: "",
  },
  items: [],
};

function InvoiceNew(props) {
  const id = getId();

  const handleSubmit = invoice => {
    const total = calcInvoiceTotal(invoice);
    const paymentDue = calcPaymentDue(invoice);
    props.createInvoice({
      ...invoice,
      id,
      status: "pending",
      paymentDue,
      total: calcInvoiceTotal(invoice),
    });
  };

  const handleDraft = invoice => {
    props.createInvoice({
      ...invoice,
      id,
      status: "draft",
      total: calcInvoiceTotal(invoice),
    });
  };

  return (
    <div className="InvoiceNew">
      <div className="InvoiceNew-content">
        <h1 className="bold font-size-xlarge mb-xxlarge">New Invoice</h1>
        <Form
          type="new"
          closeForm={props.closeForm}
          handleDraft={handleDraft}
          handleSubmit={handleSubmit}
          initialValues={INITIAL_VALUE}
        />
      </div>
    </div>
  );
}

export default InvoiceNew;
