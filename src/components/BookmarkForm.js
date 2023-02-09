import moon from '../images/Moon.png';
import halfMoon from '../images/half-moon.jpg';
import React from 'react';

const BookmarkForm = ({ addBookmark, bookmarkTitle, setBookmarkTitle, bookmarkLink, setBookmarkLink, showError }) => {

    return (
        <>
            <div className="profile">
                <img className="profile__img" src={halfMoon}/>
                <h1 className="profile__name">
                    Alina E.
                </h1>
            </div>
            <div className="bookmark-form">
                <img className="bookmark-form__img" src={moon} />
                <h2 className="bookmark-form__title">Add Bookmark</h2>
                <form
                    className="form"
                    onSubmit={addBookmark}>

                        <input
                            id="form-title"
                            type="text"
                            placeholder="enter name for your bookmark"
                            className="form__input form__input--dashed"
                            onChange={e => setBookmarkTitle(e.target.value)}
                            value={bookmarkTitle}/>
                        <label htmlFor="form-title" className="form__label">
                            Example: React online course
                        </label>
                        <input
                            id="form-link"
                            type="url"
                            placeholder="enter link for your bookmark"
                            className="form__input form__input--dashed"
                            onChange={e => setBookmarkLink(e.target.value)}
                            value={bookmarkLink}/>
                        <label
                            htmlFor="form-link"
                            className={`form__label ${showError ? "form__label--invalid" : ''}`}>
                            https://www.example.com
                        </label>
                        <button
                            className={`form__button ${showError ? 'form__button--disabled' : ''}`}
                            onClick={addBookmark}
                            disabled={showError}>
                                add
                        </button>

                </form>
            </div> 
        </>
    )
}

export default BookmarkForm;