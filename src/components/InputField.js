import "../styles/InputField.css";

function InputField(props) {
  const { type, value, name, label, onChange } = props;
  return (
    <fieldset className="InputField">
      <div className="InputField-labels mb-small">
        <label>{label}</label>
        {/* <span className="color-red hidden">error message</span> */}
      </div>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        className="InputField-input bold"
      />
    </fieldset>
  );
}

export default InputField;
