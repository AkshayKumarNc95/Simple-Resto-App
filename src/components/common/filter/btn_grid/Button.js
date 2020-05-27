import React, { useState } from "react";
import { Button } from "semantic-ui-react";


export default (props) => {
  const [selected, setSelected] = useState(false);

  const onClick = (selected) => {
    props.onClick(props.id, selected);
    setSelected(selected);
  };

  return (
    <div  className="btn-grid">
      <Button 
        positive = {selected}
        toggle 
        active={selected}
        onClick={() => onClick( !selected)}
      >
        {props.btnName}
      </Button>
    </div>
  );
}
