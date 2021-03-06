const validateFields = fields => {
  const errors = {};
  let valid = true;
  for (const key in fields) {
    const value = fields[key];
    if (!value) {
      valid = false;
      errors[key] = "Can't be empty";
    }
  }

  return { errors, valid };
};

function validateAfield(value) {
  return !value ? "Can't be empty" : "";
}

function validateAllFields(requiredFields, fields) {
  const errors = { ...requiredFields };
  let validAddress = true;
  let validItems = true;
  let atleasOneItem = false;
  let validOthers = true;
  Object.keys(requiredFields).forEach(key => {
    const value = fields[key];
    if (key === "senderAddress" || key === "clientAddress") {
      const address = fields[key];
      const addressErrors = validateFields(address);
      errors[key] = { ...addressErrors.errors };
      validAddress = addressErrors.valid;
    } else if (key === "items") {
      if (fields.items.length) {
        atleasOneItem = true;
        fields.items.forEach((field, index) => {
          const itemErrors = validateFields(field);
          errors.items[index] = itemErrors.errors;
          validItems = itemErrors.valid;
        });
      } else {
        atleasOneItem = false;
        validItems = true;
      }
    } else {
      const error = validateAfield(value);
      if (error) {
        validOthers = false;
        errors[key] = error;
      }
    }
  });

  return {
    ...errors,
    valid: validAddress && validItems && validOthers & atleasOneItem,
    validOthers,
    validItems,
    validFields: validAddress && validOthers && validItems,
  };
}

function areAllFieldsValid(requiredFields, fields) {
  const errors = validateAllFields(requiredFields, fields);
  return errors.validFields;
}
export { validateAfield, validateFields, validateAllFields, areAllFieldsValid };
