<template>
  <div class="snow-page">
    <a-space direction="vertical">
      <a-typography id="myTypography" :style="{ marginTop: '-40px' }">
        <a-typography-title :heading="2">ArcoDesign</a-typography-title>
        <a-typography-paragraph>
          The ArcoDesign component library defines a set of default particle variables, and a custom theme is to
          <a-typography-text mark>customize</a-typography-text> and
          <a-typography-text underline>overwrite</a-typography-text> this variable list.
        </a-typography-paragraph>
        <a-typography-paragraph blockquote>
          A design is a plan or specification for the construction of an object or system or for the implementation of an activity
          or process, or the result of that plan or specification in the form of a
          <a-typography-text code>prototype</a-typography-text>, <a-typography-text code>product</a-typography-text> or
          <a-typography-text code>process</a-typography-text>. The verb to design expresses the process of developing a design.
        </a-typography-paragraph>
        <a-typography-paragraph mark underline delete>
          A design is a plan or specification for the construction of an object or system or for the implementation of an activity
          or process.
        </a-typography-paragraph>
        <a-typography-paragraph>
          <ul>
            <li>
              Architectural blueprints
              <ul>
                <li>Architectural blueprints</li>
              </ul>
            </li>
            <li>Engineering drawings</li>
            <li>Business processes</li>
          </ul>
        </a-typography-paragraph>
        <a-typography-paragraph>
          <ol>
            <li>Architectural blueprints</li>
            <li>Engineering drawings</li>
            <li>Business processes</li>
          </ol>
        </a-typography-paragraph>
      </a-typography>
      <a-button type="primary" @click="onPrint">打印</a-button>
      <div>采用开源打印库：<a-link href="https://printjs.crabbly.com/" target="_blank">printjs</a-link></div>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import print from "print-js";

const onPrint = () => {
  print("myTypography", "html");
};
</script>

<style lang="scss" scoped>
.title {
  font-size: $font-size-title-5;
}
</style>
