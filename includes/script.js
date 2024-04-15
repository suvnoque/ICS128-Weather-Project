$(document).ready(function() {
	const key = "d1cec1951a5f4be4ad155246240304";
	const xhttp = new XMLHttpRequest();
	let location = "Victoria, British Columbia, Canada";
	let DateTime = luxon.DateTime;

	//Create weather cards
	for (let i = 0; i < 11; i++) {
		$("#weather-cards").append(`<div id="weather-card-${i}" class="card text-center mx-3 d-inline-block" style="width: 400px; height: 480px">
				<div class="card-body d-flex flex-column justify-content-center">
				</div>
			</div>`);
	}

	//Get weather data
	let getWeather = (location) => {
		let todayDate = new Date();
		let date = [];
		let weatherXhttp = [];
		let obj = [];
		
		//Reset search bar's value
		$("#search").val("");
		
		//Automatically scroll to current weather card
		if($(window).width() <= 810)
			$("#weather-cards").scrollLeft(3024);
		else
			$("#weather-cards").scrollLeft(2592);

		//Get weather history data
		for (let i = 0; i < 7; i++) {
			weatherXhttp[i] = new XMLHttpRequest();
			weatherXhttp[i].onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					$("#search").removeClass("is-invalid");
					$(`#weather-card-${i}`).children(".card-body").html("");
					obj[i] = JSON.parse(this.responseText);
					let weatherIcon = `${obj[i]["forecast"]["forecastday"]["0"]["day"]["condition"]["icon"]}`.slice(20);
					$(`#weather-card-${i}`).append(`<span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-secondary">
    					History Weather
    					<span class="visually-hidden">History Weather</span>
  					</span>`)

					//Location
					$("#location").html(`${obj[i]["location"]["name"]}, ${obj[i]["location"]["region"]}, ${obj[i]["location"]["country"]}`);

					//Weather icon
					$(`#weather-card-${i}`).children(".card-body").append(`<div>
						<div>
							<img src="includes/${weatherIcon}" alt="Weather Icon">
						</div>
						<div>
							${obj[i]["forecast"]["forecastday"]["0"]["day"]["condition"]["text"]}
						</div>
						<hr>
					</div>`);

					//Temperature
					$(`#weather-card-${i}`).children(".card-body").append(`<div class="card d-flex flex-row my-3">
						<span class="position-absolute top-0 start-50 translate-middle badge bg-dark">
    						<span class="material-symbols-outlined">device_thermostat</span>
    						<span class="visually-hidden">Temperature</span>
  						</span>
						<div class="card-body d-flex flex-row justify-content-center mt-1">			
							<!--Average Temperature-->
							<div class="card d-flex flex-column me-3" style="width: 100px">
								<span class="position-absolute top-0 start-50 translate-middle badge bg-dark">
		    						Avg
		    						<span class="visually-hidden">Average Temperature</span>
		  						</span>
		  						<div class="card-body">
									<div class="fs-4 border-bottom">${obj[i]["forecast"]["forecastday"]["0"]["day"]["avgtemp_c"]}\u00B0C</div>
									<div class="fs-4">${obj[i]["forecast"]["forecastday"]["0"]["day"]["avgtemp_f"]}\u00B0F</div>
								</div>
							</div>
							<!--Minimum Temperature-->
							<div class="card d-flex flex-column me-3" style="width: 100px">
								<span class="position-absolute top-0 start-50 translate-middle badge bg-dark text-info">
		    						Min
		    						<span class="visually-hidden">Minimum Temperature</span>
		  						</span>
		  						<div class="card-body">
									<div class="fs-4 border-bottom">${obj[i]["forecast"]["forecastday"]["0"]["day"]["mintemp_c"]}\u00B0C</div>
									<div class="fs-4">${obj[i]["forecast"]["forecastday"]["0"]["day"]["mintemp_f"]}\u00B0F</div>
								</div>
							</div>
							<!--Maximum Temperature-->
							<div class="card d-flex flex-column" style="width: 100px">
								<span class="position-absolute top-0 start-50 translate-middle badge bg-dark text-danger">
		    						Max
		    						<span class="visually-hidden">Maximum Temperature</span>
		  						</span>
		  						<div class="card-body">
									<div class="fs-4 border-bottom">${obj[i]["forecast"]["forecastday"]["0"]["day"]["maxtemp_c"]}\u00B0C</div>
									<div class="fs-4">${obj[i]["forecast"]["forecastday"]["0"]["day"]["maxtemp_f"]}\u00B0F</div>
								</div>
							</div>
						</div>
					</div>`);

					//Other info
					$(`#weather-card-${i}`).children(".card-body").append(`<div class="d-flex flex-row justify-content-center mb-2">
							<!--Maximum Wind-->
							<div class="card d-flex flex-column me-3" style="width: 100px">
								<span class="position-absolute top-0 start-50 translate-middle badge bg-dark">
		    						<span class="material-symbols-outlined">air</span>
		    						<span class="visually-hidden">Maximum Wind</span>
		  						</span>
		  						<div class="card-body">
									<div class="fs-6 border-bottom">${obj[i]["forecast"]["forecastday"]["0"]["day"]["maxwind_kph"]}kph</div>
									<div class="fs-6">${obj[i]["forecast"]["forecastday"]["0"]["day"]["maxwind_mph"]}mph</div>
								</div>
							</div>
							<!--Total Precipitation-->
							<div class="card d-flex flex-column me-3" style="width: 100px">
								<span class="position-absolute top-0 start-50 translate-middle badge bg-dark">
		    						<span class="material-symbols-outlined">water_drop</span>
		    						<span class="visually-hidden">Total Precipitation</span>
		  						</span>
		  						<div class="card-body">
									<div class="fs-6 border-bottom">${obj[i]["forecast"]["forecastday"]["0"]["day"]["totalprecip_mm"]}mm</div>
									<div class="fs-6">${obj[i]["forecast"]["forecastday"]["0"]["day"]["totalprecip_in"]}in</div>
								</div>
							</div>
							<!--Total Snow-->
							<div class="card d-flex flex-column" style="width: 100px">
								<span class="position-absolute top-0 start-50 translate-middle badge bg-dark">
		    						<span class="material-symbols-outlined">ac_unit</span>
		    						<span class="visually-hidden">Total Snow</span>
		  						</span>
		  						<div class="card-body d-flex align-items-center justify-content-center">
									<div class="fs-6">${obj[i]["forecast"]["forecastday"]["0"]["day"]["totalsnow_cm"]}cm</div>
								</div>
							</div>
						</div>
						<hr>`);

					//Date
					$(`#weather-card-${i}`).children(".card-body").append(`<div class="justify-content-center">${DateTime.fromISO(obj[i]["forecast"]["forecastday"]["0"]["date"], { zone: obj[i]["location"]["tz_id"] }).toLocaleString({ month: 'long', day: 'numeric', year: 'numeric', timeZoneName: 'short' })}</div>`);
				}
				else if(this.status == 400){
					$("#search").addClass("is-invalid");
				}
			};
			date[i] = new Date(todayDate - (7 - i) * 24 * 60 * 60 * 1000);
			weatherXhttp[i].open("GET", `https://api.weatherapi.com/v1/history.json?key=${key}&q=${location}&dt=${date[i].getFullYear()}-${date[i].getMonth() + 1}-${date[i].getDate()}`, true);
			weatherXhttp[i].send();
		}

		//Get current weather
		weatherXhttp[7] = new XMLHttpRequest();
		weatherXhttp[7].onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				$(`#weather-card-${7}`).children(".card-body").html("");
				obj[7] = JSON.parse(this.responseText);
				let weatherIcon = `${obj[7]["current"]["condition"]["icon"]}`.slice(20);
				$(`#weather-card-${7}`).append(`<span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-success">
    					Current Weather
    					<span class="visually-hidden">History Weather</span>
  					</span>`)

				//Location
				$("#location").html(`${obj[7]["location"]["name"]}, ${obj[7]["location"]["region"]}, ${obj[7]["location"]["country"]}`);

				//Weather icon
				$(`#weather-card-${7}`).children(".card-body").append(`<div>
						<div>
							<img src="includes/${weatherIcon}" alt="Weather Icon">
						</div>
						<div>
							${obj[7]["current"]["condition"]["text"]}
						</div>
						<hr>
					</div>`);

				//Temperature
				$(`#weather-card-${7}`).children(".card-body").append(`<div class="card d-flex flex-row my-3">
						<span class="position-absolute top-0 start-50 translate-middle badge bg-dark">
    						<span class="material-symbols-outlined">device_thermostat</span>
    						<span class="visually-hidden">Temperature</span>
  						</span>
						<div class="card-body d-flex flex-row justify-content-center mt-1">			
							<!--Current temperature-->
							<div class="card d-flex flex-column me-3" style="width: 100px">
								<span class="position-absolute top-0 start-50 translate-middle badge bg-dark">
		    						Current
		    						<span class="visually-hidden">Current Temperature</span>
		  						</span>
		  						<div class="card-body">
									<div class="fs-4 border-bottom">${obj[7]["current"]["temp_c"]}\u00B0C</div>
									<div class="fs-4">${obj[7]["current"]["temp_f"]}\u00B0F</div>
								</div>
							</div>
							<!--Feels like-->
							<div class="card d-flex flex-column me-3" style="width: 100px">
								<span class="position-absolute top-0 start-50 translate-middle badge bg-dark">
		    						Feels like
		    						<span class="visually-hidden">Feels Like Temperature</span>
		  						</span>
		  						<div class="card-body">
									<div class="fs-4 border-bottom">${obj[7]["current"]["feelslike_c"]}\u00B0C</div>
									<div class="fs-4">${obj[7]["current"]["feelslike_f"]}\u00B0F</div>
								</div>
							</div>
							<!--UV-->
							<div class="card d-flex flex-column me-3" style="width: 100px">
								<span class="position-absolute top-0 start-50 translate-middle badge bg-dark">
		    						UV
		    						<span class="visually-hidden">UV Level</span>
		  						</span>
		  						<div class="card-body d-flex align-items-center justify-content-center">
									<div class="fs-4">${obj[7]["current"]["uv"]}</div>
								</div>
							</div>
						</div>
					</div>`);

				//Other info
				$(`#weather-card-${7}`).children(".card-body").append(`<div class="d-flex flex-row justify-content-center mb-2">
							<!--Maximum Wind-->
							<div class="card d-flex flex-column me-3" style="width: 100px">
								<span class="position-absolute top-0 start-50 translate-middle badge bg-dark">
		    						<span class="material-symbols-outlined">air</span>
		    						<span class="visually-hidden">Maximum Wind</span>
		  						</span>
		  						<div class="card-body">
									<div class="fs-6 border-bottom">${obj[7]["current"]["wind_kph"]}kph</div>
									<div class="fs-6">${obj[7]["current"]["wind_mph"]}mph</div>
								</div>
							</div>
							<!--Total Precipitation-->
							<div class="card d-flex flex-column me-3" style="width: 100px">
								<span class="position-absolute top-0 start-50 translate-middle badge bg-dark">
		    						<span class="material-symbols-outlined">water_drop</span>
		    						<span class="visually-hidden">Total Precipitation</span>
		  						</span>
		  						<div class="card-body">
									<div class="fs-6 border-bottom">${obj[7]["current"]["precip_mm"]}mm</div>
									<div class="fs-6">${obj[7]["current"]["precip_in"]}in</div>
								</div>
							</div>
						</div>`);

				//Date
				$(`#weather-card-${7}`).children(".card-body").append(`<div class="justify-content-center border-top mt-3 pt-3">
					${DateTime.fromISO(obj[7]["current"]["last_updated"].replace(" ", "T"), { zone: obj[7]["location"]["tz_id"] }).toLocaleString(DateTime.DATETIME_FULL)}
				</div>`);
			}
		};
		weatherXhttp[7].open("GET", `https://api.weatherapi.com/v1/current.json?key=${key}&q=${location}`, true);
		weatherXhttp[7].send();

		//Get weather forcast data

		weatherXhttp[8] = new XMLHttpRequest();
		weatherXhttp[8].onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				obj[8] = JSON.parse(this.responseText);
				for (let i = 8; i < 11; i++) {
					$(`#weather-card-${i}`).children(".card-body").html("");
					let weatherIcon = `${obj[8]["forecast"]["forecastday"][`${i - 7}`]["day"]["condition"]["icon"]}`.slice(20);
					$(`#weather-card-${i}`).append(`<span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-primary">
		    					Weather Forecast
		    					<span class="visually-hidden">History Weather</span>
		  					</span>`)

					//Location
					$("#location").html(`${obj[8]["location"]["name"]}, ${obj[8]["location"]["region"]}, ${obj[8]["location"]["country"]}`);

					//Weather icon
					$(`#weather-card-${i}`).children(".card-body").append(`<div>
								<div>
									<img src="includes/${weatherIcon}" alt="Weather Icon">
								</div>
								<div>
									${obj[8]["forecast"]["forecastday"][`${i - 7}`]["day"]["condition"]["text"]}
								</div>
								<hr>
							</div>`);

					//Temperature
					$(`#weather-card-${i}`).children(".card-body").append(`<div class="card d-flex flex-row my-3">
								<span class="position-absolute top-0 start-50 translate-middle badge bg-dark">
		    						<span class="material-symbols-outlined">device_thermostat</span>
		    						<span class="visually-hidden">Temperature</span>
		  						</span>
								<div class="card-body d-flex flex-row justify-content-center mt-1">			
									<!--Average Temperature-->
									<div class="card d-flex flex-column me-3" style="width: 100px">
										<span class="position-absolute top-0 start-50 translate-middle badge bg-dark">
				    						Avg
				    						<span class="visually-hidden">Average Temperature</span>
				  						</span>
				  						<div class="card-body">
											<div class="fs-4 border-bottom">${obj[8]["forecast"]["forecastday"][`${i - 7}`]["day"]["avgtemp_c"]}\u00B0C</div>
											<div class="fs-4">${obj[8]["forecast"]["forecastday"][`${i - 7}`]["day"]["avgtemp_f"]}\u00B0F</div>
										</div>
									</div>
									<!--Minimum Temperature-->
									<div class="card d-flex flex-column me-3" style="width: 100px">
										<span class="position-absolute top-0 start-50 translate-middle badge bg-dark text-info">
				    						Min
				    						<span class="visually-hidden">Minimum Temperature</span>
				  						</span>
				  						<div class="card-body">
											<div class="fs-4 border-bottom">${obj[8]["forecast"]["forecastday"][`${i - 7}`]["day"]["mintemp_c"]}\u00B0C</div>
											<div class="fs-4">${obj[8]["forecast"]["forecastday"][`${i - 7}`]["day"]["mintemp_f"]}\u00B0F</div>
										</div>
									</div>
									<!--Maximum Temperature-->
									<div class="card d-flex flex-column" style="width: 100px">
										<span class="position-absolute top-0 start-50 translate-middle badge bg-dark text-danger">
				    						Max
				    						<span class="visually-hidden">Maximum Temperature</span>
				  						</span>
				  						<div class="card-body">
											<div class="fs-4 border-bottom">${obj[8]["forecast"]["forecastday"][`${i - 7}`]["day"]["maxtemp_c"]}\u00B0C</div>
											<div class="fs-4">${obj[8]["forecast"]["forecastday"][`${i - 7}`]["day"]["maxtemp_f"]}\u00B0F</div>
										</div>
									</div>
								</div>
							</div>`);

					//Other info
					$(`#weather-card-${i}`).children(".card-body").append(`<div class="d-flex flex-row justify-content-center mb-2">
									<!--Maximum Wind-->
									<div class="card d-flex flex-column me-3" style="width: 100px">
										<span class="position-absolute top-0 start-50 translate-middle badge bg-dark">
				    						<span class="material-symbols-outlined">air</span>
				    						<span class="visually-hidden">Maximum Wind</span>
				  						</span>
				  						<div class="card-body">
											<div class="fs-6 border-bottom">${obj[8]["forecast"]["forecastday"][`${`${i - 7}`}`]["day"]["maxwind_kph"]}kph</div>
											<div class="fs-6">${obj[8]["forecast"]["forecastday"][`${i - 7}`]["day"]["maxwind_mph"]}mph</div>
										</div>
									</div>
									<!--Total Precipitation-->
									<div class="card d-flex flex-column me-3" style="width: 100px">
										<span class="position-absolute top-0 start-50 translate-middle badge bg-dark">
				    						<span class="material-symbols-outlined">water_drop</span>
				    						<span class="visually-hidden">Total Precipitation</span>
				  						</span>
				  						<div class="card-body">
											<div class="fs-6 border-bottom">${obj[8]["forecast"]["forecastday"][`${i - 7}`]["day"]["totalprecip_mm"]}mm</div>
											<div class="fs-6">${obj[8]["forecast"]["forecastday"][`${i - 7}`]["day"]["totalprecip_in"]}in</div>
										</div>
									</div>
									<!--Total Snow-->
									<div class="card d-flex flex-column" style="width: 100px">
										<span class="position-absolute top-0 start-50 translate-middle badge bg-dark">
				    						<span class="material-symbols-outlined">ac_unit</span>
				    						<span class="visually-hidden">Total Snow</span>
				  						</span>
				  						<div class="card-body d-flex align-items-center justify-content-center">
											<div class="fs-6">${obj[8]["forecast"]["forecastday"][`${i - 7}`]["day"]["totalsnow_cm"]}cm</div>
										</div>
									</div>
								</div>
								<hr>`);

					//Date
					$(`#weather-card-${i}`).children(".card-body").append(`<div class="justify-content-center">${DateTime.fromISO(obj[8]["forecast"]["forecastday"][`${i - 7}`]["date"], { zone: obj[8]["location"]["tz_id"] }).toLocaleString({ month: 'long', day: 'numeric', year: 'numeric', timeZoneName: 'short' })}</div>`);
				}
			}
		};
		weatherXhttp[8].open("GET", `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${location}&days=4`, true);
		weatherXhttp[8].send();
	}

	//Search or autocomplete
	$("#search").on("input", function() {
		let inputValue = $("#search").val()
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				if (this.responseText != "[]") {
					$("#search-bar-tooltip").slideDown("fast");
					$("#search-bar-tooltip").html("");
					JSON.parse(this.responseText).forEach((value, index, array) => {
						$("#search-bar-tooltip").append(`<button id="tooltip-${index}" type="button" class="list-group-item list-group-item-action"></button>`);
						$("#search-bar-tooltip").children(`#tooltip-${index}`).append(`${value["name"]}` + `, ` + `${value["region"]}` + `, ` + `${value["country"]}`);
					});

					//Replace the search bar's value when a button is clicked, then get the weather data
					$("#search-bar-tooltip").children("button").on("click", function(event) {
						let location = $("#" + event.target.id).html()
						$("#search").val(location);
						getWeather(location);
						$("#search-bar-tooltip").slideUp("fast");
					});
				}
				else {
					$("#search-bar-tooltip").slideUp("fast");
				}
			}
			else if (this.status == 400) {
				$("#search-bar-tooltip").slideUp("fast");
			}
		};
		xhttp.open("GET", `http://api.weatherapi.com/v1//search.json?key=${key}&q=${inputValue}`, true);
		xhttp.send();
	});

	//Get the weather data when the search icon is clicked
	$("#search-addon").on("click", function() {
		let location = $("#search").val();
		if (location != "")
			getWeather(location);
	});

	getWeather(location);
})