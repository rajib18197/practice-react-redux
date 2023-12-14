import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useAddBookMutation, useUpdateBookMutation } from "../features/books/booksApi";
import { showToast } from "../features/books/booksSlice";
import InputRow from "./InputRow";

export default function Form({bookToUpdate = {}}) {
  const isUpdateSession = bookToUpdate?.id;

  const {id: updateId, name: updateBookName, author: updateAuthorName, thumbnail: updateThumbnail, price: updatePrice, rating: updateRating, featured} = bookToUpdate;

  const [name, setname] = useState(isUpdateSession ? updateBookName : '');
  const [author, setAuthor] = useState(isUpdateSession ? updateAuthorName : '');
  const [thumbnail, setThumbnail] = useState(isUpdateSession ? updateThumbnail : '');
  const [price, setPrice] = useState(isUpdateSession ? updatePrice : 0);
  const [rating, setRating] = useState(isUpdateSession ? updateRating : 0);
  const [hasFeatured, setHasFeatured] = useState(isUpdateSession ? featured : false);

  const [addBook, {data: newBook, isLoading: isCreating, isSuccess: isBookAddedSuccess, isError: isCreateError}] = useAddBookMutation();
  const [updateBook, {data: updatedBook, isLoading: isUpdating, isSuccess: isBookUpdateSuccess, isError: isUpdateError}] = useUpdateBookMutation()

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(function(){
    if(newBook?.id || updatedBook?.id){
      if(isUpdateSession){
        dispatch(showToast({status: 'success', message: `${updatedBook.name} book was updated succesfully`}));
      }else{
        dispatch(showToast({status: 'success', message: `${newBook.name} book was added successfully`}))
      }
      navigate('/books');
    }
  }, [newBook?.id, updatedBook?.id, navigate])

  function handleSubmit(e){
    e.preventDefault();

    if(isUpdateSession){
      updateBook({id: updateId, updatedBook: {name, author, thumbnail, price, rating, featured: hasFeatured}})
      return;
    }

    addBook({name, author, thumbnail, price, rating, featured: hasFeatured})
  }

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      
      <InputRow label={"Book Name"}>
        <input
          required
          className="text-input"
          type="text"
          id="lws-bookName"
          name="name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          disabled={isCreating || isUpdating}
        />
      </InputRow>

      <InputRow label={"Author"}>
        <input
          required
          className="text-input"
          type="text"
          id="lws-author"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          disabled={isCreating || isUpdating}
        />
      </InputRow>

      <InputRow label={"Image Url"}>
        <input
          required
          className="text-input"
          type="text"
          id="lws-thumbnail"
          name="thumbnail"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          disabled={isCreating || isUpdating}
        />
      </InputRow>

      <div className="grid grid-cols-2 gap-8 pb-4">
        <InputRow label={"Price"}>
          <input
            required
            className="text-input"
            type="number"
            id="lws-price"
            name="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            disabled={isCreating || isUpdating}
          />
        </InputRow>

        <InputRow label={"Rating"}>
          <input
            required
            className="text-input"
            type="number"
            id="lws-rating"
            name="rating"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            disabled={isCreating || isUpdating}
          />
        </InputRow>
      </div>

      <div className="flex items-center">
        <input
          id="lws-featured"
          type="checkbox"
          name="featured"
          className="w-4 h-4"
          checked={hasFeatured}
          onChange={() => setHasFeatured(featured => !featured)}
          disabled={isCreating || isUpdating}
        />
        <label for="lws-featured" className="ml-2 text-sm">
          This is a featured book
        </label>
      </div>

      <button type="submit" className="submit" id="lws-submit" disabled={isCreating || isUpdating}>
        {isUpdateSession ? 'Update Book' : 'Add Book'}
      </button>

  
    </form>
  );
}
