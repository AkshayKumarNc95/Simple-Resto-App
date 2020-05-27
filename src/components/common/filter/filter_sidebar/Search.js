import React, { useState } from "react";

//Props = {onSearch, defText}
export default (props) => {
  const [value, setValue] = useState(props.defText || "");

  const onkeyChange = (e) => {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code == 13) {
      //Enter keycode
      props.onSearch(value);
    }
  };

  return (
    <div className = "search-out">
      <input
        className = "inp-text-src"
        type="text"
        placeholder = "Press Enter to Reload"
        value={value}
        onKeyPress={onkeyChange}
        onChange={(event) => setValue(event.target.value)}
      ></input>
    </div>
  );
};
