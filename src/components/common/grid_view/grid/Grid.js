import React from "react";
import { Grid, GridRow } from "semantic-ui-react";
import Card from "../card";
import "./grid.css";

export default (props) => {

  return (
    <div className="grid-out">
      <Grid columns="three" divided >
        {props.restos &&
          props.restos.map((resto) => {
            return (
              <div  key = {''+resto.Restaurant_ID} className="Grid-row">
                <GridRow >
                  <Grid.Column>
                  <div className = "grid-in">
                    <Card resto = {resto} />
                    </div>
                  </Grid.Column>
                </GridRow>
              </div>
            );
          })}
      </Grid>
    </div>
  );
};
