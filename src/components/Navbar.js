import React from 'react';
// import props from 'props';

function Navbar(props){
  
  return(
        <div className="row">
          <div className="col-md-6">
            <h1 className="title">Realtime Weather</h1>
          </div>
          <div>
            <form className="region" onSubmit={(e)=>props.changeWeather(e)}>
              <input className="regioninput" placeholder="Enter Your Location" onChange={(e)=>{props.changeRegion(e.target.value)}}></input>
            </form>
          </div>
        </div>
      );
}
export default Navbar;