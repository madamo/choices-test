<template>

<div id="landing-page">
	<div id="intro-text">
  		<p>Welcome to Shitty Choices</p>
  	</div>
  	<div id="single-player-btn" @click="$emit('show-component','SinglePlayer')">Single Player</div>
  	<div id="multi-player-btn">Multiplayer</div>
  <!--<button @click="$emit('show-component','SinglePlayer')">single player</button>-->
  </div>
</template>

<script>
export default {
  name: "LandingPage"
};
</script>

<style scoped>
	#landing-page {
		border: 1px solid red;
		width: 80%;
		margin: 0 auto;
	}

	#single-player-btn {
		border: 1px solid grey;
		width: 25%;
		margin: 0 auto;
	}
</style>