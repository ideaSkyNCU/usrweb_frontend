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
            <strong>學習筆記</strong>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "LearningNote",
});
</script>
