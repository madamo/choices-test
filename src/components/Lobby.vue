<template>
    <div class="lobby">

        <div id="show-players" v-if="showPlayers">
            <h2>lobby: {{ gameID }}</h2>
            <h3>Waiting for players...</h3>
            <!--TODO: add transition for entering players -->
            <transition-group name="players" tag="div">
            
                <div v-for="(player, index) in players" :key="index">{{ player }}</div>
            </transition-group>

            <div id="start-game" v-if="isHost" @click="startTimer" class="btn">start game</div>

        </div>

        <CountdownTimer v-if="countdownStarted" v-on:start-game="startGame"></CountdownTimer>

        <OptionDisplay v-if="gameStarted" :optionSet="optionSet" @markSelected="markSelected" @increment="incrementCounters" @endGame="endGame"></OptionDisplay>

	<transition v-on:enter="gameOverEnter">
        <GameOverScreen v-if="gameOver"  :choices="optionSet" :gameID="gameID"></GameOverScreen>
	</transition>

    </div>
</template>

<script>
import db from '@/firebase/init.js'
import firebase from 'firebase'

import CountdownTimer from '@/components/CountdownTimer'
import OptionDisplay from '@/components/OptionDisplay'
import GameOverScreen from '@/components/GameOverScreen'


export default {
    name: 'Lobby',
    props: {
        gameID: String,
        isHost: Boolean,
        playerName: String
    },
    components: {
        CountdownTimer,
        OptionDisplay,
        GameOverScreen
    },
    data() {
        return {
            players: [],
            countdownStarted: false,
            gameStarted: false,
            showPlayers: true,
            optionSet: [],
            gameOver: false
        }
    },
    methods: {
        startTimer() {
            console.log("start clicked")
            let ref = db.collection('games').doc(this.gameID)
            ref.get().then(doc => {
                    if (doc.exists) {
                        //this.feedback = "Game exists"
                        ref.update({
                            gameStarted: true
                        })
                    }
            })
        },
        startCountdown() {
            this.countdownStarted = true
            this.showPlayers = false
        },
        startGame() {
            console.log("game started!")
            this.countdownStarted = false
            this.gameStarted = true
        },
        markSelected(selectedOption) {
            selectedOption.selected = true
            console.log(selectedOption)
            //selectedOption.timesSelected++
        },
        incrementCounters(optionGroup) {
            optionGroup.timesShown++
            console.log(optionGroup)
            console.log("choice id =" + optionGroup.id)
            db.collection('choices').doc(optionGroup.id).update({
                "timesShown": optionGroup.timesShown,
                "firstOption.timesSelected": optionGroup.firstOption.timesSelected,
                "secondOption.timesSelected": optionGroup.secondOption.timesSelected
            }).catch(err => {
                console.log(err)
            })
        },
        endGame() {
            this.gameStarted = false
            //this.gameOver = true
            db.collection('games').doc(this.gameID).update({
                "playersFinished": firebase.firestore.FieldValue.arrayUnion(this.playerName)
            })
           // console.log(this.optionSet)
            let ref = db.collection('games').doc(this.gameID).collection('choices')
            for (let choice of this.optionSet) {
                if (choice.firstOption.selected) {
                     ref.doc(choice.id).update({
                        "firstOption.selectedBy": firebase.firestore.FieldValue.arrayUnion(this.playerName)
                    }) 
                } else if (choice.secondOption.selected) {
                    ref.doc(choice.id).update({
                        "secondOption.selectedBy": firebase.firestore.FieldValue.arrayUnion(this.playerName)
                    })
                }
            }

            // TO-DO: Sync selectedBy with db 
            
        },
        gameOverEnter: function(el) {
			Velocity(el, { opacity: 1}, { duration: 1000 })
		}
    },
    created() {
       // this.createGame()
       console.log("Lobby created!")
        let ref = db.collection('games').doc(this.gameID)

        ref.onSnapshot(doc => {
            //console.log(doc)
            if (this.players.length == 0) {
                for (let player of doc.data().players) {
                    this.players.push(player)
                }
            } else {
                this.players.push(doc.data().players.pop())
            }

            if (doc.data().gameStarted) {
                console.log("gameStarted = true")
                //this.countdownStarted = true
                this.startCountdown()
                ref.update({
                    "gameStarted": false
                })

            }

            if (doc.data().playersFinished.length === doc.data().players.length) {
                this.gameOver = true
            }
        })

        let subRef = db.collection('games').doc(this.gameID).collection('choices')
        if (this.optionSet.length == 0) {
            subRef.get().then(snapshot => {
                snapshot.forEach(doc => {
                    let choice = doc.data()
                    choice.id = doc.id
                    this.optionSet.push(choice)
                })
            })
        }
    }
}
</script>

<style>

.player {
    display: none;
}

.players-enter {
    opacity: 0;
}

.players-enter-active {
    transition: all 1s;
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
