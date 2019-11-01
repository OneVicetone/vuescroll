<template>
  <div id="vueScroll" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
    <div class="loading-div">
      <img :src="loadingIcon" alt class="loading-icon" />
      <span class="loading-text">{{ loadingPromptText }}</span>
    </div>
    <div class="is-loading" v-show="isLoading">
      <img :src="isFinish?finishIcon:loadingIcon" alt />
      <span class="loading-text">{{ loadingText }}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: "VueScroll",
  props: {
    loadingIcon: {
      type: String,
      default: "./assets/logo.png"
    },
    loadingText: {
      type: String,
      default: "正在刷新页面"
    },
    callback: Object,
    reload: Boolean,
    postUrl: String,
    delayNum: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      isLoading: false,
      loadingPromptText: "正在刷新页面",
      canefresh: "",
      startY: "",
      endY: "",
      startText: "继续下拉刷新",
      endText: "松开刷新",
      maxY: 100,
      fetchRes: "",
      isFinish: false
    };
  },
  methods: {
    touchStart(e) {
      if (this.isLoading) return;
      if (window.screenTop <= 0) this.canefresh = true;
      let touch = e.touches[0];
      this.startY = touch.pageY;
    },
    touchMove(e) {
      if (!this.canefresh) return;
      let touch = e.touches[0];
      this.endY = touch.pageY;
      let nowY = this.endY - this.startY;
      if (nowY / this.maxY < 0.7) {
        this.loadingPromptText = this.startText;
      } else {
        this.loadingPromptText = this.endText;
      }
      if (nowY >= this.maxY) {
        document.getElementsByTagName("body")[0].style.paddingTop =
          this.maxY + "px";
      } else {
        document.getElementsByTagName("body")[0].style.paddingTop =
          this.endY - this.startY + "px";
      }
    },
    async touchEnd() {
      if (!this.canefresh) return;
      if (this.loadingPromptText === "松开刷新") {
        this.isLoading = true;
        document.getElementsByTagName("body")[0].style.paddingTop = "0px";
        this.canefresh = false;
        if (this.reload === false && this.postUrl) {
          this.fetchRes = await this.fetchData();
          if (this.fetchRes !== "") {
            setTimeout(() => {
              this.isLoading = false;
              this.$emit("getFetchRes", this.fetchRes);
            }, this.delayNum);
          }
        } else if (this.reload === true) {
          setTimeout(() => {
            this.isLoading = false;
          }, this.delayNum);
          // if (
          //   this.callback.loadingEndCallback !== undefined &&
          //   this.callback.loadingEndCallback instanceof Function
          // ) {
          //   this.callback.loadingEndCallback();
          // }
          // location.reload()
        }
      } else {
        document.getElementsByTagName("body")[0].style.paddingTop = "0px";
        this.canefresh = false;
      }
    },
    fetchData() {
      return new Promise((resolve, reject) => {
        fetch(this.postUrl)
          .then(res => {
            console.log("json()before", res);
            return res.json();
          })
          .then(res => {
            console.log("json()after", res);
            return resolve(res);
          })
          .catch(error => {
            throw new Error(error);
            return reject(error);
          });
      });
    }
  }
  // created() {
  //   if (this.loadingIcon === undefined) {
  //     this.loadingIcon = defaultLoadingIcon;
  //   }
  //   if (this.loadingText === undefined) {
  //     this.loadingText = this.defaultLoadingText;
  //   }
  // }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#vueScroll {
  width: 100vw;
  height: 100vh;
  scroll-behavior: smooth;
}
.loading-div {
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-40px);
}
.loading-icon {
  max-width: 20px;
  max-height: 20px;
  vertical-align: middle;
  margin: 0 10px;
}
.loading-text {
  font-size: 12px;
}
.is-loading {
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 5s;
}
.is-loading img {
  max-width: 20px;
  max-height: 20px;
  margin: 0 10px;
  animation: rotateLoading 3s linear infinite;
}
@keyframes rotateLoading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
