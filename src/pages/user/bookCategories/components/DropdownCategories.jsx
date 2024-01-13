import { useDispatch, useSelector } from "react-redux";
import { filterData, getBookType, setBookType, } from "../bookCategoriesSlice";

export default function DropdownCategories() {
  const dispatch = useDispatch()
  const bookType = useSelector(getBookType)

  const onSelectChange = (e) => {
    dispatch(setBookType(e.target.value));
    dispatch(filterData())
  };
  return (
    <select
      onChange={onSelectChange}
      className="rounded-xl p-1 sm:p-2 bg-[#283d50] text-white uppercase text-sm md:text-base"
      value={bookType}
    >
      <option value="all_categories">
        all_categories
      </option>
      <option value="comic">comic</option>
      <option value="study">study</option>
      <option value="comdy">comdy</option>
      <option value="novel">novel</option>
      <option value="horror">horror</option>
      <option value="free">free</option>
    </select>
  );
}
