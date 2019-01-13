<template>
  <div id="app">

  <transition name="component-fade" mode="out-in">
    <component v-bind:is="currentComponent" v-on:show-component="showComponent"></component>
  </transition>
  </div>
</template>

<script>
  import LandingPage from "./components/LandingPage";
  import SinglePlayer from "./components/SinglePlayer";
  import Multiplayer from "./components/Multiplayer";
  import HostGame from "./components/HostGame";
  import JoinGame from "./components/JoinGame";
  import Lobby from "./components/Lobby";

export default {
  name: "App",
  components: {
    LandingPage,
    SinglePlayer,
    Multiplayer,
    HostGame,
    JoinGame,
    Lobby
  },
  data: function() {
    return {
      msg: "hello",
      currentComponent: "LandingPage"
    };
  },
  methods: {
    showComponent: function(componentToShow) {
      // this.currentComponent = "HelloWorld";
      this.currentComponent = componentToShow;
      return this.currentComponent;
    }
  }
};
</script>

<style>

/*@import url('https://fonts.googleapis.com/css?family=EB+Garamond');*/
/*@import url('https://fonts.googleapis.com/css?family=Cabin');*/
/*@import url('https://fonts.googleapis.com/css?family=PT+Serif');*/
@import url('https://fonts.googleapis.com/css?family=Merriweather');




#app {
  /*font-family: "Avenir", Helvetica, Arial, sans-serif;*/
 /* font-family: 'EB Garamond', sans-serif; */
 font-family: 'Merriweather', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: #48444F;*/
  /*border: 1px solid blue;*/
  width: 100%;
  /*min-height: 552px;*/
  /*height: 1000px;*/
  height: 98vh;
  max-width: 800px;
  overflow: hidden;
  color: black;
  margin: 0 auto;
  /*background: linear-gradient(white, rgb(224, 224, 224));*/
  background: #134E5E;  /* fallback for old browsers */
background: -webkit-linear-gradient(to top, #134E5E,#71B280);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to top, #134E5E, #71B280); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


  display: flex;
  justify-content: center;
	align-items: center;
	flex-direction: column;
}

@media (max-height: 650px) {
  #app {
    /*border: 1px solid cyan;*/
    height: 559px;

  }
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 1s;
}

.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>
