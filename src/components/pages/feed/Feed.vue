<template>
  <div id="interactions-feed" class=" bd-red flex-column aln-center jus-center ">
    <h5 class="ml-0 mr-auto">Ajude a fortalecer a comunidade!</h5>
    <div class="feed-panel bd-blue mb-3">
      <sender-form from="fresh"></sender-form>
    </div>
    <div class="feed-flow bd-blue">
        <div class="feed-panel" v-for="(i) in get_fresh" :key="i.id">
          <Interaction  :entry="i" ></Interaction>
        </div>
    </div>
  </div>
</template>

<script>
import SenderForm from "./SenderForm"
import Interaction from "./Interaction"
import {mapGetters} from "vuex"
export default {
  components:{SenderForm,Interaction},
  computed:{
     ...mapGetters(["get_fresh"])
  },
  methods:{
  
  },
  created(){
    this.$store.dispatch("loadFresh")
  }
}
</script>

<style>

  #interactions-feed{
    width: 100%;max-width: 820px;
    padding-bottom: 320px;
    margin: auto;
  }
  .feed-flow{
    margin: auto;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows:  1fr;
    row-gap: 8px;
  }
  .feed-panel{
    width: 100%;
    height: fit-content;
    background-color: white;
    padding: 12px 16px;
    border-radius: 3px;
    box-shadow:  0px 3px 6px #00000012;
  }
</style>