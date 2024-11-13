<template>
  <sidebar/>
    <RouterView />
</template>
<script></script>

<style >
#app {
  background-color: white;
  width: 100vw;
  height: 100vh;
  font-family: 'Avenir Next';
  overflow-x: hidden;
}
</style>
<script>
import sidebar from "@/components/sidebar.vue";
export default {
  name: "App",
  components: {
    sidebar,
  },
  
};
</script>