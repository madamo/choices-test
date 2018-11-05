<template>
	<div id="option-display">
		<!--<div id="game-over" v-show="gameOver">Game Over!</div>-->
	<!--	<transition v-on:enter="gameOverEnter">
			<GameOverScreen v-if="gameOver" :choices="choices"></GameOverScreen>
		</transition> -->
		
		<div id="turn-timer" v-if="!gameOver">
			<div id="time-remaining">
				<div id="time-elapsed"></div>
			</div>
		</div>
		<div id="options" v-if="!gameOver">
			<transition v-on:before-enter="beforeEnter" v-on:enter="enterLeft" v-on:leave="leaveTop" v-on:after-leave="afterLeaveTop" v-bind:css="false" >
				<div v-if="showOptions" v-on:click.stop="getOptions(currentOption.firstOption)" class="firstOption option">{{ currentOption.firstOption.optionText }}</div>
			</transition>
			<transition v-on:before-enter="beforeEnter" v-on:enter="enterRight" v-on:leave="leaveBottom" v-on:after-leave="afterLeaveBottom" v-bind:css="false">
				<div v-if="showOptions" v-on:click.stop="getOptions(currentOption.secondOption)" class="secondOption option">{{ currentOption.secondOption.optionText }}</div>
			</transition>
		</div>
	</div>
</template>

<script>

	//import json from '../data/choices.json'
	//import GameOverScreen from "./GameOverScreen";


	export default {
		name: "OptionDisplay",
		props: {
			optionSet: Array
		},
		components: {
			
		},
		data: function() {
			return {
				clickCount: 0,
				canClick: true,
  				showOptions: false,
    			gameOver: false,
    			//optionSet: json,
    			timeRemaining: 0,
    			runTimer: null,
				choices: [],
				currentOption: null
    		}
		},
		computed: {
	
		},
		methods: {
			beforeEnter: function(el, done) {
				//el.style.transform = 'none'
				//Velocity(el, "reverse")
			},
			enterLeft: function(el, done) {
				console.log("entering left!")
				Velocity(el, { translateX: '500px' }, { duration: 200, complete: done })
			},
			enterRight: function(el, done) {
				Velocity(el, { translateX: '-500px' }, { duration: 200, complete: done })
			},
			leaveTop: function(el, done) {
				Velocity(el, { translateY: '500px', rotateZ: '25deg' }, { duration: 200, complete: done })
			},
			leaveBottom: function(el, done) {
				Velocity(el, { translateY: '500px', rotateZ: '-25deg' }, { delay: 100, duration: 200, complete: this.newOptions })
			},
			afterLeaveTop: function(el, done) {
				//Velocity(el, "reverse", {complete: done})
				//el.style.transform = 'unset'

			},
			afterLeaveBottom: function(el, done) {

				//Velocity(el, "reverse", {complete: this.newOptions})
			},
			getOptions: function (selectedOption) {
				
				if (this.canClick == true) {

					this.$emit('markSelected', selectedOption)
					//console.log(this.currentOption)
					this.$emit('increment', this.currentOption)
					//console.log(text)
					// animate the selected option, then clear the current options
					Velocity(event.target, { scaleX: 1.2, scaleY: 1.2 }, { duration: 200, loop: 1, complete: this.clearOptions })

					this.canClick = false

					//this.currentOption = this.optionSet[1]
				} else {
					return
				}
			},
			newOptions: function() {

				// This function gets the next 2 options to display and
				// transitions them in. It also checks to see if there are
				// any options left, then triggers Game Over when needed.

				
				// increment clickCount
				this.clickCount++;

				this.checkGameOver()

				if (!this.gameOver) {

					//var optionContainer = document.getElementById('options')
					//var optionList = optionContainer.childNodes

					// once the current pair exits, bring in the next pair
					//Velocity(optionList[this.clickCount], { translateX: '500px' }, {  duration: 200 })
					//Velocity(optionList[this.clickCount+1], { translateX: '-500px' }, { duration: 200 })

					// check to see if there are any options left to display
					// if not, then trigger the game over screen to appear
					this.currentOption = this.optionSet[this.clickCount]

					this.showOptions = true
					this.canClick = true;

					this.startTimer()
				}

			},
			clearOptions: function() {
				// This function gets a list of the option divs, then uses 
				// clickCount to transition out the currently displayed divs.
				// when the transition ends, it calls newOptions to bring in the
				// next pair of options.

				//this.resetTimer()

				// Again, getting a list of all of the option divs
				//var optionContainer = document.getElementById('options')
				//var optionList = optionContainer.childNodes

				this.showOptions = false
				//this.newOptions()

				// take the pair that is currently visible and then exit them from the screen
				// Once they exit, call newOptions to get the next two  items
				//Velocity(optionList[this.clickCount], { translateY: '500px', rotateZ: '25deg' }, { delay: 100, duration: 200, display: 'none' })
				//Velocity(optionList[this.clickCount+1], { translateY: '500px', rotateZ: '-25deg' }, { duration: 200, display: 'none', complete: this.newOptions })
			},
			startTimer: function() {
				var timeElapsed = document.getElementById('time-elapsed')
				var timeLeft = document.getElementById('time-remaining')
				Velocity(timeElapsed, { width: '100%' }, {duration: 10000, easing: "linear" })
				Velocity(timeLeft, { backgroundColor: '#ff0000' }, { delay: 7000, duration: 200 } )
				Velocity(timeLeft, { opacity: 0.5 }, { duration: 333, loop: true } )

				this.runTimer = setTimeout(this.timeExpired, 10000)
			},
			resetTimer: function() {
				clearTimeout(this.runTimer)
				var timeElapsed = document.getElementById('time-elapsed')
				var timeLeft = document.getElementById('time-remaining')
				Velocity(timeElapsed, "stop")
				Velocity(timeLeft, "stop", true)
				Velocity(timeElapsed, { width: '0%' }, {duration: 500 })
				//Velocity(timeElapsed, "reverse")
				Velocity(timeLeft, { opacity: 1, backgroundColor: '#50C878' }, { duration: 200 } )
				//Velocity(timeLeft, "reverse")
			},
			checkGameOver: function() {
				if (this.clickCount >= this.optionSet.length) {
					this.gameOver = true
					this.$emit('endGame', this.gameOver)
					//console.log(this.choices)
					clearTimeout(this.runTimer)
					console.log("game over in optiondisplay!")
				} else {
					this.resetTimer()

					//return
				}	
			},
			timeExpired: function() {
				//this.choices.push({'text': "You didn't choose!", 'selected': false})
				this.canClick = false

				//var optionContainer = document.getElementById('options')
				//var optionList = optionContainer.childNodes

				var options = document.getElementsByClassName('option')
				console.log("time expired!")
				//console.log(options[1])

				//this.choices.push({'text':this.optionSet[this.clickCount].text, 'selected': false, 'fail':true })
				//this.choices.push({'text':this.optionSet[this.clickCount+1].text, 'selected': false, 'fail': true })

				//console.log(this.choices)


				Velocity(options[0], { translateY: '5px'}, { loop: 3, duration: 50 })
				Velocity(options[1], { translateY: '5px' }, { loop: 3, duration: 50, complete: this.clearOptions })
				//this.clearOptions()
			},
			gameOverEnter: function(el) {
				Velocity(el, { opacity: 1}, {duration: 1000})
			}
		},
		created() {
			this.currentOption = this.optionSet[0]

		},
		mounted: function() {
			// Get a list of all of the option divs to transition in the first pair
			// TO-DO: Refactor for a more Vue way of doing this, rather than
			// manipulating the DOM directly
			//var optionContainer = document.getElementById('options')
			//var optionList = optionContainer.childNodes

			//console.log(this.optionSet)


			// Apply transition to the first pair of options using Velocity
			//Velocity(optionList[0], { translateX: '500px' }, { duration: 200 })
			//Velocity(optionList[1], { translateX: '-500px' }, { delay: 200, duration: 200 })

			// Trigger the options div to appear
			this.showOptions = true
			this.startTimer()
		}
	}
