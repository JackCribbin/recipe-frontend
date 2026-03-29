function ConfirmationPopup({ onConfirmDeletion }) {
    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2 className="modal-title">Delete Recipe</h2>
                <p className="modal-message">Are you sure? This cannot be undone.</p>
                <div className="modal-actions">
                    <button className="modal-button modal-button--danger" onClick={() => onConfirmDeletion(true)}>
                        Delete
                    </button>
                    <button className="modal-button modal-button--cancel" onClick={() => onConfirmDeletion(false)}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationPopup;