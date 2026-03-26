<template>
    <div class = "buildcard">
        <h3>{{character.name}} Build Materials</h3>
        <div v-if="character.commonAscensionMaterials.length"></div>
         <h4>Enemy Drops</h4>
      <ul>
        <li v-for="material in character.commonAscensionMaterials" :key="material.name">
          <img :src="mat.iconUrl" /> {{ mat.name }}
        </li>
      </ul>
    </div>  
    <div v-if="character.ascensionMaterials.length">
      <h4>Ascension Materials</h4>
      <ul>
        <li v-for="material in character.ascensionMaterials" :key="material.name">
          <img :src="mat.iconUrl" /> {{ mat.name }}
        </li>
      </ul>
    </div>
     <div v-if="character.talentBook.length">
      <h4>Talent Books</h4>
      <ul>
        <li v-for="book in character.talentBook" :key="book.name">
          <img :src="book.iconUrl" /> {{ book.name }}
          <span v-if="book.farmingDays"> — {{ book.farmingDays.join(', ') }}</span>
        </li>
      </ul>
    </div>
</template>

<script setup>
defineProps({
  character: Object
})
</script>

<style  scoped>

</style>