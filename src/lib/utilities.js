const calcInvoiceTotal = invoice => {
  let total = 0;
  invoice.items.forEach(item => (total += item.total));
  return total;
};

const calcItemTotal = item => {
  if (item.quantity && item.price) {
    return item.quantity * item.price;
  }

  return 0;
};

const calcPaymentDue = invoice => {
  if (!invoice.createdAt) return "";
  const date = new Date(invoice.createdAt);
  date.setDate(date.getDate() + Number(invoice.paymentTerms));
  return date.toISOString().slice(0, 10);
};

const toNumber = target => {
  if (target.type === "number" && target.value) {
    return Number(target.value);
  }

  return target.value;
};

export { calcPaymentDue, calcInvoiceTotal, calcItemTotal, toNumber };
