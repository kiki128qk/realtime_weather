import React from'react';
import axios from'axios';
import DisplayData from'./components/DisplayData';
import Navbar from'./components/Navbar';
import './App.css';

class App extends React.Component{
  state = {
    coords : {
      latitude: 37,
      longitude:127
    },
    data : {},
    inputData:"",
  }
  componentDidMount(){
    // console.log('render mouted');

    if(navigator.geolocation){
      // console.log('sup');
      navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position.coords.latitude, position.coords.longitude);
        let newCorrds ={
          latitude: position.coords.latitude ,
          longitude: position.coords.longitude
        }
        this.setState({coords:newCorrds});
        // console.log(this.state.coords);
        axios.get(`http://api.weatherstack.com/current?access_key=99c613127c68350788cb70877257a1be&query=${this.state.coords.latitude},${this.state.coords.longitude}`).then((res)=>{
          // console.log(res);
          let weatherData ={
            temperature: res.data.current.temperature,
            description: res.data.current.weather_descriptions[0],
            location: res.data.location.name,
            region: res.data.location.region,
            country: res.data.location.country,
            wind_speed: res.data.current.wind_speed,
            pressure: res.data.current.pressure,
            precip: res.data.current.precip,
            humidity: res.data.current.humidity,
            img: res.data.current.weather_icons
          }
          this.setState({data:weatherData});
        });
      });
    }else{
      console.log('not');
    }
  }

  change = (value)=>{
    // console.log(value);
    this.setState({inputData : value});
    // console.log(this.state.inputData);
  }
  changeWeather =(envet) =>{
    event.preventDefault();
    axios.get(`http://api.weatherstack.com/current?access_key=99c613127c68350788cb70877257a1be&query=${this.state.inputData}`).then((res)=>{
          let weatherData ={
            temperature: res.data.current.temperature,
            description: res.data.current.weather_descriptions[0],
            location: res.data.location.name,
            region: res.data.location.region,
            country: res.data.location.country,

            wind_speed: res.data.current.wind_speed,
            pressure: res.data.current.pressure,
            precip: res.data.current.precip,
            humidity: res.data.current.humidity,
            img: res.data.current.weather_icons
          }
          this.setState({data:weatherData});
        });
  }
  render(){
      return (
        <div className="App">
          <div className="container">
            <Navbar changeRegion={this.change} changeWeather = {this.changeWeather}/>
            <DisplayData weather = {this.state.data} />
          </div>
        </div>
      );
    }
}
export default App;
