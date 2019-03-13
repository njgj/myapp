<template>
    <div>
      <box gap="10px">
          <group>
              <x-input title="标题" v-model="title" required></x-input>
          </group>
          <group>
              <x-textarea title="内容" :max=200 v-model="content" required></x-textarea>
          </group>
          <group>
              <x-input title="您的姓名" v-model="realname" required></x-input>
          </group>
          <group>    
              <x-input title="手机号码" v-model="mobile" is-type="china-mobile" required></x-input>
          </group>   
          <p>
            <x-button type="primary"  @click.native="handleSubmit()" :disabled='disabled'>{{submit}}</x-button>
          </p>   
      </box> 
    </div>
</template>
<script>
import { Group, XInput, XTextarea, XButton, Box } from 'vux'

export default {
  components: {
    XInput,
    Group,
    XTextarea,
    XButton,
    Box
  },
  data () {
    return {
      submit:'提交',
      disabled:false,
      title:'',
      content:'',
      realname:'',
      mobile:''
    }
  },
  methods: {
    handleSubmit() {
      if(this.title==''){
        this.$vux.toast.show({
          text:'标题不能为空',
          type:'cancel',
          position:'middle'
        })
        return false
      }
      if(this.content==''){
        this.$vux.toast.show({
          text:'内容不能为空',
          type:'cancel',
          position:'middle'
        })
        return false
      }
      if(this.realname==''){
        this.$vux.toast.show({
          text:'姓名不能为空',
          type:'cancel',
          position:'middle'
        })
        return false
      }    
      if(!(/^1[34578]\d{9}$/.test(this.mobile))){ 
        this.$vux.toast.show({
          text:'手机号码格式错误',
          type:'cancel',
          position:'middle'
        })
        return false
      }         
      this.axios({
        method:'post',
        url:'/api/zixun',
        data:{
          title:this.title,
          content:this.content,
          realname:this.realname,
          mobile:this.mobile
        }
      }).then(resp => {
         //console.log(resp.data)
         if(resp.data.code=='OK'){
            this.disabled=true
            this.submit='已提交'

            this.$vux.toast.show({
              text:'您的留言已成功提交！',
              type:'success',
              position:'middle'
            })
         }

      }).catch(err => {
          console.log(err);
      })
    }
  }
}
</script>
<style scoped>

</style>
