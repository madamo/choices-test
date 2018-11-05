<template>
    <div class="lobby">
        <h2>lobby: {{ gameID }}</h2>
       <!-- <div id="enter-name" v-if="!nameEntered">
            <label for="name">Enter your name:</label>
            <input type="text" v-model="playerName"/>
            <button @click="addPlayer">OK</button>
        </div>-->
        <div id="show-players">
            <h3>Waiting for players...</h3>
            <ul id="player-list">
                <li v-for="(player, index) in players" :key="index">{{ player }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init.js'
import firebase from 'firebase'

export default {
    name: 'Lobby',
    props: {
        gameID: String
    },
    data() {
        return {
            playerName: null,
            nameEntered: false,
            players: []
        }
    },
    methods: {
        createGame() {
            let id = Math.floor(Math.random()*90000) + 10000;
            id = String(id)
           /* db.collection('games').doc(id).set({
                players: []
            })*/
            db.collection('games').doc(id).set({
                gameStarted: false
            })
            this.gameID = id
        },
       /* addPlayer() {
            let ref = db.collection('games').doc(this.gameID)
            ref.get().then(doc => {
                if (doc.exists) {
                    if (doc.data().players) {
                        ref.update({
                            players: firebase.firestore.FieldValue.arrayUnion(this.playerName)
                        })
                    } else {
                        ref.set({
                            players: [this.playerName]
                        })
                    }
 
                }
            })
            this.nameEntered = true

            

            ref.onSnapshot(doc => {
                this.players.push(doc.data().players)
                console.log(this.players)
            })
        } */
    },
    created() {
       // this.createGame()
        let ref = db.collection('games').doc(this.gameID)
        ref.onSnapshot(doc => {
            this.players.push(doc.data().players)
            console.log(this.players)
        })
    }
}
</script>

<style>

</style>
