<template>
    <div class="home">
      <FilterNav @filterChange="current= $event" :current="current" />
        <div v-if="cars.length">
          <div :id="car.id" v-for="car in filteredAds" :key="car.id">
            <SingleCar :car="car" @delete="handleDelete" @islive="handleLive"/>
          </div>
        </div>
  </div>
</template>

<script>
import SingleCar from '../components/SingleCar.vue'
import FilterNav from '../components/FilterNav.vue'


export default {
  name: 'Home',
  components: { SingleCar,FilterNav },
  data(){
    return{
      cars:[],
      current: 'all'
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
  },
  computed: {
    filteredAds(){
      if(this.current === 'all'){
        return this.cars.filter(car=> car.id)
      }
      if(this.current === 'Sahibindencom_Ads'){
          return this.cars.filter(car=> car.sites==='sahibinden')
      }
      if(this.current === 'Other_Ads'){
        return this.cars.filter(car=> car.sites==='others')
        }
      if(this.current === 'Arabamcom_Ads'){
        return this.cars.filter(car=> car.sites==='arabam')
        }     
               
      }
  }
}
</script>

<style>
</style>