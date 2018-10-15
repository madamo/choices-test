<template>
	<div id="game-over">
		<p>Congratulations! But the final question remains: can you live with your choices?</p>
		<div id="result-container">
			<div class="option-row" v-for="choice in choices" :key="choice.id">
				<div class="end-option" :class="{selected: choice.firstOption.selected}">
					{{ choice.firstOption.optionText }}
					<span>% choose: {{ choice.firstOption.timesSelected / choice.timesShown }}</span>
					 </div>
				<div class="end-option" :class="{selected: choice.secondOption.selected}">
					{{ choice.secondOption.optionText }} 
					<span>% choose: {{ choice.secondOption.timesSelected / choice.timesShown }}</span>

					</div>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		name: "GameOverScreen",
		props: {
			choices: Array
		},
		methods: {
			showChoices: function ( ) {
				console.log(choices)
			}
		},
		mounted() {
			console.log(this.choices)
		}
	}

</script>

<style>

	#game-over {
		opacity: 0;
		background-color: white;
		height: 100vh;
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
		border: 5px solid rgb(43, 28, 139) !important;
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
    	font-size: 1em;
    	display: flex;
    	justify-content: center;
    	align-items: center;
    	/*padding: 25% 10px 25% 10px;*/

	}
</style>