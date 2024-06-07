<script setup lang="ts">

const props = defineProps({
  data: { required: true },
})

</script>

<template>
  <div class="post">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD16WCYfTf0MTFbuqtPJwglsDfy9FoqKqRbQ&s">
    <div class="infobox" style="">
      <h1>{{ props.data.album }}</h1>
    </div>
  </div>
   
  
</template>


<style scoped>
img {
  width: 100%;
  border-radius: 3px;
  border: 2px outset rgb(49, 49, 49);
}

.infobox {
  background-color: gainsboro; color: black;width: 100%; height: fit-content; min-height: 50px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border: 2px inset rgb(88, 88, 88);
  border-top: none;
}

.post {
  width: 630px;
  background-image: linear-gradient(to right, rgba(255, 155, 155, 0.70), rgba(255, 152, 84, 0.70));
  padding: 10px;
  margin: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  border: 4px outset var(--va-primary);
}
    
</style>