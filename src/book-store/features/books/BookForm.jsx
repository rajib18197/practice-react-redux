import { useRef, useState } from "react";
import Heading from "../../ui/Heading";
import InputRow from "../../ui/InputRow";
import { useDispatch, useSelector } from "react-redux";
import { createBookThunk, updateBookThunk } from "./thunks";
import { getState } from "./booksSlice";

export default function BookForm() {
  const { updatingBook } = useSelector(getState);
  const isUpdateSession = updatingBook?.id ? true : false;
  console.log(updatingBook, isUpdateSession);
  const ref = useRef();

  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [hasFeatured, setHasFeatured] = useState(undefined);

  const dispatch = useDispatch();

  const resetForm = function () {
    setName("");
    setAuthor("");
    setThumbnail("");
    setPrice(0);
    setRating(0);
    setHasFeatured(undefined);
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (isUpdateSession) {
      dispatch(
        updateBookThunk({
          id: updatingBook.id,
          bookToUpdate: {
            name: name || updatingBook.name,
            author: author || updatingBook.author,
            thumbnail: thumbnail || updatingBook.thumbnail,
            price: price || updatingBook.price,
            rating: rating || updatingBook.rating,
            featured:
              hasFeatured !== undefined ? hasFeatured : updatingBook.featured,
          },
        })
      );

    //   resetForm();
      return;
    }

    dispatch(
      createBookThunk({
        name,
        author,
        thumbnail,
        price: +price,
        rating: +rating,
        featured: hasFeatured,
      })
    );

    // resetForm();
    // e.target.reset();
    ref.current.reset();
  }

  return (
    <div>
      <div className="p-4 overflow-hidden bg-white shadow-cardShadow rounded-md">
        <Heading as="h4" className="mb-8 text-xl font-bold text-center">
          Add New Book
        </Heading>

        <form className="book-form" onSubmit={handleSubmit} ref={ref}>
          <InputRow label={"Book Name"}>
            <input
              required
              className="text-input"
              type="text"
              id="input-Bookname"
              name="name"
              //   key={isUpdateSession ? updatingBook.name : name}
              {...(isUpdateSession
                ? { key: updatingBook.name }
                : { name: name })}
              defaultValue={isUpdateSession ? updatingBook.name : name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputRow>

          <InputRow label={"Author"}>
            <input
              required
              className="text-input"
              type="text"
              id="input-Bookauthor"
              name="author"
              //   key={isUpdateSession ? updatingBook.author : author}
              {...(isUpdateSession
                ? { key: updatingBook.author }
                : { author: author })}
              defaultValue={isUpdateSession ? updatingBook.author : author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </InputRow>

          <InputRow label={"Image Url"}>
            <input
              required
              className="text-input"
              type="text"
              id="input-Bookthumbnail"
              name="thumbnail"
              //   key={isUpdateSession ? updatingBook.thumbnail : thumbnail}
              {...(isUpdateSession
                ? { key: updatingBook.thumbnail }
                : { thumbnail })}
              defaultValue={
                isUpdateSession ? updatingBook.thumbnail : thumbnail
              }
              onChange={(e) => setThumbnail(e.target.value)}
            />
          </InputRow>

          <div className="grid grid-cols-2 gap-8 pb-4">
            <InputRow label={"Price"}>
              <input
                required
                className="text-input"
                type="number"
                id="input-Bookprice"
                name="price"
                // key={isUpdateSession ? updatingBook.price : price}
                {...(isUpdateSession
                  ? { key: updatingBook.price }
                  : { price: price })}
                defaultValue={
                  isUpdateSession && price === 0 ? updatingBook.price : price
                }
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </InputRow>

            <InputRow label={"Rating"}>
              <input
                required
                className="text-input"
                type="number"
                id="input-Bookrating"
                name="rating"
                min="1"
                max="5"
                // key={isUpdateSession ? updatingBook.rating : rating}
                {...(isUpdateSession
                  ? { key: updatingBook.rating }
                  : { rating: rating })}
                defaultValue={
                  isUpdateSession && rating === 0 ? updatingBook.rating : rating
                }
                onChange={(e) => setRating(Number(e.target.value))}
              />
            </InputRow>
          </div>

          <div className="flex items-center">
            <input
              id="input-Bookfeatured"
              type="checkbox"
              name="featured"
              className="w-4 h-4"
              checked={
                isUpdateSession && hasFeatured === undefined
                  ? updatingBook.featured
                  : hasFeatured
              }
              onChange={() => {
                if (isUpdateSession && hasFeatured === undefined) {
                  setHasFeatured(updatingBook.featured === true ? false : true);
                } else {
                  setHasFeatured((featured) => !featured);
                }
              }}
            />
            <label htmlFor="featured" className="ml-2 text-sm">
              This is a featured book
            </label>
          </div>

          <button type="submit" className="submit" id="submit">
            {isUpdateSession ? "Update Book" : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
}
