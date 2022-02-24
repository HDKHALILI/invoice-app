import InputField from "./InputField";

function ItemListInput({
  index,
  name,
  quantity,
  price,
  total,
  onChange,
  deleteItem,
  errors,
}) {
  const handleDelete = event => {
    event.preventDefault();
    deleteItem(index);
  };

  const handleChange = event => {
    onChange(index, event);
  };
  return (
    <div className="Form-items-inputs mb-xlarge">
      <div className="Form-items-name">
        <InputField
          type="text"
          name="name"
          value={name}
          label="Name"
          onChange={handleChange}
          error={errors.name}
          hideMessage={true}
        />
      </div>
      <div className="Form-items-rest">
        <div className="Form-item-qty">
          <InputField
            type="number"
            name="quantity"
            label="Qty"
            value={quantity}
            onChange={handleChange}
            error={errors.quantity}
            hideMessage={true}
          />
        </div>
        <div className="Form-item-price">
          <InputField
            type="number"
            name="price"
            label="Price"
            value={price}
            onChange={handleChange}
            error={errors.price}
            hideMessage={true}
          />
        </div>
        <div className="Form-items-total-container">
          <span>Total</span>
          <span className="Form-item-total">{total || 0}</span>
        </div>
        <div className="Form-item-delete">
          <button type="button" onClick={handleDelete} className="icon-btn">
            {/* <img src={iconDelete} alt="bin icon" /> */}
            <svg width="13" height="16" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
                fillRule="nonzero"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemListInput;
