import React, { useState } from "react";

const PAGES_PER_LIST = 5;
const Pagination = ({
  TotalPost,
  ITEMS_PER_PAGE,
  CurrentPage,
  setCurrentPage,
}) => {
  const TotalPageNumber = Math.ceil(TotalPost / ITEMS_PER_PAGE); // 데이터를 10개씩 나눴을때 나오는 총 페이지의 수
  const pages = [];
  for (let i = 1; i <= Math.ceil(TotalPost / ITEMS_PER_PAGE); i++) {
    pages.push(i);
  }
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleNextBtn = () => {
    setCurrentPage(CurrentPage + 1);
    if (CurrentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + PAGES_PER_LIST);
      setminPageNumberLimit(minPageNumberLimit + PAGES_PER_LIST);
    }
  };

  const handlePrevBtn = () => {
    setCurrentPage(CurrentPage - 1);

    //아래 숫자가 늦게 바뀌는 이유는 useState의 동기 비동기 등에 대해 찾아보기
    if ((CurrentPage - 1) % PAGES_PER_LIST == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - PAGES_PER_LIST);
      setminPageNumberLimit(minPageNumberLimit - PAGES_PER_LIST);
    }
  };

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li key={number} id={number}>
          <button
            id={number}
            onClick={(e) => setCurrentPage(Number(e.target.id))}
            className={
              CurrentPage == number
                ? "bg-very_blue/75 border border-gray-300 text-white leading-tight py-2 px-3 "
                : "bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            }
          >
            {number}
          </button>
        </li>
      );
    } else {
      return null;
    }
  });

  return (
    <>
      <nav>
        <button
          onClick={handlePrevBtn}
          disabled={CurrentPage === 1}
          className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Previous
        </button>
        <ul className="inline-flex -space-x-px">{renderPageNumbers}</ul>
        <button
          onClick={handleNextBtn}
          disabled={CurrentPage === TotalPageNumber}
          className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Next
        </button>
      </nav>
    </>
  );
};

export default Pagination;
