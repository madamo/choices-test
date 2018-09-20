<template>
	  <transition v-on:enter="numEnter" v-on:leave="numLeave" mode="out-in" v-bind:css="false">
	  	<div id="count-down" :key="countTick" v-if="!hideTimer">
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
				interval: null,
				hideTimer: false
			}
		},
		watch: {
			countTick: function() {
				if (this.countTick < 0) {
					this.$emit('start-game')
				}
			}
		},
		methods: {
			startCountdown: function() {
				console.log("countdown started")
				this.showCountdown = true
				var vm = this
				this.countTick--
				if (this.countTick >= 1) {
					this.interval = setInterval(function() {
						vm.countTick--
						console.log(vm.countTick)

						if (vm.countTick == 0) {
							vm.hideTimer = true
						}

						if (vm.countTick < 0) {
							vm.hideTimer = true
							//vm.$emit('start-game')
							clearInterval(vm.interval)
							//vm.countTick = 0
							console.log("interval cleared")
						}
					}, 1000)
				}
				//this.$emit('start-game')     
			},
			numEnter: function(el, done) {
				Velocity(el, { opacity: 1 }, { duration: 100, complete: done })
			},
			numLeave: function(el, done) {
				Velocity(el, { fontSize: '100em', translateX: '-25px',translateY: '-600px',opacity: 0 }, { duration: 500, complete:done })
			}
		},
		mounted: function() {
			this.startCountdown()
		}
	}
</script>

<style scoped>
	#count-down {
		opacity: 0;
	}