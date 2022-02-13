function Invoice(props) {
  return (
    <div className="Invoice">
      <div>
        <div>
          <span>{props.id}</span>
          <span>Due {props.paymentDue}</span>
        </div>
        <span>{props.clientName}</span>
      </div>
      <div>
        <span>{props.total}</span>
        <div className="Invoice-status">
          <span>.</span>
          {props.status}
        </div>
      </div>
    </div>
  );
}

export default Invoice;
