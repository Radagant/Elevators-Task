<template>
  <div class="container">
    <ButtonsSection
      :floorsAmount="floorsAmount"
      @elevator-called="floorClickHandler"
     />
    <ElevatorShaft 
      v-for="shaft in shaftsAmount" 
      :key="shaft"
      :event="this.myevent"
    />
  </div>
</template>

<script>

import ButtonsSection from '@/components/ButtonsSection'
import ElevatorShaft from '@/components/ElevatorShaft'
export default {
  name: 'App',
  data() {
    return {
      shaftsAmount: [1],
      floorsAmount: [1,2,3,4,5],
      myevent: {}
    }
  },
  components: {
    ElevatorShaft,
    ButtonsSection
  },
  methods: {
    floorClickHandler(event) {
      this.myevent=event
    }
  }
}
</script>

<style>
.container {
  border: 2px solid black ;
  width: 100%;
  height: 450px;
  display: flex;
}

</style>
