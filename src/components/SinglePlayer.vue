<template>

<div id="single-player">
  <div id="back-btn" @click="$emit('show-component', 'LandingPage')">back</div>
  <div id="intro-screen" v-show="gameStarted==false">
    <p>Every choice you have ever made has lead you to this moment.</p>
    <p>What option will you choose now?</p>
    <p>Be quick.</p>
    <p>Be decisive.</p>
    <p>Make Shitty Choices!</p>
    <div id='start-btn' @click.stop="startGame">start game</div>
  </div>
	<transition-group tag="div" v-bind:css="false" id="options">
		<div v-for="(item, index) in optionSet" v-bind:key="item.id" v-show="showOptions" v-bind:data-index="index" class="option" v-on:click.stop="getOptions">{{ item.text }}</div>
	</transition-group>

  <div id="game-over" v-show="gameOver"> Game Over!</div>


</div>

</template>


<script>

  import json from '../data/choices.json'


export default {
  
  name: "SinglePlayer",
  data: function () {
  	return {
  		gameStarted: false,
  		items: ["A", "B", "C", "D", "E", "F", "G", "H"],
  		clickCount: 0,
  		showOptions: false,
      gameOver: false,
      optionSet: json

  	}
  },
  computed: {
  	updateOptions: function () {
      /* if (this.clickCount >= this.optionSet.length ){
          this.gameOver = true
       } */
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
  		

  		//var optionContainer = document.getElementById('options')
  		//var optionList = optionContainer.childNodes

  		//var nextOption = this.clickCount + 2

  		// return which option was selected
  		console.log(event.target.textContent);

  		// animate the selected option, then clear the current options
  		Velocity(event.target, { scaleX: 1.5, scaleY: 1.5 }, { duration: 300, loop: 1, complete: this.clearOptions })
  		 
  		//console.log(this.clickCount);
  	},
  	newOptions: function() {

      var optionContainer = document.getElementById('options')
      var optionList = optionContainer.childNodes

       // increment clickCount
      this.clickCount+=2;
      

          // once the current pair exits, bring in the new pair
      Velocity(optionList[this.clickCount], { translateX: '500px' }, {  duration: 200 })
      Velocity(optionList[this.clickCount+1], { translateX: '-500px' }, { duration: 200 })

      console.log(this.clickCount)
      if (this.clickCount >= this.optionSet.length) {
        this.gameOver = true
      }
  	},
  	clearOptions: function(currentOption) {

      var optionContainer = document.getElementById('options')
      var optionList = optionContainer.childNodes
  		// check to see which pair is currently visible and then exit them from the screen
  		Velocity(optionList[this.clickCount], { translateY: '500px' }, { delay: 100, duration: 200, display: 'none' })
  		Velocity(optionList[this.clickCount+1], { translateY: '500px' }, { duration: 200, display: 'none', complete: this.newOptions })
  		

  	}
  }
};
</script>

<style scoped>
	
	#single-player {
		max-width: 750px;
		margin: 0 auto;
		border: 1px solid green;
	}

  #back-btn {
    position: absolute;
    border: 1px solid pink;
  }

	.option {
		border: 1px solid grey;
		width: 30%;
		margin: 10px auto 10px auto;
		position: relative;
    font-size: 1.3em;
	}

	#options div:nth-child(odd) {
		left: -500px;
    text-align: left;
	}

	#options div:nth-child(even) {
		left: 500px;
    text-align: right;
	}

	#options {
		height: 100%;
		overflow: hidden;
	}

  #start-btn {
    border: 1px solid grey;
    width: 35%;
    margin: 0 auto;
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


