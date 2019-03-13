<template>
    <div id="home">
        <swiper :list="focus_list" v-model="focus_index" auto  height="180px" :aspect-ratio="300/800" dots-position="center" @on-index-change="onSwiperItemIndexChange"></swiper>

        <!-- <grid :show-lr-borders="false">
          <grid-item link="./aboutus">
            <img src="../assets/grid_icon.png"><h2>11</h2>
          </grid-item>
          <grid-item link="./aboutus">
            <img src="../assets/grid_icon.png"><h2>11</h2>
          </grid-item>
          <grid-item link="./aboutus">
            <img src="../assets/grid_icon.png"><h2>11</h2>
          </grid-item>
          <grid-item link="./aboutus">
            <img src="../assets/grid_icon.png"><h2>11</h2>
          </grid-item>
                            
        </grid> -->

        <group :title="news">
          <cell :title="item.title" :key="index" is-link
          v-for="(item,index) in news_list"
          :link="{name:'Detail',query:{ id:item.id }}"
          ><img slot="icon" width="40" style="display:block;margin-right:5px;" :src="item.img"/>
      
          </cell>
        </group>
    </div>
</template>
<script>
import { Swiper,SwiperItem, Cell, CellBox, Group, Badge, Search, Grid, GridItem } from 'vux'

export default {
  name: 'Home',
  data() {
    return {
      news:'',
      news_list:[],
      focus_list:[],
      focus_index:0
    }
  },
  components:{
    Swiper,
    SwiperItem,
    Group,
    Cell,
    CellBox,
    Badge,
    Search,
    Grid, 
    GridItem
  },
  methods:{
    getFocus() {
      this.axios.get('/api/focus').then(resp => {
          //console.log(resp.data)
          this.focus_list = resp.data.focus
      }).catch(err => {
          console.log(err);
      })
    },
    getNews() {
      this.axios.post('/api/news').then(resp => {
         //console.log(resp.data)
          this.news = '知乎-'+resp.data.date
          this.news_list = resp.data.news
      }).catch(err => {
          console.log(err);
      })
    },    
    onSwiperItemIndexChange(index) {
      //console.log(index);
      this.focus_index = index
    }
  },
  created() {
     this.getFocus(),
     this.getNews()
  }    
}
</script>
<style scoped>

</style>
