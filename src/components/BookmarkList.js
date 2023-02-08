import Bookmark from './Bookmark';
import React, { useState } from 'react';
import toggleRows from '../images/rows.svg';
import toggleGrid from '../images/grid.svg';

const BookmarkList = ({ bookmarks, deleteBookmark, onBookmarkEdit, clearAllBookmarks }) => {

    // presents our bookmarks either as a gridview or a listview
    const viewName = {grid: 'bookmark-list__grid', rows: 'bookmark-list__rows'};
    const grid = viewName.grid;
    const rows = viewName.rows;
    const [view, setView] = useState(viewName.rows);

    const toggleView = () => {
        view === rows ? setView(grid) : setView(rows)
    }
    
    return (
        < >
            <div className="bookmark-list">
            <div className="bookmark-list__button-box">
                <button className="bookmark-list__button" onClick={clearAllBookmarks}>clear all</button>
                <button
                    className="bookmark-list__toggle-btn"
                    onClick={toggleView}>
                        <img
                            className="bookmark-list__toggle-img"
                            src={view === rows ? toggleGrid : toggleRows}>
                        </img>
                </button>
            </div>
                <div className={view}>
                    {/* map over the bookmarks array which creates a new li element for every bookmark
                    (generating unique key for each bookmark with uuidv4) */}
                    {bookmarks.map(bookmark => {
                        return <Bookmark 
                            key={bookmark.id}
                            bookmark={bookmark}
                            title={bookmark.title}
                            link={bookmark.link}
                            deleteBookmark={deleteBookmark}
                            onBookmarkEdit={onBookmarkEdit}
                        />
                    })}
                </div>
            </div> 
        </>
    )
}

export default BookmarkList;