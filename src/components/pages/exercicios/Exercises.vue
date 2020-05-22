<template>
  <div class="exercises">
     <span class="module-description" >
      {{description}}
    </span>
    <div class="exercises-flow">
      <exercise-row v-for="(e,i) in result_exercises" :key="i" :data="e" @updatereply="updatereply"></exercise-row>
    </div>
  </div>
</template>

<script>
import ExerciseRow from "./ExerciseRow"
export default {
  components:{ExerciseRow},
  data(){
    return {
      exercises:null,
      description:null
    }
  },
  methods:{
    updatereply(data){
      console.log(data)
      var exercise = this.exercises.find(e=>e.id==data.exercise)
      exercise.reply = data;
      console.log(exercise)
    }
  },
  computed:{
    result_exercises(){

      var exercises = this.exercises;
      return exercises || []
    },
    path(){return this.$route.params.path}
  },
  async mounted(){
    if(this.modules == null){
      const {data,err} = await this.$store.dispatch("loadModuleExercises",this.path);
      if(err)console.log(err)
      if(data) {
        this.$store.commit("set_module_title",data.name)
        this.exercises = data.children;
        this.description = data.description
      }
    }
  }
}
</script>

<style scoped>
  .module-description{
    color: #555;
    margin-top: 6px;
    text-align: left;
    width: 100%;
    font-size: 1em;
    text-align: left;
    width: 100%;
    line-height: 1.1em;
    white-space: normal;
    display: flex;
  }
  .exercises-flow{
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: auto;
    gap: 3px;
    padding: 32px 12px;
  }
</style>