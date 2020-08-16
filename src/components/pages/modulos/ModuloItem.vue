<template>
  <div  class="modulo-item ">

    <div  class="modulo-inner d-flex flex-column"  v-if="data != null" @click="route(data.path)">
        
        <div class="modulo-header py-1 pb-2">

          <div class="img-vp unselectable ">  
            <img :src="data.picture && data.picture.lg ? data.picture.lg: null" alt="">
          </div>
        </div>


        <div class="write-content">
          <span class="name unselectable">{{data.name}} </span>
          <span class="description unselectable">
            {{data.description}}
          </span>
        </div>
    </div>
    <div v-else class="loading-comp py-3">
  

    
    </div>



  </div>
</template>

<script>
export default {
    props:{data:Object},
    methods:{
      route(path){
        this.$router.push({path:`/modules/${path}`})
      }
    }
}
</script>

<style scoped>
 
 
 
  .modulo-item{
    width: 100%;
    min-height: 280px;
 
    max-height: 100%;
    border-radius: 2px;
    cursor: pointer;
    position: relative;
  }
  .modulo-header{
    background-color: #20276620;
    overflow: hidden;
  }
  .modulo-inner{
    width: 100%; height: 100%; position: relative;
    background-color: white;
    box-shadow: 0px 2px 4px #0001;
    border: solid 1px #ddd;
  }
  .modulo-inner .img-vp{
    width: 100%;
    padding-bottom: 50%;
    position: relative;
    overflow: hidden;
  } 
  .modulo-inner .img-vp img{
    position: absolute;
    object-fit: cover;
    top:0;left: 0;
    width: 100%;
  }
  .modulo-item:hover .modulo-inner .img-vp> img{
    transition: transform .26s;
    transform: scale(1.045);
  }
  .write-content{
    padding:6px 16px 16px 16px;
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: rgb(255, 255, 255);
    z-index: 1;
  }
  .modulo-inner .name{
    color: #222;
    font-weight: 600;
    font-size: 1.1em;
    line-height: 1.2em;
    height: fit-content;
    max-height: 2.4em;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    margin:  0 0 6px 0;
    text-align: left;
    width: 100%;
  }
  .modulo-inner .description{
    color: #777; font-size: .95em;line-height: 1.1em;
    font-weight: 500; white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    margin: auto;
    text-align: left;
    width: 100%;
  }
  
    @media only screen and (max-width:960px){
    .write-content{
      padding-bottom: 24px !important;
    }
  }
</style>