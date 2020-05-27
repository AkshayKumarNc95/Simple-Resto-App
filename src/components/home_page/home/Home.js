import React, { useState, useEffect } from "react";
import GridCus from "../../common/grid_view";
import { Header } from "semantic-ui-react";
import "./home.css";
import Filter from "../../common/filter";

// Will be holding Home state 
// which is exactly same as that of the App state just after the 
// first render. But the Home state will vary based on search, filter, or sort operation. 
function Home(props) {
  const [restosHome, setRestosHome] = useState([{}]);
  const [filterSelected, setFilterSelected] = useState(new Set());
  const [sortSelected, setSortSelected] = useState(new Set());
  const [searchString, setSearchString] = useState("");

  // Set Home state on first render...
  useEffect(() => {
    setRestosHome(props.restos);
  }, [props]);

  // This could be improved
  // Needs more time... 
  const search = (newSearchString, byFilter = false) => {
    // If search string is empty then load all restos
    if (newSearchString.trim().length <= 3) {
      setRestosHome(props.restos);
      setSearchString("");
      return;
    }
    const oldSearchString = searchString; 
    // No need to search if the values are the same...
    if(oldSearchString === newSearchString && !(byFilter)){
      return; 
    }
    let newRestos = [];

    // Always search on intial data set
    newRestos = props.restos;
    
    // Search here: 
    newRestos = newRestos.filter((resto) => {
      return resto.Restaurant_Name.toLowerCase().includes(
        newSearchString.toLowerCase()
      );
    });
    
    setSearchString(newSearchString.trim());
    setRestosHome(newRestos);
    // Incase there are filters selected...
    // This will inturn perform the sort if aleady selected...
    if (!byFilter && filterSelected.size > 0 && oldSearchString !== newSearchString) {
      filter(-201, true);
    }
  };

  // This could be improved
  // Needs more time... 
  const sort = (id, selected) => {
    // Get all the criteia
    const newSet = new Set(sortSelected);
    if (id !== -201) {
      if (selected) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
    }

    setSortSelected(newSet);
    if(newSet.size <1){
      return;
    }

    const newRestos = restosHome.sort((ele1, ele2) => {

      if (newSet.has(1) && ele1.Aggregate_rating < ele2.Aggregate_rating)
        return 1;
      if (newSet.has(1) && ele1.Aggregate_rating > ele2.Aggregate_rating)
        return -1;
      if (newSet.has(2) && parseInt(ele1.Votes) < parseInt(ele2.Votes)) return 1;
      if (newSet.has(2) && parseInt(ele1.Votes) > parseInt(ele2.Votes)) return -1;

      if (
        newSet.has(3) &&
        parseInt(ele1.Average_Cost_for_two) < parseInt(ele2.Average_Cost_for_two)
      )
        return 1;
      if (
        newSet.has(3) &&
        parseInt( ele1.Average_Cost_for_two) > parseInt(ele2.Average_Cost_for_two)
      )
        return -1;
      
     });

    setRestosHome(newRestos);
  };

  // This could be also be improved...
  // Needs more time... 
  const filter = (id, selected) => {
    // If selected
    //Add to filters
    const newSet = new Set(filterSelected);
    let newRestosHome = [...restosHome];
    //If search triggers filter=> then use old restos and old filter items
    if (id !== -201) {
      if (selected) {
        newSet.add(id);

        if (newSet.size > 1) {
          if (searchString.length > 3) {
            //First search => this will update the restos
            search(searchString, true);
          } else {
            newRestosHome = props.restos;
          }
        }
      } else {
        //Remove id from filters
        newSet.delete(id);

        if (newSet.size < 1) {
          setFilterSelected(newSet);
          if (searchString.length < 4) {
            setRestosHome(props.restos);
          } else search(searchString, true);

          return;
        }
      }
    }
    var selectedCuisines = new Set();

    props.filters.map((filter) => {
      if (newSet.has(filter.id)) {
        selectedCuisines.add(filter.btnName.toLowerCase());
      }
      return null;
    });
    //Filter by Cuisines
    let newRestos = newRestosHome.filter((resto) => {
      // north, south
      let c_arr = resto.Cuisines.toLowerCase().split(",");
      console.log(c_arr);
      return ([...c_arr].filter(ele => selectedCuisines.has(ele.trim())).length>0); 
    });
    setFilterSelected(newSet);
    setRestosHome(newRestos);
    if (sortSelected.size > 0) {
      sort(-201, true);
    }
  };

  return (
    <div className="home-out">
      <Title className="home-title" />
      <div className="home-in">
        <div className="home-grid-out">
          <GridCus restos={restosHome} />
        </div>
        <div className="home-filter-out">
          <Filter
            filters={props.filters}
            sortByItems={sortByItems}
            onSearch={search}
            onFilter={filter}
            onSort={sort}
          />
        </div>
      </div>
    </div>
  );
}


// Move these out of Home.js
// Jumbotron...
function Title() {
  return (
    <div className="title-out">
      <Header as="h1">
        Hungry?
        <span> Order from the finest restaurants around you!</span>
      </Header>
    </div>
  );
}

 // Sort items 
 const sortByItems = [
  {
    id: 1,
    btnName: "Rating",
    selected: false,
  },
  {
    id: 2,
    btnName: "Votes",
    selected: false,
  },
  {
    id: 3,
    btnName: "Cost For Two",
    selected: false,
  },
];

export default Home;
