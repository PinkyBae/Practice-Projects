window.addEventListener('load',()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector('.degree-section');
    let temperatureSpan = document.querySelector('.degree-section span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            //console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            //const proxy = 'https://cors-anywhere.herokuapp.com/';
            //if dark-sky-api were used
            //const api = '${proxy}${darkskyapi}';
            const api = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=dfb505838bf4589666e489399d563720';
            
            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data =>{
                    console.log(data);
                    const {temp} = data.main;   //alternate for data.temp.main;
                    const {description, icon} = data.weather[0];
                    console.log(icon);
                    const tempCelcius = temp-273;
                    const tempFarenheit = ((temp-273.15)*1.8)+32;
                    //Set DOM elements from the api
                    temperatureDegree.textContent = tempCelcius.toFixed(1);
                    temperatureDescription.textContent = description.toUpperCase();
                    locationTimezone.textContent = data.name.toUpperCase();
                    const iconUrl = 'http://openweathermap.org/img/wn/'+icon+'@2x.png';
                    console.log(iconUrl);
                    document.querySelector("#temperature-icon").src = iconUrl;

                    //Change temperature Celsius/Farenheit
                    temperatureSection.addEventListener("click", () => {    
                        if(temperatureSpan.textContent === "F"){
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = tempCelcius.toFixed(1);
                        }
                        else{
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = tempFarenheit.toFixed(1);
                        }
                    });
                });
        });
    }else{
        h1.textContent = "Unable to access your location";
    }
});