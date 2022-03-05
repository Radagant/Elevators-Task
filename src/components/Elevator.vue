<template>
    <div class="elevator" ref="elevator">
      <span>{{ elevatorDirection }} {{ targetFloor }}</span> 
    </div>
</template>

<script>
export default {
  data() {
    return {
      currentFloor: 1,
      currentFloorPx: 0,
      targetFloor: 1,
      elevatorIsMoving: false,
      elevatorDirection: '',
      elevatorDirectionMarker: 0,
      localevent: {}
    }
  },
  props: {
    event: {}
  },

  methods: {
    isElevatorOccupied(event) {
      if (!this.elevatorIsMoving && event.target.innerText != this.currentFloor) {
        this.elevatorMovingHandler(event)
      }
      else if (event.target.innerText !== this.currentFloor && event.target.innerText !== this.targetFloor && !queue.includes(event)) {
        queue.enqueue(event)
      }
    },

    async elevatorMovingHandler (event) {
      this.targetFloor = (event.target.innerText)
      function delay (ms) {
        return new Promise (resolve => setTimeout(() => resolve(), ms))
      }
      if (this.targetFloor-this.currentFloor > 0) {
        this.elevatorDirectionMarker = 1
        this.elevatorDirection = '↑'
      } else { 
        this.elevatorDirectionMarker = -1
        this.elevatorDirection = '↓'
      }
      let elevator = this.$refs.elevator
      
      this.elevatorIsMoving = true
      //Подсветка кнопки 
      event.target.style.backgroundColor = 'rgb(112, 226, 92)'
      //Мерцание лифта в движении
      elevator.style.backgroundColor = 'rgb(199, 199, 233)'
      let flickering1 = setInterval(() => elevator.style.backgroundColor = '', 400)
      let flickering2 = setInterval(() => elevator.style.backgroundColor = 'rgb(199, 199, 233)', 800)
      
      let initialFloor = this.currentFloor
      this.currentFloor = this.targetFloor
      //Первое передвижение на этаж
      elevator.style.marginBottom = `${this.currentFloorPx + (90 * this.elevatorDirectionMarker)}px`
      this.currentFloorPx += 90 * this.elevatorDirectionMarker
        //Оставшиеся передвижения по этажам
        for (let i = 1; i < Math.abs(this.targetFloor-initialFloor); i++) {
          // elevator.style.marginBottom = `${this.currentFloorPx + (90 * elevatorDirectionMarker)}px`
          // this.currentFloorPx += 90 * elevatorDirectionMarker
          await delay(1000).then(() => {
            console.log('For задействован')
            elevator.style.marginBottom = `${this.currentFloorPx + (90 * this.elevatorDirectionMarker)}px`
            this.currentFloorPx += 90 * this.elevatorDirectionMarker
          })
        }

        //Задержка, пока лифт перейдёт с предпоследнего на первый этаж (костыль)
        await delay(1000)
        event.target.style.backgroundColor = ''
        this.elevatorDirection = ''
        //Лифт в состоянии отдыха
        await delay (3000)
        //Остановка мерцания
        clearTimeout(flickering1)
        clearTimeout(flickering2)
        elevator.style.backgroundColor = ''

        
        this.elevatorIsMoving = false
    }
  },

  watch: {
    event() {
      console.log(this.event)
      this.isElevatorOccupied(this.event)
      
    },
    elevatorIsMoving(elevatorIsMoving) {
      if (!elevatorIsMoving && !queue.isEmpty()) {
        this.elevatorMovingHandler(queue.front())
        queue.dequeue()
      }
    }
  }
}
class Queue {
  constructor() {
    let floorsQueue = []
    //test
    this.print = function () {
      console.log(floorsQueue)
    }
    //Добавить в конец очереди
    this.enqueue = function (element) {
      floorsQueue.push(element)
    }
    //Убрать из начала очереди
    this.dequeue = function () {
      return floorsQueue.shift()
    }
    //Вернуть первый элемент очереди
    this.front = function () {
      return floorsQueue[0]
    }
    //Проверка, пуста ли очередь
    this.isEmpty = function() {
      return floorsQueue.length === 0
    }
    this.includes = function(element) {
      return floorsQueue.includes(element)
    }
  }
}

let queue = new Queue()
</script>

<style>
  .elevator {
    margin-bottom: 0;
    margin-left: 10px;
    border: 1px solid black;
    width: 100px;
    height: 76px;
    background-color: rgb(119, 119, 230);
    text-align: center;
    transition: 1000ms linear, background-color 400ms;
}
</style>