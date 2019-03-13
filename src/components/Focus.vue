<template>
  <div class="swiper-container" :class="swipeid">
      <div class="swiper-wrapper">
          <!-- ????????? -->
          <slot name ="swiper-con"></slot>
      </div>
      <!-- ??? -->
      <div :class="{'swiper-pagination':pagination}"></div>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
export default {
  props: {
    swipeid: {
      type: String,
      default: ""
    },
    effect: {
      type: String,
      default: "slide"
    },
    loop: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: "horizontal"
    },
    pagination: {
      type: Boolean,
      default: true
    },
    paginationType: {
      type: String,
      default: "bullets"
    },
    autoPlay: {
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      dom: ""
    };
  },
  mounted() {
    var that = this;
    this.dom = new Swiper("." + that.swipeid, {
      //??
      loop: that.loop,
      //???
      pagination: { 
        el: ".swiper-pagination",
        bulletClass : 'swiper-pagination-bullet',
            },
      //????
      paginationType: that.paginationType,
      //????
      autoPlay: that.autoPlay,
      //??
      direction: that.direction,
      //??
      effect: that.effect,
      //????swiper??????autoplay
      disableOnInteraction: false,
      //??swiper?????????????swiper
      observer: true,
      //??swiper???????????swiper
      observeParents: true
    });
  }
};
</script>

<style>
.swiper-container {
    width: 100%;
  }
  .swiper-slide {
    height: 8rem;
    overflow: hidden;
    position: relative;
  }

.swiper-slide  div {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    position: absolute;
    background-color: blue;
  }
.swiper-slide  img {
    top: 50%;
    position: relative;
    transform: translate(0, -50%);
    width: 100%;
  }
.swiper-slide  h3 {
    width: 70%;
    color: #fff;
    margin: 0;
    font-size: 0.5rem;
    line-height: 1rem;
    right: 5%;
    bottom: 2.6rem;
    text-align: right;
    position: absolute;
    text-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
  }

.swiper-pagination-bullet-active {
  background: #fff;
}
.swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: 1rem;
    width: 95%;
    text-align: right;
  }  
</style>