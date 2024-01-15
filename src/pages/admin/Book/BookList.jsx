import { useContext, useEffect, useState } from "react";
import { calculateBookFree, calculateBookOfEachAuthor, calculateNumberOfBook, getAllProduct } from "../../../contexts/Books/BookStoreAction";
import BookStoreContext from "../../../contexts/Books/BookStoreContext.jsx";
import BookItem from "./components/BookItem.jsx";
import Spinner from "../../../ui/Spinner.jsx";
import FilterCategories from "./components/FilterCategories.jsx";
import FilterAuthor from "./components/FilterAuthor.jsx";
import { Chart, registerables } from 'chart.js';
import { Bar } from "react-chartjs-2";
import AddBook from "./components/AddBook.jsx";

export default function BookList({ role, name }) {
  Chart.register(...registerables);
  const { listBooks, dispatch, loading } = useContext(BookStoreContext);
  const [selectedCategory, setSelectedCategory] = useState('all_categories');
  const [selectedAuthor, setSelectedAuthor] = useState('all_author');
  const [isCreate, setIsCreate] = useState(false)

  const filterBooksByCategory = (category) => {
    if (category === 'all_categories') {
      return listBooks;
    } else if (category === "free") {
      return listBooks.filter((item) => item.data.price === 0);
    } else {
      return listBooks.filter((item) => item.data.categories === category);
    }
  };

  const filterBooksByAuthor = (author) => {
    if (author === 'all_author') {
      return listBooks;
    } else {
      return listBooks.filter((item) => item.data.author === author);
    }
  };

  const handleIsCreate = () => {
    setIsCreate(!isCreate)
  }
  const [chartData, setChartData] = useState({
    labels: ["Comic", "Study", "Comdy", "Horror", "Novel", "Free", "All_Book"],
    datasets: [
      {
        label: "Number Of Book",
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(69, 189, 95, 0.6)",
          "rgba(189, 153, 69, 0.6)",
          "rgba(211, 69, 190, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(69, 189, 95, 0.6)",
          "rgba(189, 153, 69, 0.6)",
          "rgba(211, 69, 190, 0.6)",
        ],
        borderWidth: 7,
      },
    ],
  });

  const [chartDataAuthor, setChartDataAuthor] = useState({
    labels: ["Panha", "Dom", "Dara", "Sak"],
    datasets: [
      {
        label: "Number Book of each Author",
        data: [0, 0, 0, 0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 4,
      },
    ],
  });

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });

    const unsubscribe = getAllProduct((data) => {
      dispatch({ type: "SET_ALL_BOOK", payload: data });
      const totalProduct = calculateNumberOfBook(data);
      const totalBookOfEachAuthor = calculateBookOfEachAuthor(data);
      const totalBookFree = calculateBookFree(data)

      setChartData((prevChartData) => ({
        ...prevChartData,
        datasets: [
          {
            ...prevChartData.datasets[0],
            data: [
              totalProduct.comic,
              totalProduct.study,
              totalProduct.comdy,
              totalProduct.horror,
              totalProduct.novel,
              totalBookFree.free,
              totalProduct.all_book
            ],
          },
        ],
      }));

      setChartDataAuthor((prevChartData) => ({
        ...prevChartData,
        datasets: [
          {
            ...prevChartData.datasets[0],
            data: [
              totalBookOfEachAuthor.panha,
              totalBookOfEachAuthor.dom,
              totalBookOfEachAuthor.dara,
              totalBookOfEachAuthor.sak,
            ],
          },
        ],
      }));
    });
    return () => unsubscribe;
  }, [dispatch]);

  return (
    <ul className="flex flex-col gap-5 p-5">
      {!listBooks ? (
        <div className='h-screen flex justify-center items-center md:text-4xl'>No book data</div>
      ) : loading ? (
        <Spinner />
      ) : (
        <>
          <div className='flex-col gap-5 border-2 p-5'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
              <div className="w-full">
                <Bar data={chartData} />
              </div>
              <div className="w-full">
                <Bar data={chartDataAuthor} />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-5 justify-end">

            <div className="flex justify-end">
              <button className="p-1 md:p-2 bg-[#283d50] text-white rounded-lg" onClick={handleIsCreate}>Create Book</button>
            </div>
            <div className="flex gap-2 md:gap-5 justify-end">
              <FilterCategories onSelectChange={setSelectedCategory} />
              <FilterAuthor onSelectChange={setSelectedAuthor} />
            </div>
          </div>
          {filterBooksByCategory(selectedCategory)
            .filter((item) => filterBooksByAuthor(selectedAuthor).includes(item))
            .map((item) => (
              <BookItem data={item.data} key={item.bookId} bookId={item.bookId} role={role} name={name} />
            ))}

          {isCreate && <AddBook onClose={handleIsCreate} name={name} />}
        </>
      )}
    </ul>
  );
}
