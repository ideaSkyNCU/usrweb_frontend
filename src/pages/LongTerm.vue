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
          class="col-4 my-content2"
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
            <strong>地圖｜Map</strong>
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
import { initializeMapAndLocator } from "src/pages/LeafletMapLongterm.js";

export default defineComponent({
  name: "LongTerm",
  setup() {
    const router = useRouter();

    onMounted(() => {
      initializeMapAndLocator(titleList.value);
    });

    const navigateToTitle = (titleId, titleName, titleNumber) => {
      router.push({
        name: "LongtermPicture",
        params: { id: titleId, name: titleName, number: titleNumber },
      });
    };

    return { titleList, navigateToTitle };
  },
});
</script>

<style lang="sass">
.item
  border-bottom: 4px solid
  border-bottom-color: #A1C5D8
.my-content2
  padding-top: 12px
  margin-bottom: -11px
  background: transparent
  border-color: transparent
</style>
