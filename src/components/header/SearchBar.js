// 검색 컴포넌트
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import searchBarStyles from './SearchBar.module.css';
import searchIcon from '../../assets/search.svg';

function SearchBar() {
  const [searchParam, setSearchParams] = useSearchParams();
  const initKeyword = searchParam.get('keyword');
  const [keyword, setKeyword] = useState(initKeyword || '');
  const handleKeywordChange = (e) => setKeyword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams(keyword ? { keyword } : {});
  };

  return (
    <form className={searchBarStyles.form} onSubmit={handleSubmit}>
        <input
          name="keyword"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="검색어를 입력하세요"
        ></input>
        <button type="submit">
          <img src={searchIcon} alt="검색" />
        </button>
    </form>
  );
}

export default SearchBar;