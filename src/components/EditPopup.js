import React, { useEffect, useState } from "react";
import useValidation from '../hooks/useValidation';

const EditPopup = ({selectedBookmark, onUpdateBookmark, setIsErrorPopupOpened, onClose}) => {

    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [showError, checkUrlExists] = useValidation(link);

    function handleChangeTitle(e) {
        // set the new state value to what's currently in the input box
        setTitle(e.target.value)
    };

    function handleChangeLink(e) {
        // set the new state value to what's currently in the input box
        setLink(e.target.value)
    };

    function handleSubmit(e) {
        // prevent the browser default behavior or refreshing the page on submit
        e.preventDefault();
        checkUrlExists()
        .then(() => {
            onUpdateBookmark({
                id: selectedBookmark.id,
                title: title,
                link: link
            });

        })
        .catch((err) => {
            console.log(err);
            setIsErrorPopupOpened(true);
        })
    };

    // useEffect to run once the component mounts
    useEffect(() => {
        // taking title and link from bookmark and setting in the popup
        setTitle(selectedBookmark.title);
        setLink(selectedBookmark.link);
    }, [selectedBookmark.isOpen]);

    return (
        <>
            <div className={`popup ${selectedBookmark.isOpen ? "popup--opened" : ''}`}>
                <div className="popup__content">
                    <button
                    onClick={onClose}
                    className="popup__button--close"></button>
                    <h3 className="popup__title">Edit bookmark</h3>
                    <form
                    onSubmit={handleSubmit}
                    className="popup__form">
                        <input
                            className="popup__input popup__input--dashed"
                            id="input-name"
                            name="name"
                            type="text" placeholder="bookmark name"
                            value={title}
                            onChange={handleChangeTitle}>
                        </input>
                        <input
                            className="popup__input popup__input--dashed"
                            id="input-name"
                            name="name"
                            type="text" placeholder="bookmark link"
                            value={link}
                            onChange={handleChangeLink}>
                        </input>
                        <button
                            className={`popup__button ${showError ? 'popup__button--disabled' : ''}`}
                            disabled={showError}>
                                ok
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditPopup;