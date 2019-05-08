window.addEventListener('load', () => {
  let long;
  let lat;
  let tempertureDescription = document.querySelector(".temp_description");
  let tempertureDegree = document.querySelector(".temp_degree");
  let locationTimeZone = document.querySelector(".location_timezone");
  let degreeSection = document.querySelector('.degree_section');
  const tempertureSpan = document.querySelector(".degree_section span");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/2c2893075712c0af3d02577b3958800d/${lat},${long}`;


    fetch(api)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const { temperature, summary, icon } = data.currently;
        tempertureDegree.textContent = temperature;
        tempertureDescription.textContent = summary;

        let celsius = (temperature -32) * (5 / 9);

        setIcons(icon, document.querySelector(".icon"));
        degreeSection.addEventListener('click', () =>{
          if(tempertureSpan.textContent === "F"){
            tempertureSpan.textContent = "C";
            tempertureDegree.textContent = Math.floor(celsius);
          }else{
            tempertureSpan.textContent = "F";
            tempertureDegree.textContent = temperature;
          }
        });
      });
    });
  }

  function setIcons(icon, iconID){
    const skycons = new Skycons({color : "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
