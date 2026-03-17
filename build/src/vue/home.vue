<template>
    <div class = "home">
        <h1>Genshin Character Build</h1>
        <characterchart :characters="characters"/>
   <div class="chart">
     <charactercard v-for="char in characters":key="char":name="char"/>
   </div>
 </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import charactercard from "@/components/charactercard.vue";
import characterchart from "@/components/characterchart.vue";
const characters = ref([])


</script>

<style scoped>

</style>