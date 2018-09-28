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

export default {
  name: "App",
  components: {
    LandingPage,
    SinglePlayer
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
@import url('https://fonts.googleapis.com/css?family=PT+Serif');




#app {
  /*font-family: "Avenir", Helvetica, Arial, sans-serif;*/
 /* font-family: 'EB Garamond', sans-serif; */
 font-family: 'PT Serif', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #48444F;
  /*border: 1px solid blue;*/
  width: 100%;
  max-width: 1200px;
  overflow: hidden;

 /* background-color: #594777; */


}

body {
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
