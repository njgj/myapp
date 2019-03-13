<template>
    <div id="case">
      <search
      v-model="key"
      position="absolute"
      placeholder="请输入名称"
      @on-submit="onSubmit"
      ref="search" top="46px"></search>

      <scroller :use-pulldown="true" :use-pullup="true" :bounce="true" lock-x
        v-model="scrollerStatus" 
        :pulldown-config="{downContent: '下拉刷新', upContent: '释放后更新'}" 
        :pullup-config="{upContent:'上拉加载更多', downContent: '释放后加载'}"
        @on-pullup-loading="onScrollUp" 
        @on-pulldown-loading="onScrollDown" 
        style="width:100%" height="-46px" ref="scroller">
 
            <div>
                <panel :list="news_list" :type="'5'"></panel>
                <divider v-if="onFetching">我也是有底线的...</divider>
            </div>
 
        </scroller>

    </div>
</template>
<script>

import { Search, Divider, Panel, Scroller, LoadMore, XHeader } from 'vux'
export default {
    data () {
        return {
            key: '',
            scrollerStatus: {
                pullupStatus: 'default'
            },
            news_list: [],
            onFetching: false,
            pageIndex: 1,
            pageSize: 10
        }
    },
    
    components: {
        Search,
        Panel,
        Scroller,
        LoadMore,
        XHeader,
        Divider
    },
    created () {
        this.onInit()
        this.$nextTick(() => {
            this.$refs.scroller.reset()
        })
    },
    methods: {
        //
        getDataList (type, page) {
            //console.log(page)
            this.axios({
            url: '/api/cases',
            method: 'post',
            data: {
                'page': page,
                'limit': this.pageSize,
                'title':this.key
            }
            }).then(resp => {
                    //console.log(resp)

                    if (type==1) {
                        
                        this.news_list = resp.data.cases
                        
                        this.$nextTick(() => {
                            this.$refs.scroller.donePulldown()
                            this.$refs.scroller.reset({top: 0})
                        })
                    }
                    // 拼接数据
                    if (type==2) {
                        
                        this.news_list = this.news_list.concat(resp.data.cases)
                        // 判断是否还有数据
                        if (resp.data.cases.length ==0) {
                        // 没有就显示底线以及禁用上拉
                            this.onFetching = true
                            this.scrollerStatus.pullupStatus = 'disabled'
                        } else {
                            // 还有数据就开启上拉，并重置
                            this.scrollerStatus.pullupStatus = 'default'
                            this.$nextTick(() => {
                                this.$refs.scroller.donePullup()
                                this.$refs.scroller.reset()
                            })
                        }
                    }
            }).catch(err => {
                console.log(err);
            })
        },
        
        
        onInit () {
            this.getDataList(1,this.pageIndex)
        },

        onScrollUp () {
            // 每次获取十条，页码加一
            this.pageIndex ++
            this.getDataList(2,this.pageIndex)
        },

        onScrollDown () {
            this.pageIndex = 1
            this.scrollerStatus.pullupStatus = 'default'
            this.onFetching = false
            this.$refs.scroller.enablePullup()
            this.getDataList(1,this.pageIndex)
        },

  
        onSubmit () {
            this.$refs.search.setBlur()
            this.getDataList(1,this.pageIndex)
        }  
    }
}

</script>
<style lang="less" scoped>
a {
   text-decoration:none
}
</style>
