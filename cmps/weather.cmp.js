

export default {
	template:/*html*/ `
	<section v-if="weather" class="weather flex align-center">
	  <span class="weather-top">
	    <span class="city flex">
	      <h2>TLV</h2>
	      <h3>{{getTemp}}°C</h3>
	    </span>
	    {{weather.weather[0].description}}
	  </span>
	  <span>
	    <img :src="getWeatherIcon" alt="" />
	  </span>
	</section>
	`,
	data() {
		return {
			weather: null
		}
	},
	created() {
		this.askForWeather()
	},
	computed: {
		getTemp() {
			return Math.round(this.weather.temp)
		},
		getWeatherIcon(){
			return `http://openweathermap.org/img/wn/${this.weather.weather[0].icon}@2x.png`
		}
	},
	methods: {
		askForWeather(lat = 32.109333, lng = 34.855499) {
			const API = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=65505f532c6a14c573f169722f2b0004`
			return axios.get(API).then(({ data }) => {
				let results = {
					temp: data.list[0].main.temp - 272.15,
					weather: data.list[0].weather
				}

				this.weather = results
			})
		},
	},
}
