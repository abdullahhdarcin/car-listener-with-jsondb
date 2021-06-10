<template>
  <form @submit.prevent="handleSubmit">
      <label>Title:</label><input type="text" v-model="title" required>

      <label>Brand:</label>
      <select v-model="brand">
        <option value="Fiat">Fiat</option>
        <option value="Opel">Opel</option>
        <option value="Mercedes">Mercedes</option>
        <option value="Audi">Audi</option>
      </select>

      <label>Model:</label>
      <select v-model="model">
        
        <option value="Fiat">Egea</option>
        <option value="Opel">Opel</option>
        <option value="Mercedes">Mercedes</option>
        <option value="Audi">Audi</option>
      </select> 
      
      <label>Car HP:</label>
      <select v-model="carhp">
        <option value="1.0">2.0</option>
        <option value="1.4">1.4</option>
        <option value="2.0">2.0</option>
        <option value="3.0">3.0</option>
      </select>

      <label>Car Year:</label>
      <select v-model="caryear">
        <option value="2018">2018</option>
        <option value="2019">2019</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
      </select>

      <label>Gear Type:</label>
      <select v-model="geartype">
        <option value="Manuel">Manuel</option>
        <option value="Otomatik">Otomatik</option>
      </select>

      <label>Car Link:</label><input type="text" v-model="carlink" required>

      <!-- <label>Website:</label>
      <div class="sites">
        
        <input  type="radio"  value="sahibinden" id='sahibinden' v-model="sites" @click="select" name="sites" />
        <label for="sahibinden">sahibinden.com</label>
        <input type="radio"  value="arabam" id='arabam' v-model="sites" name="sites" />
        <label for="arabam">arabam.com</label>
        <input type="radio"  value="others" id='others' v-model="sites" name="sites" />
        <label for="others">Others</label>
      </div> -->

      <button @click="carSites">Add New Car</button>
  </form>
</template>

<script>
import SingleCar from '../components/SingleCar.vue'
import axios from 'axios'
import { computed } from 'vue'



export default {
    components: { SingleCar },
    data(){
      
    return{
      cars:[],
      title: '',
      brand:[],
      model:[],
      carhp:'',
      caryear:'',
      geartype:'',
      carlink:'',
      sites:''
    }
  },
  mounted(){
    fetch('http://localhost:3000/cars')
    .then(res => res.json())
    .then(data => this.cars = data )
    .catch(err => console.log(err.message))
  },
  methods:{
      handleSubmit(){
          let car = {
              title: this.title,
              brand:this.brand,
              model:this.model,
              carhp:this.carhp,
              caryear:this.caryear,
              geartype:this.geartype,
              carlink: this.carlink,
              islive: false,
              sites:this.sites,
          }

          fetch('http://localhost:3000/cars',{
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(car)
          }).then(()=>{
              this.$router.push('/')
          }).catch((err)=>console.log(err))

        },
        carSites(){
            if(this.carlink.startsWith("https://www.sahibinden" || "www.sahibinden" || "http://www.sahibinden")){
            return this.sites='sahibinden'
            }
            else if (this.carlink.startsWith("https://www.arabam" || "www.arabam" || "http://www.arabam")){
              return this.sites='arabam'
            }
            else {
              return this.sites='others'
            }
        }
      }
}
</script>

<style>
form{
    background:white;
    padding: 20px;
    border-radius: 10px;
    border-bottom: 2px solid #ddd;
    border-top: 1px solid #ddd;
}

label{
    display: block;
    color: black;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1px;
    margin: 20px 0 10px 0;
}

input{
    padding: 10px;
    border: 0px;
    border-bottom: 2px solid #ddd;
    width: 100%;
    box-sizing: border-box;
    border-radius: 6px;
    height: 40px;
}

form button{
    display: block;
    margin: 20px auto 0;
    background: #00ce89;
    color: white;
    padding: 10px;
    border: 0px;
    border-radius: 6px;
    font-size: 16px;
}

select{
    display: block;
    color: black;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 20px 0 10px 0;
    border: 1px;
    border-radius: 6px;
    width: 100%;
    height: 30px;
    border: 1px solid #ddd;
}

option{
        display: block;
    color: black;
    text-transform: uppercase;
    font-size: 14px;
}

label{
  color: rgb(90, 90, 90);
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

input, select{
  display: block;
  padding: 6px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: rgb(46, 45, 45);
}

input[type="radio"] {
  display: inline-block;
  width: 16px;
  margin: 0 10px 0 0;
  position: relative;
  top: 14px;
}

</style>