</script>

<style>

	/*#options div:nth-child(odd) {
		left: -500px;
		right: 500px;
		text-align: left;
	}

	#options div:nth-child(even) {
		left: 500px;
		right: -500px;
		top: 200px;
		text-align: right;
	} */


	.firstOption {
		left: -500px;
		right: 500px;
		text-align: left;
	}

	.secondOption {
		left: 500px;
		right: -500px;
		top: 200px;
		text-align: right;
	}

	#option-display {
		/*border: 1px solid orangered;*/
		/*margin-top: 25px;*/
	/*	border: 1px solid green;*/
		margin-top: 25%;
	}

	#options {
		width: 100%;
		height: 80vh;
		/*max-width: 500px;*/
		/*height: 90vh;*/
		margin: 0 auto;
		overflow: hidden;
		position: relative;
		/*display: grid;
		grid-template-columns: 1fr;
		grid-auto-rows: minmax(200px, 300px);
		grid-gap: 10px;*/
	}

	.option {
    	/*min-width: 225px;
		width: 30%;
		margin: 10px auto 10px auto;*/
		border-radius: 3px;
		background-color: rgb(32, 19, 105);
		color: white;
		box-shadow: 1px 1px grey;
		margin: 10px auto 10px auto;
		/*border: 2px solid black;*/
    	font-size: 1.5em;
		padding: 20px;
    	position: absolute;
    	width: 70%;
		min-width: 200px;
		max-width: 500px;
    	height: 23vh;
	
    	display: flex;
    	flex-direction: column;
    	justify-content: center;
    	align-content: center;

		cursor: pointer;
	}

	#turn-timer {
	    width: calc(70% + 40px);
		min-width: 200px;
		max-width: 500px;
	    height: 30px;
	    margin: 0 auto;
	    position: relative;
  	}

	#time-elapsed {
		width: 0%;
		height: 100%;
		background-color: white;
		right: 0px;
		position: absolute;
		z-index: 200;
	}
	#time-remaining {
		width: 100%;
		height: 100%;
		background-color: #50C878;
		position: relative;
		z-index: 0;
	}
</style>