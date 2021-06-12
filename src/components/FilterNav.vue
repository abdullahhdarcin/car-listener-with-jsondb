<template>
  <nav class="filter-nav">
      <button @click="updateFilter('all')" :class="{ active: current==='all'}">View All Ads</button>
      <button @click="updateFilter('Sahibindencom_Ads')" :class="{active: current==='Sahibindencom_Ads'}"><img v-bind:src="sahibinden_image" class="logos" alt="..." > Sahibinden.com</button>
      <button @click="updateFilter('Arabamcom_Ads')" :class="{active: current==='Arabamcom_Ads'}"><img v-bind:src="arabamcom_image" class="logos" alt="..." > Arabam.com</button>
      <button @click="updateFilter('Other_Ads')" :class="{active: current==='Other_Ads'}">Other Ads </button>
  </nav>
</template>

<script>
export default {
    data(){
        return{
            sahibinden_image: require('../assets/images/sahibinden_logo.png'),
            arabamcom_image: require('../assets/images/arabamcom_logo.jpg'),
            sortWord:''
        } 
    },
    props:['current'],
    methods:{
        updateFilter(by){
            this.$emit('filterChange', by)
        }
    }
}
</script>

<style>
.filter-nav button{
    background: none;
    border: none;
    color: #bbb;
    outline: none;
    font-size: 12px;
    text-transform: uppercase;
    margin-right: 10px;
    letter-spacing: 1px;
    font-weight: bold;
    cursor: pointer;
}

.filter-nav button.active{
    color: #555;
}

.logos{
    width: 16px;
    height: 16px;
    margin-bottom:3px;
    cursor: pointer;
}
</style>