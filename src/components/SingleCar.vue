
<template>
        <div class="car" :class="{islive:car.islive}">
            <div class="actions">
          <h3 class="handle" @click="showDetails=!showDetails">{{car.title}}</h3>
              <div class="icons">
                  <router-link :to="{name:'EditCar', params:{id: car.id}}">
                      <span class="material-icons">edit</span>
                  </router-link>
                  <span @click="deleteCarListen" class="material-icons">delete</span>
                  <span v-if="islive=true" @click="isLive" class="material-icons tick" >hdr_strong</span>
              </div>
          <div v-if="showDetails" class="details">
                    <div><p><b>Brand :</b> {{car.brand}}</p> &nbsp;&nbsp;&nbsp;</div>
                    <div><p><b>Model :</b> {{car.model}}</p> &nbsp;&nbsp;&nbsp;</div>
                    <div><p><b>HP :</b> {{car.carhp}}</p>&nbsp;&nbsp;&nbsp;</div>
                    <div><p><b>Year :</b> {{car.caryear}}</p>&nbsp;&nbsp;</div>
                    <div><p><b>Gear Type :</b> {{car.geartype}}</p>&nbsp;&nbsp;</div>
                    <div><p><b>Link :</b> {{car.carlink}}</p>&nbsp;&nbsp;</div>
                    <div><p><b>Price :</b> {{car.carprice}} ₺</p>&nbsp;&nbsp;</div>
            </div>
        </div>
      </div>
</template>

<script>

export default {
    props:['car'],
    data(){
        return{
            showDetails: false,
            uri: 'http://localhost:3000/cars/' + this.car.id
        }
    },
  mounted(){
    fetch('http://localhost:3000/cars')
    .then(res => res.json())
    .then(data => this.list = data )
    .catch(err => console.log(err.message))
  },
    methods:{
        deleteCarListen(){
            fetch(this.uri,{method: 'DELETE'})
            .then(()=>this.$emit('delete', this.car.id))
            .catch(err=>console.log(err))
        },
        isLive(){
            fetch(this.uri, {
                method:'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({islive: !this.car.islive})
            }).then(()=>{
                this.$emit('islive', this.car.id)
            }).catch(err=>console.log(err)) 
             
        },
        adslive(){
            if(islive=true){
               return this.live
            }
            else{
                return this.islive='Yayında'
            }
        }
    }
}
</script>

<style>
.car{
    margin: 20px auto;
    background: white;
    padding: 10px 20px;
    border-radius: 4px;
    box-shadow: 1px 2px 3px rgba(0,0,0,0.05);
    border-left: 4px solid rgb(175, 9, 9);
    z-index: 9;
    
}

h3{
    cursor: pointer;
}

.actions{
    
    justify-content: space-between;
    align-items: center;
}

.material-icons{
    margin-left: 10px;
    position: relative;
    float: right;
    cursor: pointer;
    bottom: 30px;
}

.material-icons:hover{
    color: grey;
}

.car.islive{
    border-left: 4px solid #00ce89;
}

.car.islive .tick{
    color : #00ce89;
}

.details{
    top: 15px;
    justify-content: space-between;
    position: relative;
    align-items: center;
    margin-top: 15px;
}
</style>