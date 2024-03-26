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
        <q-btn flat color="blue" :icon="matArrowBack" label="返回上一頁" @click="$router.go(-1)" style="font-weight: bold" />
      </q-item>

      <q-separator class="q-itemider" size="5px" color="transparent" />

      <div style="max-width: 330px">
        <q-list separator class="title text-bold q-ml-md">
          <q-item>
            <q-item-section>{{ $route.params.id }}. {{ $route.params.name }}({{
              $route.params.number
            }})</q-item-section>
          </q-item>
        </q-list>
      </div>
      <q-separator class="q-itemider" size="10px" color="transparent" />
      <div>
        <strong v-if="showSpinner" class="q-flex"><q-icon name="hourglass_empty" size="sm"
            class="q-ml-xl" />資料讀取需要一點時間，請稍等片刻...
        </strong>
      </div>
    </q-list>

    <div class="q-pa-md example-col-gutter-horizontal">
      <div class="row q-col-gutter-x-lg">
        <div class="col-3">
          <div class="content text-bold">溫度(℃)</div>
          <q-card square flat class="mqtt-place q-pa-xl">
            <q-card-section v-if="temperatureValue !== null">{{
              temperatureValue
            }}</q-card-section>
            <q-card-section v-else>
              <q-spinner />
            </q-card-section>
          </q-card>
        </div>
        <div class="col-3">
          <div class="content text-bold">濕度(%)</div>
          <q-card square flat class="mqtt-place q-pa-xl">
            <q-card-section v-if="humidityValue !== null">{{
              humidityValue
            }}</q-card-section>
            <q-card-section v-else>
              <q-spinner />
            </q-card-section>
          </q-card>
        </div>
        <div class="col-3">
          <div class="content text-bold">PM2.5濃度(μg/m3)</div>
          <q-card square flat class="mqtt-place q-pa-xl">
            <q-card-section v-if="pm25Value !== null">{{
              pm25Value
            }}</q-card-section>
            <q-card-section v-else>
              <q-spinner />
            </q-card-section>
          </q-card>
        </div>
        <div class="col-3">
          <div class="content text-bold">VOC(ppb)</div>
          <q-card square flat class="mqtt-place q-pa-xl">
            <q-card-section v-if="pm25Value !== null">{{
              vocValue
            }}</q-card-section>
            <q-card-section v-else>
              <q-spinner v-if="showSpinner" />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <!-- <q-separator class="q-itemider" size="25px" color="transparent" /> -->
    <q-list>
      <q-item>
        <q-item-section avatar top>
          <q-avatar square size="md" class="q-mt-sm">
            <img src="https://i.imgur.com/ERQf7FQ.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-subtitleText1 q-mt-md">
            <strong>熱點地圖｜Map
              (若無熱點顯示，請稍等片刻；若為灰色，則為無資料)</strong>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-separator class="q-itemider" size="15px" color="transparent" />
    <div>
      <q-list class="q-ml-md q-mr-xl q-pr-md">
        <div id="leaflet-map" style="width: 100%; height: 400px"></div>
      </q-list>
    </div>
    <q-separator class="q-itemider" size="50px" color="transparent" />
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import "leaflet/dist/leaflet.css";
import { initializeMapAndLocator } from "src/pages/LeafletMapInstant.js";
import { titleList } from "src/pages/data.js";
import { matArrowBack } from "@quasar/extras/material-icons";

export default defineComponent({
  name: "InstantPage",
  data() {
    return {
      pm25Value: null,
      temperatureValue: null,
      humidityValue: null,
      vocValue: null,
      colorBarStops: [0, 15.5, 35.5, 54.5, 150.5, 250.5],
      showSpinner: true,
    };
  },
  setup() {
    onMounted(() => {
      initializeMapAndLocator(titleList.value);
    });
    return { titleList, matArrowBack };
  },
  mounted() {
    this.fetchMessages(this.$route.params.number);
    setInterval(() => this.fetchMessages(this.$route.params.number), 1000);
  },
  methods: {
    fetchMessages(number) {
      this.isLocationLoading = true;
      let url = process.env.VUE_APP_DEV_API_URL;
      if (process.env.NODE_ENV === 'producrion') {
        url = process.env.VUE_APP_PRO_API_URL
      }
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const pm25Messages = data.filter(
            (message) =>
              message.topic ===
              `/v1/project/1147/device/${number}/sensor/pm2_5/rawdata`
          );
          if (pm25Messages.length > 0) {
            const latestPayload = JSON.parse(
              pm25Messages[pm25Messages.length - 1].payload
            );
            const latestValue = latestPayload.value[0];
            this.pm25Value = parseFloat(latestValue).toFixed(1);
          } else {
            this.pm25Value = null;
          }

          const temperatureMessages = data.filter(
            (message) =>
              message.topic ===
              `/v1/project/1147/device/${number}/sensor/temperature/rawdata`
          );
          if (temperatureMessages.length > 0) {
            const latestPayload = JSON.parse(
              temperatureMessages[temperatureMessages.length - 1].payload
            );
            const latestValue = latestPayload.value[0];
            this.temperatureValue = parseFloat(latestValue).toFixed(1);
          } else {
            this.temperatureValue = null;
          }

          const humidityMessages = data.filter(
            (message) =>
              message.topic ===
              `/v1/project/1147/device/${number}/sensor/humidity/rawdata`
          );
          if (humidityMessages.length > 0) {
            const latestPayload = JSON.parse(
              humidityMessages[humidityMessages.length - 1].payload
            );
            const latestValue = latestPayload.value[0];
            this.humidityValue = parseFloat(latestValue).toFixed(0);
          } else {
            this.humidityValue = null;
          }

          const vocMessages = data.filter(
            (message) =>
              message.topic ===
              `/v1/project/1147/device/${number}/sensor/voc/rawdata`
          );
          if (vocMessages.length > 0) {
            const latestPayload = JSON.parse(
              vocMessages[vocMessages.length - 1].payload
            );
            const latestValue = latestPayload.value[0];
            this.vocValue = parseFloat(latestValue).toFixed(0);
          } else {
            this.vocValue = null;
          }

          const hasData =
            this.pm25Value !== null ||
            this.temperatureValue !== null ||
            this.humidityValue !== null ||
            this.vocValue !== null;

          if (hasData) {
            this.showSpinner = false; // Hide spinner if there's data
          }
        })

        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
    },
  },
});
</script>

<style lang="sass">
.title
  font-size: 17px
  border-left: 4px solid
  border-left-color: #7CA4E1
  background: #BCDAE0
.content
  font-size: 15px
  padding: 5px 0px
.mqtt-place
  font-size: 35px
  border-top: 4px solid
  border-top-color: #A1C5D8
  background: white
  text-align: center
  display: flex
  justify-content: center
  align-items: center
</style>
