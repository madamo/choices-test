<template>

<div id="landing-page">
	<div id="intro-text">
		<div id="tagline">
			<!--<span id="tag-1" class="tag-segment">in this world, </span>
			<span id="tag-2" class="tag-segment">you can't win,</span>
			<span id="tag-3" class="tag-segment"> you can only make...</span>-->
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
  <!--<button @click="$emit('show-component','SinglePlayer')">single player</button>-->
  </div>
</template>

<script>
export default {
  name: "LandingPage",
  data: function() {
  	return {
  		msg: ["in this world", "you can't win", "you can only make..."],
  		tag: "",
  		msgCount: 0,
  		interval: null
  	}
  },
  computed: {
  	tagSegment: function() {
  		//return this.msg = "you can't win"
  		// TO-DO: make a transition for the msg, cycle through and update the message 3 times
  	}
  },
  methods: {
  	setMessage: function() {
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

  	Velocity(document.getElementById('shitty'), { translateX: '500px'}, {delay: 8800, duration: 200})
  	Velocity(document.getElementById('choices'), { translateX: '-500px'}, {delay: 9000, duration: 200})
  	Velocity(document.getElementById('single-player-btn'), { opacity: 1}, { delay: 10000, duration: 500})
  }
};
</script>

<style scoped>
	#title {
		font-size: 5em;
		border: 1px solid orange;
	}
	#intro-text {
		overflow: hidden;
	}
	#shitty {
		left: -500px;
		position: relative;
	}
	#choices {
		left: 500px;
		position: relative;
	}
	#landing-page {
		width: 80%;
		height: 550px;
		margin: 0 auto;
		border: 1px solid green;
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
		border: 1px solid grey;
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
		background-color: grey;
		color: white;
	}

	#multi-player-btn {
		opacity: 0;
	}

	.fade-enter-active {
  transition: all .8s ease;
}
.fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  opacity: 0;
}
</style>