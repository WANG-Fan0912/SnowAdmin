<template>
  <div class="dc-page">
    <p>{{ $t(`language.switch-language-to-preview`) }}</p>
    <br />
    <div>
      <a-date-picker style="width: 200px" />
    </div>
    <br />
    <div>
      <a-time-picker type="time-range" style="width: 252px" />
    </div>
    <br />
    <div>
      <a-range-picker
        style="width: 360px"
        show-time
        :time-picker-props="{ defaultValue: ['00:00:00', '09:09:06'] }"
        format="YYYY-MM-DD HH:mm"
      />
    </div>
    <br />
    <div>
      <a-pagination :total="50" show-total show-jumper show-page-size />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
