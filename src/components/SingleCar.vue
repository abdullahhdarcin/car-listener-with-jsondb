<template>
  <div class="car" :class="{islive:car.islive}">
      <div class="actions">
              <h3 @click="showDetails=!showDetails">{{car.title}}</h3>
              <div class="icons">
                  <span class="material-icons">edit</span>
                  <span @click="deleteCarListen" class="material-icons">delete</span>
                  <span v-if="islive=true" @click="isLive" class="material-icons tick" >hdr_strong</span>
              </div>
          <div v-if="showDetails" class="details">
                    <p><b>Marka :</b> {{car.brand}}</p> &nbsp;&nbsp;&nbsp;
                    <p><b>Model :</b> {{car.model}}</p> &nbsp;&nbsp;&nbsp;
                    <p><b>Güç :</b> {{car.carhp}}</p>&nbsp;&nbsp;&nbsp;
                    <p><b>Araç Yılı :</b> {{car.caryear}}</p>&nbsp;&nbsp;
                    <p><b>Vites Tipi :</b> {{car.geartype}}</p>&nbsp;&nbsp;
                    <p><b>Araç Linki :</b> {{car.carlink}}</p>&nbsp;&nbsp;
                    <p>{{car.islive}}</p>
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
}

h3{
    cursor: pointer;
}

.actions{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.material-icons{
    margin-left: 10px;
    right: 0px;
    cursor: pointer;
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

</style>