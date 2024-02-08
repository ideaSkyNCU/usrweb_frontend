<template>
  <q-page>
    <q-list separator>
      <q-item>
        <q-item-section avatar top>
          <q-avatar square size="md" class="q-mt-sm">
            <img src="https://i.imgur.com/YuRavQA.jpg" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-subtitleText1 q-mt-md">
            <strong>實地考察</strong>
          </q-item-label>
        </q-item-section>
      </q-item>
      <div style="max-width: 320px">
        <q-list separator class="top-title text-bold">
          <q-item>
            <q-item-section>4/10 實地考察紀錄：</q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-list>
    <div>
      <q-carousel
        animated
        v-model="slide"
        arrows
        navigation
        infinite
        height="700px"
        class="q-ml-md q-mr-lg"
      >
        <q-carousel-slide :name="1" img-src="https://i.imgur.com/WznVWVQ.jpg" />
        <q-carousel-slide :name="2" img-src="https://i.imgur.com/eUBxhIr.jpg" />
        <q-carousel-slide :name="3" img-src="https://i.imgur.com/t3tSMoo.jpg" />
        <q-carousel-slide :name="4" img-src="https://i.imgur.com/fAX8OFL.jpg" />
        <q-carousel-slide :name="5" img-src="https://i.imgur.com/PWo3r62.jpg" />
        <q-carousel-slide :name="6" img-src="https://i.imgur.com/ZWsyKPF.jpg" />
      </q-carousel>

      <q-list separator class="top-title text-bold">
        <q-item>
          <q-item-section class="picture-title">沿路拍攝街道</q-item-section>
        </q-item>
      </q-list>

      <q-separator class="q-itemider" size="40px" color="transparent" />
      <q-list class="q-ml-md q-mr-lg">
        <q-img src="https://i.imgur.com/TkG1EB5.jpg" spinner-color="white" />
      </q-list>
      <q-list separator class="top-title text-bold">
        <q-item>
          <q-item-section class="picture-title">沿路拍攝街道</q-item-section>
        </q-item>
      </q-list>
      <q-separator class="q-itemider" size="40px" color="transparent" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";

export default defineComponent({
  name: "FieldObservation",
  setup() {
    return {
      slide: ref(1),
    };
  },
});
</script>

<style lang="sass">
.top-title
  font-size: 16px
  margin-bottom: 8px
.picture-title
  margin-top: -8px
  padding-left: 5px
  margin-right: 8px
  background-color: #BCDAE0
</style>
