<template>
<div>
  <div class="content flex j-content1 m-top2" >
    <el-backtop ></el-backtop>
    <div class="item" v-for="(item,index) in gress" :key="index">
      <div class="deso" v-bind:class="active==index?'bor-top':''" v-bind:style="{'border-color':colors[index].color}" @click="switchTab(index)"> 
        <div class="con">
          <div class="title">{{item.name}}</div>
          <div class="money">
             <countTo v-if="active==index" :startVal="startVal" :endVal="item.money" :duration="2000" prefix="￥"></countTo>
            <div v-else>￥{{item.money}}</div>
          </div>
        </div>
        <div style="height: 80px;width:80px"  :id="`progress${index}`">
          <CircleProgress :id="item.id" :width="80" :height="80" :radius="8" :barColor="active==index?`${colors[index].color}`:'#9FB2BD'" :backgroundColor="active==index?`${colors[index].bgcolor}`:'#DCE2E6'" :progress="item.value" :isAnimation="true">
            <span slot></span>
          </CircleProgress>
        </div>
        <div class="num" v-if="active==index">{{item.value}}%</div>
        <div class="p-desc" v-if="active==index">完成率</div>
        <div class="line" v-if="index<2"></div>
      </div>
    </div>
  </div>
  <div class="flex">
      <profit class="flex1"></profit>
      <dynamic class="flex1"></dynamic>
  </div>
    <questionnaire></questionnaire>
 </div> 
</template>

<script>

import countTo from "vue-count-to";
import CircleProgress from "vue-circleprogressbar";
import profit from "../../components/index/profit"
import dynamic from "../../components/index/dynamic"
import questionnaire from '../../components/index/questionnaire'
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapActions: userActions, mapState: userState } = userModule;
export default {
  data() {
    return {
      startVal: 0,
      active:0,
      colors:[
        {color:'#5EB0FE',bgcolor:'#A9D0FF'},
        {color:'#80E313',bgcolor:'#D3F4AF'},
        {color:'#F2AE57',bgcolor:'#FFE8CC'}
      ]
    };
  },
  components: { countTo, CircleProgress ,profit,dynamic,questionnaire},
  methods: {
    ...userActions(["progress"]),
    switchTab(e){
      
        this.changeSwitch(this.active);
        this.changeSwitch(e);
        this.active = e;
   
   
    },
      changeSwitch(index) {
      let a = `#progress${index}`;
      document.querySelector(a).style.display = "none";
      setTimeout(() => {
        document.querySelector(a).style.display = "block";
      }, 0);
    },
  },
  mounted() {
    this.progress();
  },
  computed: {
    ...userState(["gress"])
  }
};
</script>
<style scoped lang='scss'>
.item {
  flex: 1;
  display: flex;
  justify-content: center;
}
.deso {
  width: 100%;
  height: 120px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}
.bor-top {
  border-top: 8px solid;
}
.con {
  position: absolute;
  height: 120px;
  width: 200px;
  left: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 20px;
}
.title {
  margin: 10px 0;
  font-size: 14px;
  color: #ccc;
}
.money {
  position: relative;
  right: 4px;
  margin: 10px 0;
}

.num{
  position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -45%);
}
.p-desc{
  position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -60%);
}
.line{
  position: absolute;
    right: 0;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    width: 1px;
    height: 24px;
    background: #ccc;
}
</style>