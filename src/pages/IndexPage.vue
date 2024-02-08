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
      </q-item>
    </q-list>
    <div class="example-col-gutter-vertical text-bold">
      <div class="row q-col-gutter-y-none">
        <q-item
          v-for="title in titleList"
          :key="title.id"
          @click="navigateToTitle(title.id, title.name, title.number)"
          clickable
          class="col-4 my-content"
        >
          {{ title.id }}.{{ title.name }}({{ title.number }})
        </q-item>
      </div>
    </div>
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
            <strong
              >熱點地圖｜Map
              (若無熱點顯示，請稍等片刻；若為灰色，則為無資料)</strong
            >
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
import { defineComponent, onMounted } from "vue";
import "leaflet/dist/leaflet.css";
import { useRouter } from "vue-router";
import { titleList } from "src/pages/data.js";
import { initializeMapAndLocator } from "src/pages/LeafletMapInstant.js";

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      pm25Value: null,
      colorBarStops: [0, 15.5, 35.5, 54.5, 150.5, 250.5],
    };
  },
  setup() {
    const router = useRouter();

    onMounted(() => {
      initializeMapAndLocator(titleList.value);
    });

    const navigateToTitle = (titleId, titleName, titleNumber) => {
      router.push({
        name: "InstantPage",
        params: { id: titleId, name: titleName, number: titleNumber },
      });
    };

    return { titleList, navigateToTitle };
  },

  mounted() {
    this.fetchMessages(this.$route.params.number);
    setInterval(() => this.fetchMessages(this.$route.params.number), 30000);
  },
  methods: {
    fetchMessages(number) {
      fetch(`http://localhost:5000/`)
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
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
    },
  },
});
</script>

<style lang="sass" scoped>
.my-content
  padding-top: 12px
  margin-bottom: -11px
  background: transparent
  border-color: transparent
.leaflet-map
  height: 400px
</style>
