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

        <Lobby v-if="gameCreated" :gameID="gameID" :isHost="isHost" :playerName="playerName"></Lobby>

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
            gameCreated: false,
            isHost: true,
            choices: []
        }
    },
    methods: {
        createGame() {

            
            //console.log("choices: " + this.choices)

            let id = Math.floor(Math.random()*90000) + 10000;
            id = String(id)
            db.collection('games').doc(id).set({
                players: [this.playerName],
               // choices: this.choices,
                gameStarted: false
            }).then(() => {
                this.gameID = id
                this.gameCreated = true

                let ref = db.collection('games').doc(id).collection('choices')
                for (let choice of this.choices) {
                    console.log(choice.id)
                    ref.doc(choice.id).set({
                        firstOption: choice.firstOption,
                        secondOption: choice.secondOption,
                        timesShown: choice.timesShown
                    })
                }
            })
        }
    },
    created() {
        db.collection('choices').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                let choice = doc.data()
                console.log(choice)
                choice.id = doc.id
                this.choices.push(choice)
                //this.choices = {choice: choice, id: choice.id}
            })
        })
    }
}
</script>

<style>

</style>
