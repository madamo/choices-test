<template>
	<div id="game-over">
		<p>Congratulations! But the final question remains: can you live with your choices?</p>
		<div id="result-container">
			<div id="choice-list" v-for="choice in choices" :class="{ selected: choice.selected }" :key="choice.id" class="end-option">
			{{ choice.text }}
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
		grid-template-columns: 1fr 1fr;
		grid-auto-rows: minmax(100px, 150px);
		grid-gap: 10px 10px;
	}

	.end-option.selected {
		/*color: white;
		background-color: #594777;*/
		border: 5px solid #01DCFF !important;
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