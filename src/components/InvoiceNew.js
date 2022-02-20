import Form from "./Form";

import "../styles/InvoiceNew.css";

const INITIAL_VALUE = {
  id: "",
  createdAt: "",
  paymentDue: "",
  description: "",
  paymentTerms: "",
  clientName: "",
  clientEmail: "",
  status: "",
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
  total: 0,
};

function InvoiceNew(props) {
  return (
    <div className="InvoiceNew">
      <div className="InvoiceNew-content">
        <h1 className="bold font-size-xlarge mb-xxlarge">New Invoice</h1>
        <Form
          type="new"
          handleDiscard={props.handleDiscard}
          initialValues={INITIAL_VALUE}
        />
      </div>
    </div>
  );
}

export default InvoiceNew;
