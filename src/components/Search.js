import React from "react";

const Search = ({ setLocation, searchLocation, error }) => {
  return (
    <form className="search hidden">
      <input
        onKeyPress={searchLocation}
        onChange={setLocation}
        type="text"
        className="search__input"
        placeholder="Название города или села..."
      />
      <input
        onClick={searchLocation}
        type="submit"
        className="search__submit"
        value="ОК"
      />
      {error && <p class="search__error">Ничего не найдено 😫😤</p>}
    </form>
  );
};

export default Search;
