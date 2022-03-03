const App = {
    data(){
        return {
            targetFloor: 1,
            currentFloor: 1,
            currentFloorPx: 0,
            elevatorIsMoving: false,
        }
    },

    methods: {
        floorClickHandler (event) {
            this.targetFloor = (event.target.innerText)
            elevator = this.$refs.elevator
            if (!this.elevatorIsMoving) {
                this.elevatorIsMoving = true
                elevator.style.marginBottom = `${this.currentFloorPx + ((this.targetFloor-this.currentFloor)*90)}px`
                // elevator.classList.add(`moving-towards-${this.targetFloor}`)
                // elevator.classList.remove(`moving-towards-${this.targetFloor}`)
                this.currentFloorPx += (this.targetFloor-this.currentFloor)*90
                this.currentFloor = this.targetFloor
                this.elevatorIsMoving = false

            }


        }
    }
}

app = Vue.createApp(App)

app.mount('#app')