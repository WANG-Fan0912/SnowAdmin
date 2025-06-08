<template>
  <div class="container" ref="container">
    <canvas id="visualizer" ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
const config = defineModel({
  type: Object,
  default: () => ({
    barSpacing: 3, // 间距
    barRoundness: 4, // 圆角
    barWidth: 8, // 柱宽
    defaultHeightMultiplier: 0.01, // 默认高度
    barHeightMultiplier: 1.0, // 振幅 0.4 ~ 2
    sensitivity: 0.5, // 灵敏度 0~1
    audioSource: "local", // 音频源 mic麦克风 local本地音源
    mode: "sine", // sine正弦波 peak峰值波 pulse脉冲波
    colorMode: {
      top: "#52B852",
      center: "#52B852",
      bottom: "#52B852"
    } // 颜色
  })
});

const emit = defineEmits(["audio"]);

interface LocalConfig {
  isAnimating: boolean;
  animationId: number | null;
  audioContext: AudioContext | null;
  analyser: AnalyserNode | null;
  mediaStream: MediaStream | null;
  mediaRecorder: MediaRecorder | null;
  recordedChunks: Blob[];
}

const localConfig = ref<LocalConfig>({
  isAnimating: false, // 是否动画开启中
  animationId: null, // requestAnimationFrame的id
  audioContext: null, // 音频上下文
  analyser: null, // 音频解析器
  mediaStream: null, // 保存从getUserMedia获取的媒体流
  mediaRecorder: null, // 媒体录制器
  recordedChunks: [] // 录制的音频数据块
});

const container = ref<HTMLDivElement | null>();
const canvas = ref<HTMLCanvasElement | null>();
const ctx = ref<CanvasRenderingContext2D | null>();

// 设置canvas大小为容器大小
const resizeCanvas = () => {
  if (canvas.value && container.value) {
    canvas.value.width = container.value.offsetWidth;
    canvas.value.height = container.value.offsetHeight;
  }
};

const onReset = () => {
  onClose();
  config.value = {
    barSpacing: 3,
    barRoundness: 4,
    barWidth: 8,
    defaultHeightMultiplier: 0.01,
    barHeightMultiplier: 1.0,
    sensitivity: 0.5,
    audioSource: "mic",
    mode: "sine",
    colorMode: {
      top: "#52B852",
      center: "#52B852",
      bottom: "#52B852"
    }
  };
  localConfig.value = {
    isAnimating: false,
    animationId: null,
    audioContext: null,
    analyser: null,
    mediaStream: null,
    mediaRecorder: null,
    recordedChunks: []
  };
  // 清除 canvas 画布
  if (canvas.value && ctx.value) {
    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
  }
  init();
};

