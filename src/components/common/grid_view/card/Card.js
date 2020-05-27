import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import "./card.css";

export default (props) => {
  //Get random image from public/images folder...
  var image_src ="/images/img_"+ (Math.ceil(Math.random()*10))+".jpg"; 
  return (
    <Card>
      <Image
        src={""+image_src}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{props.resto.Restaurant_Name}</Card.Header>
        <Card.Meta>{props.resto.Cuisines}</Card.Meta>
        <Card.Description>
          Cost for two: {props.resto.Average_Cost_for_two}
          <br />
          <span className="spn-green">
            {props.resto.Has_Table_booking === "Yes" && "Table Bookings"}
            {props.resto.Has_Online_delivery === "Yes" && " - Home Delivery"}
          </span>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a className = "anchor-card">
          <Icon name="user" />
          Rating: &nbsp;
          <span className={""+getClassName(props.resto.Rating_color)}>
            {props.resto.Aggregate_rating} ({props.resto.Votes})
          </span>
        </a>
      </Card.Content>
    </Card>
  );
};

// Since the color is having white spaces=> replace with _
function getClassName(color){
  return color? color.replace(/ /, "_"): "Black"; 
}