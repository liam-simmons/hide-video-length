<template>
  <div id="popup">
    <h1>Video Length Hider</h1>

    <div class="field-wrapper slider-wrapper">
      <div class="label slider-label">Active</div>

      <Slider id="activated" v-model="activated" />
    </div>

    <div>
      <a href="#" @click="goToSettings">Go to settings</a>
    </div>
  </div>
</template>

<script lang="ts">
import Slider from '../Slider.vue';
import * as Settings from '../../utilities/settings';
import * as Options from '../../utilities/options';
import { defineComponent } from '@vue/runtime-core';
import Browser from 'webextension-polyfill';

export default defineComponent({
  name: 'PopupApp',
  components: { Slider },
  data(): Data {
    return { activated: false, optionsURL: Options.getURL() };
  },
  async mounted() {
    this.activated = (await Settings.get('activated')) || false;
  },
  methods: {
    submit() {
      Settings.set('activated', this.activated);
    },
    goToSettings() {
      Browser.tabs.create({ url: Options.getURL() });
    },
  },
  watch: {
    activated(newValue, oldValue) {
      if (newValue !== Settings.get('activated')) {
        Settings.set('activated', !!newValue);
      }
    },
  },
});

interface Data {
  activated: boolean;
  optionsURL: string;
}
</script>

<style lang="scss" scoped>
#popup {
  background-color: #f5f5f5;
  padding: 16px;
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 24px;
    margin-bottom: 16px;
  }

  .slider-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }

  .label {
    margin-right: 8px;
    font-weight: bold;
  }

  .settings-link {
    margin-top: 16px;
    text-align: center;
  }
}
</style>
