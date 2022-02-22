const validations = {
  createdAt: {
    required: {
      value: true,
      message: "The field is required",
    },
  },
  description: {
    required: {
      value: true,
      message: "The field is required",
    },
  },
  paymentTerm: {
    required: {
      value: true,
      message: "The field is required",
    },
  },
  clientName: {
    required: {
      value: true,
      message: "The field is required",
    },
  },
};

const validateFields = fields => {
  const errors = {};
  let valid = true;
  for (const key in fields) {
    const value = fields[key];
    if (!value) {
      errors[key] = "Can't be empty";
      valid = false;
    }
  }

  return { messages: errors, valid };
};

function validate(invoice) {
  const errors = {};
  let valid = true;
  for (const key in invoice) {
    if (key === "senderAddress") {
      const newErrors = validateFields(invoice.senderAddress);
      errors.senderAddress = newErrors.messages;
      valid = newErrors.valid;
    } else if (key === "clientAddress") {
      const newErrors = validateFields(invoice.clientAddress);
      errors.clientAddress = newErrors.messages;
      valid = newErrors.valid;
    } else if (key === "items") {
      errors.items = [];
      if (invoice.items.length) {
        let validFields = true;
        invoice.items.forEach(item => {
          const newErrors = validateFields(item);
          errors.items.push(newErrors.messages);
          validFields = newErrors.valid;
        });
        valid = validFields;
        console.log("items valid", valid);
      }
    } else {
      const value = invoice[key];
      if (!value) {
        errors[key] = "Can't be empty";
        valid = false;
      }
    }
  }
  return { ...errors, valid };
}

export default validate;
