import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const PAGE_SIZE = 5;

export default function Pagination({ count }) {
  //   const [currentPage, setCurrntPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const totalPage = Math.ceil(count / PAGE_SIZE);
  console.log(totalPage);

  const boundaryCount = 3;
  const startCounts = 5;

  function handlePrev() {
    if (currentPage > 1) {
      //   setCurrntPage((cur) => cur - 1);
      searchParams.set("page", currentPage - 1);
      setSearchParams(searchParams);
    }
  }

  function handleNext() {
    if (currentPage < totalPage) {
      //   setCurrntPage((cur) => cur + 1);
      searchParams.set("page", currentPage + 1);
      setSearchParams(searchParams);
    }
  }

  function handleClick(e, num) {
    const value = num
      ? Number(num)
      : Number(e.target.closest("button").textContent);
    console.log(value);
    // setCurrntPage(value);
    searchParams.set("page", value);
    setSearchParams(searchParams);
  }

  return (
    <div className="flex gap-6">
      <h2>
        Page {currentPage} of {totalPage}
      </h2>
      <button onClick={handlePrev}>Prev</button>

      {totalPage <= 9 &&
        Array.from({ length: totalPage }, (_, i) => (
          <button
            key={i + 1}
            className={`${currentPage === i + 1 ? "bg-stone-400" : ""}`}
            onClick={(e) => handleClick(e, i + 1)}
          >
            {i + 1}
          </button>
        ))}

      {totalPage > 9 && currentPage <= startCounts && (
        <div className="flex gap-2" onClick={handleClick}>
          {Array.from({ length: startCounts }, (_, i) => (
            <button
              key={i + 1}
              className={`${currentPage === i + 1 ? "bg-rose-400" : ""}`}
            >
              {i + 1}
            </button>
          ))}
          <span>...</span>
          {Array.from({ length: boundaryCount }, (_, i) => (
            <button
              key={i + 1}
              className={`${
                currentPage === totalPage + (i + 1 - boundaryCount)
                  ? "bg-rose-400"
                  : ""
              }`}
            >
              {totalPage + (i + 1 - boundaryCount)}
            </button>
          ))}
        </div>
      )}

      {totalPage > 9 &&
        currentPage > startCounts &&
        currentPage <= totalPage - startCounts && (
          <div className="flex gap-2" onClick={handleClick}>
            {Array.from({ length: boundaryCount }, (_, i) => (
              <button
                key={i + 1}
                className={`${currentPage === i + 1 ? "bg-rose-400" : ""}`}
              >
                {i + 1}
              </button>
            ))}
            <span>...</span>
            <button>{currentPage - 1}</button>
            <button className="bg-rose-400">{currentPage}</button>
            <button>{currentPage + 1}</button>
            <span>...</span>
            {Array.from({ length: boundaryCount }, (_, i) => (
              <button key={i + 1}>{totalPage + (i + 1 - boundaryCount)}</button>
            ))}
          </div>
        )}

      {totalPage > 9 && currentPage > totalPage - startCounts && (
        <div className="flex gap-2" onClick={handleClick}>
          {Array.from({ length: boundaryCount }, (_, i) => (
            <button
              key={i + 1}
              className={`${currentPage === i + 1 ? "bg-rose-400" : ""}`}
            >
              {i + 1}
            </button>
          ))}
          <span>...</span>
          {Array.from({ length: startCounts }, (_, i) => (
            <button
              className={`${
                currentPage === totalPage - startCounts + (i + 1)
                  ? "bg-rose-400"
                  : ""
              }`}
            >
              {totalPage - startCounts + (i + 1)}
            </button>
          ))}
        </div>
      )}

      {totalPage > 9 && (
        <div>
          <input
            type="text"
            //   value={currentPage}
            onKeyUp={(e) =>
              e.key === "Enter" ? handleClick(Number(e, e.target.value)) : ""
            }
          />
        </div>
      )}
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
