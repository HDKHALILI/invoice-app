import { useState } from "react";
import "../styles/InputField.css";

function InputField(props) {
  const { type, value, name, label, error, hideMessage, formType, onChange } =
    props;
  const showError = error && !hideMessage;
  return (
    <fieldset className={`InputField ${error && "error"}`}>
      <div className="InputField-labels mb-small">
        <label className={formType === "edit" ? "disabled" : ""}>{label}</label>
        {showError && <span className="color-red">{error}</span>}
      </div>
      <input
        type={type}
        value={value}
        name={name}
        disabled={formType === "edit"}
        onChange={onChange}
        className={`InputField-input bold ${error && "invalid"}`}
      />
    </fieldset>
  );
}

export default InputField;
