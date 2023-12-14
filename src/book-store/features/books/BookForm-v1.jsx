import { useEffect, useState } from "react";
import Heading from "../../ui/Heading";
import InputRow from "../../ui/InputRow";
import { useDispatch, useSelector } from "react-redux";
import { createBook, updateBookApi } from "./thunks";
import { getState } from "./booksSlice";

export default function BookForm() {
  const { updatingBook } = useSelector(getState);
  const isUpdateSession = updatingBook?.id ? true : false;
  console.log(updatingBook, isUpdateSession);

  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [hasFeatured, setHasFeatured] = useState(undefined);

  const dispatch = useDispatch();
  useEffect(
    function () {
      if (isUpdateSession) {
        setName(updatingBook.name);
        setAuthor(updatingBook.author);
        setThumbnail(updatingBook.thumbnail);
        setPrice(updatingBook.price);
        setRating(updatingBook.rating);
        setHasFeatured(updatingBook.featured);
      }
    },
    [isUpdateSession]
  );

  const resetForm = function () {
    setName("");
    setAuthor("");
    setThumbnail("");
    setPrice(0);
    setRating(0);
    setHasFeatured(false);
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (isUpdateSession) {
      dispatch(
        updateBookApi({
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

      resetForm();
      return;
    }

    dispatch(
      createBook({
        name,
        author,
        thumbnail,
        price: +price,
        rating: +rating,
        featured: hasFeatured,
      })
    );

    resetForm();
  }

  return (
    <div>
      <div className="p-4 overflow-hidden bg-white shadow-cardShadow rounded-md">
        <Heading as="h4" className="mb-8 text-xl font-bold text-center">
          Add New Book
        </Heading>

        <form className="book-form" onSubmit={handleSubmit}>
          <InputRow label={"Book Name"}>
            <input
              required
              className="text-input"
              type="text"
              id="input-Bookname"
              name="name"
              // If we did this way then we can not remove entire word in the input in editing session
              // value={isUpdateSession && name === '' ? updatingBook.name : name}
              value={name}
              // defaultValue={isUpdateSession ? updatingBook.name : name}
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
              // value={isUpdateSession && author === '' ? updatingBook.author : author}
              value={author}
              // defaultValue={isUpdateSession ? updatingBook.author : author}
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
              // value={isUpdateSession && thumbnail === '' ? updatingBook.thumbnail : thumbnail}
              value={thumbnail}
              // defaultValue={
              //   isUpdateSession ? updatingBook.thumbnail : thumbnail
              // }
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
                // If we do it with useEffect then value prop is enough for editing but I do not want to do it with useEffect because that is quite easy.
                // If we did through [value] props then we can not remove entire word in the input in editing session, so that's not the solution in this case.
                //  and If we do with default value then it will not change after every re-render so in the initial render isUpdatedSession is false so default value would be price as expected but when we go back to updateSession then in case of number type default value would not be updated meaning [updatingBook.price] is not shown in the input box instead it will still shows the price which is 0.
                // so the work around is that if we defined a unique Key prop then defaultValue will evaluated again after every re-render and everything works as expected.
                // value={isUpdateSession && price === 0 ? updatingBook.price : price}

                // defaultValue={
                //   isUpdateSession && price === 0 ? updatingBook.price : price
                // }
                value={price}
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
                // value={isUpdateSession && rating === 0 ? updatingBook.rating : rating}
                // defaultValue={
                //   isUpdateSession && rating === 0 ? updatingBook.rating : rating
                // }
                value={rating}
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
              // checked={
              //   isUpdateSession && hasFeatured === undefined
              //     ? updatingBook.featured
              //     : hasFeatured
              // }
              checked={hasFeatured}
              // In defaultChecked everything works but when dispatching then it creates problems (not taken the updated featured value.)
              // defaultChecked={
              //   isUpdateSession ? updatingBook.featured : hasFeatured
              // }
              // disabled={hasFeatured}
              onChange={() => setHasFeatured((feature) => !feature)}
              // onChange={() => {
              //   if (isUpdateSession && hasFeatured === undefined) {
              //     setHasFeatured(updatingBook.featured === true ? false : true);
              //   } else {
              //     setHasFeatured((featured) => !featured);
              //   }
              // }}
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
