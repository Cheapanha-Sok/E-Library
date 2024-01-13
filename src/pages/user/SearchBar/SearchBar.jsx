import { useState } from "react";
import Input from "../../../ui/shared/Input.jsx";
import searchIcon from "../../../asset/svg/search.svg";
import closeIcon from "../../../asset/svg/close.svg";
import Button from "../../../ui/shared/Button.jsx";
import SearchList from "./components/SearchList.jsx";

const SearchBar = () => {
  const [isClick, setClick] = useState(false);
  const [search, setSearch] = useState("");

  const handleClick = () => {
    setClick(!isClick);
    setSearch("");
  };

  const renderSearchModal = () => (
    <div className="fixed backdrop-blur-sm flex bg-black bg-opacity-25 inset-0 justify-center ">
      <div className="w-[400px] md:w-[800px] flex flex-col p-10 space-y-10">
        <Button onClick={handleClick}>
          <img src={closeIcon} alt="closeIcon" className="w-5" />
        </Button>
        <div className="p-2 inline-flex items-center mt-5 justify-between bg-white rounded-xl">
          <div className="w-full">
            <Input
              placeholder="Search"
              type="search"
              id="searchInput"
              style="outline-none w-full"
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>
        <SearchList searchResult={search} onClose={handleClick} />
      </div>
    </div>
  );

  return (
    <form className="relative w-max mx-auto z-30">
      <div className="hidden md:flex">
        {isClick ? (
          renderSearchModal()
        ) : (
          <Button
            onClick={handleClick}
            customClass="border border-white text-white "
          >
            <img src={searchIcon} className="h-5 w-5 mr-2" alt="searchIcon" />
            Search
          </Button>
        )}
      </div>
      <div className="block md:hidden">
        {isClick ? (
          renderSearchModal()
        ) : (
          <Button onClick={handleClick}>
            <img src={searchIcon} alt="searchIcon" className="h-5 w-5" />
          </Button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
