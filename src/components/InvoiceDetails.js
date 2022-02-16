import iconArrowLeft from "../assets/icon-arrow-left.svg";
import "../styles/InvoiceDetails.css";

function InvoiceDetails(props) {
  const {
    id,
    createdAt,
    paymentDue,
    description,
    clientName,
    clientEmail,
    status,
    senderAddress,
    clientAddress,
    items,
    total,
  } = props.invoice;
  return (
    <div className="InvoiceDetails">
      <div className="InvoiceDetails-main">
        <div className="go-back">
          <img src={iconArrowLeft} alt="left arrow" className="mr-medium" />
          <span className="bold">Go back</span>
        </div>
        <header className="InvoiceDetails-header">
          <div className="InvoiceDetails-status-container">
            <span>Status</span>
            <span className={`status bold bg-${status} color-${status}`}>
              <span>&#9679;</span>
              {status}
            </span>
          </div>
          <div className="InvoiceDetails-actions hidden">
            <button className="btn btn-edit">Edit</button>
            <button className="btn btn-delete">Delete</button>
            <button className="btn btn-violet">Mark as Paid</button>
          </div>
        </header>
        <section className="InvoiceDetails-content color-gray-blue">
          <div className="InvoiceDetails-content-top-row">
            <div>
              <div className="mb-medium font-size-medium">
                <span>#</span>
                <span className="color-black-900 bold">{id}</span>
              </div>
              <span>{description}</span>
            </div>
            <div className="InvoiceDetails-sender-address">
              <span className="mb-xsmall">{senderAddress.street}</span>
              <span className="mb-xsmall">{senderAddress.city}</span>
              <span className="mb-xsmall">{senderAddress.postCode}</span>
              <span>{senderAddress.country}</span>
            </div>
          </div>
          <div className="InvoiceDetails-content-middle-row">
            <div className="dates-bill-to-container">
              <div className="InvoiceDetails-dates">
                <div>
                  Invoice Date
                  <span className="bold font-size-medium mt-medium color-black-900">
                    {createdAt}
                  </span>
                </div>
                <div>
                  Payment Due
                  <span className="bold font-size-medium mt-medium color-black-900">
                    {paymentDue}
                  </span>
                </div>
              </div>
              <div className="InvoiceDetails-client">
                <span className="mb-medium">Bill to</span>
                <h1 className="font-size-medium color-black-900 mb-medium">
                  {clientName}
                </h1>
                <div className="InvoiceDetails-client-address">
                  <span className="mb-xsmall">{clientAddress.street}</span>
                  <span className="mb-xsmall">{clientAddress.city}</span>
                  <span className="mb-xsmall">{clientAddress.postCode}</span>
                  <span>{clientAddress.country}</span>
                </div>
              </div>
            </div>
            <div className="InvoiceDetails-client-email">
              <span className="mb-medium">Sent to</span>
              <span className="bold color-black-900 font-size-medium">
                {clientEmail}
              </span>
            </div>
          </div>
          <div className="InvoiceDetails-content-bottom-row color-gray-blue">
            <div className="InvoiceDetails-items-container">
              <div className="InvoiceDetails-items">
                <span className="mb-xlarge">Item Name</span>
                {items.map(item => (
                  <span className="bold mb-xlarge color-black-900">
                    {item.name}
                  </span>
                ))}
              </div>
              <div className="InvoiceDetails-item-qty text-right">
                <span className="mb-xlarge">Qty</span>
                {items.map(item => (
                  <span className="mb-xlarge">{item.quantity}</span>
                ))}
              </div>
              <div className="InvoiceDetails-item-price text-right">
                <span className="mb-xlarge">Price</span>
                {items.map(item => (
                  <span className="mb-xlarge">&pound;{item.price}</span>
                ))}
              </div>
              <div className="InvoiceDetails-item-total text-right">
                <span className="mb-xlarge">Total</span>
                {items.map(item => (
                  <span className="bold color-black-900 mb-xlarge">
                    &pound;{item.total}
                  </span>
                ))}
              </div>
            </div>
            <div className="InvoiceDetails-jobs-mobile">
              {items.map(item => (
                <div className="InvoiceDetails-items-container-mobile">
                  <div className="InvoiceDetails-items-mobile mb-xlarge">
                    <span className="bold mb-xsmall color-black-900">
                      {item.name}
                    </span>
                    <span>
                      {item.quantity} x &pound;{item.price}
                    </span>
                  </div>
                  <div className="InvoiceDetails-item-total-mobile text-right">
                    <span className="bold color-black-900">
                      &pound;{item.total}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="InvoiceDetails-total color-gray-blue">
              <span>Amount Due</span>
              <span className="bold color-white font-size-xlarge">
                &pound;{total}
              </span>
            </div>
          </div>
        </section>
      </div>
      <footer className="InvoiceDetails-footer">
        <div className="InvoiceDetails-actions">
          <button className="btn btn-edit">Edit</button>
          <button className="btn btn-delete">Delete</button>
          <button className="btn btn-violet">Mark as Paid</button>
        </div>
      </footer>
    </div>
  );
}

export default InvoiceDetails;
