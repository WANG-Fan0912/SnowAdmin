<script setup lang="ts">
import { isSecureEnvironment } from "@/utils/index";
interface ColorMode {
  top: string;
  center: string;
  bottom: string;
}

interface VisualizerConfig {
  barSpacing: number;
  barRoundness: number;
  barWidth: number;
  defaultHeightMultiplier: number;
  barHeightMultiplier: number;
  sensitivity: number;
  audioSource: "mic" | "local";
  mode: "sine" | "peak" | "pulse";
  colorMode: ColorMode;
}

interface AudioSourceOption {
  value: "mic" | "local";
  label: string;
}

interface AudioModeOption {
  value: "sine" | "peak" | "pulse";
  label: string;
}

type AudioVisualizerInstance = any;

// 配置
const config = ref<VisualizerConfig>({
  barSpacing: 3, // 间距
  barRoundness: 4, // 圆角
  barWidth: 8, // 柱宽
  defaultHeightMultiplier: 0.01, // 默认高度
  barHeightMultiplier: 1.0, // 振幅 0.4 ~ 2
  sensitivity: 0.5, // 灵敏度 0~1
  audioSource: "mic", // 音频源 local本地音源 mic麦克风
  mode: "sine", // 正弦波
  colorMode: {
    top: "#52B852",
    center: "#52B852",
    bottom: "#52B852"
  } // 颜色
});

const audioSource = ref<AudioSourceOption[]>([
  {
    value: "mic",
    label: "麦克风"
  },
  {
    value: "local",
    label: "本地音源"
  }
]);

const audioMode = ref<AudioModeOption[]>([
  {
    value: "sine",
    label: "正弦波"
  },
  {
    value: "peak",
    label: "峰值波"
  },
  {
    value: "pulse",
    label: "脉冲波"
  }
]);

const AudioVisualizerRef = ref<AudioVisualizerInstance | null>(null);

const onStart = () => {
  audioUrl.value = null;
  AudioVisualizerRef.value.onStart();
};

const onClose = () => {
  AudioVisualizerRef.value.onClose();
};

const onReset = () => {
  audioUrl.value = null;
  AudioVisualizerRef.value.onReset();
};

const audioUrl = ref<any>();
const onAudio = (blob: Blob) => {
  audioUrl.value = URL.createObjectURL(blob);
  console.log("音频", audioUrl);
};
</script>

<template>
  <div class="snow-page">
    <div class="snow-inner">
      <a-alert>本地录音需要https或localhost安全环境，是否为安全环境：{{ isSecureEnvironment() }}</a-alert>
      <a-space direction="vertical" fill>
        <div class="audio-box">
          <AudioVisualizer ref="AudioVisualizerRef" v-model="config" @audio="onAudio" />
        </div>
        <a-space direction="vertical" fill>
          <a-grid :cols="3" :colGap="12" :rowGap="12">
            <a-grid-item class="demo-item">
              <a-card title="波形设置">
                <a-space direction="vertical" fill>
                  <a-space direction="vertical" fill>
                    <div>柱间距（{{ config.barSpacing }}px）</div>
                    <a-slider :step="1" :min="0" :max="10" v-model="config.barSpacing" />
                  </a-space>
                  <a-space direction="vertical" fill>
                    <div>圆角半径（{{ config.barRoundness }}px）</div>
                    <a-slider :step="1" :min="0" :max="12" v-model="config.barRoundness" />
                  </a-space>
                  <a-space direction="vertical" fill>
                    <div>柱宽（{{ config.barWidth }}px）</div>
                    <a-slider :step="1" :min="2" :max="20" v-model="config.barWidth" />
                  </a-space>
                  <a-space direction="vertical" fill>
                    <div>默认高度（{{ parseInt(String(config.defaultHeightMultiplier * 100)) }}%）</div>
                    <a-slider :step="0.01" :min="0" :max="0.5" v-model="config.defaultHeightMultiplier" />
                  </a-space>
                </a-space>
              </a-card>
            </a-grid-item>
            <a-grid-item class="demo-item">
              <a-card title="外观设置">
                <a-space direction="vertical" fill>
                  <a-space direction="vertical" fill>
                    <div>振幅（{{ parseInt(String(config.barHeightMultiplier * 100)) }}%）</div>
                    <a-slider :step="0.1" :min="0.4" :max="2" v-model="config.barHeightMultiplier" />
                  </a-space>
                  <a-space direction="vertical" fill>
                    <div>颜色模式</div>
                    <a-space>
                      上
                      <a-color-picker v-model="config.colorMode.top" show-text disabled-alpha size="mini" />
                      中
                      <a-color-picker v-model="config.colorMode.center" show-text disabled-alpha size="mini" />
                      下
                      <a-color-picker v-model="config.colorMode.bottom" show-text disabled-alpha size="mini" />
                    </a-space>
                  </a-space>
                  <a-space direction="vertical" fill>
                    <div>灵敏度（{{ parseInt(String(config.sensitivity * 100)) }}%）</div>
                    <a-slider :step="0.1" :min="0.2" :max="1" v-model="config.sensitivity" />
                  </a-space>
                </a-space>
              </a-card>
            </a-grid-item>
            <a-grid-item class="demo-item">
              <a-card title="音频源">
                <a-space direction="vertical" fill>
                  <a-space direction="vertical" fill>
                    <div>选择音频源</div>
                    <a-select placeholder="请选择" v-model="config.audioSource">
                      <a-option v-for="item of audioSource" :key="item.value" :value="item.value" :label="item.label">{{
                        item.label
                      }}</a-option>
                    </a-select>
                  </a-space>
                  <a-space direction="vertical" fill>
                    <div>波形</div>
                    <a-select placeholder="请选择" v-model="config.mode">
                      <a-option v-for="item of audioMode" :key="item.value" :value="item.value" :label="item.label">{{
                        item.label
                      }}</a-option>
                    </a-select>
                  </a-space>
                </a-space>
              </a-card>
            </a-grid-item>
          </a-grid>
          <a-divider />
          <audio v-if="audioUrl" :src="audioUrl" controls autoplay style="width: 100%" />
          <div class="flex-center">
            <a-space>
              <a-button type="primary" @click="onStart">开始</a-button>
              <a-button type="primary" @click="onClose">结束</a-button>
              <a-button @click="onReset">重置</a-button>
            </a-space>
          </div>
        </a-space>
      </a-space>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.audio-box {
  width: 100%;
  height: 200px;
}
</style>
