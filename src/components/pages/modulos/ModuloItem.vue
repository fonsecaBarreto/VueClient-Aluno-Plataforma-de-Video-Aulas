<template>
    <div class="modulo-item " :class="{'onhold': data == null}">

    <div class="modulo"  v-if="data != null" @click="route(data.path)">
        <div class="img-vp unselectable mt-2">  
          <img :src="data.picture && data.picture.lg ? data.picture.lg: null" alt="">
        </div>
        <div class="write-content">
          <span class="name unselectable">{{data.name}} </span>
          <span class="description unselectable">
            {{data.description}}
          </span>
        </div>
          
         
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
  .detail{
    width: 100%;
    height: 14px;
    border-top: solid 1px #ededed;
    position: relative;
    overflow: hidden;
  }
  .detail:after{
    content: "";
    position: absolute;
    top: 0;left: 0;
    width: 100%;
    height: 100%;

    background-repeat: no-repeat;
    background-position: right;
    background-size: 240px;
    opacity: .4;
  }
  .detail:before{
    content: "";
    position: absolute;
    top: -10px;right: 0;
    width: 30%;
    height: 200px;
    background-color: rgb(206, 26, 41);
    background-color: rgb(242, 242, 242);
    border: solid 1px #ccc;
    transform: rotate(20deg);
    transition: all .5s;
  }

  @media only screen and (max-width:960px){
    .detail{
      display: none;
    }
    .write-content{
      padding-bottom: 24px !important;
    }
  }
  .modulo-item{
    width: 100%;
    min-height: 280px;
    overflow: hidden;
    box-shadow: 0px 2px 4px #0001;
    border: solid 1px #ddd;
    max-height: 100%;
    border-radius: 2px;
    cursor: pointer;
    background-color: white;
  
  }
  .modulo-item:hover{
    transition: all .2s;
  }
   .modulo-item:hover .detail:before{background-color: #0575E6; }
  /*  */
  .modulo-item:active .detail:before{
     background-color: rgb(206, 26, 41); 
    transition: background .1s;

  }

 
  .modulo{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .modulo .img-vp{
    width: 100%;
    padding-bottom: 50%;
    position: relative;
    overflow: hidden;
  } 
  .modulo::before{
    content: "";
    width: 100%;
    height: 0;
    padding-bottom: 60%;
    background-color: #20276620;
    position: absolute;
    left: 0;top: 0px;
    z-index: 0;
  } 
  
  .modulo-item:hover .modulo .img-vp> img{
    transition: transform .3s;
    transform: scale(1.05);
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
  .modulo .img-vp img{
    position: absolute;
    object-fit: cover;
    top:0;left: 0;
    width: 100%;
  }
  .modulo .name{
  
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
    margin: auto;
    margin:  0 0 6px 0;
    text-align: left;
    width: 100%;
  }
  .modulo .description{
    flex: 1;
    color: #777;
    font-weight: 600;
    font-size: .945em;
    line-height: 1.1em;
    font-weight: 500;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  
    margin: auto;
    text-align: left;
    width: 100%;
  }


    .onhold{
    background-color: #ddd;
  }
</style>