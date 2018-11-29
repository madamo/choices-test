<template>
    <div class="multiplayer">
        <div id="game-select" v-if="!gameSelected">
            <h2>multiplayer</h2>
            <div class="btn" @click="hostGameSelected">Create Game</div>
            <div class="btn" @click="joinGameSelected">Join Game</div>
        </div>

        <HostGame v-if="hostGame"></HostGame>

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
            this.gameSelected = true
            this.hostGame = true
        },
        joinGameSelected() {
            this.gameSelected = true
            this.joinGame = true
        }
    }
}
</script>

<style>

    .multiplayer {
        width: 100%;
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

</style>
