<template>
  <div class="home-screen">
    <div class="screen-1">
      <draggable :list="list1"
                 @end="end1"
                 class="dragArea1"
                 style="height: 100px">
        <div v-for="(element, index) in list1"
             :key="element.id" class="list-complete-item">
          <div class="list-complete-item-handle">{{element.name}}</div>
        </div>
      </draggable>
    </div>
    <div class="screen">
      11111111
    </div>
    <div class="screen-2">
      <draggable :list="list2"
                 @end="end2"
                 class="dragArea2">
        <div v-for="element in list2" :key="element.id"
             class="list-complete-item">
          <div class="list-complete-item-handle2"> {{element.name}}</div>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import draggable from 'vuedraggable';
  export default {
    name: "home-screen",
    components: {
      draggable
    },
    data() {
      return {
        falgs: 'article',
        disabled: false,
        list1: [{id: 1, name: 1}, {id: 2, name: 2}, {id: 3, name: 3},
          {id: 4, name: 4}, {id: 5, name: 5}],
        list2: [{id: 6, name: 6}, {id: 7, name: 7},
          {id: 8, name: 8}, {id: 9, name: 9}, {id: 10, name: 10}
        ]
      }
    },
    updated() {
     // console.log(this.list1)
     // console.log(this.list2)
    },
    methods: {
      end1 (ev) {
        /*if (ev.to.className === 'dragArea1') {
          this.$set(this.list2[ev.oldIndex], 'flag', true)
        }*/
        console.log('11111111111')
        console.log(ev)
        console.log(this.list1);
        console.log(this.list2);

        this.$store.dispatch('layout/GetAuth').then(resp => {
          console.log('kkk')
        })
      },
      end2 (ev) {
        console.log('22222222222')
        console.log(ev)
        console.log(this.list1);
        console.log(this.list2);
      }
    }
  }
</script>

<style scoped lang="less">
.home-screen{
  display: flex;
  .screen-1{
    flex: 1;
    border: 1px solid red;
  }
  .screen{
    width: 400px;
    border: 1px solid blue;
  }
  .screen-2{
    flex: 1;
    border: 1px solid green;
  }
  .list-complete-item{
    width: 300px;
    height: 50px;
    line-height: 50px;
    background-color: #42b983;
    color: #ffffff;
    border-bottom: 1px solid blue;
  }
}
</style>
