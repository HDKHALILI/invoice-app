import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Nav from "./Nav";
import Invoices from "./Invoices";
import InvoiceDetails from "./InvoiceDetails";
import invoicesData from "../data.json";
import "../styles/App.css";

function App() {
  const [invoices, setInvoices] = useState(
    JSON.parse(localStorage.getItem("invoices")) || invoicesData
  );
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const createInvoice = newInvoice => {
    setInvoices([...invoices, newInvoice]);
  };

  const updateInvoice = (invoiceId, newInvoice) => {
    const updatedInvoices = invoices.map(invoice => {
      return invoice.id === invoiceId ? newInvoice : invoice;
    });

    setInvoices(updatedInvoices);
  };

  const deleteInvoice = invoiceId => {
    setInvoices(invoices.filter(invoice => invoice.id !== invoiceId));
  };

  const markAsPaid = invoiceId => {
    const updatedInvoices = invoices.map(invoice => {
      if (invoice.id === invoiceId) {
        return { ...invoice, status: "paid" };
      }
      return invoice;
    });
    setInvoices(updatedInvoices);
  };

  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
    localStorage.setItem("theme", theme);
  }, [invoices, theme]);

  useEffect(() => {
    if (theme === "dark") {
      document.body.style.backgroundColor = "#141625";
    } else {
      document.body.style.backgroundColor = "#f8f8fb";
    }
  }, [theme]);

  return (
    <div className={`App theme-${theme}`}>
      <header className="App-header">
        <Nav theme={theme} toggleTheme={toggleTheme} />
      </header>
      <main className="App-content">
        <Routes>
          <Route
            path="/"
            element={
              <Invoices invoices={invoices} createInvoice={createInvoice} />
            }
          />
          <Route
            path="/details/:invoice_id"
            element={
              <InvoiceDetails
                invoices={invoices}
                deleteInvoice={deleteInvoice}
                markAsPaid={markAsPaid}
                updateInvoice={updateInvoice}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
