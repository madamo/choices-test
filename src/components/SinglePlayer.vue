<template>

<div id="single-player">

  <div id="back-btn" @click="$emit('show-component', 'LandingPage')">back</div>

  <div id="intro-screen" v-show="gameStarted==false">
    <div id="intro-screen-text">
      <p>Every choice you have ever made has led you to this moment.</p>
      <p>What will you choose now?</p>
      <p>Be quick.</p>
      <p>Be decisive.</p>
      <p>Make Shitty Choices!</p>
    </div>
    <div id='start-btn' @click.stop="gameStarted = true">start game</div>
  </div>

  <div id="timer" v-if="gameStarted"><CountdownTimer v-on:start-game="startGame"></CountdownTimer></div>

	<transition-group tag="div" v-bind:css="false" id="options">
		<div v-for="(item, index) in optionSet" v-bind:key="item.id" v-show="showOptions" v-bind:data-index="index" class="option" v-on:click.stop="getOptions">{{ item.text }}</div>
	</transition-group>

  <div id="game-over" v-show="gameOver"> Game Over!</div>

</div>

</template>


<script>

import CountdownTimer from "./CountdownTimer";

  import json from '../data/choices.json'


export default {
  
  name: "SinglePlayer",
  components: {
    CountdownTimer
  },
  data: function () {
  	return {
  		gameStarted: false,
  		items: ["A", "B", "C", "D", "E", "F", "G", "H"],
  		clickCount: 0,
  		showOptions: false,
      gameOver: false,
      showCountdown: false,
      //countTick: 3,
      //interval: null,
      optionSet: json

  	}
  },
  computed: {
  	updateOptions: function () {

  	}
  },
  methods: {

  	startGame: function () {
  		// trigger the Intro Screen to appear and transition in
      console.log("game started")
        this.gameStarted = true;
  


  		// Get a list of all of the option divs to transition in the first pair
      // TO-DO: Refactor for a more Vue way of doing this, rather than
      // manipulating the DOM directly
      var optionContainer = document.getElementById('options')
  		var optionList = optionContainer.childNodes

  		// Apply transition to the first pair of options using Velocity
  		Velocity(optionList[0], { translateX: '500px' }, { duration: 200 })
  		Velocity(optionList[1], { translateX: '-500px' }, { delay: 200, duration: 200 })

  		// Trigger the options div to appear
      this.showOptions = true
    },
  	getOptions: function ( event ) {

  		// return which option was selected
  		console.log(event.target.textContent);

  		// animate the selected option, then clear the current options
  		Velocity(event.target, { scaleX: 1.5, scaleY: 1.5 }, { duration: 300, loop: 1, complete: this.clearOptions })
  		 
  	},
  	newOptions: function() {

      // This function gets the next 2 options to display and
      // transitions them in. It also checks to see if there are
      // any options left, then triggers Game Over when needed.

      // Get a list of all of the option divs
      // TO-DO: There is probably a way to not have to do this
      // multiple times
      var optionContainer = document.getElementById('options')
      var optionList = optionContainer.childNodes

       // increment clickCount by 2, since we're working with pairs
      this.clickCount+=2;

      // once the current pair exits, bring in the next pair
      Velocity(optionList[this.clickCount], { translateX: '500px' }, {  duration: 200 })
      Velocity(optionList[this.clickCount+1], { translateX: '-500px' }, { duration: 200 })

      // check to see if there are any options left to display
      // if not, then trigger the game over screen to appear
      if (this.clickCount >= this.optionSet.length) {
        this.gameOver = true
      }
    },
  	clearOptions: function() {

      // This function gets a list of the option divs, then uses 
      // clickCount to transition out the currently displayed divs.
      // when the transition ends, it calls newOptions to bring in the
      // next pair of options.

      // Again, getting a list of all of the option divs
      var optionContainer = document.getElementById('options')
      var optionList = optionContainer.childNodes
  		
      // take the pair that is currently visible and then exit them from the screen
      // Once they exit, call newOptions to get the next two  items
  		Velocity(optionList[this.clickCount], { translateY: '500px' }, { delay: 100, duration: 200, display: 'none' })
  		Velocity(optionList[this.clickCount+1], { translateY: '500px' }, { duration: 200, display: 'none', complete: this.newOptions })
  	},
   /* startCountdown: function() {
      this.showCountdown = true
      var vm = this
      if (this.countTick > 0) {
        this.interval = setInterval(function() {

          vm.countTick--
          console.log(vm.countTick)
          
          if (vm.countTick < 1) {
            vm.startGame()

            clearInterval(vm.interval)
            console.log("interval cleared")
            //vm.startGame()

          //vm.tag = vm.msg[2]
          }
        }, 1000)
      }     
    },
    numEnter: function(el, done) {
      Velocity(el, { translateX: 0 }, { duration: 500, complete: done })
    },
    numLeave: function(el, done) {
      Velocity(el, { scaleX: 100, scaleY:100, translateX: '-150px', opacity: 0 }, { duration: 500, complete:done })
    }*/
  }
};
</script>

<style scoped>
	
	#single-player {
		max-width: 750px;
		margin: 0 auto;
		border: 1px solid green;
    height: 50%;
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

  #start-btn:hover {
    background-color: grey;
    color: white;
  }

  #intro-screen {
    height: 100%;
  }

  #intro-screen-text {
    opacity: 1;
    z-index: 100;
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


