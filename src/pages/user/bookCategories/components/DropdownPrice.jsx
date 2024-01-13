import { useDispatch, useSelector } from "react-redux";
import { filterData, getFilterBy, setfilterBy } from "../bookCategoriesSlice";

export default function DropdownPrice() {
  const filterBy = useSelector(getFilterBy)
  const dispatch = useDispatch()

  const onSelectChange = (e) => {
    dispatch(setfilterBy(e.target.value));
    dispatch(filterData())
  };
  return (
    <select
      onChange={onSelectChange}
      className="rounded-xl p-1 sm:p-2 bg-[#283d50] text-white uppercase text-sm md:text-base"
      value={filterBy}
    >
      <option value="Default">
        Default
      </option>
      <option value="High">High</option>
      <option value="Low">Low</option>
    </select>
  );
}
