import React from 'react';
const Bookmark = ({ bookmark, id, title, link, deleteBookmark, onBookmarkEdit }) => {

    // using google api to extract favicon from url and display in a bookmark
    const linkImg = "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=" + bookmark.link + "&size=24";
    
    function handleDelete() {
        deleteBookmark(bookmark.id)
    }

    function handleEdit() {
        onBookmarkEdit(bookmark);
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
                        className="bookmark__button bookmark__button--edit">
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bookmark__button bookmark__button--delete">
                    </button>
                </div>
            </div>
        </>
    )
}

export default Bookmark;