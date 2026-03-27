<template>
    <div class = "buildcard">
        <h3 class = "title">Character Info</h3>
    <ul class = "character" v-if="character">
      <li><strong>Title:</strong> {{ character.title }}</li>
      <li><strong>Vision:</strong> {{ character.vision }}</li>
      <li><strong>Weapon:</strong> {{ character.weapon }}</li>
      <li><strong>Nation:</strong> {{ character.nation }}</li>
      <li><strong>Affiliation:</strong> {{ character.affiliation }}</li>
      <li><strong>Constellation:</strong> {{ character.constellation }}</li>
      <li><strong>Birthday:</strong> {{ character.birthday }}</li>
      <li><strong>Rarity:</strong> {{ character.rarity }}★</li>
    </ul>
    <p class = "character" v-if="character">Description : {{ character.description }}</p>
    </div>
</template>


<script setup>
defineProps({
  character: Object
})

</script>


<style  scoped>
.buildcard {
  background: #646d8c;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 24px 28px;
}
.title{
    font-family: 'Cinzel', serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #2c2a4a;
  margin: 0 0 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(201, 169, 110, 0.2);
}
.character { 
   font-family: 'Cinzel', serif;
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #2c2a4a;
  margin: 0 0 8px;
}
</style>
