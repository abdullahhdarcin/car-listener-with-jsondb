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

      <!-- <label>Website:</label>
      <div class="sites">
        <input type="radio"  value="sahibinden" id='sahibinden' v-model="sites" name="sites" />
        <label for="sahibinden">sahibinden.com</label>
        <input type="radio"  value="arabam" id='arabam' v-model="sites" name="sites" />
        <label for="arabam">arabam.com</label>
        <input type="radio"  value="others" id='others' v-model="sites" name="sites" />
        <label for="others">Others</label>
      </div> -->

      <label>Car Link:</label><input type="text" v-model="carlink" required>
      <button @click="carSites">Update Car</button>
  </form>
</template>

<script>
export default {
    props:['id'],
    data(){
        return{
        cars:[],
        title: '',
        brand:'',
        model:'',
        carhp:'',
        caryear:'',
        geartype:'',
        carlink:'',
        sites:'',
        uri:'http://localhost:3000/cars/' + this.id
        }
    },
    mounted(){
        fetch(this.uri).then(res=> res.json()).then(data=>{
            this.title = data.title
            this.brand = data.brand
            this.model = data.model
            this.carhp = data.carhp
            this.caryear = data.caryear
            this.geartype = data.geartype
            this.carlink = data.carlink
            this.sites = data.sites
        })
    },
    methods:{
      handleSubmit(){
        fetch(this.uri,{
          method: 'PATCH',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({
            title: this.title,
            brand: this.brand,
            model:this.model,
            carhp:this.carhp,
            caryear:this.caryear,
            geartype:this.geartype,
            carlink:this.carlink,
            sites:this.sites
            })
        }).then(()=>{
              this.$router.push('/')
            }).catch(err => console.log(err))
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

</style>