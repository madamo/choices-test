<template>
    <div class="multiplayer">
        <h2>multiplayer</h2>
        <div @click="$emit('show-component','HostGame')">Create Game</div>
        <div @click="$emit('show-component', 'JoinGame')">Join Game</div>

    </div>
</template>

<script>

import db from '@/firebase/init.js'

export default {
    name: 'Multiplayer',
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<style>

</style>
