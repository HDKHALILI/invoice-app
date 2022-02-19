import InputField from "./InputField";
import iconDelete from "../assets/icon-delete.svg";

function ItemListInput(props) {
  return (
    <div className="Form-items-inputs mb-large">
      <div className="Form-items-name">
        <InputField type="text" name="name" />
      </div>
      <div className="Form-items-rest">
        <div className="Form-item-qty">
          <InputField type="number" name="quantity" />
        </div>
        <div className="Form-item-price">
          <InputField type="number" name="price" />
        </div>
        <div className="Form-items-total-container">
          <span className="Form-item-total">156.00</span>
        </div>
        <div className="Form-item-delete">
          <button type="button">
            <img src={iconDelete} alt="bin icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemListInput;
