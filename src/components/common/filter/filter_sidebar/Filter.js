import React from "react";
import Search from "./Search.js";
import BtnGrid from "../btn_grid";
import './filter.css';
import {Divider} from 'semantic-ui-react';

export default (props) => {

  return (
    <div className = "filter-grid-out">
      <Divider horizontal>Search Restaurants </Divider>
      <Search onSearch={(val) => props.onSearch(val)} />
      <Divider horizontal>Cusines </Divider>
      <BtnGrid
        items={props.filters}
        onClick={(id, selected) => {
          props.onFilter(id, selected)
        }}
      />
      <Divider horizontal>Sort by</Divider>
      <BtnGrid
        items={props.sortByItems}
        onClick={(id, selected) => {
          props.onSort(id, selected)
        }}
      />
    </div>
  );
};
