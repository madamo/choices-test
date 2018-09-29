<template>
	<div id="option-display">
		<!--<div id="game-over" v-show="gameOver">Game Over!</div>-->
		<transition v-on:enter="gameOverEnter">
			<GameOverScreen v-if="gameOver" :choices="choices"></GameOverScreen>
		</transition>
		
		<div id="turn-timer" v-if="!gameOver">
			<div id="time-remaining">
			<div id="time-elapsed"></div>
			</div>
		</div>
		<div id="options" v-if="!gameOver">
			<div v-for="(item, index) in optionSet" 
				v-bind:key="item.id" 
				v-show="showOptions" 
				v-bind:data-index="index" 
				v-on:click.stop="getOptions"
				class="option" >{{ item.text }}</div>
		</div>
	</div>
</template>

<script>

	import json from '../data/choices.json'
	import GameOverScreen from "./GameOverScreen";


	export default {
		name: "OptionDisplay",
		components: {
			GameOverScreen
		},
		data: function() {
			return {
				clickCount: 0,
				canClick: true,
  				showOptions: false,
    			gameOver: false,
    			optionSet: json,
    			timeRemaining: 0,
    			runTimer: null,
    			choices: []
    		}
		},
		computed: {
	
		},
		methods: {
			getOptions: function ( event ) {

				// return which option was selected
				//console.log(event.target.textContent);
				//this.choices.push(this.optionSet[this.clickCount].text)
				/*console.log("Event text " + event.target.textContent)
				console.log("JSON text " + this.optionSet[this.clickCount].text)*/

				if (this.canClick == true) {

				//Determine which option was selected and add to choices array to pass to the GameOverScreen

					if (event.target.textContent == this.optionSet[this.clickCount].text) {
					//	console.log("You picked " + this.optionSet[this.clickCount].text)
						this.choices.push({'text':this.optionSet[this.clickCount].text, 'selected': true })
						this.choices.push({'text':this.optionSet[this.clickCount+1].text, 'selected': false })
					} else {
						//console.log("You picked " + this.optionSet[this.clickCount+1].text)
						this.choices.push({'text':this.optionSet[this.clickCount].text, 'selected': false })
						this.choices.push({'text':this.optionSet[this.clickCount+1].text, 'selected': true })
					}

					//this.choices.push(event.target.textContent)

					// animate the selected option, then clear the current options
					Velocity(event.target, { scaleX: 1.5, scaleY: 1.5 }, { duration: 300, loop: 1, complete: this.clearOptions })

					this.canClick = false
				} else {
					return
				}
			},
			newOptions: function() {

				// This function gets the next 2 options to display and
				// transitions them in. It also checks to see if there are
				// any options left, then triggers Game Over when needed.

				// Get a list of all of the option divs
				// TO-DO: There is probably a way to not have to do this
				// multiple times
				
				// increment clickCount by 2, since we're working with pairs
				this.clickCount+=2;

				this.checkGameOver()

				if (!this.gameOver) {

					var optionContainer = document.getElementById('options')
					var optionList = optionContainer.childNodes



					// once the current pair exits, bring in the next pair
					Velocity(optionList[this.clickCount], { translateX: '500px' }, {  duration: 200 })
					Velocity(optionList[this.clickCount+1], { translateX: '-500px' }, { duration: 200 })

					// check to see if there are any options left to display
					// if not, then trigger the game over screen to appear

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
				var optionContainer = document.getElementById('options')
				var optionList = optionContainer.childNodes

				// take the pair that is currently visible and then exit them from the screen
				// Once they exit, call newOptions to get the next two  items
				Velocity(optionList[this.clickCount], { translateY: '500px' }, { delay: 100, duration: 200, display: 'none' })
				Velocity(optionList[this.clickCount+1], { translateY: '500px' }, { duration: 200, display: 'none', complete: this.newOptions })
			},
			startTimer: function() {
				var timeElapsed = document.getElementById('time-elapsed')
				var timeLeft = document.getElementById('time-remaining')
				Velocity(timeElapsed, { width: '100%' }, {duration: 10000, easing: "ease-out" })
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
				Velocity(timeLeft, { opacity: 1, backgroundColor: '#476577' }, { duration: 200 } )
				//Velocity(timeLeft, "reverse")
			},
			checkGameOver: function() {
				if (this.clickCount >= this.optionSet.length) {
					this.gameOver = true
					//console.log(this.choices)
					clearTimeout(this.runTimer)
				} else {
					this.resetTimer()

					//return
				}	
			},
			timeExpired: function() {
				//this.choices.push({'text': "You didn't choose!", 'selected': false})
				var optionContainer = document.getElementById('options')
				var optionList = optionContainer.childNodes

				this.choices.push({'text':this.optionSet[this.clickCount].text, 'selected': false, 'fail':true })
				this.choices.push({'text':this.optionSet[this.clickCount+1].text, 'selected': false, 'fail': true })

				console.log(this.choices)


				Velocity(optionList[this.clickCount], { translateY: '5px'}, { loop: 3, duration: 50 })
				Velocity(optionList[this.clickCount+1], { translateY: '5px' }, { loop: 3, duration: 50, complete: this.clearOptions })
				//this.clearOptions()
			},
			gameOverEnter: function(el) {
				Velocity(el, { opacity: 1}, {duration: 1000})
			}
		},
		mounted: function() {
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
			this.startTimer()
		}
	}
</script>

<style>
	.option {
    	/*min-width: 225px;
		width: 30%;
		margin: 10px auto 10px auto;*/
		border: 1px solid grey;
		position: relative;
    	font-size: 1.3em;
    	padding: 10px;
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
		/*height: 100%;
		min-height: 500px;*/

		border: 1px solid purple;
		height: 100%;
		overflow: hidden;
		display: grid;
		grid-template-columns: 80%;
		grid-template-rows: 45% 45%;
		grid-gap: 10px;
	}

	#turn-timer {
	    width: 80%;
	    height: 30px;
	    margin: 0 auto;
	    border: 1px solid white;
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
		background-color: #476577;
		position: relative;
		z-index: 0;
	}
</style>