import { useDispatch, useSelector } from "react-redux";
import Heading from "./Heading";
import { getState } from "../features/books/booksSlice";
import { changePage } from "../features/books/booksActions";

const MAX_SIZE_PER_PAGE = 2;

export default function Pagination({ count }) {
  const { currentPage } = useSelector(getState);
  const dispatch = useDispatch();

  const totalPages = Math.ceil(count / MAX_SIZE_PER_PAGE);
  console.log(totalPages, currentPage);

  function handlePrev() {
    if (currentPage > 1) dispatch(changePage(currentPage - 1));
  }

  function handleNext() {
    console.log(1);
    if (currentPage < totalPages) dispatch(changePage(currentPage + 1));
  }

  return (
    <div className="mt-6 flex bg-rose-100 p-2 justify-between items-center rounded">
      <Heading as="h4" className="font-bold uppercase">
        Showing {(currentPage - 1) * MAX_SIZE_PER_PAGE + 1} to{' '}
        {currentPage === totalPages ? count : currentPage * MAX_SIZE_PER_PAGE}{' '}
        of {count} results
      </Heading>

      <div className="flex gap-8 items-center">
        <button onClick={handlePrev} disabled={currentPage === 1} className="bg-blue-600 px-4 py-2 rounded text-stone-100 ">Prev</button>
        <button onClick={handleNext} disabled={currentPage === totalPages} className="bg-blue-600 px-4 py-2 rounded text-stone-100 ">Next</button>
      </div>
    </div>
  );
}
