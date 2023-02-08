import React from 'react';
const ErrorPopup = ({ isOpened, onClose }) => {
    return (
        <>
            <div className={`popup ${isOpened && 'popup--opened'}`}>
                <div className="popup__content">
                    <button onClick={onClose} className="popup__button--close"></button>
                    <p className="popup__error-text">
                        oops, your link is invalid
                    </p>
                </div>
            </div>
        </>
    )
}

export default ErrorPopup;