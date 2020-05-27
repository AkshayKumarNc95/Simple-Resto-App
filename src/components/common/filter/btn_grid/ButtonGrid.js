import React from "react";
import Button from "./Button.js";
import './button_grid.css';

function BtnGrid(props) {
  // Create a dynamic btn grid
  // Each btn will have the selected property
  // And on click => It should updated the selected property
  // And this data should be updated to the main state using the callback
  // Props.items is of type-
  // [{id: int, btnName: string, selected: bool}, ...]

  return (
    <div className="grid-btn-out">
      {props.items.map((btn) => {
        return (
          <div key={btn.id}>
            <Button
              id={btn.id}
              btnName={btn.btnName}
              selected={btn.selected}
              onClick={props.onClick}
            />
          </div>
        );
      })}
    </div>
  );
}

export default BtnGrid;
