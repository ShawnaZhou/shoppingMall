import React, { useEffect, useState } from "react";

const SearchList = (props) => {
  const [searchResult, setSearchList] = useState([]);

  const updateList = () => {
    setSearchList(props.resultList);
  };

  useEffect(() => {
    updateList();
  }, [props]);

  return (
    <div>
      {searchResult && searchResult.map((item) => {
        return <>{item}</>;
      })}
    </div>
  );
};

export default SearchList;

