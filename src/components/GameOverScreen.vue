<template>
	<div id="game-over">
		<div id="choice-list" v-for="choice in choices">
			{{ choice }}
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
</style>