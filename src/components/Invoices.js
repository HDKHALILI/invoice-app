import { useState, useEffect, useRef } from "react";

import Invoice from "./Invoice";
import iconPlus from "../assets/icon-plus.svg";
import iconArrowDown from "../assets/icon-arrow-down.svg";

import "../styles/Invoices.css";
import InvoiceNew from "./InvoiceNew";

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

function Invoices(props) {
  const [filterStatus, setFilterStatus] = useState("close");
  const [filters, setFilters] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const ref = useRef(null);

  const handleFilterStatus = () => {
    setFilterStatus(filterStatus === "close" ? "open" : "close");
  };

  const handleFilterChange = event => {
    if (event.target.checked) {
      setFilters([...filters, event.target.value]);
    } else {
      setFilters(filters.filter(value => value !== event.target.value));
    }
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    const clickOutSide = event => {
      if (filterStatus && ref.current && !ref.current.contains(event.target)) {
        handleFilterStatus();
      }
    };

    document.addEventListener("click", clickOutSide);

    return () => {
      document.removeEventListener("click", clickOutSide);
    };
  }, [filterStatus]);

  const filteredInvoices = filterInvoices(props.invoices, filters);

  return (
    <div className="Invoices">
      {showForm && (
        <InvoiceNew
          closeForm={handleShowForm}
          createInvoice={props.createInvoice}
        />
      )}
      <section className="Invoices-header">
        <div className="Invoices-titles">
          <h1>Invoices</h1>
          <p>
            <span className="hidden">There are</span> 7{" "}
            <span className="hidden">total</span> invoices
          </p>
        </div>
        <div className="Invoices-actions" ref={ref}>
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
                    checked={filters.includes("paid")}
                    className="checkbox"
                    onChange={handleFilterChange}
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
                    checked={filters.includes("pending")}
                    className="checkbox"
                    onChange={handleFilterChange}
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
                    checked={filters.includes("draft")}
                    className="checkbox"
                    onChange={handleFilterChange}
                  />
                  <label htmlFor="draft" className="bold">
                    Draft
                  </label>
                </li>
              </ul>
            )}
          </div>
          <button
            className="btn btn-violet Invoices-btn bold color-white"
            onClick={handleShowForm}
          >
            <img
              src={iconPlus}
              alt="plus icon"
              className="Invoices-icon-plus"
            />
            <p>
              New <span className="text-hidden">Invoice</span>
            </p>
          </button>
        </div>
      </section>
      <section className="Invoices-lists">
        {filteredInvoices.map(invoice => (
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

export default Invoices;
