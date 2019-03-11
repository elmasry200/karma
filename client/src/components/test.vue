<template>
   <div>         
        <ul>
       <vue-slide-up-down class="wobbly-accordeon" :active="true" :duration="5000">
          <li class="x">
                   
             {{ tasks[0].title }}
              
          </li>
        </vue-slide-up-down>
        </ul>         
    </div> 
</template>
<<script>
    export default {
        data () {
         return {
            tasks: [
                    { title: 'Clean my room' },
                    { title: 'Go to the grocery' },
                    { title: 'meeting with JP' },
                    { title: 'Go to the dentist' }
                ]
        }
        }
    }
</script>
<style scoped>
.x {
   width: 700px;
   height: 100px;
   color:purple;
   border:3px solid #73AD21;
   margin: auto;
   margin-bottom: 10px;
   text-align: center;   
}
.wobbly-accordeon {
    transition-timing-function: cubic-bezier(5.195, 5s, 5.435, -5.600);
}
</style>
