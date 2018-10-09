import React from "react";
import Title from "./components/Title";
import Form from "./components/Form";
import Weather from "./components/Weather";
const API_KEY ="2e7e2f63d4b4904ba366a5050b475bdc";

{/*Fetching the api */}
class App extends React.Component{
    state = {           /*This will be the initial state before you click the button */
              temperature: undefined,
              city: undefined,
              Country: undefined,
              humidity: undefined,
              description: undefined,
              error: undefined

    }
      getWeather = async (e) => {
        e.preventDefault();{/*Prevents the full page refresh when the button getWeather is clicked on the web page */}
        const city = e.target.elements.City.value;
        const Country = e.target.elements.Country.value;
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}, ${Country}&appid=${API_KEY}&units=metric`);{/* Making the api call */}
          const data = await api_call.json();{/* Converting the api_call to json format and assingning it to a constant */}
          
          if(city && Country){
            console.log(data);
          
          this.setState({
            temperature: data.main.temp,
            city: data.name,
            Country: data.sys.Country,
            humidity: data.main.humidity,
            description: data.weather[0].description,
            error: ""
          });
          } else{
            this.setState({
              temperature: undefined,
              city: undefined,
              Country: undefined,
              humidity: undefined,
              description: undefined,
              error: "Please enter the City and the Country."
            });

          }
      }

  render(){
    return(
      <div>
         <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                <Title />
                </div>
                  <div className="col-xs-7 form-container">
                  
                    <Form getWeather={this.getWeather}/>
                    <Weather 
                      temperature={this.state.temperature}
                      city={this.state.city}
                      /*Country={this.state.Country}*/
                      humidity={this.state.humidity}
                      description={this.state.description}
                      error={this.state.error}
                    />
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
};


export default App;