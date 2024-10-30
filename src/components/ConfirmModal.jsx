// ConfirmModal.jsx
import React from 'react';

const ConfirmModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this expense?</p>
        <div className="modal-buttons">
          <button className="btn btn-confirm" onClick={onConfirm}>
            Yes, delete
          </button>
          <button className="btn btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
