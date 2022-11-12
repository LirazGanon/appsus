

export default {
	template:/*html*/ `
	<section class="clock" >
	{{formatTime}}
	</section>

	`,
	data() {
		return {
			time: new Date(),
			interval: null,
			isDark: false,
		}
	},
	created() {

		this.interval = setInterval(() => {
			this.time = new Date()
		  }, 5000)
	},
	computed: {
		formatTime() {
			const options = {
				hour: 'numeric', minute: 'numeric', 
			  };
			  return new Intl.DateTimeFormat('en-US', options).format(this.time)
		  },
		 
	},

}
