import "../styles/ConfirmDeleteModal.css";

function ConfirmDeleteModal(props) {
  const { id, cancelDelete, deleteInvoice } = props;
  return (
    <div className="ConfirmDeleteModal">
      <div className="ConfirmDeleteModal-body">
        <h2 className="font-size-xlarge">Confrim Deletion</h2>
        <p className="color-gray-blue">
          Are you sure you want to delete invoice{" "}
          <span className="bold">{id}</span>? This action cannot be undone.
        </p>
        <div className="ConfirmDeleteModal-buttons">
          <button className="btn btn-cancel mr-small" onClick={cancelDelete}>
            Cancel
          </button>
          <button className="btn btn-delete" onClick={deleteInvoice}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
