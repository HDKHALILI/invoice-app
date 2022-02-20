import Form from "./Form";

import "../styles/InvoiceEdit.css";

function InvoiceEdit(props) {
  return (
    <div className="InvoiceEdit">
      <div className="InvoiceEdit-content">
        <h1 className="bold font-size-xlarge mb-xxlarge">Edit</h1>
        <Form type="edit" handleCancel={props.handleCancel} />
      </div>
    </div>
  );
}

export default InvoiceEdit;
