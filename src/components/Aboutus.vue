<template>
    <div>
      <header>
        <img src="../assets/face.png" class="face"/>
        <h2>龚俊</h2>
      </header>
      
      <tab v-model="index">
        <tab-item selected  @on-item-click="onItemClick">个人简介</tab-item>
        <tab-item   @on-item-click="onItemClick">技能特长</tab-item>
      </tab>
       <div class="tab-content">
            <div v-show="index==0" v-html="intro"></div>
            <div v-show="index==1">
                <p :key="index"  v-for="(item, index) in skill">
                   {{item.name}}<x-progress :percent="parseInt(item.value)" :show-cancel="false" :class="item.style"></x-progress><span>{{item.label}}</span>
                </p>
              
            </div>
        </div>
        <a href="tel://13913362380" class="my-btn"><x-button :gradients="['#1D62F0', '#19D5FD']" style="width:60%">CALL ME</x-button></a>
    </div>
</template>
<script>
import { Tab, TabItem, XProgress, XButton } from 'vux'

export default {
  components: {
    Tab,
    TabItem,
    XProgress,
    XButton
  },
  data () {
    return {
      index:0,
      intro:'',
      skill:[]
    }
  },
  methods: {
    onItemClick(index) {
      //console.log(index)
      this.index=index
    },
    getIntro() {
      this.axios.post('/api/aboutus/classid/1').then(resp => {
          //console.log(resp.data)
          this.intro = resp.data.content

      }).catch(err => {
          console.log(err);
      })
    },
    getSkill() {
      this.axios.post('/api/skill').then(resp => {
          //console.log(resp.data)
          this.skill = resp.data

      }).catch(err => {
          console.log(err);
      })
    },   
  },
  mounted() {
    this.getIntro(),
    this.getSkill()
  }
}
</script>
<style>
header { text-align: center; padding: 20px; }
header .face { border-radius: 50px;  border:3px solid #cccccc;  }
header h2 { font-size: 14px; margin: 0; padding: 0; }
.tab-content { padding: 20px; line-height: 150%; font-size: 14px; }
.weui-progress__bar { height: 10px !important; }
.success .weui-progress__inner-bar { background-color:green !important; }
.warning .weui-progress__inner-bar { background-color:greenyellow !important; }
.danger .weui-progress__inner-bar { background-color: coral !important; }
p span { color: grey; }
.my-btn { text-decoration: none; cursor: hand; }
</style>
