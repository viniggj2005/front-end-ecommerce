import './Search.css';
import { BiMenu } from 'react-icons/bi';
import { BiSearchAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import SearchModal from '../SearchModal/SearchModal';
import React, { useState, useEffect, useRef } from 'react';
export const setValue = (valueToSet) => {
  Search.value = valueToSet;
}

const Search = () => {
  let value;
  const [searchValue, setSearchValue] = useState('');
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  const relocate = () => {
    navigate(`/search/${searchValue}`)
    // window.location.href = 
  }

  const handleKeyDown = (event) => {
    if (searchValue && event.key === 'Enter') {
      relocate();
    }
  }

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    if (value?.trim().length > 0) performSearch(value);
  }

  const performSearch = (value) => {
    setSearchValue(value);
  }

  return (
    <>
      <div className="search">
        <div className="categories-toggle">
          <BiMenu className="categoria-icon" />
        </div>
        <input
          type="text"
          placeholder="Pesquisar:"
          className="search-input"
          value={searchValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          ref={searchInputRef}
        ></input>

        <a className="lupa-a">
          <BiSearchAlt className="lupa" onClick={relocate} />
        </a>
      </div>
      <SearchModal value={searchValue} selected={selectedSuggestion} />
    </>
  );
};

export default Search;