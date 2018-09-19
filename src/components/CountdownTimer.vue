<template>
	  <transition v-on:enter="numEnter" v-on:leave="numLeave" mode="out-in" v-bind:css="false">
	  	<div id="count-down" :key="countTick">
	  		{{ countTick }}
	  	</div>
	  </transition>
</template>

<script>

	export default {
		name: "CountdownTimer",
		data: function() {
			return {
				countTick: 3,
				interval: null
			}
		},
		methods: {
			startCountdown: function() {
				console.log("countdown started")
				this.showCountdown = true
				var vm = this
				if (this.countTick >= 1) {
					this.interval = setInterval(function() {
						vm.countTick--
						console.log(vm.countTick)

						if (vm.countTick < 1) {
							vm.$emit('start-game')
							clearInterval(vm.interval)
							console.log("interval cleared")
							//vm.startGame()
						}
					}, 1000)
				}
				//this.$emit('start-game')     
			},
			numEnter: function(el, done) {
				Velocity(el, { translateX: 0 }, { duration: 500, complete: done })
			},
			numLeave: function(el, done) {
				Velocity(el, { scaleX: 100, scaleY:100, translateX: '-150px', opacity: 0 }, { duration: 500, complete:done })
			}
		},
		mounted: function() {
			this.startCountdown()
		}
	}
</script>