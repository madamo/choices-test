<template>
	<div id="intro-screen">
		<div id="intro-container">
			<p>Every choice you have ever made has led you to this moment.</p>
			<p>What will you choose now?</p>
			<p>Be quick.</p>
			<p>Be decisive.</p>
			<p>Make Shitty Choices!</p>

			<div id="start-btn" class="btn" @click.stop="$emit('show-countdown')">Start!</div>
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
		/*border: 1px solid black;*/
		/*min-height: 500px;*/
	}

	#intro-container {
		/*border: 1px solid purple;*/
		margin: auto;
		margin-top: 50px;
		margin-bottom: 50px;
		height: 300px;
	}

	#start-btn {
		border: 4px solid #594777;
		margin: 0 auto;
		max-width: 300px;
		width: 65%;
		height: 60px;
		line-height: 60px;
  	}

  #start-btn:hover {
    background-color: #594777;
    color: white;
    cursor: pointer;
  }

</style>