// 创建对称柱状音频可视化
const drawBars = (dataArray: any, barCount: any) => {
  if (!ctx.value || !canvas.value) {
    console.warn("Canvas context or canvas element is not available.");
    return;
  }

  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);

  // 计算可以容纳的柱数
  const totalBarWidth = config.value.barWidth + config.value.barSpacing;
  barCount = Math.min(barCount, Math.floor(canvas.value.width / totalBarWidth));

  const centerX = canvas.value.width / 2;
  const centerY = canvas.value.height / 2;
  const halfBarCount = Math.floor(barCount / 2);
  const colorMode = config.value.colorMode;

  // 计算默认高度（容器高度 * multiplier）
  const defaultMinHeight = canvas.value.height * config.value.defaultHeightMultiplier;

  // 创建从中心向两边展开的柱子
  for (let i = 0; i < barCount; i++) {
    const barIndex = i < halfBarCount ? halfBarCount - i - 1 : i - halfBarCount;
    let value = dataArray[barIndex] / 256;

    // 应用灵敏度调整
    let barHeight =
      Math.pow(value, 1 + (1 - config.value.sensitivity) * 2) * canvas.value.height * config.value.barHeightMultiplier * 0.6;

    // 应用最小高度（默认高度）
    barHeight = Math.max(barHeight, defaultMinHeight);

    // 从中心向两边高度递减效果
    const distanceFromCenter = Math.abs(i - halfBarCount);
    barHeight = barHeight * (1 - (0.4 * distanceFromCenter) / halfBarCount);

    // 跳过太矮的柱子
    if (barHeight < 1) continue;

    const barWidth = config.value.barWidth;
    const barRoundness = Math.min(config.value.barRoundness, barHeight / 2);

    // 从中心开始的位置计算
    const x = centerX - halfBarCount * totalBarWidth + i * totalBarWidth;

    // 柱子顶部位置（从中心向上延伸）
    const topY = centerY - barHeight / 2;

    // 创建渐变颜色（能量越大中间越亮）
    const gradient = ctx.value.createLinearGradient(x, topY, x, topY + barHeight);
    gradient.addColorStop(0, colorMode.top);
    gradient.addColorStop(0.5, colorMode.center);
    gradient.addColorStop(1, colorMode.bottom);

    // 绘制对称柱体
    ctx.value.fillStyle = gradient;

    if (barRoundness > 0) {
      // 绘制圆角矩形（对称）
      const r = barRoundness;
      ctx.value.beginPath();
      ctx.value.moveTo(x + r, topY);
      ctx.value.lineTo(x + barWidth - r, topY);
      ctx.value.arcTo(x + barWidth, topY, x + barWidth, topY + r, r);
      ctx.value.lineTo(x + barWidth, topY + barHeight - r);
      ctx.value.arcTo(x + barWidth, topY + barHeight, x + barWidth - r, topY + barHeight, r);
      ctx.value.lineTo(x + r, topY + barHeight);
      ctx.value.arcTo(x, topY + barHeight, x, topY + barHeight - r, r);
      ctx.value.lineTo(x, topY + r);
      ctx.value.arcTo(x, topY, x + r, topY, r);
      ctx.value.closePath();
      ctx.value.fill();
    } else {
      // 直接绘制矩形
      ctx.value.fillRect(x, topY, barWidth, barHeight);
    }
  }
};

// 生成正弦波测试数据
const generateSineData = () => {
  const data = [];
  const barsCount = 128;
  const time = Date.now() * 0.002;

  for (let i = 0; i < barsCount; i++) {
    // 正弦波基础 + 噪声 + 峰值
    let value = Math.sin(i * 0.2 + time);
    value += Math.sin(i * 0.1 + time * 0.5) * 0.3;
    value += Math.sin(i * 0.05 + time * 0.2) * 0.2;
    value += Math.random() * 0.1;

    // 转换到0-255范围
    const normalized = (value + 2) * 40; // 缩放值
    data.push(Math.min(255, Math.max(0, normalized)));
  }

  return data;
};

// 生成峰值波测试数据
const generatePeakData = () => {
  const data = [];
  const barsCount = 128;
  const time = Date.now() * 0.001;
  const beat = Math.sin(time * 2) > 0.8 ? Math.sin(time * 30) * 0.3 + 0.7 : 0;

  for (let i = 0; i < barsCount; i++) {
    // 中心位置峰值
    const centerValue = Math.max(0, 1 - Math.abs(i - barsCount / 2) / (barsCount / 4));
    let value = centerValue;

    // 添加节奏点
    if (i > barsCount / 2 - 6 && i < barsCount / 2 + 6) {
      value += beat;
    }

    // 添加噪声
    value += Math.sin(i * 0.2 + time) * 0.1;
    value += Math.random() * 0.05;

    const normalized = value * 200;
    data.push(Math.min(255, Math.max(0, normalized)));
  }

  return data;
};

// 生成脉冲波测试数据
const generatePulseData = () => {
  const data = [];
  const barsCount = 128;
  const time = Date.now() * 0.001;
  const pulse = Math.abs(Math.sin(time)) > 0.9 ? 1 : 0;

  for (let i = 0; i < barsCount; i++) {
    // 基础波
    let value = Math.sin(i * 0.3) * 0.5 + 0.5;

    // 中心位置
    if (Math.abs(i - barsCount / 2) < 8) {
      value = Math.min(1, value + pulse * 0.7);
    }

    // 随机脉冲
    if (Math.random() > 0.99) {
      value = 1;
    }

    const normalized = value * 200;
    data.push(Math.min(255, Math.max(0, normalized)));
  }

  return data;
};

