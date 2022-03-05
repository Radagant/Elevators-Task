<template>
    <div class="elevator-shaft">
        <Elevator
          :event="this.event"
        />
    </div>
</template>

<script>
import Elevator from '@/components/Elevator'
export default ({
    data() {
      return {
         localevent: this.event
      }
    },
    props: {
      event: {}
    },
    components: {
        Elevator
    }

})
</script>

<style>
  .elevator-shaft {
    margin-left: 5px;
    border: 1px solid black;
    width: 120px;
    height: 450px;
    display: flex;
    flex-direction: column-reverse;
}
</style>