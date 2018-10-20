<template>

	<div id="landing-page">
		<div id="intro-text">
			<div id="tagline">
				<transition v-on:enter="tagEnter" v-on:leave="tagLeave" mode="out-in" v-bind:css="false">
					<div id="tagline-new" :key="tag"> 
						{{ tag }}
					</div>
				</transition>
			</div>
			<div id="title">
				<div id="shitty">Shitty</div>
				<div id="choices">Choices</div>
			</div>
		</div>
			<div id="single-player-btn" @click="$emit('show-component','SinglePlayer')">Single Player</div>
			<div id="multi-player-btn">Multiplayer</div>
	</div>
</template>

<script>
export default {
	name: "LandingPage",
	data: function() {
		return {
			msg: ["In this world", "You can't win", "You can only make..."],
			tag: "",
			msgCount: 0,
			interval: null
		}
  },
  computed: {
  
  },
  methods: {
  	setMessage: function() {
		this.tag = this.msg[this.msgCount]
		this.msgCount++  
		
		var vm = this
  		if (this.msgCount < this.msg.length) {
  			this.interval = setInterval(function() {

  				vm.tag = vm.msg[vm.msgCount]
  				vm.msgCount++
  				
  				if (vm.msgCount > vm.msg.length) {
  					clearInterval(vm.interval)
					vm.tag = vm.msg[2]
  				}
  			}, 2000)
  		}   	
  	},
  	tagEnter: function(el, done) {
  		Velocity(el, { opacity: 1 }, { duration: 800, complete: done })
  	},
  	tagLeave: function(el, done) {
  		Velocity(el, { opacity: 0 }, { duration: 800, complete:done })
  	}
  
  },
  mounted: function() {
  	//var tagline = document.getElementById('tagline')
  	//console.log(tagline)
  	//Velocity(tagline, { opacity: 1}, {duration: 800})
  	/*Velocity(document.getElementById('tag-1'), { opacity: 1 }, { duration: 800 })
  	Velocity(document.getElementById('tag-2'), { opacity: 1 }, { delay: 800, duration: 800 })
  	Velocity(document.getElementById('tag-3'), { opacity: 1 }, { delay: 1600, duration: 800 })*/

  	this.setMessage()

  	Velocity(document.getElementById('shitty'), { translateX: '1200px'}, {delay: 6800, duration: 200, easing: 'ease-out' })
  	Velocity(document.getElementById('choices'), { translateX: '-1200px'}, {delay: 7000, duration: 200, easing: 'ease-out'})
  	Velocity(document.getElementById('single-player-btn'), { opacity: 1}, { delay: 8000, duration: 500})
  }
};
</script>

<style scoped>

	#landing-page {
		width: 100%;
		/*display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;*/
		/*margin: 10% auto;*/
		/*border: 1px solid red;*/
		/*max-width: 800px;*/
	}

	@media (min-width: 768px) {
		#title {
			font-size: 7em;
		}
	}

	@media (max-width: 767px) {
		#title {
			font-size: 5em;
		}
	}
	#title {
		/*font-size: 5em;*/
		/*border: 1px solid orange;*/
		width: 100%;
	}
	#intro-text {
		overflow: hidden;
		width: 100%;
	}
	#shitty {
		left: -1200px;
		position: relative;
	}
	#choices {
		left: 1200px;
		position: relative;
	}

	#tagline {
		opacity: 1;
	}

	#tagline-new {
		font-size: 1.3em;
		opacity: 0;
	}

	.tag-segment {
		opacity: 0;
		font-size: 1.3em;
	}

	#single-player-btn {
		border: 4px solid black;
		max-width: 300px;
		width: 65%;
		height: 60px;
		line-height: 60px;
		margin: 10px auto;
		opacity: 0;
		font-size: 1.3em;
	}

	#single-player-btn:hover {
		cursor: pointer;
		background-color: black;
		color: white;
	}

	#multi-player-btn {
		opacity: 0;
	}

</style>