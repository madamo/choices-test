<template>
	<div id="intro-screen">
		<div id="intro-container">
			<p>Every choice you have ever made has led you to this moment.</p>
			<p>What will you choose now?</p>
			<p>Be quick.</p>
			<p>Be decisive.</p>
			<p>Make Shitty Choices!</p>

			<div id='start-btn' @click.stop="$emit('show-countdown')">start game</div>
		</div>

	</div> 

</template>

<script>
	export default {
		name: "IntroScreen",
	}
</script>

<style>

	#intro-screen {
		font-size: 1.3em;
		border: 1px solid black;
		/*min-height: 500px;*/
	}

	#intro-container {
		border: 1px solid purple;
		margin: auto;
		margin-top: 50px;
		margin-bottom: 50px;
		height: 300px;
	}

	#start-btn {
    border: 1px solid grey;
    width: 35%;
    margin: 0 auto;
  }

  #start-btn:hover {
    background-color: grey;
    color: white;
    cursor: pointer;
  }

</style>