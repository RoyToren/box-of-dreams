import React, { Component } from 'react';
import './css/App.css';
import Dreams from './Dreams';
import AddButton from './AddButton';
import DreamForm from './DreamForm';
class App extends Component {
  state = { createDream: false};

  newDreamForm = () => {
    this.setState({createDream: true});
  }

  componentDidMount() {
    fetch('/user')
      .then(res => res.json())
      .then(data => {
        if (data) {
          this.setState({
            isLoading: data,
            cityNotFound: '404',
          });
        }/*  else {
			   // Determine weather icon
			   let weatherId = data.data.weather[0].id;

			   if(weatherId <= 232) {
			        this.setState({ weatherIcon: ThunderStormIcon })
			   } else if(weatherId >= 300 && weatherId <= 531) {
			        this.setState({ weatherIcon: RainIcon });
			   } else if(weatherId >= 600 && weatherId <= 622 ) {
			        this.setState({ weatherIcon: SnowIcon });
			   } else if(weatherId === 800) {
			        this.setState({ weatherIcon: ClearIcon });
			   } else if(weatherId >= 801 && weatherId <= 804) {
			        this.setState({ weatherIcon: CloudsIcon });
			   }
			     this.setState({
			        isLoading: false,
			        currentTemp: Math.round(data.data.main.temp) + '°',
			        humidity: data.data.main.humidity + '%',
			        wind: Math.round(data.data.wind.speed) + ' mph',
			        windDirection: data.data.wind.deg,
			        currentCondition: data.data.weather[0].main,
			        currentConditionDescription: data.data.weather[0].description,
			        cityName: data.data.name
			     });
			} */
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          ארגז של חלומות
        </header>
        <body dir="rtl">
          <Dreams></Dreams>
          <DreamForm createDream={this.state.createDream}></DreamForm>
          <AddButton handleClick={this.newDreamForm}></AddButton>
        </body>
      </div>
    );
  }
}

export {App};
