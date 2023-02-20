<template>
  <div :class="`container${maxSize ? `-${maxSize}` : ''}`">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  name: 'ContainerComponent',
  props: {
    maxSize: {
      type: String,
      default: '',
    },
  },
});
</script>

<style scoped lang="scss">
@mixin min($bp, $max: 'null', $device: 'screen') {
  @if $max == 'null' {
    @media only #{$device} and (min-width: #{$bp}) {
      @content;
    }
  } @else {
    @media only #{$device} and (min-width: #{$bp}) and (max-width: #{$max}) {
      @content;
    }
  }
}

@function bp($bp) {
  @return map-get($breakpoints, $bp);
}

$breakpoints: (
  na: 0px,
  // For BS grid
  xs: 320px,
  // Smartphone
  sm: 600px,
  // Tablets
  md: 900px,
  // Tablets Landscape and small desktops
  lg: 1200px,
  // Desktops
  xl: 1800px,
  // Large Desktop,,,,,,
);

@function container($container-size, $true-val: false) {
  @return map-get($container-sizes, $container-size);
}

$container-sizes: (
  sm: map-get($breakpoints, sm) - 30px,
  md: map-get($breakpoints, md) - 40px,
  lg: map-get($breakpoints, lg) - 50px,
  xl: map-get($breakpoints, xl) - 400px,
);

.container {
  margin: 0 auto;
  padding-right: 1rem;
  padding-left: 1rem;
  width: 100%;
  max-width: calc(100% - 2rem);

  &:not(.is-fluid) {
    margin: 0 auto;

    @each $bp, $container-size in $container-sizes {
      @include min(#{bp(#{$bp})}) {
        width: 100%;
        max-width: container(#{$bp});
      }
    }
  }
}

@each $bp, $container-size in $container-sizes {
  .container-#{$bp} {
    margin: 0 auto;
    padding-right: 1rem;
    padding-left: 1rem;

    $i: index($container-sizes, $bp $container-size);
    $done: false;

    @for $j from $i through length($container-sizes) {
      //@if bp(nth(nth($container-sizes, $j), 1)) == $bp {
      @if bp(nth(nth($container-sizes, $j), 1)) <= bp($bp) {
        @include min(#{bp(nth(nth($container-sizes, $j), 1))}) {
          max-width: container(#{nth(nth($container-sizes, $j), 1)});
        }
      }
    }
  }
}
</style>
