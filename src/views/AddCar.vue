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

      <input type="file" required>

      
      <label>Car Link:</label><input type="text" v-model="carlink" required>
      <button>Add New Car</button>
  </form>
</template>

<script>
import SingleCar from '../components/SingleCar.vue'


export default {
    components: { SingleCar },
    data(){
    return{
      cars:[],
      title: '',
      brand:'Please select one.',
      model:'Please select one.',
      carhp:'',
      caryear:'',
      geartype:'',
      carlink:''
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
          }

          fetch('http://localhost:3000/cars',{
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(car)
          }).then(()=>{
              this.$router.push('/')
          }).catch((err)=>console.log(err))
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


</style>