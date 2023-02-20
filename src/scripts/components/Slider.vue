<template>
  <label class="toggle">
    <input type="checkbox" :checked="computedValue" @change="computedValue = !computedValue" />
    <span class="slider"></span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  name: 'SliderComponent',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedValue: {
      get(): boolean {
        return this.modelValue;
      },
      set(val: boolean) {
        this.$emit('update:modelValue', val);
      },
    },
  },
  emits: ['update:modelValue'],
});
</script>

<style lang="scss" scoped>
.toggle {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  .label {
    margin-right: 12px;
  }

  input {
    display: none;

    &:checked {
      + .slider {
        background-color: #4caf50;
      }
      + .slider:before {
        transform: translateX(26px);
      }
    }
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 34px;

    &:before {
      position: absolute;
      content: '';
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: 0.4s;
      border-radius: 50%;
    }
  }
}
</style>
