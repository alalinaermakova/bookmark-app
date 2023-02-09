import React, { useState, useEffect } from 'react';
import ReactPaginate from "react-paginate";
import BookmarkList from './BookmarkList';
import BookmarkForm from './BookmarkForm';
import EditPopup from './EditPopup';
import {v4 as uuidv4} from 'uuid'; //to generate unique id for each bookmark
import data from '../data/data.json';
import ErrorPopup from './ErrorPopup';
import useValidation from '../hooks/useValidation';


const App = () => {

    const [bookmarks, setBookmarks] = useState(() => {
        // get the bookmarks from localstorage
        const savedBookmarks = localStorage.getItem('bookmarks');
        // if there are bookmarks stored
        if (savedBookmarks) {
            // return the parsed JSON object back to a javascript object
            return JSON.parse(savedBookmarks);
        } else {
            // otherwise return data array
            return data;
        }
    });

    // useEffect to run once the component mounts
    useEffect(()=> {
        /** 
         * change setItem to removeItem to get back previous data
         * add the bookmarks as a dependancy because we want to update
         * localstorage anytime the bookmarks state changes
         **/
        localStorage.removeItem("bookmarks", JSON.stringify(bookmarks));
    }, [bookmarks]);
    
    // to fill the bookmark form 
    const [bookmarkTitle, setBookmarkTitle] = useState('');
    const [bookmarkLink, setBookmarkLink] = useState ('');
    const [showError, checkUrlExists] = useValidation(bookmarkLink);
    

    // use selectedBookmark to open edit popup and edit bookmark
    const [selectedBookmark, setSelectedBookmark] = useState(
        {
            isOpen: false,
            id: '',
            title: bookmarkTitle,
            link: bookmarkLink
        }
    );

    const [isErrorPopupOpened, setIsErrorPopupOpened] = useState(false);

    // using pagination React Hook to display 20 bookmarks on each page
    const [currentPage, setCurrentPage] = useState(0);
    const ITEM_PER_PAGE = 20;
    const offset = currentPage * ITEM_PER_PAGE; // to offset data on each page
    const currentPageBookmarks = bookmarks.slice(offset, offset + ITEM_PER_PAGE)
    const pageCount = Math.ceil(bookmarks.length / ITEM_PER_PAGE);

    const handleUpdateLink = (value) => {
        setBookmarkLink(value)
    }

    const addBookmark = (e) => {
        // prevent the browser default behavior or refreshing the page on submit
        e.preventDefault();
        // putting new bookmarks on the top of the list
        if (bookmarkTitle != '' && bookmarkLink != '') {
            checkUrlExists()
                .then(() => {
                        setBookmarks(prevBookmarks => [
                            {
                                id: uuidv4(),
                                title: bookmarkTitle,
                                link: bookmarkLink,
                            },
                            ...prevBookmarks
                        ]);
                        // clear out the input box after adding a bookmark
                        setBookmarkTitle('');
                        handleUpdateLink('');
              })
              .catch((err) => {
                  console.log(err);
                  setIsErrorPopupOpened(true);
              });
        }
    }

    const deleteBookmark = (id) => {
        setBookmarks(prevBookmarks =>
            prevBookmarks.filter(bookmark => bookmark.id !== id));
    }

     // invokes when we close popup
     function closeEditPopup() {
        setSelectedBookmark({ 
            ...selectedBookmark,
            isOpen: false
        });
    }

    const editBookmark = (data) => {
        const newBookmarks = bookmarks.map(
            bookmark => bookmark.id === data.id? { ...bookmark, title: data.title, link: data.link }: bookmark
        )
        setBookmarks(newBookmarks);
        closeEditPopup();
    }

    const clearAllBookmarks = () => {
        setBookmarks([]);
    }

    // invokes when we click on edit button
    function handleBookmarkEditClicked(bookmark) {
        setSelectedBookmark(
            {
                isOpen: true,
                id: bookmark.id,
                title: bookmark.title,
                link: bookmark.link
            }
        );
    }

    function closeErrorPopup() {
        setIsErrorPopupOpened(false);
    }

    // invokes when we change page
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }
    

    return (
        <div className="app">
            <EditPopup
                selectedBookmark={selectedBookmark}
                onUpdateBookmark={editBookmark}
                setIsErrorPopupOpened={setIsErrorPopupOpened}
                onClose={closeEditPopup} />
            <BookmarkForm
                addBookmark={addBookmark}
                bookmarkTitle={bookmarkTitle}
                setBookmarkTitle={setBookmarkTitle}
                bookmarkLink={bookmarkLink}
                showError={showError}
                setBookmarkLink={handleUpdateLink} />
            <BookmarkList
                bookmarks={currentPageBookmarks}
                deleteBookmark={deleteBookmark}
                onBookmarkEdit={handleBookmarkEditClicked}
                clearAllBookmarks={clearAllBookmarks}/>
            <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
            />
            <ErrorPopup isOpened={isErrorPopupOpened} onClose={closeErrorPopup} />
        </div>
    )
}

export default App;