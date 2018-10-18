<template>

<div id="single-player">

  <div id="top-nav">
    <div id="back-btn" @click="$emit('show-component', 'LandingPage')">back</div>
  </div>

  <div id="intro" v-if="showIntro"><IntroScreen v-on:show-countdown="showCountdown"></IntroScreen></div>


  <div id="countdown-timer" v-if="countdownStarted"><CountdownTimer v-on:start-game="startGame"></CountdownTimer></div>


  <div id="option-container" v-if="gameStarted"><OptionDisplay :optionSet="optionSet" @markSelected="markSelected" @increment="incrementCounters" @endGame="endGame"></OptionDisplay></div>

	<transition v-on:enter="gameOverEnter">
    <GameOverScreen v-if="gameOver"  :choices="optionSet"></GameOverScreen>
	</transition>

</div>

</template>


<script>

import CountdownTimer from "./CountdownTimer";
import IntroScreen from "./IntroScreen";
import OptionDisplay from "./OptionDisplay";
import GameOverScreen from "./GameOverScreen";

import db from '@/firebase/init'


//import json from '../data/choices.json'


export default {
  
  name: "SinglePlayer",
  components: {
    CountdownTimer,
    IntroScreen,
    OptionDisplay,
    GameOverScreen
  },
  data: function () {
  	return {
  		gameStarted: false,
      countdownStarted: false,
      showIntro: true,
      optionSet: [],
      gameOver: false
  		//items: ["A", "B", "C", "D", "E", "F", "G", "H"],
  		//clickCount: 0,
  		//showOptions: false,
     // showCountdown: false,
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
      console.log(this.optionSet)
    },
    markSelected(payload) {
      //console.log(payload)
      payload.selected = true
      payload.timesSelected++
     // console.log(payload.timesSelected)
    },
    incrementCounters(optionGroup) {
      optionGroup.timesShown++
      console.log(optionGroup.timesShown)
      console.log("choice id =" + optionGroup.id)
      db.collection('choices').doc(optionGroup.id).update({
        "timesShown": optionGroup.timesShown,
        "firstOption.timesSelected": optionGroup.firstOption.timesSelected,
        "secondOption.timesSelected": optionGroup.secondOption.timesSelected
      }).catch(err => {
        console.log(err)
      })
    },
    endGame() {
      this.gameStarted = false
      this.gameOver = true
     // console.log(payload)
      //console.log('game over in singleplayer!')
    },
    gameOverEnter: function(el) {
				Velocity(el, { opacity: 1}, { duration: 1000 })
		}
  },
  created() {
    // fetch data from firebase
    db.collection('choices').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        //console.log(doc.data())
        let choice = doc.data()
        choice.id = doc.id
        this.optionSet.push(choice)
      })
    })
  }
};
</script>

<style>
	
	#single-player {
		max-width: 750px;
		margin: 0 auto;
		/*border: 1px solid white;*/
    min-height: 500px;
	}

  #top-nav {
   /* border: 1px solid red; */
    position: relative;
  }

  #back-btn {
    /*border: 1px solid pink;*/
    width: 25%;
    text-align: left;
    cursor: pointer;
   /* border: 1px solid red;*/
   /* position: absolute;*/
  }


</style>


