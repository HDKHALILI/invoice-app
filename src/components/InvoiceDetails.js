import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import InvoiceEdit from "./InvoiceEdit";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import iconArrowLeft from "../assets/icon-arrow-left.svg";
import generateId from "../lib/generateId";
import { capitalise } from "../lib/utilities";
import "../styles/InvoiceDetails.css";

function InvoiceDetails(props) {
  const [showEdit, setShowEdit] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const invoice = props.invoices.find(
    invoice => invoice.id === params.invoice_id
  );

  const handleShowEdit = () => {
    setShowEdit(!showEdit);
  };

  const handleMarkAsPaid = () => {
    props.markAsPaid(invoice.id);
  };

  const handleDelete = () => {
    props.deleteInvoice(invoice.id);
    navigate("/");
  };

  const handleConfirmDelete = () => {
    setConfirmDelete(!confirmDelete);
  };

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
  } = invoice;

  return (
    <div className="InvoiceDetails">
      {showEdit && (
        <InvoiceEdit
          closeForm={handleShowEdit}
          updateInvoice={props.updateInvoice}
          invoice={invoice}
        />
      )}
      {confirmDelete && (
        <ConfirmDeleteModal
          id={id}
          cancelDelete={handleConfirmDelete}
          deleteInvoice={handleDelete}
        />
      )}
      <div className="InvoiceDetails-main">
        <Link to="/" className="go-back">
          <img src={iconArrowLeft} alt="left arrow" className="mr-medium" />
          <span className="bold">Go back</span>
        </Link>
        <header className="InvoiceDetails-header">
          <div className="InvoiceDetails-status-container">
            <span>Status</span>
            <span className={`status bold bg-${status} color-${status}`}>
              <span>&#9679;</span>
              {capitalise(status)}
            </span>
          </div>
          <div className="InvoiceDetails-actions hidden">
            <button className="btn btn-edit" onClick={handleShowEdit}>
              Edit
            </button>
            <button className="btn btn-delete" onClick={handleConfirmDelete}>
              Delete
            </button>
            <button
              className="btn btn-violet"
              disabled={status === "paid" || status === "draft"}
              onClick={handleMarkAsPaid}
            >
              Mark as Paid
            </button>
          </div>
        </header>
        <section className="InvoiceDetails-content color-gray-blue">
          <div className="InvoiceDetails-content-top-row">
            <div>
              <div className="Invoice-details-id mb-medium font-size-medium">
                <span>#</span>
                <span className="bold-text-color bold">{id}</span>
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
                  <span className="bold font-size-medium mt-medium bold-text-color">
                    {createdAt}
                  </span>
                </div>
                <div>
                  Payment Due
                  <span className="bold font-size-medium mt-medium bold-text-color">
                    {paymentDue}
                  </span>
                </div>
              </div>
              <div className="InvoiceDetails-client">
                <span className="mb-medium">Bill to</span>
                <h1 className="font-size-medium bold-text-color mb-medium">
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
              <span className="bold bold-text-color font-size-medium">
                {clientEmail}
              </span>
            </div>
          </div>
          <div className="InvoiceDetails-content-bottom-row color-gray-blue">
            <div className="InvoiceDetails-items-container">
              <div className="InvoiceDetails-items">
                <span className="mb-xlarge">Item Name</span>
                {items.map(item => (
                  <span
                    key={item.name}
                    className="bold mb-xlarge bold-text-color"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
              <div className="InvoiceDetails-item-qty text-right">
                <span className="mb-xlarge">Qty</span>
                {items.map(item => {
                  const key = generateId();
                  return (
                    <span key={key} className="mb-xlarge">
                      {item.quantity}
                    </span>
                  );
                })}
              </div>
              <div className="InvoiceDetails-item-price text-right">
                <span className="mb-xlarge">Price</span>
                {items.map(item => {
                  const key = generateId();
                  return (
                    <span key={key} className="mb-xlarge">
                      &pound;{item.price}
                    </span>
                  );
                })}
              </div>
              <div className="InvoiceDetails-item-total text-right">
                <span className="mb-xlarge">Total</span>
                {items.map(item => {
                  const key = generateId();
                  return (
                    <span key={key} className="bold bold-text-color mb-xlarge">
                      &pound;{item.total}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="InvoiceDetails-jobs-mobile">
              {items.map(item => (
                <div
                  className="InvoiceDetails-items-container-mobile"
                  key={item.name}
                >
                  <div className="InvoiceDetails-items-mobile mb-xlarge">
                    <span className="bold mb-xsmall bold-text-color">
                      {item.name}
                    </span>
                    <span>
                      {item.quantity} x &pound;{item.price}
                    </span>
                  </div>
                  <div className="InvoiceDetails-item-total-mobile text-right">
                    <span className="bold bold-text-color">
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
          <button className="btn btn-edit" onClick={handleShowEdit}>
            Edit
          </button>
          <button className="btn btn-delete" onClick={handleConfirmDelete}>
            Delete
          </button>
          <button
            className="btn btn-violet"
            disabled={status === "paid" || status === "draft"}
            onClick={handleMarkAsPaid}
          >
            Mark as Paid
          </button>
        </div>
      </footer>
    </div>
  );
}

export default InvoiceDetails;
