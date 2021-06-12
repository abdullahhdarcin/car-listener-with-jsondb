<template>
    <div class="home">
      <FilterNav @filterChange="current= $event" :current="current" />

      <!-- <select v-model="sorting">
        <option value="Asc" @change="Asc">ASC</option>
        <option value="Desc" @change="Desc">DESC</option>
      </select>

      <div class="sortbyprice">
        <div v-if="sorting==='Asc'">
          <button @click="Asc">Sort by Price </button> <br>
          <span id="import-export" class="material-icons">import_export</span> 
        </div>
        <div v-if="sorting==='Desc'">
          <button @click="Desc" :key="sorting=true">Sort by Price </button> <br>
            <span id="import-export" class="material-icons">import_export</span> 
        </div>
      </div> -->


      <div class="sortbyprice" >
            <button class="asc" @click="Asc">Cheap to Expensive </button>
            <button class="desc" @click="Desc">Expensive to Cheap </button> <br> 
      </div> 


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
  components: { SingleCar,FilterNav},
  data(){
    return{
      cars:[],
      current: 'all',
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
    },
    SortAds(sortWord){
      switch(sortWord){
        case "By price ascending":
          this.Asc();
          break;
        case "By price descending":
          this.Desc();
          break;
      }
    },


    Asc(){
      this.cars.sort((a,b)=>a.carprice > b.carprice ? 1 : -1)
    },
    Desc(){
      this.cars.sort((a,b)=>a.carprice < b.carprice ? 1 : -1)
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

.sortbyprice button{
    background: none;
    border:none;
    border-bottom: 1px solid #ddd;;
    color: rgb(110, 110, 110);
    outline: none;
    font-size: 12px;
    text-transform: uppercase;
    margin-top: 15px;
    margin-right: 10px;
    letter-spacing: 1px;
    font-weight: bold;
    cursor: pointer;
}

.sortbyprice button.active{
    color: #555;
}
#import-export{
  position: relative;
  display: inline-flex;
  vertical-align: top;
  left:-410px;
  top:-20px;
  font-size: 19px;
  border-bottom: 1px solid #ddd;;
}

.asc:hover{
  color: rgb(46, 45, 45);
  background-color: rgba(206, 206, 206, 0.185);
  border-radius: 6px;
  border-left: 10px solid #00ce89;
}

.desc:hover{
  color: rgb(46, 45, 45);
  background-color: rgba(206, 206, 206, 0.185);
  border-radius: 6px;
  border-right: 10px solid rgb(175, 9, 9);
}
</style>