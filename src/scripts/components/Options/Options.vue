<template>
  <div id="options">
    <Container max-size="sm">
      <h1>Options</h1>

      <div class="field-wrapper slider-wrapper">
        <div class="label slider-label">Active</div>

        <Slider id="activated" v-model="activated" />
      </div>

      <div class="field-wrapper">
        <div class="label above">YouTube Channel Names</div>
        <textarea id="youtube-channel-names" v-model="youtubeChannelNames"></textarea>
      </div>

      <div class="field-wrapper">
        <div class="label above">YouTube Video Title Search</div>
        <textarea id="youtube-video-titles" v-model="youtubeVideoTitles"></textarea>
      </div>

      <div class="field-wrapper">
        <input id="submit" type="button" @click="submit" value="Save" />
      </div>
    </Container>
  </div>
</template>

<script lang="ts">
import Container from '../Container.vue';
import Slider from '../Slider.vue';
import * as Settings from '../../utilities/settings';
import { defineComponent } from '@vue/runtime-core';
import { zParse } from '../../types/zod';
import { z } from 'zod';

export default defineComponent({
  name: 'OptionsApp',
  components: { Container, Slider },
  data(): Data {
    return { activated: false, youtubeChannelNames: '', youtubeVideoTitles: '' };
  },
  async mounted() {
    this.activated = !!(await Settings.get('activated'));
    this.youtubeChannelNames = zParse(z.string(), await Settings.get('youtubeChannelNames')) || '';
    this.youtubeVideoTitles = zParse(z.string(), await Settings.get('youtubeVideoTitles')) || '';
  },
  methods: {
    submit() {
      Settings.set('activated', this.activated);
      Settings.set('youtubeChannelNames', this.youtubeChannelNames);
      Settings.set('youtubeVideoTitles', this.youtubeVideoTitles);
    },
  },
});

interface Data {
  activated: boolean;
  youtubeChannelNames: string;
  youtubeVideoTitles: string;
}
</script>

<style lang="scss" scoped>
#options {
  margin-top: 50px;

  h1 {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 30px;
    text-align: center;
    text-transform: uppercase;
  }

  .slider-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .field-wrapper {
    .label {
      font-size: 18px;
      font-weight: 500;

      &.above {
        margin-bottom: 10px;
      }
    }

    &:not(:first-of-type) {
      margin-top: 15px;
    }
  }

  textarea {
    border: 2px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
    padding: 10px;
    resize: none;
    width: 100%;
    min-height: 200px;
  }

  #submit {
    background-color: #4caf50;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    font-size: 16px;
    margin-bottom: 30px;
    padding: 10px;
    width: 100%;
    transition: all 0.2s ease-in-out;

    &:active,
    &:hover,
    &:focus {
      background-color: #3e8e41;
    }
  }
}
</style>
