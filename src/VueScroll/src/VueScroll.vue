<template>
  <div id="vueScroll" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
    <div class="loading-div">
      <img :src="loadingIcon" alt class="loading-icon" />
      <span class="loading-text">{{ loadingPromptText }}</span>
    </div>
    <div class="is-loading" v-show="isLoading">
      <img :src="loadingIcon" alt />
      <span class="loading-text">{{ loadingText }}</span>
    </div>
    <div class="is-loading" v-show="isFinish">
      <img :src="fetchError?errorIcon:successIcon" alt />
      <span class="loading-text">{{ fetchError?errorText:successText }}</span>
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
      default: "http://img.lanrentuku.com/img/allimg/1212/5-121204193R7.gif"
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
    },
    errorIcon: {
      type: String,
      default: "https://s2.ax1x.com/2019/11/03/KXnHBV.png"
    },
    errorText: {
      type: String,
      default: "刷新失败"
    },
    successIcon: {
      type: String,
      default: "https://s2.ax1x.com/2019/11/03/KXn7n0.png"
    },
    successText: {
      type: String,
      default: "刷新成功"
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
      isFinish: false,
      fetchError: false,
      isStart: true
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
      this.isStart && (this.applyCallback('startCallback'),this.isStart = false)
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
        this.applyCallback("isLoadingCallback");
        this.canefresh = false;
        if (this.reload === false && this.postUrl) {
          this.fetchRes = await this.fetchData();
          if (this.fetchRes !== "" && this.fetchRes !== undefined) {
            this.fetchFinish(false);
          } else if (this.fetchRes === "" && this.fetchRes === undefined) {
            this.fetchFinish(true);
          }
        } else if (this.reload === true) {
          setTimeout(() => {
            this.isLoading = false;
          }, this.delayNum);
        }
      } else {
        document.getElementsByTagName("body")[0].style.paddingTop = "0px";
        this.canefresh = false;
        this.isStart === false &&
        (this.applyCallback("cancalLoadingCallback"),
        this.isStart = true)
      }
    },
    fetchData() {
      return new Promise((resolve, reject) => {
        fetch(this.postUrl)
          .then(res => res.json())
          .then(res => resolve(res))
          .catch(error => {
            return error;
          });
      });
    },
    fetchFinish(error) {
      setTimeout(() => {
        this.isLoading = false;
        this.isFinish = true;
        if (error) {
          this.fetchError = true;
        } else {
          this.fetchError = false;
          this.$emit("getFetchRes", this.fetchRes);
        }
        setTimeout(() => {
          this.isFinish = false;
          this.applyCallback("endCallback");
        }, 1000);
      }, this.delayNum);
    },
    applyCallback(func) {
      if (this.callback[func] && this.callback[func] instanceof Function) {
        this.callback[func]();
      }
    }
  }
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
  height: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-2.5rem);
}
.loading-icon {
  max-width: 1.25rem;
  max-height: 1.25rem;
  vertical-align: middle;
  margin: 0 0.625rem;
}
.loading-text {
  font-size: 0.6rem;
}
.is-loading {
  padding: 0.625rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 5s;
}
.is-loading img {
  max-width: 1.25rem;
  max-height: 1.25rem;
  margin: 0 10px;
  /* animation: rotateLoading 3s linear infinite; */
}
/* @keyframes rotateLoading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
} */
</style>
