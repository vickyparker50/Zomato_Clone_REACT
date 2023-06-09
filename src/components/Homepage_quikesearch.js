import React from "react";
import Qsitem from "./Qsitem";

class Qsearch extends React.Component {
  render() {
    const { mealtypeData } = this.props;

    if (!mealtypeData) {
      return null; // or a loading indicator
    }

    return (
      <>
        <div className="container" id="qukie">
          <div className="row pt-4" >
            <div className="col-12"id="gidc">
              <h4 className="Quick ">Quick Searches</h4>
              <p className="Discover">Discover restaurants by type of meal</p>
            </div>
          </div>
          <div className="d-flex flex-wrap " id="cid">
            {mealtypeData.map((e) => {
              return <Qsitem data={e} />;
            })}
          </div>
        </div>
      </>
    );
  }
}

export default Qsearch;
