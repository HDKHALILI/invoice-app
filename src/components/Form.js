import { useState } from "react";

import InputField from "./InputField";
import ItemListInput from "./ItemListInputs";
import "../styles/Form.css";

function Form(props) {
  const [itemInputs, setItemInputs] = useState([<ItemListInput />]);
  const addItemInputs = () => {
    setItemInputs([...itemInputs, <ItemListInput />]);
  };

  return (
    <form className="Form color-gray-blue">
      <div className="Form-from">
        <p className="mb-large bold">Bill From</p>
        <div className="Form-address">
          <div className="Form-street-address mb-large">
            <InputField
              type="text"
              name="street"
              value="Street Address"
              label="Street Address"
            />
          </div>
          <div className="Form-address-parts">
            <div className="Form-city-postcode">
              <InputField type="text" name="city" value="" label="City" />
              <InputField
                type="text"
                name="postCode"
                value=""
                label="Post Code"
              />
            </div>
            <div className="Form-country">
              <InputField type="text" name="country" value="" label="Country" />
            </div>
          </div>
        </div>
      </div>
      <div className="Form-to">
        <p className="mb-large bold">Bill To</p>
        <div>
          <InputField
            type="text"
            name="clientName"
            value=""
            label="Client's Name"
          />
        </div>
        <div className="mt-large">
          <InputField
            type="email"
            name="clientEmail"
            value=""
            label="Client's Email"
          />
        </div>
        <div className="Form-address mt-large">
          <div className="Form-street-address mb-large">
            <InputField
              type="text"
              name="street"
              value="Street Address"
              label="Street Address"
            />
          </div>
          <div className="Form-address-parts">
            <div className="Form-city-postcode">
              <InputField type="text" name="city" value="" label="City" />
              <InputField
                type="text"
                name="postCode"
                value=""
                label="Post Code"
                className="mr-small"
              />
            </div>
            <div className="Form-country">
              <InputField type="text" name="country" value="" label="Country" />
            </div>
          </div>
        </div>
      </div>
      <div className="Form-date-terms">
        <InputField type="date" name="createdAt" label="Invoice Date" />
        <fieldset className="Form-payment-terms">
          <label className="mb-small">Payment Terms</label>
          <select name="paymentTerms" defaultValue={30}>
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
          label="Project Description"
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
        {itemInputs.map(itemInput => itemInput)}
        <button className="btn" type="button" onClick={addItemInputs}>
          + Add New Item
        </button>
      </div>
      <div className="Form-control-buttons">
        {props.type === "edit" ? (
          <div className="Form-edit-buttons">
            <button className="btn btn-cancel mr-small">Cancel</button>
            <button className="btn btn-violet">Save Changes</button>
          </div>
        ) : (
          <div className="Form-new-buttons">
            <div className="cancel">
              <button type="button" className="btn btn-cancel">
                {props.type === "edit" ? "Cancel" : "Discard"}
              </button>
            </div>
            <div className="Form-save-buttons">
              <button type="submit" className="btn btn-draft mr-small">
                Save as Draft
              </button>
              <button type="submit" className="btn btn-violet">
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
