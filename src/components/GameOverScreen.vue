<template>
	<div id="game-over">
		<p>Congratulations! But the final question remains: can you live with your choices?</p>
		<div id="result-container">
			<div id="choice-list" v-for="choice in choices" v-bind:class="{ selected: choice.selected, fail: choice.fail }" class="end-option">
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
		}
	}

</script>

<style>

	#game-over {
		opacity: 0;
	}

	#result-container {
		/*border: 1px solid orange;*/
		margin: 0 auto;
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-auto-rows: minmax(100px, 200px);
		grid-gap: 10px 10px;
	}

	.selected {
		/*color: white;
		background-color: #594777;*/
		border: 5px solid #594777 !important;
	}

	.fail {
		border: 5px solid red !important;
		color: grey;
	}

	.fail::before {
		content: "Fail!";
		display: block;
	}

	.end-option {
		border: 1px solid grey;
    	font-size: 1.3em;
    	/*padding: 25% 10px 25% 10px;*/

	}
</style>