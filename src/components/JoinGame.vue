<template>
    <div class="join-game">
        <div id="join-form" v-if="!gameJoined">
            <div>
                <h2>Join Game</h2>
                <label for="gameID">Enter Code:</label>
                <input type="text" v-model="gameID" />
                <p v-if="feedback">{{ feedback }}</p>
            </div>
            <div>
                <label for="name">Enter your name:</label>
                <input type="text" v-model="playerName" />
            </div>
            <button @click="joinGame">Join Game</button>
        </div>

        <Lobby v-if="gameJoined" :gameID="gameID" :playerName="playerName"></Lobby>
    </div>
</template>

<script>
import db from '@/firebase/init.js'
import firebase from 'firebase'

import Lobby from '@/components/Lobby'

export default {
    name: 'JoinGame',
    components: {
        Lobby
    },
    data() {
        return {
            gameID: null,
            playerName: null,
            feedback: null,
            gameJoined: false
        }
    },
    methods: {
        joinGame() {
            if (this.gameID) {
                let ref = db.collection('games').doc(this.gameID)
                ref.get().then(doc => {
                    if (doc.exists) {
                        //this.feedback = "Game exists"
                        ref.update({
                            players: firebase.firestore.FieldValue.arrayUnion(this.playerName)
                        }).then(() => {
                            console.log("player added")
                            this.gameJoined = true
                        })
                    } else {
                        this.feedback = "Game doesn't exist"
                    }
                })
            } else {
                this.feedback = "Enter a Game ID."
            }
            console.log(this.gameID, this.playerName)
        }
    }
}
</script>

<style>

</style>
