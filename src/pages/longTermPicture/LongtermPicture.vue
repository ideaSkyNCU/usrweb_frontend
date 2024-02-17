<template>
  <q-page>
    <q-list separator>
      <q-item>
        <q-item-section avatar top>
          <q-avatar square size="md" class="q-mt-sm">
            <img src="https://i.imgur.com/ERQf7FQ.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-subtitleText1 q-mt-md">
            <strong>地點｜Locations</strong>
          </q-item-label>
        </q-item-section>

        <q-btn
          flat
          color="blue"
          :icon="matArrowBack"
          label="返回上一頁"
          @click="$router.go(-1)"
          style="font-weight: bold"
        />
      </q-item>

      <q-separator class="q-itemider" size="5px" color="transparent" />

      <div style="max-width: 320px">
        <q-list separator class="title3 text-bold q-ml-md">
          <q-item>
            <q-item-section>
              {{ $route.params.id }}.{{ $route.params.name }}({{
                $route.params.number
              }})
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-list>

    <q-list separator class="q-mt-md q-ml-md">
      <div>
        <q-btn
          flat
          label="PM濃度歷年月平均"
          @click="togglePictures('PM')"
          v-ripple.early
          class="q-btn-transparent"
          :class="{ linkon: activeSet === 'PM' }"
          :style="{
            backgroundImage: 'url(' + 'https://i.imgur.com/rORuNtC.jpg' + ')',
          }"
        />
        <q-btn
          flat
          label="溫度/濕度歷年月平均"
          @click="togglePictures('T_RH')"
          v-ripple.early
          class="q-btn-transparent"
          :class="{ linkon: activeSet === 'T_RH' }"
          :style="{
            backgroundImage: 'url(' + 'https://i.imgur.com/rORuNtC.jpg' + ')',
          }"
        />
      </div>
    </q-list>
    <q-list class="folder q-ml-md">
      <q-separator class="q-itemider" size="10px" color="transparent" />

      <div v-for="(type, index) in getActiveSet()" :key="index">
        <q-separator class="q-itemider" size="10px" color="transparent" />
        <div style="max-width: 320px">
          <q-list separator class="top-title text-bold">
            <q-item>
              <q-item-section class="picture-title">{{
                getAnalysisTitle(type)
              }}</q-item-section>
            </q-item>
          </q-list>
        </div>
        <div>
          <q-list style="width: 83%" class="q-ml-md q-mr-xl">
            <q-img :src="getAnalysisImageUrl(type)" spinner-color="white" />
          </q-list>
        </div>
      </div>

      <q-separator class="q-itemider" size="10px" color="transparent" />

      <!-- <div style="max-width: 100px">
        <q-list separator class="top-title text-bold">
          <q-item>
            <q-item-section class="picture-title">簡易說明</q-item-section>
          </q-item>
        </q-list>
      </div> -->
      <div>
        <q-list class="q-ml-md q-mr-lg"> </q-list>
      </div>
    </q-list>
    <q-separator class="q-itemider" size="25px" color="transparent" />

    <q-list>
      <q-item>
        <q-item-section avatar top>
          <q-avatar square size="md" class="q-mt-sm">
            <img src="https://i.imgur.com/ERQf7FQ.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-subtitleText1 q-mt-md">
            <strong>地圖｜Map</strong>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-separator class="q-itemider" size="15px" color="transparent" />

    <div>
      <q-list style="width: 83%" class="q-ml-md q-mr-xl q-pr-md">
        <div id="leaflet-map" style="width: 100%; height: 400px"></div>
      </q-list>
    </div>

    <q-separator class="q-itemider" size="50px" color="transparent" />
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import "leaflet/dist/leaflet.css";
import { initializeMapAndLocator } from "src/pages/LeafletMapLongterm.js";
import { titleList } from "src/pages/data.js";
import { matArrowBack } from "@quasar/extras/material-icons";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "LongTermPicture",
  setup() {
    const route = useRoute();

    const id = route.params.id;
    const number = route.params.number;

    const activeSet = ref("PM");

    const togglePictures = (set) => {
      activeSet.value = set;
    };

    const getActiveSet = () => {
      return activeSet.value === "PM" ? ["PM2_5", "PM1", "PM10"] : ["RH", "T"];
    };

    const getAnalysisTitle = (type) => {
      const titles = {
        PM2_5: "PM2.5",
        PM1: "PM1",
        PM10: "PM10",
        RH: "濕度",
        T: "溫度",
      };
      return `${titles[type]}(2020/01~2023/07歷年月平均)`;
    };

    const getAnalysisImageUrl = (type) =>
      require(`src/assets/longterm/${type}/${number}.png`);
    onMounted(() => {
      initializeMapAndLocator(titleList.value);
    });

    return {
      titleList,
      matArrowBack,
      activeSet,
      togglePictures,
      getActiveSet,
      getAnalysisTitle,
      getAnalysisImageUrl,
    };
  },
});
</script>

<style lang="sass">
.title3
  font-size: 17px
  border-left: 4px solid
  border-left-color: #7CA4E1
  background: #BCDAE0
.content
  font-size: 15px
  padding: 5px 0px
.picture-title
  font-size: 15px
  border-bottom: 4px solid
  border-bottom-color: #A1C5D8
.q-btn-transparent
  color: gray
  box-shadow: 0 -4px 4px rgba(0, 0, 0, 0.1)
  border-left: 2px solid rgba(0, 0, 0, 0.1)
  font-weight: bold
  transition: margin-bottom 0.3s, padding-bottom 0.3s
.linkon
  color: #4572B6
  font-weight: bold
  border-left-color: tranparent
  margin-bottom: -4px
  padding-bottom: 12px
.folder
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1)
  border: 2px solid rgba(0, 0, 0, 0.1)
  margin-right: 50px
  padding-right: -50px
  padding-top: 5px
  padding-left: 50px
</style>
