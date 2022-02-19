import FormFields from "./Form";

function InvoiceEdit() {
  return (
    <div className="InvoiceEdit">
      <div className="InvoiceEdit-content">
        <h1 className="bold font-size-xlarge mb-xxlarge">Edit</h1>
        <FormFields type="edit" />
      </div>
    </div>
  );
}

export default InvoiceEdit;
