<template>
    <div class="modulo-item " :class="{'onhold': data == null}">

    <div class="modulo"  v-if="data != null" @click="route(data.path)">
        <div class="img-vp">  
          <img :src="data.picture && data.picture.sm ? data.picture.md: null" alt="">
        </div>
        <div class="write-content">

          <span class="name">{{data.name}} </span>
          <span class="description">
            {{data.description}}
          </span>
        
        </div>
          
          <div class="detail mb-0 mt-auto"></div>
    </div>

  </div>
</template>

<script>
export default {
    props:{data:Object},
    methods:{
      route(path){
        console.log(path)
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
  }
  .modulo-item{
    width: 100%;
    min-height: 300px;
    overflow: hidden;
    box-shadow: 0px 2px 6px #0001;
    border: solid 1px #ddd;
    max-height: 100%;
    border-radius: 4px;

    cursor: pointer;
    background-color: white;
  }
  .modulo-item:hover{
    transition: all .2s;
    transform:  scale(1.006);
    box-shadow: 0px 4px 12px #0002;
  }
 
  .modulo{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .modulo .img-vp{
    width: 100%;
    padding-bottom: 50%;
    position: relative;
    overflow: hidden;
  } 
  .modulo-item:hover .modulo .img-vp> img{
    transition: transform .35s;
    transform: scale(1.06);
  }
  .write-content{
    padding:14px 16px 16px 16px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
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