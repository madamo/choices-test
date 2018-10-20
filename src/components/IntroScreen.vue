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
	/*	border: 1px solid white; */
		/*display: flex;
		align-items: center;
		justify-content: center;*/
		width: 100%;
		/*margin: 20% auto;*/
		/*min-height: 500px;*/
	}

	#start-btn {
		border: 4px solid black;
		margin: 0 auto;
		max-width: 300px;
		width: 65%;
		height: 60px;
		line-height: 60px;
  	}

  #start-btn:hover {
    background-color: black;
	color: white;
    cursor: pointer;
  }

</style>