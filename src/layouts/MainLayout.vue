<template>
  <q-layout view="hhh lpR fFf">
    <q-header
      elevated
      class="header text-black"
      :style="{
        backgroundImage: 'url(' + 'https://i.imgur.com/Xz4Po0k.jpg' + ')',
      }"
    >
      <q-toolbar class="toolbar q-mb-xs">
        <q-toolbar-title class="text-weight-bolder q-pt-md">
          觀音工業區<br />空氣品質觀測資訊網
          <br />
          <p class="q-pt-xs text-weight-regular">
            Air Quality Observation of Guanyin Industrial Park
          </p>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      persistent
      no-swipe-open
      no-swipe-close
      no-border
      :width="250"
      :breakpoint="500"
      class="q-pt-sm overflow:hidden"
      :style="{
        backgroundImage: 'url(' + 'https://i.imgur.com/rORuNtC.jpg' + ')',
      }"
    >
      <q-list>
        <q-item
          to="/"
          clickable
          v-ripple.early
          exact
          class="instant overflow:hidden"
          active-class="linkon-instant q-pr-lg overflow:hidden"
        >
          <q-item-section class="list">即時資訊｜Real-time AQ</q-item-section>
        </q-item>

        <q-item
          to="/longterm"
          clickable
          v-ripple.early
          exact
          class="longterm"
          active-class="linkon-longterm"
        >
          <q-item-section class="list"
            >長期分析｜Long term analysis</q-item-section
          >
        </q-item>

        <!-- <q-item
          to="/longterm"
          clickable
          v-ripple.early
          exact
          class="longterm"
          active-class="linkon-forecast"
        >
          <q-item-section class="list">智慧專家｜AI forecast</q-item-section>
        </q-item> -->

        <!-- <q-item exact class="work">
          <q-btn-dropdown
            class="dropdown"
            label="工作日誌｜Research memo"
            no-caps
            unelevated
            no-border
            square
            no-route-dismiss
          >
            <q-list
              class="text-bold q-pt-xs"
              no-border
              unelevated
              :style="{
                backgroundImage:
                  'url(' + 'https://i.imgur.com/rORuNtC.jpg' + ')',
              }"
            >
              <q-item
                to="/work/about"
                clickable
                @click="onItemClick"
                class="dropdown-list"
                active-class="linkon-dropdown-list q-ml-lg"
              >
                <q-item-section>
                  <q-item-label>關於我們｜About us</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                to="/work/research"
                clickable
                @click="onItemClick"
                class="dropdown-list"
                active-class="linkon-dropdown-list q-ml-lg"
              >
                <q-item-section>
                  <q-item-label>研究過程｜Research</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                to="/work/field"
                clickable
                @click="onItemClick"
                class="dropdown-list"
                active-class="linkon-dropdown-list q-ml-lg"
              >
                <q-item-section>
                  <q-item-label>實地考察｜Field observation</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                to="/work/interview"
                clickable
                @click="onItemClick"
                class="dropdown-list"
                active-class="linkon-dropdown-list q-ml-lg"
              >
                <q-item-section>
                  <q-item-label>採訪居民｜Interviewing</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                to="/work/learning"
                clickable
                @click="onItemClick"
                class="dropdown-list"
                active-class="linkon-dropdown-list q-ml-lg"
              >
                <q-item-section>
                  <q-item-label>學習筆記｜Learning note</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-item> -->
        <q-separator class="q-itemider" size="40px" color="transparent" />
        <q-item class="time">
          <q-item-section class="list">現在時間</q-item-section>
        </q-item>
        <q-item class="timestamp">{{ formattedStringDate }}</q-item>
        <q-item class="timestamp">{{ formattedStringTime }}</q-item>
      </q-list>
    </q-drawer>

    <q-page-container
      class="container"
      :style="{
        backgroundImage: 'url(' + 'https://i.imgur.com/rORuNtC.jpg' + ')',
      }"
    >
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { date } from "quasar";

export default {
  data() {
    return {
      timeStamp: Date.now(),
    };
  },
  computed: {
    formattedStringDate() {
      return date.formatDate(this.timeStamp, "YYYY-MM-DD");
    },
    formattedStringTime() {
      return date.formatDate(this.timeStamp, "HH:mm:ss");
    },
  },
  mounted() {
    setInterval(() => {
      this.timeStamp = Date.now();
    }, 1000);
  },
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      onItemClick() {},
    };
  },
};
</script>

<style lang="sass">
.header
    background-repeat: no-repeat
    background-size: 100% 100%
.toolbar
  margin-left: 8px
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))
.list
  font-size: 14px
  font-weight: bold
  border-bottom: 4px solid
  border-bottom-color: #A1C5D8
.instant
  padding-right: 78px
.longterm
  padding-right: 42px
.time
  padding-right: 170px
.timestamp
  font-weight: bold
  font-size: 18px
  padding-top: 11px
  margin-bottom: -16px
  margin-left: 15px
  margin-right: 25px
  background-color: white
.linkon-instant
  color: #4572B6
  transform: scale(1.1,1.1)
  font-weight: bold
  padding-left: 40px
  padding-right: 55px
.linkon-longterm
  color: #4572B6
  transform: scale(1.1,1.1)
  font-weight: bold
  padding-left: 40px
  padding-right: 20px
.linkon-work
  color: #4572B6
  transform: scale(1.1,1.1)
  font-weight: bold
  padding-left: 40px
  padding-right: 100px
.container
  background-repeat: no-repeat
  background-size: cover
  background-position: bottom center
.dropdown
  font-weight: bold
  font-size: 14px
  border-bottom: 4px solid
  border-bottom-color: #A1C5D8
  padding-left: 0px
.dropdown-list
  background-color: transparent
  font-weight: bold
.linkon-dropdown-list
  color: #4572B6
  padding-left: 0px
  border-bottom: 4px solid
  border-bottom-color: #A1C5D8
</style>
