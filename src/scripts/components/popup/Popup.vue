<template>
  <div id="popup">
    <Container>
      <h1>Video Length Hider</h1>

      <Slider id="activated" v-model="activated" />

      <a href="#" @click="goToSettings">Go to settings</a>
    </Container>
  </div>
</template>

<script lang="ts">
import Container from '../Container.vue';
import Slider from '../Slider.vue';
import * as Settings from '../../utilities/settings';
import * as Options from '../../utilities/options';
import { defineComponent } from '@vue/runtime-core';
import Browser from 'webextension-polyfill';

export default defineComponent({
  name: 'PopupApp',
  components: { Container, Slider },
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
});

interface Data {
  activated: boolean;
  optionsURL: string;
}
</script>

<style lang="scss" scoped></style>
