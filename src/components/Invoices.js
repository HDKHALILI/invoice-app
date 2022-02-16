import { useState, useEffect } from "react";

import Invoice from "./Invoice";
import invoicesData from "../data.json";
import iconPlus from "../assets/icon-plus.svg";
import iconArrowDown from "../assets/icon-arrow-down.svg";

import "../styles/Invoices.css";
import InvoiceDetails from "./InvoiceDetails";

function filterInvoices(invoices, filters) {
  if (filters.length === 0) return invoices;

  const filtered = [];
  invoices.forEach(invoice => {
    if (filters.includes(invoice.status)) {
      filtered.push(invoice);
    }
  });

  return filtered;
}

function Invoices() {
  const [invoices, setInvoices] = useState(invoicesData);
  const [filterStatus, setFilterStatus] = useState("close");
  const [filters, setFilters] = useState([]);

  const handleFilterStatus = event => {
    setFilterStatus(filterStatus === "close" ? "open" : "close");
  };

  const handleChange = event => {
    if (event.target.checked) {
      setFilters([...filters, event.target.value]);
    } else {
      setFilters(filters.filter(value => value !== event.target.value));
    }
  };

  useEffect(() => {
    setInvoices(filterInvoices(invoicesData, filters));
  }, [filters, setInvoices]);

  if (true) return <InvoiceDetails invoice={invoices[4]} />;
  else {
    return (
      <div className="Invoices">
        <section className="Invoices-header">
          <div className="Invoices-titles">
            <h1>Invoices</h1>
            <p>
              <span className="hidden">There are</span> 7{" "}
              <span className="hidden">total</span> invoices
            </p>
          </div>
          <div className="Invoices-actions">
            <div className="Invoices-filter-container">
              <span
                className="Invoices-filter-triger bold"
                onClick={handleFilterStatus}
              >
                Filter <span className="hidden">by status</span>
                <img
                  src={iconArrowDown}
                  alt="arrow down"
                  className={`Invoices-arrow-down filter-${filterStatus}`}
                />
              </span>
              {filterStatus === "open" && (
                <ul className="Invoices-filter-options">
                  <li>
                    <input
                      type="checkbox"
                      id="paid"
                      value="paid"
                      className="checkbox"
                      onChange={handleChange}
                    />
                    <label htmlFor="paid" className="bold">
                      Paid
                    </label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      id="pending"
                      value="pending"
                      className="checkbox"
                      onChange={handleChange}
                    />
                    <label htmlFor="pending" className="bold">
                      Pending
                    </label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      id="draft"
                      value="draft"
                      className="checkbox"
                      onChange={handleChange}
                    />
                    <label htmlFor="draft" className="bold">
                      Draft
                    </label>
                  </li>
                </ul>
              )}
            </div>
            <button className="btn btn-violet Invoices-btn bold">
              <img
                src={iconPlus}
                alt="plus icon"
                className="Invoices-icon-plus"
              />
              <p>
                New <span className="hidden">Invoice</span>
              </p>
            </button>
          </div>
        </section>
        <section className="Invoices-lists">
          {invoices.map(invoice => (
            <Invoice
              key={invoice.id}
              id={invoice.id}
              paymentDue={invoice.paymentDue}
              clientName={invoice.clientName}
              status={invoice.status}
              total={invoice.total}
            />
          ))}
        </section>
      </div>
    );
  }
}

export default Invoices;
