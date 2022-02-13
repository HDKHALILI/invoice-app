import { useState } from "react";

import Invoice from "./Invoice";
import invoicesData from "../data.json";

function Invoices() {
  const [invoices, setInvoices] = useState(invoicesData);
  return (
    <div className="Invoices">
      <section className="Invoices-header">
        <div>
          <h1>Invoices</h1>
          <p>There are 7 total invoices</p>
        </div>
        <div className="Invoices-actions">
          <select></select>
          <button>New Invoice</button>
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

export default Invoices;
