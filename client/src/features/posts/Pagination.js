import React, { useState } from "react";

const PAGES_PER_LIST = 5;
const Pagination = ({
  TotalPost,
  ITEMS_PER_PAGE,
  CurrentPage,
  setCurrentPage,
}) => {
  const TotalPageNumber = Math.ceil(TotalPost / ITEMS_PER_PAGE); // 데이터를 10개씩 나눴을때 나오는 총 페이지의 수
  const [ShowingNum, setShowingNum] = useState({
    start: 1,
    end: PAGES_PER_LIST,
  });

  return (
    <>
      <nav>
        <button
          onClick={() => setCurrentPage(CurrentPage - 1)}
          disabled={CurrentPage === 1}
          className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Previous
        </button>
        <ul className="inline-flex -space-x-px">
          {Array(TotalPageNumber)
            .fill()
            .map((_, i) => (
              <li key={i + 1}>
                <button
                  onClick={() => setCurrentPage(i + 1)}
                  className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {i + 1}
                </button>
              </li>
            ))}
        </ul>
        <button
          onClick={() => setCurrentPage(CurrentPage + 1)}
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
