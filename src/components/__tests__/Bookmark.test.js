import React from "react";
import {cleanup, fireEvent, render} from '@testing-library/react';
import Bookmark from '../Bookmark'

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

const props = {
    id: '1111-1111-1111-1111',
    title: "Collier point",
    link: "https://collier.point",
    onEdit: jest.fn(),
    onDelete: jest.fn()
}

it('should render component title properly', () => {
  // given  
  const title = "Collier point"

  // when/then
  const { queryByText } = render(
    <Bookmark {...props} />,
  );
  expect(queryByText(title)).toBeTruthy();
});

it('should call edit/delete callbacks with bookmark id on btn click', () => {
  // given
 
  // when/then
  const { getByTestId } = render(
    <Bookmark {...props} />,
  );
  const editBtn = getByTestId('edit-btn')
  const deleteBtn = getByTestId('delete-btn')

  fireEvent.click(editBtn)
  expect(props.onEdit).toHaveBeenCalledWith(props.id) 

  fireEvent.click(deleteBtn)
  expect(props.onDelete).toHaveBeenCalledWith(props.id)
})