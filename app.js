const App = {
  data(){
    return {
      targetFloor: 1,
      currentFloor: 1,
      currentFloorPx: 0,
      elevatorIsMoving: false,
      elevatorDirectionMarker: 0,
      elevatorDirection: ''
    }
  },

  methods: {
    floorClickHandler (event) {
      if (!this.elevatorIsMoving) {
        this.elevatorMovingHandler(event)
      }
      else {

      }
    },
    
    async elevatorMovingHandler (event) {
      delay = (ms) => {
        return new Promise (resolve => setTimeout(() => resolve(), ms))
      }
      this.targetFloor = (event.target.innerText)
      if (this.targetFloor-this.currentFloor > 0) {
        elevatorDirectionMarker = 1
        this.elevatorDirection = '↑'
      } else { 
        elevatorDirectionMarker = -1
        this.elevatorDirection = '↓'
      }
      elevator = this.$refs.elevator
      this.elevatorIsMoving = true
      event.target.style.backgroundColor = 'rgb(112, 226, 92)'
      //Мерцание лифта в движении
      elevator.style.backgroundColor = 'rgb(199, 199, 233)'
      let flickering1 = setInterval(() => elevator.style.backgroundColor = '', 400)
      let flickering2 = setInterval(() => elevator.style.backgroundColor = 'rgb(199, 199, 233)', 800)
      
        
    
      //Первое передвижение на этаж
      elevator.style.marginBottom = `${this.currentFloorPx + (90 * elevatorDirectionMarker)}px`
      this.currentFloorPx += 90 * elevatorDirectionMarker
        //Оставшиеся передвижения по этажам
        for (let i = 1; i < Math.abs(this.targetFloor-this.currentFloor); i++) {
          // elevator.style.marginBottom = `${this.currentFloorPx + (90 * elevatorDirectionMarker)}px`
          // this.currentFloorPx += 90 * elevatorDirectionMarker
          await delay(1000).then(() => {
            elevator.style.marginBottom = `${this.currentFloorPx + (90 * elevatorDirectionMarker)}px`
            this.currentFloorPx += 90 * elevatorDirectionMarker
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

        this.currentFloor = this.targetFloor
        this.elevatorIsMoving = false
    }
  }
}

app = Vue.createApp(App)
app.mount('#app')