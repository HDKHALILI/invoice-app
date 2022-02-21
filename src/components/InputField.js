import { useState } from "react";
import "../styles/InputField.css";

function InputField(props) {
  const { type, value, name, label, error, hideMessage, onChange } = props;
  const showError = error && !hideMessage;
  return (
    <fieldset className={`InputField ${error && "error"}`}>
      <div className="InputField-labels mb-small">
        <label>{label}</label>
        {showError && <span className="color-red hidden">{error}</span>}
      </div>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        className={`InputField-input bold ${error && "invalid"}`}
      />
    </fieldset>
  );
}

export default InputField;
