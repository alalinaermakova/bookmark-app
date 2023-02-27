import React from 'react';

// onDelete
// onEdit

const Bookmark = ({ id, title, link, onDelete, onEdit, linkImg }) => {

    // using google api to extract favicon from url and display in a bookmark
    
    function handleDelete() {
        onDelete(id)
    }

    function handleEdit() {
        onEdit(id);
    }

    return (
        <>
            <div className="bookmark" key={id}>
                <div className="bookmark__box">
                    <img className="bookmark__img" src={linkImg} />
                    <p><a className="bookmark__title" href={link}>{title == '' ? link : title}</a></p>
                </div>
                <div className="bookmark__button-box">
                    <button
                        onClick={handleEdit}
                        className="bookmark__button bookmark__button--edit"
                        data-testid="edit-btn"
                        >
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bookmark__button bookmark__button--delete"
                        data-testid="delete-btn"
                        >
                    </button>
                </div>
            </div>
        </>
    )
}

export default Bookmark;