// 基于选择的模式生成数据
const generateVisualizerData = () => {
  switch (config.value.mode) {
    case "peak":
      return generatePeakData();
    case "pulse":
      return generatePulseData();
    case "sine":
    default:
      return generateSineData();
  }
};

// 开始
const onStart = () => {
  if (!localConfig.value.isAnimating) {
    localConfig.value.isAnimating = true;
    animate();
  }
};

// 结束
const onClose = () => {
  localConfig.value.isAnimating = false;
  if (localConfig.value.animationId) {
    cancelAnimationFrame(localConfig.value.animationId);
    localConfig.value.animationId = null;
  }

  // 停止音频上下文
  if (localConfig.value.audioContext) {
    if (config.value.audioSource === "mic" && localConfig.value.audioContext.state !== "closed") {
      localConfig.value.audioContext.close();
    }
    localConfig.value.audioContext = null;
  }

  // 直接停止媒体流
  if (localConfig.value.mediaStream) {
    const tracks = localConfig.value.mediaStream.getTracks();
    tracks.forEach((track: any) => {
      track.stop();
    });
    localConfig.value.mediaStream = null;
  }

  // 停止录制
  if (localConfig.value.mediaRecorder && localConfig.value.mediaRecorder.state === "recording") {
    localConfig.value.mediaRecorder.stop();
    localConfig.value.mediaRecorder.onstop = () => {
      const blob = new Blob(localConfig.value.recordedChunks, { type: "audio/webm; codecs=opus" });
      localConfig.value.mediaRecorder = null;
      localConfig.value.recordedChunks = [];
      emit("audio", blob);
    };
  }
};

// 动画循环
const animate = () => {
  if (!localConfig.value.isAnimating) return;

  let dataArray;
  const barCount = 64; // 64个柱状条（左右各32个）

  if (config.value.audioSource === "mic") {
    // 真实音频数据处理
    if (!localConfig.value.audioContext) {
      initAudio();
    }

    if (localConfig.value.analyser) {
      const bufferLength = localConfig.value.analyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);
      localConfig.value.analyser.getByteFrequencyData(dataArray);
    } else {
      dataArray = generateVisualizerData();
    }
  } else {
    // 模拟数据
    dataArray = generateVisualizerData();
  }

  drawBars(dataArray, barCount);
  localConfig.value.animationId = requestAnimationFrame(animate);
};

// 音频初始化（麦克风）
const initAudio = () => {
  localConfig.value.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  localConfig.value.analyser = localConfig.value.audioContext.createAnalyser();
  localConfig.value.analyser.fftSize = 256;

  if (config.value.audioSource === "mic") {
    // 获取麦克风权限
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        localConfig.value.mediaStream = stream;
        // 根据音频流创建一个媒体流音频源对象
        const source = localConfig.value.audioContext!.createMediaStreamSource(stream);
        // 连接到音频分析器
        source.connect(localConfig.value.analyser!);

        // 初始化 MediaRecorder
        localConfig.value.mediaRecorder = new MediaRecorder(stream);
        localConfig.value.recordedChunks = [];

        // 监听数据可用事件
        localConfig.value.mediaRecorder.ondataavailable = (event: any) => {
          if (event.data.size > 0) {
            localConfig.value.recordedChunks.push(event.data);
          }
        };
        // 开始录制
        localConfig.value.mediaRecorder.start();
      })
      .catch(function (err) {
        console.error("麦克风访问失败:", err);
        config.value.audioSource = "local";
      });
  }
};

// 绘制初始的静态波形预览
const drawInitialPreview = () => {
  const dataArray = generateVisualizerData();
  drawBars(dataArray, 64);
};

const init = () => {
  ctx.value = canvas.value!.getContext("2d");
  // 添加窗口大小变化监听
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  drawInitialPreview();
};

onMounted(() => {
  init();
});

onUnmounted(() => {
  window.removeEventListener("resize", resizeCanvas);
});

defineExpose({
  onStart,
  onClose,
  onReset
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
