import { useState, useEffect } from "react";

import { toNumber, calcItemTotal } from "../lib/utilities";
import {
  validateAfield,
  validateAllFields,
  areAllFieldsValid,
} from "../lib/validations";

import InputField from "./InputField";
import ItemListInput from "./ItemListInputs";
import "../styles/Form.css";

const ITEM_DEFAULT = {
  name: "",
  quantity: "",
  price: "",
  total: "",
};

const REQUIRED_FIELDS = {
  createdAt: "",
  description: "",
  paymentTerms: "",
  clientName: "",
  clientEmail: "",
  senderAddress: {
    street: "",
    city: "",
    postCode: "",
    country: "",
  },
  clientAddress: {
    street: "",
    city: "",
    postCode: "",
    country: "",
  },
  items: [],
};

function Form(props) {
  const [values, setValues] = useState(props.initialValues);
  const [errors, setErrors] = useState({ ...REQUIRED_FIELDS, valid: true });

  const handleChange = ({ target }) => {
    setValues({ ...values, [target.name]: target.value });
    setErrors({
      ...errors,
      [target.name]: validateAfield(target.value),
    });
  };

  const handleSenderAddressChange = ({ target }) => {
    setValues({
      ...values,
      senderAddress: {
        ...values.senderAddress,
        [target.name]: target.value,
      },
    });

    const addressErrors = {
      ...errors.senderAddress,
      [target.name]: validateAfield(target.value),
    };

    setErrors({
      ...errors,
      senderAddress: addressErrors,
    });
  };

  useEffect(() => {
    setErrors(errors => {
      const isFormValid = areAllFieldsValid(REQUIRED_FIELDS, values);
      if (!errors.valid) {
        return {
          ...errors,
          allRequired: isFormValid ? "" : "- All fields must be added",
        };
      }

      return errors;
    });
  }, [values]);

  const handleClientAddressChange = ({ target }) => {
    setValues({
      ...values,
      clientAddress: {
        ...values.clientAddress,
        [target.name]: target.value,
      },
    });

    const addressErrors = {
      ...errors.clientAddress,
      [target.name]: validateAfield(target.value),
    };

    setErrors({
      ...errors,
      clientAddress: addressErrors,
    });
  };

  const handleItemChange = (index, { target }) => {
    let currentItem = { ...values.items[index] };
    const itemsCopy = values.items.slice();
    currentItem[target.name] = toNumber(target);
    currentItem.total = calcItemTotal(currentItem);
    itemsCopy[index] = currentItem;
    setValues({ ...values, items: itemsCopy });

    const currentItemError = { ...errors.items[index] };
    const itemErrorCopy = errors.items.slice();
    currentItemError[target.name] = validateAfield(target.value);
    currentItemError.total = "valid";
    itemErrorCopy[index] = currentItemError;
    setErrors({
      ...errors,
      items: itemErrorCopy,
    });
  };

  const deleteItem = index => {
    const itemsCopy = values.items.slice();
    itemsCopy.splice(index, 1);
    setValues({ ...values, items: itemsCopy });
  };

  const addItem = () => {
    setValues({ ...values, items: [...values.items, ITEM_DEFAULT] });
    setErrors({
      ...errors,
      items: [...errors.items],
      validItems: true,
      itemRequired: "",
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const newErrors = validateAllFields(REQUIRED_FIELDS, values);
    const itemsLength = values.items.length;
    if (!newErrors.valid) {
      setErrors({
        ...newErrors,
        itemRequired: !itemsLength ? "- An item must be added" : "",
        allRequired:
          newErrors.validFields && !itemsLength
            ? ""
            : "- All fields must be added",
      });
      return;
    }

    setErrors({
      ...REQUIRED_FIELDS,
      valid: true,
      allRequired: "",
      itemRequired: "",
    });
    props.handleSubmit(values);
    props.closeForm();
  };

  const handleDraft = () => {
    props.handleDraft(values);
    closeForm();
  };

  const {
    createdAt,
    description,
    paymentTerms,
    clientName,
    clientEmail,
    senderAddress,
    clientAddress,
    items,
  } = values;
  const { closeForm } = props;
  return (
    <form className="Form color-gray-blue" onSubmit={handleSubmit}>
      <div className="Form-from">
        <p className="mb-large bold color-violet">Bill From</p>
        <div className="Form-address">
          <div className="Form-street-address mb-large">
            <InputField
              type="text"
              name="street"
              value={senderAddress.street}
              label="Street Address"
              onChange={handleSenderAddressChange}
              error={errors.senderAddress.street}
            />
          </div>
          <div className="Form-address-parts">
            <div className="Form-city-postcode">
              <InputField
                type="text"
                name="city"
                value={senderAddress.city}
                label="City"
                onChange={handleSenderAddressChange}
                error={errors.senderAddress.city}
              />
              <InputField
                type="text"
                name="postCode"
                value={senderAddress.postCode}
                label="Post Code"
                onChange={handleSenderAddressChange}
                error={errors.senderAddress.postCode}
              />
            </div>
            <div className="Form-country">
              <InputField
                type="text"
                name="country"
                value={senderAddress.country}
                label="Country"
                onChange={handleSenderAddressChange}
                error={errors.senderAddress.country}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="Form-to">
        <p className="mb-large bold color-violet">Bill To</p>
        <div>
          <InputField
            type="text"
            name="clientName"
            value={clientName}
            label="Client's Name"
            onChange={handleChange}
            error={errors.clientName}
          />
        </div>
        <div className="mt-large">
          <InputField
            type="email"
            name="clientEmail"
            value={clientEmail}
            label="Client's Email"
            onChange={handleChange}
            error={errors.clientEmail}
          />
        </div>
        <div className="Form-address mt-large">
          <div className="Form-street-address mb-large">
            <InputField
              type="text"
              name="street"
              value={clientAddress.street}
              label="Street Address"
              onChange={handleClientAddressChange}
              error={errors.clientAddress.street}
            />
          </div>
          <div className="Form-address-parts">
            <div className="Form-city-postcode">
              <InputField
                type="text"
                name="city"
                value={clientAddress.city}
                label="City"
                onChange={handleClientAddressChange}
                error={errors.clientAddress.city}
              />
              <InputField
                type="text"
                name="postCode"
                value={clientAddress.postCode}
                label="Post Code"
                onChange={handleClientAddressChange}
                error={errors.clientAddress.postCode}
              />
            </div>
            <div className="Form-country">
              <InputField
                type="text"
                name="country"
                value={clientAddress.country}
                label="Country"
                onChange={handleClientAddressChange}
                error={errors.clientAddress.country}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="Form-date-terms">
        <InputField
          type="date"
          name="createdAt"
          value={createdAt}
          label="Invoice Date"
          formType={props.type}
          onChange={handleChange}
          error={errors.createdAt}
        />
        <fieldset className="Form-payment-terms">
          <label className="mb-small" htmlFor="form-select">
            Payment Terms
          </label>
          <div
            className={`Form-select bold ${errors.paymentTerms && "invalid"}`}
          >
            <select
              name="paymentTerms"
              id="form-select"
              value={paymentTerms}
              onChange={handleChange}
            >
              <option value="">select payment terms</option>
              <option value="1">Net 1 Day</option>
              <option value="7">Net 7 Days</option>
              <option value="14">Net 14 Days</option>
              <option value="30">Net 30 Days</option>
            </select>
            <span className="focus"></span>
          </div>
        </fieldset>
      </div>
      <div className="mt-large">
        <InputField
          type="text"
          name="description"
          value={description}
          label="Project Description"
          onChange={handleChange}
          error={errors.description}
        />
      </div>
      <div className="Form-items">
        <p className="bold font-size-medium mb-xlarge">Item List</p>
        {!items.length && (
          <div className="Form-items-labels">
            <div className="Form-items-labels-name">Item Name</div>
            <div className="Form-items-labels-rest">
              <span>Qty</span>
              <span>Price</span>
              <span className="text-center">Total</span>
              <span> </span>
            </div>
          </div>
        )}
        {items.map((item, index) => (
          <ItemListInput
            key={index}
            index={index}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            total={item.total}
            deleteItem={deleteItem}
            onChange={handleItemChange}
            errors={errors.items[index] || {}}
          />
        ))}
        <button
          className="btn btn-add-item color-gray-blue mt-medium"
          type="button"
          onClick={addItem}
        >
          + Add New Item
        </button>
        <div className="Form-error-messages color-red mt-large">
          <p className="mb-small">{errors.itemRequired}</p>
          <p>{errors.allRequired}</p>
        </div>
      </div>
      <div className="Form-control-buttons">
        {props.type === "edit" ? (
          <div className="Form-edit-buttons">
            <button
              type="button"
              className="btn btn-cancel mr-small"
              onClick={closeForm}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-violet">
              Save Changes
            </button>
          </div>
        ) : (
          <div className="Form-new-buttons">
            <div className="cancel">
              <button
                type="button"
                className="btn btn-cancel"
                onClick={closeForm}
              >
                Cancel
              </button>
            </div>
            <div className="Form-save-buttons">
              <button
                type="button"
                className="btn btn-draft mr-small"
                onClick={handleDraft}
              >
                Save as Draft
              </button>
              <button type="submit" className="btn btn-violet color-white">
                Save & Send
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}

export default Form;
