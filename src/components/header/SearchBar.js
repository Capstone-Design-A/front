// 검색창 컴포넌트
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import searchBarStyles from "./SearchBar.module.css";
import searchIcon from "../../assets/search.svg";
import { getSearchItems } from "../../api/api.js";

function SearchBar() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line
      const items = await getSearchItems(1, 10, keyword, "JWT_TOKEN");
      navigate(
        `/item/search?keyword=${encodeURIComponent(keyword)}&page=1&size=10`,
        {
          state: {
            keyword: keyword,
            page: 1,
            size: 10,
          },
        }
      );
    } catch (error) {
      console.error("Error fetching search items:", error);
    }
  };

  return (
    <form className={searchBarStyles.form} onSubmit={handleSubmit}>
      <input
        name="keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="검색어를 입력하세요"
      />
      <button type="submit">
        <img src={searchIcon} alt="검색" />
      </button>
    </form>
  );
}

export default SearchBar;
