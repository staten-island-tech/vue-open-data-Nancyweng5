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
async function getcharacters(){
  try {
    const response = await fetch('https://genshin.jmp.blue/characters')
    const data = await response.json()
    characters.value = data
  } catch (err){
    console.log("Failed to load characters")
  }
}
onMounted(() => {
  getcharacters()
})

</script>

<style scoped>
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}
</style>