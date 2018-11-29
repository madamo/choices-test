<template>
	<div id="game-over">
		<p>Congratulations! But the final question remains: can you live with your choices?</p>
		<div id="result-container">
			<div class="option-row" v-for="choice in choices" :key="choice.id">
				<div class="end-option" :class="{selected: choice.firstOption.selected}">
					<div>{{ choice.firstOption.optionText }}</div>
					<div v-for="player in choice.firstOption.selectedBy" :key="player">
							{{ player }}
					</div>
					<div class="score"> {{ ((choice.firstOption.timesSelected / choice.timesShown) * 100).toFixed(0) }}% </div>
				</div>
				<div class="end-option" :class="{selected: choice.secondOption.selected}">
					{{ choice.secondOption.optionText }} 
				<div v-for="player in choice.secondOption.selectedBy" :key="player">
							{{ player }}
				</div>
					<span class="score"> {{ ((choice.secondOption.timesSelected / choice.timesShown) * 100).toFixed(0) }}% </span>

					</div>
			</div>
		</div>
	</div>
</template>

<script>

import db from '@/firebase/init.js'
import firebase from 'firebase'

	export default {
		name: "GameOverScreen",
		props: {
			choices: Array,
			gameID: String
		},
		data() {
			return {

			}
		},
		methods: {
			showChoices: function ( ) {
				//console.log(choices)
			},
			getScore: function(timesSelected, timesShown) {
				return (Math.floor((timesSelected / timesShown) * 100))
			}
		},
		mounted() {

			//TODO: Move this to created, update onSnapshot
			let ref = db.collection('games').doc(this.gameID).collection('choices')
			for (let choice of this.choices) {
				ref.doc(choice.id).get().then(item => {
					console.log("item = " + item.id)
					console.log("choice = " + choice.id)
					console.log("firstOption.selectedBy = " + item.data().firstOption.selectedBy)
					console.log("secondOption.selectedBy = " + item.data().secondOption.selectedBy)

					if (item.data().firstOption.selectedBy) {
						for (let player of item.data().firstOption.selectedBy) {
							choice.firstOption.selectedBy.push(player)
						}
					}

					if (item.data().secondOption.selectedBy) {
						for (let player of item.data().secondOption.selectedBy) {
							choice.secondOption.selectedBy.push(player)
						}
					}

				})
			}

		}
	}

</script>

<style>

	#game-over {
		opacity: 0;
		overflow: visible;
		position: absolute;
		top: 25px;
		width: 95%;
	}

	#result-container {
		/*border: 1px solid orange;*/
		margin: 0 auto;
		width: 100%;
		display: grid;
		grid-template-columns: 1fr;
		grid-auto-rows: minmax(100px, 150px);
		grid-gap: 10px 10px;
	}

	.option-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-auto-rows: minmax(100px, 150px);
		grid-gap: 10px 10px;
	}

	.end-option.selected {
		/*color: white;
		background-color: #594777;*/
		border: 5px solid rgb(32, 19, 105) !important;
		color: black;
	}

	.fail {
		border: 1px solid red !important;
		color: grey;
	}

	.fail::before {
		content: "Fail!";
		display: block;
	}

	.end-option {
		border: 1px solid rgb(170, 170, 170);
		color: rgb(170,170,170);
		background-color: white;
		font-size: 1em;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/*padding: 25% 10px 25% 10px;*/
	}

	.score {
		font-size: .75em;
		padding-top: 20px;
	}
</style>