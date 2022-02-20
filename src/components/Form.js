import { useState } from "react";

import InputField from "./InputField";
import ItemListInput from "./ItemListInputs";
import "../styles/Form.css";
const initialValues = {
  id: "RT3080",
  createdAt: "2021-08-18",
  paymentDue: "2021-08-19",
  description: "Re-branding",
  paymentTerms: "",
  clientName: "Jensen Huang",
  clientEmail: "jensenh@mail.com",
  status: "paid",
  senderAddress: {
    street: "19 Union Terrace",
    city: "London",
    postCode: "E1 3EZ",
    country: "United Kingdom",
  },
  clientAddress: {
    street: "106 Kendell Street",
    city: "Sharrington",
    postCode: "NR24 5WQ",
    country: "United Kingdom",
  },
  items: [
    {
      name: "Brand Guidelines",
      quantity: 1,
      price: 1800.9,
      total: 1800.9,
    },
    {
      name: "Brand Logo",
      quantity: 1,
      price: 2000.9,
      total: 2000.9,
    },
    {
      name: "Brand redesign",
      quantity: 1,
      price: 3000.9,
      total: 3000.9,
    },
  ],
  total: 1800.9,
};

const ITEM_DEFAULT = {
  name: "",
  quantity: "",
  price: "",
  total: "",
};
function Form(props) {
  const [values, setValues] = useState(props.initialValues);

  const handleChange = ({ target }) => {
    setValues({ ...values, [target.name]: target.value });
  };

  const handleSenderAddressChange = ({ target }) => {
    setValues({
      ...values,
      senderAddress: {
        ...values.senderAddress,
        [target.name]: target.value,
      },
    });
  };

  const handleClientAddressChange = ({ target }) => {
    setValues({
      ...values,
      clientAddress: {
        ...values.clientAddress,
        [target.name]: target.value,
      },
    });
  };

  const handleItemChange = (index, { target }) => {
    let currentItem = { ...values.items[index] };
    const itemsCopy = values.items.slice();
    currentItem = { ...currentItem, [target.name]: target.value };
    // currentItem[target.name] = target.value;
    itemsCopy[index] = currentItem;
    setValues({ ...values, items: itemsCopy });
  };

  const deleteItem = index => {
    const itemsCopy = values.items.slice();
    itemsCopy.splice(index, 1);
    setValues({ ...values, items: itemsCopy });
  };

  const addItem = () => {
    setValues({ ...values, items: [...values.items, ITEM_DEFAULT] });
  };

  const {
    createdAt,
    paymentDue,
    description,
    paymentTerms,
    clientName,
    clientEmail,
    senderAddress,
    clientAddress,
    items,
    total,
  } = values;

  return (
    <form className="Form color-gray-blue">
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
              />
              <InputField
                type="text"
                name="postCode"
                value={senderAddress.postCode}
                label="Post Code"
                onChange={handleSenderAddressChange}
              />
            </div>
            <div className="Form-country">
              <InputField
                type="text"
                name="country"
                value={senderAddress.country}
                label="Country"
                onChange={handleSenderAddressChange}
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
          />
        </div>
        <div className="mt-large">
          <InputField
            type="email"
            name="clientEmail"
            value={clientEmail}
            label="Client's Email"
            onChange={handleChange}
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
              />
              <InputField
                type="text"
                name="postCode"
                value={clientAddress.postCode}
                label="Post Code"
                onChange={handleClientAddressChange}
              />
            </div>
            <div className="Form-country">
              <InputField
                type="text"
                name="country"
                value={clientAddress.country}
                label="Country"
                onChange={handleClientAddressChange}
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
          onChange={handleChange}
        />
        <fieldset className="Form-payment-terms">
          <label className="mb-small">Payment Terms</label>
          <select
            name="paymentTerms"
            value={paymentTerms}
            onChange={handleChange}
          >
            <option value="1">Net 1 Day</option>
            <option value="7">Net 7 Days</option>
            <option value="14">Net 14 Days</option>
            <option value="30">Net 30 Days</option>
          </select>
        </fieldset>
      </div>
      <div className="mt-large">
        <InputField
          type="text"
          name="description"
          value={description}
          label="Project Description"
          onChange={handleChange}
        />
      </div>
      <div className="Form-items">
        <p className="bold font-size-medium mb-large">Item List</p>
        <div className="Form-items-labels">
          <div className="Form-items-labels-name">Item Name</div>
          <div className="Form-items-labels-rest">
            <span>Qty</span>
            <span>Price</span>
            <span className="text-center">Total</span>
            <span> </span>
          </div>
        </div>
        {items.map((item, index) => (
          <ItemListInput
            index={index}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            total={item.total}
            deleteItem={deleteItem}
            onChange={handleItemChange}
          />
        ))}
        <button
          className="btn color-gray-blue mt-medium"
          type="button"
          onClick={addItem}
        >
          + Add New Item
        </button>
      </div>
      <div className="Form-control-buttons">
        {props.type === "edit" ? (
          <div className="Form-edit-buttons">
            <button
              className="btn btn-cancel mr-small"
              onClick={props.handleCancel}
            >
              Cancel
            </button>
            <button className="btn btn-violet">Save Changes</button>
          </div>
        ) : (
          <div className="Form-new-buttons">
            <div className="cancel">
              <button
                type="button"
                className="btn btn-cancel"
                onClick={props.handleDiscard}
              >
                {props.type === "edit" ? "Cancel" : "Discard"}
              </button>
            </div>
            <div className="Form-save-buttons">
              <button type="button" className="btn btn-draft mr-small">
                Save as Draft
              </button>
              <button type="submit" className="btn btn-violet color-white">
                {props.type === "edit" ? "Save Changes" : "Save & Send"}
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}

export default Form;
