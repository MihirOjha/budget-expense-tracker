// ConfirmModal.jsx
import React from 'react';

const ConfirmModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`}>
      <div className="modal-content">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this item?</p>
        <div className="modal-buttons">
          <button className="btn btn--danger" onClick={onConfirm}>
            Yes, delete it
          </button>
          <button className="btn btn--secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
