<template>
	<div id="intro-screen">
		<p>Every choice you have ever made has led you to this moment.</p>
		<p>What will you choose now?</p>
		<p>Be quick.</p>
		<p>Be decisive.</p>
		<p>Make Shitty Choices!</p>

		<div id='start-btn' @click.stop="$emit('show-countdown')">start game</div>

	</div> 

</template>

<script>
	export default {
		name: "IntroScreen",
	}
</script>

<style scoped>
	#top-nav {
		/*border: 1px solid red;*/
	}

	#back-btn {
		border: 1px solid pink;
		width: 25%;
		text-align: left;
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

  #intro-screen {
    height: 100%;
  }

  #intro-screen-text {
    opacity: 1;
    z-index: 100;
  }

</style>