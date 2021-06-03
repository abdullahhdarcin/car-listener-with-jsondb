<template>
  <div class="home">
    <div v-if="cars.length">
      <div v-for="car in cars" :key="car.id">
        <SingleCar :car="car" @delete="handleDelete" @islive="handleLive"/>
      </div>
    </div>
  </div>
</template>

<script>
import SingleCar from '../components/SingleCar.vue'


export default {
  name: 'Home',
  components: { SingleCar },
  data(){
    return{
      cars:[]
    }
  },
  mounted(){
    fetch('http://localhost:3000/cars')
    .then(res => res.json())
    .then(data => this.cars = data )
    .catch(err => console.log(err.message))
  },
  methods:{
    handleDelete(id){
      this.cars = this.cars.filter((car)=>{
        return car.id !== id
      })
    },
    handleLive(id){
      let p = this.cars.find(car => {
        return car.id === id
      })
      p.islive = !p.islive
    }
  }
}
</script>
