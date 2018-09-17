<template>

<div id="landing-page">
	<div id="intro-text">
		<div id="tagline">
			<span id="tag-1" class="tag-segment">in this world, </span>
			<span id="tag-2" class="tag-segment">you can't win,</span>
			<span id="tag-3" class="tag-segment"> you can only make...</span>
		<!--	<div> {{ msg }}</div> -->
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
  		msg: ["in this world", "you can't win", "you can only make..."]
  	}
  },
  computed: {
  	tagSegment: function() {
  		for (var i = 0; i<this.msg.length; i++) {
  			return this.msg[i];
  		}

  		// TO-DO: make a transition for the msg, cycle through and update the message 3 times
  	}
  },
  methods: {
  
  },
  mounted: function() {
  	console.log('entered')
  	//var tagline = document.getElementById('tagline')
  	//console.log(tagline)
  	//Velocity(tagline, { opacity: 1}, {duration: 800})
  	Velocity(document.getElementById('tag-1'), { opacity: 1 }, { duration: 800 })
  	Velocity(document.getElementById('tag-2'), { opacity: 1 }, { delay: 800, duration: 800 })
  	Velocity(document.getElementById('tag-3'), { opacity: 1 }, { delay: 1600, duration: 800 })

  	Velocity(document.getElementById('shitty'), { translateX: '500px'}, {delay: 2400, duration: 200})
  	Velocity(document.getElementById('choices'), { translateX: '-500px'}, {delay: 2600, duration: 200})
  	Velocity(document.getElementById('single-player-btn'), { opacity: 1}, { delay: 3500, duration: 500})
  }
};
</script>

<style scoped>
	#title {
		font-size: 5em;
		border: 1px solid orange;
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

	.tag-segment {
		opacity: 0;
		font-size: 1.3em;
	}

	#single-player-btn {
		border: 1px solid grey;
		width: 25%;
		margin: 10px auto;
		opacity: 0;
	}

	#multi-player-btn {
		opacity: 0;
	}
</style>