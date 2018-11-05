<template>
    <div class="host-game">
        <div id="create-form" v-if="!gameCreated">
            <h2>Host game</h2>
            <div>
                <label for="name">Enter your name:</label>
                <input type="text" v-model="playerName"/>
                <button @click="createGame">Create Game</button>
            </div>
        </div>

        <Lobby v-if="gameCreated" :gameID="gameID"></Lobby>

    </div>


</template>

<script>
import db from '@/firebase/init.js'
import Lobby from '@/components/Lobby'

export default {
    name: 'HostGame',
    components: {
        Lobby
    },
    data() {
        return {
            playerName: null,
            gameID: null,
            gameCreated: false
        }
    },
    methods: {
        createGame() {
            let id = Math.floor(Math.random()*90000) + 10000;
            id = String(id)
            db.collection('games').doc(id).set({
                players: [this.playerName]
            })
            this.gameID = id
            this.gameCreated = true
        }
    },
}
</script>

<style>

</style>
