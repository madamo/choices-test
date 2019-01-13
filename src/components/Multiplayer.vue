<template>
    <div class="multiplayer">
        <transition v-on:leave="mainSlideLeft" v-on:enter="mainSlideRight" v-on:before-enter="beforeEnter">
        <div id="game-select" v-if="!gameSelected">
            <h2>Together, we can all make Shitty Choices!</h2>
            <div class="btn" @click="gameSelected = true">Create Game</div>
            <div class="btn" @click="joinGameSelected">Join Game</div>
        </div>
        </transition>

        <transition v-on:enter="gameEnter" v-on:leave="gameLeave">
            <div id="host-container" v-if="hostGame">
                <HostGame  @hideHost="hideHost"></HostGame>
            </div>
        </transition>

        <JoinGame v-if="joinGame"></JoinGame>


    </div>
</template>

<script>

import db from '@/firebase/init.js'
import HostGame from '@/components/HostGame'
import JoinGame from '@/components/JoinGame'

export default {
    name: 'Multiplayer',
    components: {
        HostGame,
        JoinGame
    },
    data() {
        return {
            hostGame: false,
            joinGame: false,
            gameSelected: false
        }
    },
    methods: {
        hostGameSelected() {
            //this.gameSelected = true
            this.hostGame = true
        },
        joinGameSelected() {
            this.gameSelected = true
            this.joinGame = true
        },
        hideHost() {
            this.hostGame = false
            //this.gameSelected = false
        },
        toggleSelected() {
            this.gameSelected = false
        },
        mainSlideLeft(el, done) {
            console.log(el)
			Velocity(el, { translateX: '-1000px' }, { duration: 100, display: "none", complete: this.hostGameSelected })
        },
        mainSlideRight(el, done) {
            Velocity(el, { translateX: '1000px' }, { duration: 100, complete: done })
        },
        beforeEnter(el, done) {
           // Velocity(el, { translateX: '400px' }, { duration: 10, complete: done })
           el.style.left = "-1000px"
        },
        gameEnter(el, done) {
           Velocity(el, { translateX: '-1000px' }, { duration: 100, complete: done })
        },
        gameLeave(el, done) {
            Velocity(el, { translateX: '1000px' }, { duration: 100, display: "none", complete: this.toggleSelected })
        }
    }
}
</script>

<style>

    .multiplayer {
        width: 100%;
        overflow: hidden;
    }

	.btn {
		border: 4px solid black;
		max-width: 300px;
		width: 65%;
		height: 60px;
		line-height: 60px;
		margin: 10px auto;
		/*opacity: 0;*/
		font-size: 1.3em;
	}

	.btn:hover {
		cursor: pointer;
		background-color: black;
		color: white;	
	}

    #game-select {
        position: relative;
    }

    #host-container {
        position: relative;
        left: 1000px;
        margin: 0 auto;
        width: 96%;
        height: 100%;
    }

   /* .slide-left-enter {
        transform: translateX(-200px);
    }

    .slide-left-leave {
        transform: translateX(200px);
    }

    .slide-left-enter-active, .slide-left-leave-active {
        transition: all .25s;
    } */

</style>
