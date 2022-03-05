<template>
  <div class="buttons-container">
    <button 
      v-for="floor in floorsAmount" 
      :key="floor"
      @click="$emit('elevator-called', $event)"
    >
    {{floor}}
    </button>
  </div>
</template>

<script>
export default ({
  props: ['floorsAmount']
})
</script>

<style>
  .buttons-container {
    display: flex;
    flex-direction: column-reverse;
    border: 1px solid black;
    width: 50px;
    height: 450px;
}

.buttons-container > button {
    margin: 33px 0;
}
</style>