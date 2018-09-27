<template>
	<div id="game-over">
		<p>Congratulations! But the final question remains: can you live with your choices?</p>
		<div id="choice-list" v-for="choice in choices" v-bind:class="{ selected: choice.selected }" class="end-option">
			{{ choice.text }}
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

	#game-over{
		opacity: 0;
	}

	.selected {
		color: white;
		background-color: #594777;
	}

	.end-option {
		border: 1px solid grey;
		height: 140px;
		width: 35%;
		margin: 10px auto 10px auto;
    	font-size: 4.5vw;
    	padding: 0px 10px 0px 10px;
    	display: inline-flex;
       	align-items: center;
    	overflow: hidden;
	}
</style>