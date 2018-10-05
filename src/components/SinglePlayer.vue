<template>

<div id="single-player">

  <div id="top-nav">
    <div id="back-btn" @click="$emit('show-component', 'LandingPage')">back</div>
  </div>

  <div id="intro" v-if="showIntro"><IntroScreen v-on:show-countdown="showCountdown"></IntroScreen></div>

 <!-- <div id="intro-screen" v-if="showIntro">
    <div id="intro-screen-text">
      <p>Every choice you have ever made has led you to this moment.</p>
      <p>What will you choose now?</p>
      <p>Be quick.</p>
      <p>Be decisive.</p>
      <p>Make Shitty Choices!</p>
    </div>
    <div id='start-btn' @click.stop="showCountdown">start game</div>
  </div> -->

  <div id="countdown-timer" v-if="countdownStarted"><CountdownTimer v-on:start-game="startGame"></CountdownTimer></div>

  <div id="option-container" v-if="gameStarted"><OptionDisplay></OptionDisplay></div>

	<!--<transition-group tag="div" v-bind:css="false" id="options">
		<div v-for="(item, index) in optionSet" v-bind:key="item.id" v-show="showOptions" v-bind:data-index="index" class="option" v-on:click.stop="getOptions">{{ item.text }}</div>
	</transition-group> -->

 <!-- <div id="game-over" v-show="gameOver"> Game Over!</div> -->

</div>

</template>


<script>

import CountdownTimer from "./CountdownTimer";
import IntroScreen from "./IntroScreen";
import OptionDisplay from "./OptionDisplay";


//import json from '../data/choices.json'


export default {
  
  name: "SinglePlayer",
  components: {
    CountdownTimer,
    IntroScreen,
    OptionDisplay
  },
  data: function () {
  	return {
  		gameStarted: false,
      countdownStarted: false,
      showIntro: true,
  		//items: ["A", "B", "C", "D", "E", "F", "G", "H"],
  		//clickCount: 0,
  		//showOptions: false,
     // gameOver: false,
     // showCountdown: false,
      //optionSet: json

  	}
  },
  computed: {
  	updateOptions: function () {

  	}
  },
  methods: {
    showCountdown: function() {
      this.showIntro = false
      this.countdownStarted = true
    },

  	startGame: function () {
  		// trigger the Intro Screen to appear and transition in
      console.log("game started")
      this.countdownStarted = false
      this.gameStarted = true;
  

/*
  		// Get a list of all of the option divs to transition in the first pair
      // TO-DO: Refactor for a more Vue way of doing this, rather than
      // manipulating the DOM directly
      var optionContainer = document.getElementById('options')
  		var optionList = optionContainer.childNodes

  		// Apply transition to the first pair of options using Velocity
  		Velocity(optionList[0], { translateX: '500px' }, { duration: 200 })
  		Velocity(optionList[1], { translateX: '-500px' }, { delay: 200, duration: 200 })

  		// Trigger the options div to appear
      this.showOptions = true*/
    },
  	/*getOptions: function ( event ) {

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
    runTimer: function() {
      //TO-DO: bind the timer bar to styles/computed properties
    }*/
  }
};
</script>

<style>
	
	#single-player {
		max-width: 750px;
		margin: 0 auto;
		border: 1px solid green;
    min-height: 500px;
	}

  #top-nav {
    /*border: 1px solid red;*/
  }

  #back-btn {
    /*border: 1px solid pink;*/
    width: 25%;
    text-align: left;
    cursor: pointer;
    border: 1px solid red;
    position: absolute;
  }


</style>


