<template>

<div id="single-player">
  <button @click="$emit('show-component', 'LandingPage')">back</button>
  <p>welcome to single</p>
  <button @click.stop="startGame">start game</button>
  		<transition-group tag="div" v-bind:css="false" id="options">
  			<div v-for="(item, index) in items" v-bind:key="item" v-show="showOptions" v-bind:data-index="index" class="option" v-on:click.stop="getOptions">{{ item }}</div>
  		</transition-group>
  </div>

</template>


<script>

export default {
  
  name: "SinglePlayer",
  data: function () {
  	return {
  		gameStarted: false,
  		items: ["A", "B", "C", "D", "E", "F", "G", "H"],
  		clickCount: 0,
  		showOptions: false
  	}
  },
  computed: {
  	updateOptions: function () {

  	}
  },
  methods: {
  	//TO-DO: before enter
  	beforeEnter: function (el, done) {

  	},
  	enter: function (el, done) {

  	},
  	leave: function (el, done) {

  	},
  	leaveActive: function (done) {

  		console.log("left active")
  	},
  	startGame: function () {
  		this.gameStarted = true;

  		var optionContainer = document.getElementById('options')
  		var optionList = optionContainer.childNodes

  		// enter the first pair
  		Velocity(optionList[0], { translateX: '500px' }, { duration: 200 })
  		Velocity(optionList[1], { translateX: '-500px' }, { delay: 200, duration: 200 })

  		this.showOptions = true
  	},
  	getOptions: function ( event ) {
  		

  		var optionContainer = document.getElementById('options')
  		var optionList = optionContainer.childNodes

  		var nextOption = this.clickCount + 2

  		// return which option was selected
  		console.log(event.target.textContent);

  		// animate the selected option, then clear the current options
  		Velocity(event.target, { scaleX: 1.5, scaleY: 1.5 }, { duration: 300, loop: 1, complete: this.clearOptions })
  		
  		// once the current pair exits, bring in the new pair
  		Velocity(optionList[nextOption], { translateX: '500px' }, { delay: 800, duration: 200 })
  		Velocity(optionList[nextOption+1], { translateX: '-500px' }, { delay: 900, duration: 200 })


  		// once all pairs are shown, end the game

  		
  		console.log(this.clickCount);
  	},
  	newOptions: function() {

  	},
  	clearOptions: function(currentOption) {
  		
  		var optionContainer = document.getElementById('options')
  		var optionList = optionContainer.childNodes

  		// check to see which pair is currently visible and then exit them from the screen
  		Velocity(optionList[this.clickCount], { translateY: '500px' }, { delay: 100, duration: 200, display: 'none' })
  		Velocity(optionList[this.clickCount+1], { translateY: '500px' }, { duration: 200, display: 'none' })
  		
  		// increment clickCount
  		this.clickCount+=2;
  	}
  }
};
</script>

<style scoped>
	
	#single-player {
		width: 100%;
		margin: 0 auto;
		border: 1px solid green;
	}

	.option {
		border: 1px solid grey;
		width: 25%;
		margin: 10px auto 10px auto;
		position: relative;
	}

	#options div:nth-child(odd) {
		left: -500px;
	}

	#options div:nth-child(even) {
		left: 500px;
	}

	#options {
		height: 100%;
		overflow: hidden;
	}

	.slide-right-enter {
		transform: translateX(-500px);
	}
	.slide-right-enter-active {
		transition: all .25s;
	}

	.slide-left-enter {
		transform: translateX(500px);
	}
	.slide-left-enter-active {
		transition: all .25s;
	}
</style>


