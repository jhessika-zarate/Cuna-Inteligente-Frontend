<template>
  
    <RouterView />
</template>
<script></script>

<style >
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

#app {
  background-color: white;
  width: 100vw;
  height: 100vh;
  font-family: 'Avenir Next';
  overflow-x: hidden;
}
:root {
  --primary-color: #ee94cb;
  --secondary-color: #cf7ab6;
  --highlight-color: #f5c6cb;
  --gradient-color:#9e6fdf;
}

body {
  font-family: Montserrat;
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