<template>
 <div class="flex j-content3">
<div id="qrcode" ref="qrcode"></div>
 </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const { mapActions: userActions, mapState: userState } = userModule;
import QRCode from 'qrcodejs2'
 export default {
   data () {
     return {

     }
   },
   components: {
   QRCode
   },
   props:{
     
   },
   methods: {
      qrcodeScan () {//生成二维码
			  let qrcode = new QRCode('qrcode', {  
			      width: 200,  // 二维码宽度 
			      height: 200, // 二维码高度
			      text: this.url
			  })  
			},
   },
   mounted() {
      this.qrcodeScan()
   },
   watch: {
      // url(){
      //      this.qrcodeScan()
      // }
   },
   computed: {
    ...userState(["url"])
   }
 }
</script>

<style scoped lang='scss'>

</style>