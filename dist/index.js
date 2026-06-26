(function(){"use strict";try{if(typeof document<"u"){var a=document.createElement("style");a.appendChild(document.createTextNode(".ania-avatar[data-v-868b3051]{position:relative;display:inline-block;line-height:0}.ania-avatar__canvas[data-v-868b3051]{border-radius:8px}.ania-chatbot[data-v-0eedefb7]{display:inline-flex;flex-direction:column;gap:8px;font-family:system-ui,sans-serif}.ania-chatbot__panel[data-v-0eedefb7]{display:flex;flex-direction:column;width:320px;max-width:100%;height:280px;border-radius:12px;background:#14141f;color:#e6e6f0;overflow:hidden;box-shadow:0 6px 24px #00000059}.ania-chatbot__header[data-v-0eedefb7]{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:linear-gradient(90deg,#a855f7,#ff1b8d);font-weight:600}.ania-chatbot__close[data-v-0eedefb7]{background:none;border:none;color:inherit;font-size:18px;cursor:pointer;line-height:1}.ania-chatbot__messages[data-v-0eedefb7]{flex:1;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:6px}.ania-chatbot__msg[data-v-0eedefb7]{padding:6px 10px;border-radius:10px;max-width:85%;font-size:14px;white-space:pre-wrap;word-break:break-word}.ania-chatbot__msg--user[data-v-0eedefb7]{align-self:flex-end;background:#2a2a45}.ania-chatbot__msg--assistant[data-v-0eedefb7]{align-self:flex-start;background:#3a2a55}.ania-chatbot__msg--error[data-v-0eedefb7]{align-self:flex-start;background:#5a1f2f}.ania-chatbot__form[data-v-0eedefb7]{display:flex;gap:6px;padding:8px;border-top:1px solid rgba(255,255,255,.08)}.ania-chatbot__input[data-v-0eedefb7]{flex:1;padding:8px 10px;border-radius:8px;border:1px solid rgba(255,255,255,.12);background:#0e0e18;color:inherit;outline:none}.ania-chatbot__send[data-v-0eedefb7]{padding:8px 14px;border-radius:8px;border:none;background:#a855f7;color:#fff;font-weight:600;cursor:pointer}.ania-chatbot__send[data-v-0eedefb7]:disabled{opacity:.5;cursor:not-allowed}")),document.head.appendChild(a)}}catch(e){console.error("vite-plugin-css-injected-by-js",e)}})();
import { shallowRef as Pu, ref as T, onBeforeUnmount as Fu, defineComponent as ku, onMounted as gu, watch as H, computed as au, openBlock as V, createElementBlock as $, normalizeStyle as eu, normalizeClass as iu, createElementVNode as P, renderSlot as Ku, unref as q, reactive as Lu, createVNode as Uu, toDisplayString as Au, Fragment as Hu, renderList as qu, withModifiers as Ru, withDirectives as Iu, vModelText as Ou, createCommentVNode as Wu } from "vue";
var Y = null, ru = null, hu = null, pu = null, vu = null, W = null, _u = () => W || (W = (async () => {
  let [u, a] = await Promise.all([import("./__vite-optional-peer-dep_onnxruntime-web_ania-avatar-core-DYxpcVy9.js"), import("./__vite-optional-peer-dep_piper-tts-web_ania-avatar-core-DYxpcVy9.js")]);
  Y = u.default || u, ru = a.PiperWebEngine, hu = a.OnnxWebRuntime, pu = a.OnnxWebWorkerRuntime, vu = a.FetchProvider, Y.env.wasm.proxy = !1, Y.env.wasm.numThreads = 1;
})().catch((u) => {
  W = null;
  let a = u && u.message ? u.message : String(u);
  throw new Error(`piper-tts-web / onnxruntime-web are not installed. Add them to enable on-device TTS: npm i piper-tts-web onnxruntime-web. (${a})`);
}), W), M = null, R = null, I = null, J = null, Bu = !0, U = { ready: !1, modelCached: !1, downloading: !1, progress: 0, error: null, warming: !1 }, L = (u) => {
  U = { ...U, ...u };
}, Gu = (u, a, i) => {
  let e = new vu();
  return { destroy: () => e.destroy(), list: async () => [], fetch: async () => {
    var o, t, c;
    L({ progress: 10 }), (o = i.onProgress) == null || o.call(i, 10);
    let r = a ? await e.fetch(a) : null;
    L({ progress: 30 }), (t = i.onProgress) == null || t.call(i, 30);
    let n = await e.fetch(u);
    return L({ progress: 90 }), (c = i.onProgress) == null || c.call(i, 90), [r, n];
  } };
}, Vu = (u) => {
  if (Bu) try {
    return new ru({ onnxRuntime: new pu({ numThreads: 1 }), voiceProvider: u });
  } catch {
    Bu = !1;
  }
  return new ru({ onnxRuntime: new hu({ numThreads: 1 }), voiceProvider: u });
}, $u = async (u, a, i = {}) => M && U.ready ? M : R || (L({ downloading: !0, progress: 0, error: null, warming: !0 }), R = (async () => {
  try {
    await _u(), J = (u.split("/").pop() || "voice").replace(".onnx", "");
    let e = Gu(u, a, i);
    return M = Vu(e), I = M.generate(" ", J, 0).then(() => {
      var r, n;
      L({ ready: !0, modelCached: !0, downloading: !1, progress: 100, warming: !1 }), (r = i.onProgress) == null || r.call(i, 100), (n = i.onReady) == null || n.call(i);
    }).catch((r) => {
      throw L({ downloading: !1, error: r.message, warming: !1 }), r;
    }), M;
  } catch (e) {
    throw M = null, R = null, I = null, L({ downloading: !1, error: e.message, warming: !1 }), e;
  }
})(), R), xi = (u, a, i = {}) => $u(u, a, i), bi = async (u, a = {}) => {
  if (!M) throw new Error("Piper TTS not initialized. Call initPiper() first.");
  if (I) try {
    await I;
  } catch {
  }
  let i = a.speakerId ?? 0, e = (await M.generate(u, J, i)).file;
  return { audioUrl: URL.createObjectURL(e), blob: e };
}, wi = () => ({ ...U }), zi = () => ({ ...U }), fi = () => {
  M != null && M.destroy && M.destroy(), M = null, R = null, I = null, J = null, U = { ready: !1, modelCached: !1, downloading: !1, progress: 0, error: null, warming: !1 };
}, _ = null, nu = () => _ || (_ = import("./__vite-optional-peer-dep_onnxruntime-web_ania-avatar-core-DYxpcVy9.js").then((u) => {
  let a = u;
  return a.default || a;
}).catch((u) => {
  _ = null;
  let a = u && u.message ? u.message : String(u);
  throw new Error(`onnxruntime-web is not installed. Add it to enable wake-word detection: npm i onnxruntime-web. (${a})`);
}), _), Ju = class {
  constructor() {
    this.session = null, this.audioContext = null, this.stream = null, this.processor = null, this.source = null, this.isListening = !1, this.threshold = 0.5, this.onDetect = null, this.onError = null, this.onScore = null, this.audioBuffer = [], this.wasmPaths = void 0;
  }
  async loadModel(u, a = {}) {
    if (!u) throw new Error("[WakeWord] loadModel requires a model URL.");
    let i = await nu();
    a.wasmPaths !== void 0 && (this.wasmPaths = a.wasmPaths), this.wasmPaths !== void 0 && (i.env.wasm.wasmPaths = this.wasmPaths);
    try {
      i.env.wasm.numThreads = 1;
    } catch {
    }
    return this.session = await i.InferenceSession.create(u, { executionProviders: ["wasm"], graphOptimizationLevel: "all" }), this.session;
  }
  isModelLoaded() {
    return this.session !== null;
  }
  isCurrentlyListening() {
    return this.isListening;
  }
  async startListening(u) {
    var a, i;
    if (this.isListening) return !0;
    if (!this.session) {
      let e = new Error("Wake-word model not loaded. Call loadModel() first.");
      return (a = u.onError) == null || a.call(u, e), !1;
    }
    this.threshold = u.threshold ?? 0.5, this.onDetect = u.onDetect || null, this.onError = u.onError || null, this.onScore = u.onScore || null;
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1, sampleRate: 16e3, echoCancellation: !0, noiseSuppression: !0 } });
      let e = window.AudioContext || window.webkitAudioContext;
      return this.audioContext = new e({ sampleRate: 16e3 }), this.source = this.audioContext.createMediaStreamSource(this.stream), this.processor = this.audioContext.createScriptProcessor(1280, 1, 1), this.processor.onaudioprocess = async (r) => {
        var o, t, c;
        if (!this.isListening) return;
        let n = r.inputBuffer.getChannelData(0);
        if (this.audioBuffer.push(new Float32Array(n)), this.audioBuffer.length >= 12) {
          let A = this.concat(this.audioBuffer);
          this.audioBuffer = [];
          try {
            let C = await this.inference(A);
            (o = this.onScore) == null || o.call(this, C), C > this.threshold && ((t = this.onDetect) == null || t.call(this, C));
          } catch (C) {
            (c = this.onError) == null || c.call(this, C);
          }
        }
      }, this.source.connect(this.processor), this.processor.connect(this.audioContext.destination), this.isListening = !0, !0;
    } catch (e) {
      return (i = this.onError) == null || i.call(this, e), await this.stopListening(), !1;
    }
  }
  async stopListening() {
    if (this.isListening = !1, this.processor) {
      try {
        this.processor.disconnect();
      } catch {
      }
      this.processor.onaudioprocess = null, this.processor = null;
    }
    if (this.source) {
      try {
        this.source.disconnect();
      } catch {
      }
      this.source = null;
    }
    if (this.audioContext) {
      try {
        await this.audioContext.close();
      } catch {
      }
      this.audioContext = null;
    }
    this.stream && (this.stream.getTracks().forEach((u) => u.stop()), this.stream = null), this.audioBuffer = [];
  }
  async dispose() {
    await this.stopListening(), this.session = null;
  }
  concat(u) {
    let a = u.reduce((r, n) => r + n.length, 0), i = new Float32Array(a), e = 0;
    for (let r of u) i.set(r, e), e += r.length;
    return i;
  }
  async inference(u) {
    let a = await nu();
    if (!this.session) throw new Error("[WakeWord] Model not loaded");
    let i = new a.Tensor("float32", u, [1, u.length]), e = {};
    e[this.session.inputNames[0]] = i;
    let r = (await this.session.run(e))[this.session.outputNames[0]].data, n = 0;
    for (let o = 0; o < r.length; o++) r[o] > n && (n = r[o]);
    return n;
  }
}, Q = null, Si = () => (Q || (Q = new Ju()), Q), Mi = async () => {
  try {
    return await nu(), !0;
  } catch {
    return !1;
  }
}, Zu = class {
  constructor(u, a) {
    this.frameImages = /* @__PURE__ */ new Map(), this.isPlaying = !1, this.animationFrame = null, this.lastRenderedFrame = -1, this.fileData = null, this.animationController = null, this.canvas = u, this.canvas.width = a.width, this.canvas.height = a.height, this.frameMime = a.frameMime || "image/webp", this.ctx = this.canvas.getContext("2d");
  }
  async loadFrame(u) {
    var e, r, n;
    let a = this.frameImages.get(u);
    if (a) return a;
    let i = (n = (r = (e = this.fileData) == null ? void 0 : e.video) == null ? void 0 : r.frames) == null ? void 0 : n[u];
    return i ? new Promise((o) => {
      let t = new Image();
      t.onload = () => {
        this.frameImages.set(u, t), o(t);
      }, t.onerror = () => o(null), t.src = i.startsWith("data:") ? i : `data:${this.frameMime};base64,${i}`;
    }) : null;
  }
  async renderFrame(u) {
    if (u === this.lastRenderedFrame) return;
    this.lastRenderedFrame = u;
    let a = await this.loadFrame(u);
    a && this.ctx && (this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), this.ctx.drawImage(a, 0, 0, this.canvas.width, this.canvas.height));
  }
  play() {
    if (this.isPlaying) return;
    this.isPlaying = !0;
    let u = async (a) => {
      if (this.isPlaying) {
        if (this.animationController) {
          let i = this.animationController.getNextFrame(a);
          i >= 0 && await this.renderFrame(i);
        }
        this.animationFrame = requestAnimationFrame(u);
      }
    };
    this.animationFrame = requestAnimationFrame(u);
  }
  stop() {
    this.isPlaying = !1, this.animationFrame != null && (cancelAnimationFrame(this.animationFrame), this.animationFrame = null);
  }
  isRunning() {
    return this.isPlaying;
  }
  setTalkingState(u) {
    var a;
    (a = this.animationController) == null || a.setTalkingState(u);
  }
  dispose() {
    this.stop(), this.frameImages.clear(), this.lastRenderedFrame = -1;
  }
};
function su(u) {
  var e, r;
  let a = ((r = (e = u.video) == null ? void 0 : e.frames) == null ? void 0 : r.length) || 0, i = u.animation || {};
  return { idle_range_low: Math.floor(i.idleRangeLowValue || 0), idle_range_high: Math.floor(i.idleRangeHighValue || Math.floor(a / 2)), talk_range_low: Math.floor(i.talkRangeLowValue || Math.floor(a / 2)), talk_range_high: Math.floor(i.talkRangeHighValue || Math.max(0, a - 1)), idle_speed_slider_value: i.idleSpeedSliderValue || 1, talk_speed_slider_value: i.talkSpeedSliderValue || 1, current_frame_index: i.currentFrameIndex || 0, idle_start_positions: i.idleStartPositions || [], talk_start_positions: i.talkStartPositions || [], reverse_idle_selected: i.reverseIdleSelected || !1, reverse_talk_selected: i.reverseTalkSelected || !1 };
}
var Yu = class {
  constructor(u, a) {
    this.lastFrameTime = 0, this.frameInterval = 1e3 / 30, this.direction = 1, this.isTalking = !1, this.actions = /* @__PURE__ */ new Map(), this.activeAction = null, this.onActionStartCallback = null, this.onActionCompleteCallback = null, this.onActionCancelCallback = null, this.lipSyncEnabled = !1, this.lipSyncIntensity = 0.6, this.lipSyncResponsiveness = 0.5, this.lipSyncSustainStyle = "wiggle", this.lipSyncWiggleSpeed = 2, this.opennessMap = null, this.envelope = 0, this.wigglePhase = 0, this.getOpennessFn = null, this.config = u, this.currentFrameIndex = u.current_frame_index || 0, this.idleSpeed = u.idle_speed_slider_value || 1, this.talkSpeed = u.talk_speed_slider_value || 1, this.config.idle_range_low === void 0 && (this.config.idle_range_low = 0), this.config.idle_range_high === void 0 && (this.config.idle_range_high = Math.floor(a / 2)), this.config.talk_range_low === void 0 && (this.config.talk_range_low = Math.floor(a / 2)), this.config.talk_range_high === void 0 && (this.config.talk_range_high = Math.max(0, a - 1)), this.jumpToRandomStartPosition(!1);
  }
  jumpToRandomStartPosition(u) {
    let a = u ? this.config.talk_start_positions : this.config.idle_start_positions;
    if (a && a.length > 0) {
      let e = Math.floor(Math.random() * a.length);
      this.currentFrameIndex = a[e];
    } else {
      let e = u ? { low: this.config.talk_range_low, high: this.config.talk_range_high } : { low: this.config.idle_range_low, high: this.config.idle_range_high };
      this.currentFrameIndex = e.low;
    }
    let i = u ? this.config.reverse_talk_selected : this.config.reverse_idle_selected;
    this.direction = i ? -1 : 1;
  }
  setTalkingState(u) {
    this.isTalking !== u && (this.isTalking = u, u || (this.envelope = 0), this.activeAction || this.jumpToRandomStartPosition(u));
  }
  setSpeeds(u, a) {
    typeof u == "number" && u > 0 && (this.idleSpeed = u), typeof a == "number" && a > 0 && (this.talkSpeed = a);
  }
  setIdleSpeed(u) {
    u > 0 && (this.idleSpeed = u);
  }
  setTalkSpeed(u) {
    u > 0 && (this.talkSpeed = u);
  }
  configureActions(u) {
    if (this.actions.clear(), !!u) for (let a of u) a && a.id && this.actions.set(a.id, a);
  }
  getActions() {
    return Array.from(this.actions.values());
  }
  hasAction(u) {
    return this.actions.has(u);
  }
  triggerAction(u) {
    var n;
    let a = this.actions.get(u);
    if (!a) return !1;
    let i = Math.min(a.range_low, a.range_high), e = Math.max(a.range_low, a.range_high), r = i;
    if (a.start_positions && a.start_positions.length > 0) {
      let o = Math.floor(Math.random() * a.start_positions.length);
      r = Math.max(i, Math.min(e, a.start_positions[o]));
    } else a.reverse && (r = e);
    return this.activeAction = { config: a, frame: r, direction: a.reverse ? -1 : 1, low: i, high: e, speed: a.speed && a.speed > 0 ? a.speed : 1 }, this.currentFrameIndex = r, (n = this.onActionStartCallback) == null || n.call(this, u), !0;
  }
  cancelAction(u = !1) {
    var i, e;
    if (!this.activeAction) return;
    let a = this.activeAction.config.id;
    this.activeAction = null, this.jumpToRandomStartPosition(this.isTalking), u ? (i = this.onActionCancelCallback) == null || i.call(this, a) : (e = this.onActionCompleteCallback) == null || e.call(this, a);
  }
  isActionPlaying() {
    return this.activeAction !== null;
  }
  configureLipsSync(u, a = 0.6, i = 0.5, e = null, r = "wiggle", n = 2) {
    this.lipSyncEnabled = u, this.lipSyncIntensity = Math.max(0, Math.min(1, a)), this.lipSyncResponsiveness = Math.max(0.05, Math.min(1, i)), this.lipSyncSustainStyle = r, this.lipSyncWiggleSpeed = Math.max(1, Math.min(6, n)), this.opennessMap = e && e.length > 0 ? e : null, u || (this.envelope = 0);
  }
  isLipSyncEnabled() {
    return this.lipSyncEnabled;
  }
  getLipSyncEnvelope() {
    return this.envelope;
  }
  frameForOpenness(u) {
    let a = this.config.talk_range_low, i = this.config.talk_range_high;
    if (i <= a) return a;
    if (this.opennessMap && this.opennessMap.length > 0) {
      let e = 0, r = 1 / 0;
      for (let n = 0; n < this.opennessMap.length; n++) {
        let o = Math.abs(this.opennessMap[n] - u);
        o < r && (r = o, e = n);
      }
      return Math.max(a, Math.min(i, a + e));
    }
    return Math.round(a + u * (i - a));
  }
  getNextFrame(u) {
    if (this.activeAction) {
      let r = this.frameInterval / this.activeAction.speed;
      if (u - this.lastFrameTime < r) return -1;
      this.lastFrameTime = u;
      let n = this.activeAction;
      return n.frame += n.direction, n.frame > n.high || n.frame < n.low ? (this.cancelAction(!1), Math.floor(this.currentFrameIndex)) : (this.currentFrameIndex = n.frame, Math.floor(n.frame));
    }
    if (this.lipSyncEnabled && this.isTalking && this.getOpennessFn) {
      let r = this.frameInterval / this.talkSpeed;
      if (u - this.lastFrameTime < r) return -1;
      this.lastFrameTime = u;
      let n = Math.max(0, Math.min(1, this.getOpennessFn())), o = Math.min(1, n * (1 + this.lipSyncIntensity));
      this.envelope += (o - this.envelope) * this.lipSyncResponsiveness;
      let t = this.envelope;
      if (this.lipSyncSustainStyle === "wiggle" && this.envelope > 0.15) {
        this.wigglePhase += 0.15 * this.lipSyncWiggleSpeed;
        let A = Math.sin(this.wigglePhase) * 0.15 * this.envelope;
        t = Math.max(0, Math.min(1, this.envelope + A));
      }
      let c = this.frameForOpenness(t);
      return this.currentFrameIndex = c, Math.floor(c);
    }
    let a = this.isTalking ? this.talkSpeed : this.idleSpeed, i = this.frameInterval / a;
    if (u - this.lastFrameTime < i) return -1;
    this.lastFrameTime = u;
    let e = this.isTalking ? { low: this.config.talk_range_low, high: this.config.talk_range_high } : { low: this.config.idle_range_low, high: this.config.idle_range_high };
    return this.currentFrameIndex += this.direction, this.currentFrameIndex >= e.high ? this.config.reverse_idle_selected || this.config.reverse_talk_selected ? (this.direction = -1, this.currentFrameIndex = e.high - 1) : this.currentFrameIndex = e.low : this.currentFrameIndex < e.low && (this.config.reverse_idle_selected || this.config.reverse_talk_selected ? (this.direction = 1, this.currentFrameIndex = e.low + 1) : this.currentFrameIndex = e.high - 1), Math.floor(this.currentFrameIndex);
  }
}, Qu = class {
  constructor() {
    this.listeners = {};
  }
  on(u, a) {
    var i;
    return ((i = this.listeners)[u] ?? (i[u] = /* @__PURE__ */ new Set())).add(a), () => this.off(u, a);
  }
  off(u, a) {
    var i;
    (i = this.listeners[u]) == null || i.delete(a);
  }
  emit(u, a) {
    let i = this.listeners[u];
    if (i) for (let e of i) try {
      e(a);
    } catch {
    }
  }
  clear() {
    this.listeners = {};
  }
};
function yu() {
  let u = globalThis.crypto;
  if (!u || !u.subtle) throw new Error("[ania-avatar-core] Web Crypto (crypto.subtle) is unavailable in this environment.");
  return u;
}
async function Du(u, a, i) {
  let e = yu().subtle, r = await e.importKey("raw", new TextEncoder().encode(u), "PBKDF2", !1, ["deriveKey"]);
  return e.deriveKey({ name: "PBKDF2", salt: a, iterations: 1e5, hash: "SHA-256" }, r, { name: "AES-CBC", length: 256 }, !1, i);
}
var X = (u) => u.every((a) => a === 0);
async function Xu(u, a = "") {
  let i = new Uint8Array(u), e = 0, r = String.fromCharCode(...i.slice(e, e + 4));
  if (e += 4, r !== "ANIA") throw new Error(`[ania-avatar-core] Invalid .ania file — magic: ${r}`);
  let n = String.fromCharCode(...i.slice(e, e + 3));
  if (e += 3, !["1.0", "2.0", "3.0"].includes(n)) throw new Error(`[ania-avatar-core] Unsupported .ania version: ${n}`);
  let o = i[e];
  o >= 97 && o <= 122 && (e += 1);
  let t = yu().subtle;
  if (n === "3.0") {
    let w = i.slice(e, e + 32);
    e += 32;
    let z = i.slice(e, e + 16);
    e += 16;
    let B = i.slice(e, e + 16);
    e += 16;
    let E = i.slice(e);
    if (X(w) && X(z) && X(B)) {
      let D = new TextDecoder("utf-8").decode(E), d = D.lastIndexOf("<<<ANIA_LICENSE>>>");
      return d > 0 && (D = D.substring(0, d)), JSON.parse(D);
    }
    let g = await Du(a, z, ["decrypt"]), F = await t.decrypt({ name: "AES-CBC", iv: B }, g, E), h = new Uint8Array(F), p = h[0] << 24 | h[1] << 16 | h[2] << 8 | h[3], f = h.slice(4 + p), K = new TextDecoder("utf-8").decode(f);
    return JSON.parse(K);
  }
  let c = i.slice(e, e + 16);
  e += 16;
  let A = i.slice(e, e + 16);
  e += 16;
  let C = i.slice(e), k = await Du(a, c, ["decrypt"]), m = await t.decrypt({ name: "AES-CBC", iv: A }, k, C), b = new TextDecoder("utf-8").decode(m);
  return JSON.parse(b);
}
var xu = (u) => {
  if (!u || u <= 0) return { idle: 1, talk: 1 };
  let a = Math.max(0.5, Math.min(10, u / 10)), i = Math.max(1, Math.min(10, u / 5));
  return { idle: parseFloat(a.toFixed(1)), talk: parseFloat(i.toFixed(1)) };
}, Ti = xu, bu = async (u, a, i) => {
  try {
    let e = `${u.replace(/\/$/, "")}/api/avatars/json-config/fetch?contentHash=${encodeURIComponent(a)}&type=${encodeURIComponent(i)}`, r = await fetch(e);
    if (!r.ok) return null;
    let n = await r.json();
    return !n.found || !n.jsonData ? null : n.jsonData;
  } catch {
    return null;
  }
}, u0 = async (u, a) => await bu(u, a, "lips_sync"), a0 = async (u, a) => {
  let i = await bu(u, a, "actions");
  if (!i) return null;
  if (Array.isArray(i)) return i;
  let e = i;
  return Array.isArray(e.actions) ? e.actions : null;
}, e0 = (u, a, i) => {
  let e = i - a;
  if (e <= 0 || !u || u.length === 0) return [];
  let r = e + 1, n = new Array(r).fill(0.5), o = [...u].sort((t, c) => t[0] - c[0]).map(([t, c]) => [Math.max(0, Math.min(e, Math.floor(t) - a)), typeof c == "number" ? c : parseFloat(String(c))]);
  o[0][0] > 0 && (o = [[0, o[0][1]], ...o]), o[o.length - 1][0] < e && (o = [...o, [e, o[o.length - 1][1]]]);
  for (let t = 0; t < o.length - 1; t++) {
    let [c, A] = o[t], [C, k] = o[t + 1], m = Math.max(1, C - c);
    for (let b = c; b <= C; b++) {
      let w = (b - c) / m;
      n[b] = A + (k - A) * w;
    }
  }
  return n;
}, i0 = (u) => u.tagName === "CANVAS" || u instanceof HTMLCanvasElement;
function r0(u, a = {}) {
  let i = a.logger || console, e = new Qu(), r = !1, n;
  i0(u) ? n = u : (n = document.createElement("canvas"), n.style.display = "block", n.style.width = "100%", n.style.height = "100%", u.appendChild(n), r = !0);
  let o = a.width ?? n.width ?? 200, t = a.height ?? n.height ?? 200, c = new Zu(n, { width: o, height: t }), A = null, C = [], k = null, m = (B) => {
    B.onActionStartCallback = (E) => e.emit("actionStart", E), B.onActionCompleteCallback = (E) => e.emit("actionEnd", E), B.onActionCancelCallback = (E) => e.emit("actionEnd", E);
  }, b = (B) => {
    let E = a.lipSync;
    E != null && E.enabled && B.configureLipsSync(!0, E.intensity ?? 0.6, E.responsiveness ?? 0.5, E.opennessMap ?? null, E.sustainStyle ?? "wiggle", E.wiggleSpeed ?? 2);
  }, w = (B) => {
    var F, h, p;
    let E = ((h = (F = B.video) == null ? void 0 : F.frames) == null ? void 0 : h.length) || 0, g = su(B);
    if (a.autoCalculateSpeed && ((p = B.video) != null && p.fps)) {
      let f = xu(B.video.fps);
      g.idle_speed_slider_value = a.idleSpeed ?? f.idle, g.talk_speed_slider_value = a.talkSpeed ?? f.talk;
    } else a.idleSpeed != null && (g.idle_speed_slider_value = a.idleSpeed), a.talkSpeed != null && (g.talk_speed_slider_value = a.talkSpeed);
    A = new Yu(g, E), A.getOpennessFn = () => k ? k() : 0, m(A), b(A), c.fileData = B, c.animationController = A, C = Array.isArray(B.actions) ? [...B.actions] : [], A.configureActions(C);
  }, z = async (B) => {
    var g;
    if (!a.serverUrl || !B.contentHash || !A) return;
    let E = su(B);
    if (a.fetchActionsFromServer) try {
      let F = await a0(a.serverUrl, B.contentHash);
      if (F && F.length > 0) {
        let h = new Map(C.map((p) => [p.id, p]));
        for (let p of F) h.set(p.id, p);
        C = Array.from(h.values()), A.configureActions(C);
      }
    } catch (F) {
      i.warn("[ania-avatar-core] actions config fetch failed:", F);
    }
    if ((g = a.lipSync) != null && g.enabled) try {
      let F = await u0(a.serverUrl, B.contentHash);
      if (F) {
        let h = E.talk_range_low ?? 0, p = E.talk_range_high ?? 0, f = F.lips_sync_keyframes ? e0(F.lips_sync_keyframes, h, p) : a.lipSync.opennessMap ?? null;
        A.configureLipsSync(!0, F.lips_sync_sync_intensity ?? a.lipSync.intensity ?? 0.6, F.lips_sync_responsiveness ?? a.lipSync.responsiveness ?? 0.5, f, F.lips_sync_sustain_style ?? a.lipSync.sustainStyle ?? "wiggle", F.lips_sync_wiggle_speed ?? a.lipSync.wiggleSpeed ?? 2);
      }
    } catch (F) {
      i.warn("[ania-avatar-core] lip-sync config fetch failed:", F);
    }
  };
  return { async load(B) {
    try {
      let E;
      if (B && typeof B == "object" && "video" in B && B.video) E = B;
      else {
        let g = B;
        if (g.data) E = g.data;
        else if (g.url) {
          let F = {};
          g.authToken && (F.Authorization = `Bearer ${g.authToken}`);
          let h = await fetch(g.url, { headers: F });
          if (!h.ok) throw new Error(`Failed to fetch avatar: HTTP ${h.status}`);
          let p = await h.arrayBuffer(), f = new Uint8Array(p.slice(0, 4));
          E = String.fromCharCode(...f) === "ANIA" ? await Xu(p, g.password || "") : JSON.parse(new TextDecoder().decode(p));
        } else throw new Error("load() requires { url } or { data } (or raw AniaAvatarData).");
      }
      return w(E), z(E), a.autoplay !== !1 && c.play(), e.emit("load", E), E;
    } catch (E) {
      throw e.emit("error", E), E;
    }
  }, play() {
    c.play();
  }, pause() {
    c.stop();
  }, destroy() {
    c.dispose(), e.clear(), A = null, r && n.parentNode && n.parentNode.removeChild(n);
  }, setTalking(B) {
    let E = (A == null ? void 0 : A.isTalking) ?? !1;
    A == null || A.setTalkingState(B), B && !E ? e.emit("talkStart", void 0) : !B && E && e.emit("talkEnd", void 0);
  }, triggerAction(B) {
    return (A == null ? void 0 : A.triggerAction(B)) ?? !1;
  }, cancelAction(B) {
    A == null || A.cancelAction(B);
  }, configureActions(B) {
    C = [...B], A == null || A.configureActions(C);
  }, configureLipsSync(B, E, g, F, h, p) {
    A == null || A.configureLipsSync(B, E, g, F ?? null, h ?? "wiggle", p);
  }, getAvailableActions() {
    return C.map((B) => ({ id: B.id, name: B.name }));
  }, setOpennessSource(B) {
    k = B;
  }, setSpeeds(B, E) {
    A == null || A.setSpeeds(B, E);
  }, get controller() {
    return A;
  }, get canvas() {
    return n;
  }, on(B, E) {
    return e.on(B, E);
  }, off(B, E) {
    e.off(B, E);
  } };
}
var Ni = class {
  constructor(u = {}) {
    this.ctx = null, this.analyser = null, this.source = null, this.freqData = null, this.prevSpectrum = null, this.ownsStream = !1, this.stream = null, this.connectedElement = null, this.fftSize = u.fftSize ?? 2048, this.smoothing = u.smoothing ?? 0.8, this.inputGain = u.inputGain ?? 1;
  }
  getOrCreateContext() {
    if (!this.ctx || this.ctx.state === "closed") {
      let u = window.AudioContext || window.webkitAudioContext;
      this.ctx = new u();
    }
    return this.ctx;
  }
  buildAnalyser() {
    let u = this.getOrCreateContext();
    u.state === "suspended" && u.resume();
    let a = u.createAnalyser();
    return a.fftSize = this.fftSize, a.smoothingTimeConstant = this.smoothing, this.analyser = a, this.freqData = new Uint8Array(a.frequencyBinCount), this.prevSpectrum = new Float32Array(a.frequencyBinCount), a;
  }
  async connectMicrophone(u, a) {
    this.disconnect(), u || (u = await navigator.mediaDevices.getUserMedia({ audio: a ? { deviceId: { exact: a } } : !0, video: !1 }), this.ownsStream = !0), this.stream = u;
    let i = this.getOrCreateContext(), e = this.buildAnalyser(), r = i.createMediaStreamSource(u);
    this.source = r, r.connect(e);
  }
  async connectStream(u) {
    return this.connectMicrophone(u);
  }
  connectAudioElement(u) {
    if (this.connectedElement === u && this.analyser) return;
    this.disconnect();
    let a = this.getOrCreateContext(), i = this.buildAnalyser();
    try {
      let e = a.createMediaElementSource(u);
      this.source = e, e.connect(i), i.connect(a.destination), this.connectedElement = u;
    } catch {
    }
  }
  getOpenness() {
    if (!this.analyser || !this.freqData || !this.ctx) return 0;
    this.analyser.getByteFrequencyData(this.freqData);
    let u = this.ctx.sampleRate / this.analyser.fftSize, a = Math.floor(85 / u), i = Math.min(this.freqData.length - 1, Math.ceil(3e3 / u)), e = 0, r = 0;
    for (let n = a; n <= i; n++) e += this.freqData[n], r++;
    return r === 0 ? 0 : Math.min(1, e / r / 255 * this.inputGain);
  }
  getAmplitude() {
    if (!this.analyser) return 0;
    let u = new Uint8Array(this.analyser.fftSize);
    this.analyser.getByteTimeDomainData(u);
    let a = 0;
    for (let i = 0; i < u.length; i++) {
      let e = Math.abs(u[i] - 128) / 128;
      e > a && (a = e);
    }
    return Math.min(1, a * this.inputGain);
  }
  getSpectralFlux() {
    if (!this.analyser || !this.freqData || !this.prevSpectrum) return 0;
    this.analyser.getByteFrequencyData(this.freqData);
    let u = 0, a = Math.min(this.freqData.length, this.prevSpectrum.length);
    for (let i = 0; i < a; i++) {
      let e = this.freqData[i] / 255 - this.prevSpectrum[i];
      e > 0 && (u += e), this.prevSpectrum[i] = this.freqData[i] / 255;
    }
    return Math.min(1, u / (a * 0.1));
  }
  isConnected() {
    return !!this.analyser;
  }
  disconnect() {
    if (this.source) {
      try {
        this.source.disconnect();
      } catch {
      }
      this.source = null;
    }
    if (this.analyser) {
      try {
        this.analyser.disconnect();
      } catch {
      }
      this.analyser = null;
    }
    this.ownsStream && this.stream && this.stream.getTracks().forEach((u) => u.stop()), this.stream = null, this.ownsStream = !1, this.connectedElement = null, this.freqData = null, this.prevSpectrum = null;
  }
  async destroy() {
    if (this.disconnect(), this.ctx && this.ctx.state !== "closed") try {
      await this.ctx.close();
    } catch {
    }
    this.ctx = null;
  }
}, ji = class {
  constructor(u = {}) {
    this.recognition = null, this.mediaRecorder = null, this.audioChunks = [], this.listening = !1, this.opts = u;
  }
  isListening() {
    return this.listening;
  }
  static isBrowserSupported() {
    if (typeof window > "u") return !1;
    let u = window;
    return !!(u.SpeechRecognition || u.webkitSpeechRecognition);
  }
  async startListening(u = {}) {
    let a = { ...this.opts, ...u };
    return this.stopListening(), a.sttProvider === "google" && a.sttApiKey ? this.startGoogle(a) : this.startBrowser(a);
  }
  startBrowser(u) {
    var r;
    let a = window, i = a.SpeechRecognition || a.webkitSpeechRecognition;
    if (!i) return (r = u.onError) == null || r.call(u, new Error("Web Speech API not supported")), !1;
    let e = new i();
    return e.lang = u.sttLang || "pt-BR", e.continuous = u.sttContinuous ?? !1, e.interimResults = u.sttInterimResults ?? !0, e.maxAlternatives = 1, e.onstart = () => {
      var n;
      this.listening = !0, (n = u.onStart) == null || n.call(u);
    }, e.onresult = (n) => {
      var c, A, C;
      let o = "", t = "";
      for (let k = n.resultIndex; k < n.results.length; k++) {
        let m = n.results[k][0].transcript;
        n.results[k].isFinal ? t += m + " " : o += m;
      }
      o && ((c = u.onTranscriptChange) == null || c.call(u, o, !1)), t && ((A = u.onTranscriptChange) == null || A.call(u, t.trim(), !0), (C = u.onFinalTranscript) == null || C.call(u, t.trim()));
    }, e.onerror = (n) => {
      var o, t;
      if (n.error === "no-speech" || n.error === "aborted") {
        this.listening && ((o = u.onEnd) == null || o.call(u));
        return;
      }
      this.listening = !1, (t = u.onError) == null || t.call(u, new Error(n.error));
    }, e.onend = () => {
      var n;
      this.listening && ((n = u.onEnd) == null || n.call(u)), this.listening = !1;
    }, this.recognition = e, e.start(), !0;
  }
  async startGoogle(u) {
    var a, i;
    try {
      let e = await navigator.mediaDevices.getUserMedia({ audio: !0 }), r = new MediaRecorder(e, { mimeType: "audio/webm" });
      return this.audioChunks = [], r.ondataavailable = (n) => {
        n.data.size > 0 && this.audioChunks.push(n.data);
      }, r.onstop = async () => {
        let n = new Blob(this.audioChunks, { type: "audio/webm" }), o = new FileReader();
        o.readAsDataURL(n), o.onloadend = async () => {
          var A, C, k, m, b, w, z;
          let t = String(o.result).split(",")[1], c = u.sttApiUrl || `https://speech.googleapis.com/v1/speech:recognize?key=${u.sttApiKey}`;
          try {
            let B = await fetch(c, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ config: { encoding: "WEBM_OPUS", sampleRateHertz: 48e3, languageCode: u.sttLang || "pt-BR", enableAutomaticPunctuation: !0 }, audio: { content: t } }) });
            if (!B.ok) throw new Error(`Google STT error: ${B.status}`);
            let E = (m = (k = (C = (A = (await B.json()).results) == null ? void 0 : A[0]) == null ? void 0 : C.alternatives) == null ? void 0 : k[0]) == null ? void 0 : m.transcript;
            E && ((b = u.onFinalTranscript) == null || b.call(u, E)), (w = u.onEnd) == null || w.call(u);
          } catch (B) {
            (z = u.onError) == null || z.call(u, B);
          }
        }, e.getTracks().forEach((t) => t.stop()), this.listening = !1;
      }, this.mediaRecorder = r, r.start(), this.listening = !0, (a = u.onStart) == null || a.call(u), !0;
    } catch (e) {
      return (i = u.onError) == null || i.call(u, e), !1;
    }
  }
  stopListening() {
    if (this.listening = !1, this.recognition) {
      try {
        this.recognition.stop();
      } catch {
      }
      this.recognition = null;
    }
    if (this.mediaRecorder) {
      try {
        this.mediaRecorder.stop();
      } catch {
      }
      this.mediaRecorder = null;
    }
  }
}, wu = [{ cmd: "show", desc: "Show the avatar (resume animation)." }, { cmd: "hide", desc: "Hide the avatar (pause animation)." }, { cmd: "toggle", desc: "Toggle avatar visibility." }, { cmd: "action <id|index>", desc: "Trigger an action by id or 1-based position." }, { cmd: "actions", desc: "List available actions (index, id, name)." }, { cmd: "info", desc: "Report player info (visible, talking, action list)." }, { cmd: "speed <idle> [talk]", desc: "Set idle (and optional talk) speed. talk defaults to idle." }, { cmd: "sensitivity <0..1>", desc: "Set microphone / lip-sync sensitivity." }, { cmd: "mute", desc: "Mute microphone / output." }, { cmd: "unmute", desc: "Unmute microphone / output." }, { cmd: "tts <text>", desc: "Speak literal text via TTS (no LLM)." }, { cmd: "ask <text>", desc: "Send text to the chatbot/LLM; reply is spoken." }, { cmd: "provider <text>", desc: 'Alias of "ask".' }, { cmd: "wake", desc: "Trigger the wake/assistant pipeline manually." }, { cmd: "stop", desc: "Stop speaking / listening." }, { cmd: "help", desc: "List all commands." }], n0 = () => `Commands:
` + wu.map((u) => `  ${u.cmd.padEnd(22)} ${u.desc}`).join(`
`), t0 = (u) => {
  let a = String(u || "").trim();
  if (!a) return { verb: "", args: [], rest: "" };
  let i = a.match(/^(\S+)\s*([\s\S]*)$/), e = (i ? i[1] : a).toLowerCase(), r = i ? i[2] : "", n = [], o = /"([^"]*)"|'([^']*)'|(\S+)/g, t;
  for (; (t = o.exec(r)) !== null; ) n.push(t[1] ?? t[2] ?? t[3]);
  return { verb: e, args: n, rest: r.trim() };
}, o0 = (u, a) => {
  if (!u || u.length === 0) return null;
  let i = u.find((r) => r.id === a);
  if (i) return i.id;
  let e = parseInt(a, 10);
  return !Number.isNaN(e) && e >= 1 && e <= u.length ? u[e - 1].id : null;
}, zu = (u, a = {}) => {
  var c, A, C, k, m, b, w, z, B, E, g, F, h, p, f, K, D, d, v;
  let i = a.logger || console, { verb: e, args: r, rest: n } = t0(u), o = (l, s) => ({ ok: !0, message: l, data: s }), t = (l) => ({ ok: !1, message: l });
  try {
    switch (e) {
      case "":
        return t('Empty command. Try "help".');
      case "show":
        return (c = a.setVisible) == null || c.call(a, !0), (C = (A = a.player) == null ? void 0 : A.play) == null || C.call(A), o("Avatar shown.");
      case "hide":
        return (k = a.setVisible) == null || k.call(a, !1), (b = (m = a.player) == null ? void 0 : m.pause) == null || b.call(m), o("Avatar hidden.");
      case "toggle": {
        let l = !(!a.getVisible || a.getVisible());
        return (w = a.setVisible) == null || w.call(a, l), l ? (B = (z = a.player) == null ? void 0 : z.play) == null || B.call(z) : (g = (E = a.player) == null ? void 0 : E.pause) == null || g.call(E), o(`Avatar ${l ? "shown" : "hidden"}.`);
      }
      case "action": {
        let l = a.getActions ? a.getActions() : [];
        if (!r[0]) return t("Usage: action <id|index>");
        let s = o0(l, r[0]);
        return s ? ((F = a.triggerAction) == null || F.call(a, s), o(`Action "${s}" triggered.`, { id: s })) : t(`No action matches "${r[0]}".`);
      }
      case "actions": {
        let l = (a.getActions ? a.getActions() : []).map((y, x) => ({ index: x + 1, id: y.id, name: y.name })), s = l.length ? l.map((y) => `${y.index}) ${y.name} — id=${y.id}`).join(`
`) : "No actions available.";
        return o(s, l);
      }
      case "info": {
        let l = a.getActions ? a.getActions() : [], s = (h = a.player) == null ? void 0 : h.controller, y = { visible: a.getVisible ? a.getVisible() : void 0, talking: s ? !!s.isTalking : void 0, actions: l.map((x, S) => ({ index: S + 1, id: x.id, name: x.name })) };
        return (p = a.onInfo) == null || p.call(a, y), o("Player info.", y);
      }
      case "speed": {
        if (!r[0]) return t("Usage: speed <idle> [talk]");
        let l = parseFloat(r[0]);
        if (Number.isNaN(l)) return t("Invalid idle speed.");
        let s = r[1] != null && !Number.isNaN(parseFloat(r[1])) ? parseFloat(r[1]) : l;
        return (f = a.setSpeeds) == null || f.call(a, l, s), o(`Speed set: idle=${l}, talk=${s}.`, { idle: l, talk: s });
      }
      case "sensitivity": {
        let l = parseFloat(r[0]);
        if (Number.isNaN(l)) return t("Usage: sensitivity <0..1>");
        let s = Math.max(0, Math.min(1, l));
        return (K = a.setSensitivity) == null || K.call(a, s), o(`Sensitivity set to ${s}.`, { sensitivity: s });
      }
      case "mute":
        return (D = a.setMuted) == null || D.call(a, !0), o("Muted.");
      case "unmute":
        return (d = a.setMuted) == null || d.call(a, !1), o("Unmuted.");
      case "tts":
        return n ? a.speak ? (a.speak(n, { cancelPrevious: !0 }), o("Speaking.", { text: n })) : t("No TTS handler wired.") : t("Usage: tts <text>");
      case "ask":
      case "provider":
        return n ? a.ask ? (a.ask(n), o("Asked.", { text: n })) : t("No chatbot/LLM handler wired.") : t(`Usage: ${e} <text>`);
      case "wake":
      case "assistant":
        return a.triggerWake ? (a.triggerWake(), o("Wake pipeline triggered.")) : t("No wake handler wired.");
      case "stop":
        return (v = a.stopSpeaking) == null || v.call(a), o("Stopped.");
      case "help":
        return o(n0(), wu);
      default:
        return t(`Unknown command "${e}". Try "help".`);
    }
  } catch (l) {
    i.warn("[commands] executeCommand failed:", l);
    let s = l && l.message ? l.message : String(l);
    return t(`Command error: ${s}`);
  }
}, l0 = (u, a = {}) => {
  if (typeof window > "u") return () => {
  };
  let i = a.origins || [], e = i.includes("*"), r = u.logger || console, n = (o) => {
    var C;
    let t = o && o.data;
    if (!t || t.source !== "ania" || typeof t.cmd != "string") return;
    if (!e && i.length > 0 && !i.includes(o.origin)) {
      r.warn(`[commands] postMessage from disallowed origin "${o.origin}" ignored.`);
      return;
    }
    if (!e && i.length === 0) {
      r.warn("[commands] postMessage control received but no origins allowlisted; ignoring.");
      return;
    }
    let c = zu(t.cmd, u);
    (C = a.onResult) == null || C.call(a, c, o);
    let A = o.source;
    if (A && typeof A.postMessage == "function") try {
      A.postMessage({ source: "ania-reply", cmd: t.cmd, result: c }, o.origin && o.origin !== "null" ? o.origin : "*");
    } catch {
    }
  };
  return window.addEventListener("message", n), () => window.removeEventListener("message", n);
}, tu = ["tts", "stt", "wakeword", "action", "integration"], A0 = (u) => {
  if (!u || typeof u != "object") throw new Error("[PluginRegistry] plugin must be an object");
  if (!u.id || typeof u.id != "string") throw new Error("[PluginRegistry] plugin.id is required (string)");
  if (!tu.includes(u.kind)) throw new Error(`[PluginRegistry] plugin.kind must be one of ${tu.join(", ")} (got "${u.kind}")`);
  return u;
}, fu = class {
  constructor() {
    this.plugins = /* @__PURE__ */ new Map(), this.active = {}, this.initialized = /* @__PURE__ */ new Set(), this.listeners = /* @__PURE__ */ new Set(), this.logger = console;
  }
  subscribe(u) {
    return this.listeners.add(u), () => {
      this.listeners.delete(u);
    };
  }
  emit() {
    for (let u of this.listeners) try {
      u(this);
    } catch {
    }
  }
  register(u) {
    A0(u);
    let a = { enabled: !0, builtin: !1, version: "0.0.0", ...u };
    return this.plugins.set(a.id, a), (a.kind === "tts" || a.kind === "stt" || a.kind === "wakeword") && !this.active[a.kind] && a.enabled !== !1 && (this.active[a.kind] = a.id), this.emit(), () => this.unregister(a.id);
  }
  registerAll(u = []) {
    u.forEach((a) => this.register(a));
  }
  unregister(u) {
    let a = this.plugins.get(u);
    if (a) {
      if (this.plugins.delete(u), this.initialized.delete(u), this.active[a.kind] === u) {
        let i = this.getByKind(a.kind).find((e) => e.enabled !== !1);
        this.active[a.kind] = i ? i.id : void 0;
      }
      this.emit();
    }
  }
  get(u) {
    return this.plugins.get(u) || null;
  }
  list() {
    return Array.from(this.plugins.values());
  }
  getByKind(u) {
    return this.list().filter((a) => a.kind === u);
  }
  setEnabled(u, a) {
    let i = this.plugins.get(u);
    if (i) {
      if (i.enabled = a, !a && this.active[i.kind] === u) {
        let e = this.getByKind(i.kind).find((r) => r.id !== u && r.enabled !== !1);
        this.active[i.kind] = e ? e.id : void 0;
      } else a && !this.active[i.kind] && (i.kind === "tts" || i.kind === "stt" || i.kind === "wakeword") && (this.active[i.kind] = u);
      this.emit();
    }
  }
  setActive(u, a) {
    if (!tu.includes(u)) throw new Error(`[PluginRegistry] unknown kind "${u}"`);
    a != null && !this.plugins.has(a) && this.logger.warn(`[PluginRegistry] setActive("${u}", "${a}") — plugin not registered`), this.active[u] = a, this.emit();
  }
  getActiveId(u) {
    return this.active[u] || null;
  }
  getActive(u) {
    let a = this.active[u];
    return a && this.plugins.get(a) || null;
  }
  async ensureInit(u, a = {}) {
    let i = this.plugins.get(u);
    return i ? (!this.initialized.has(u) && typeof i.init == "function" && (await i.init({ registry: this, logger: this.logger, ...a }), this.initialized.add(u)), i) : null;
  }
  async resolveEngine(u, a = {}) {
    let i = this.getActive(u);
    return !i || (await this.ensureInit(i.id, a), typeof i.createEngine != "function") ? null : i.createEngine({ registry: this, logger: this.logger, ...a });
  }
  async resolveHandlers(u, a = {}) {
    let i = [];
    for (let e of this.getByKind(u)) e.enabled !== !1 && (await this.ensureInit(e.id, a), typeof e.createHandler == "function" && i.push({ id: e.id, handler: e.createHandler({ registry: this, logger: this.logger, ...a }) }));
    return i;
  }
  async startAll(u = {}) {
    for (let a of this.list()) a.enabled !== !1 && (await this.ensureInit(a.id, u), typeof a.start == "function" && await a.start());
  }
  async stopAll() {
    for (let u of this.list()) if (typeof u.stop == "function") try {
      await u.stop();
    } catch (a) {
      this.logger.warn(`[PluginRegistry] stop("${u.id}") failed:`, a);
    }
  }
}, uu = null, Pi = () => (uu || (uu = new fu()), uu), Eu = (u, a) => {
  let i = atob(u), e = new Uint8Array(i.length);
  for (let r = 0; r < i.length; r++) e[r] = i.charCodeAt(r);
  return new Blob([e], { type: a });
}, Cu = async (u, a, i = {}) => {
  if (a === "tiktok") {
    let e = i.voiceId || (i.gender === "male" ? "br_005" : "br_003"), r = await fetch("https://tiktok-tts.weilnet.workers.dev/api/generation", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: u, voice: e }) });
    if (!r.ok) throw new Error(`TikTok TTS error: ${r.status}`);
    let n = await r.json();
    if (!n.success || !n.data) throw new Error("TikTok TTS: invalid response");
    return { audioUrl: URL.createObjectURL(Eu(n.data, "audio/mpeg")), duration: 0 };
  }
  if (a === "elevenlabs") {
    let e = i.voiceId || "pNInz6obpgDQGcFmaJgB", r = i.model || "eleven_multilingual_v2", n = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${e}`, { method: "POST", headers: { Accept: "audio/mpeg", "Content-Type": "application/json", "xi-api-key": i.apiKey || "" }, body: JSON.stringify({ text: u, model_id: r, voice_settings: { stability: 0.5, similarity_boost: 0.75 } }) });
    if (!n.ok) throw new Error(`ElevenLabs API error: ${n.status}`);
    return { audioUrl: URL.createObjectURL(await n.blob()), duration: 0 };
  }
  if (a === "google") {
    let e = i.apiUrl || `https://texttospeech.googleapis.com/v1/text:synthesize?key=${i.apiKey}`, r = await fetch(e, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ input: { text: u }, voice: { languageCode: i.lang || "pt-BR", name: i.voiceId || "pt-BR-Standard-B", ssmlGender: i.gender === "male" ? "MALE" : i.gender === "female" ? "FEMALE" : "NEUTRAL" }, audioConfig: { audioEncoding: "MP3", speakingRate: i.rate || 1, pitch: ((i.pitch || 1) - 1) * 20 } }) });
    if (!r.ok) throw new Error(`Google TTS API error: ${r.status}`);
    let n = await r.json();
    return { audioUrl: URL.createObjectURL(Eu(n.audioContent, "audio/mpeg")), duration: 0 };
  }
  if (a === "azure") {
    let e = i.region || "brazilsouth", r = i.apiUrl || `https://${e}.tts.speech.microsoft.com/cognitiveservices/v1`, n = i.voiceId || "pt-BR-AntonioNeural", o = `<speak version='1.0' xml:lang='${i.lang || "pt-BR"}'>
      <voice name='${n}'>
        <prosody rate='${i.rate || 1}' pitch='${((i.pitch || 1) - 1) * 50}%'>
          ${u}
        </prosody>
      </voice>
    </speak>`, t = await fetch(r, { method: "POST", headers: { "Ocp-Apim-Subscription-Key": i.apiKey || "", "Content-Type": "application/ssml+xml", "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3" }, body: o });
    if (!t.ok) throw new Error(`Azure TTS API error: ${t.status}`);
    return { audioUrl: URL.createObjectURL(await t.blob()), duration: 0 };
  }
  throw new Error(`Unknown TTS provider: ${a}`);
}, B0 = (u, a = 0) => {
  if (!u || typeof Audio > "u") return null;
  let i = () => {
    try {
      let r = u.startsWith("data:") ? u : `data:audio/wav;base64,${u}`, n = new Audio(r);
      return n.play().catch(() => {
      }), n;
    } catch {
      return null;
    }
  };
  if (a > 0) {
    let r = null, n = setTimeout(() => {
      r = i();
    }, a);
    return { cancel: () => {
      clearTimeout(n), r && (r.pause(), r = null);
    } };
  }
  let e = i();
  return e ? { cancel: () => e.pause() } : null;
}, s0 = (u, a) => {
  let i = a && a.config || {}, e = null;
  return { async synthesize(r, n = {}) {
    return Cu(r, u, { ...i, ...n });
  }, async speak(r, n = {}) {
    let { audioUrl: o } = await Cu(r, u, { ...i, ...n });
    if (e) try {
      e.pause();
    } catch {
    }
    let t = new Audio(o);
    return e = t, t.addEventListener("ended", () => URL.revokeObjectURL(o), { once: !0 }), await t.play(), t;
  }, stop() {
    if (e) {
      try {
        e.pause();
      } catch {
      }
      e = null;
    }
  }, cleanup() {
    var r;
    (r = this.stop) == null || r.call(this);
  } };
}, Z = (u, a, i, e) => ({ id: u, name: a, version: "1.0.0", kind: "tts", builtin: !0, description: e, createEngine: (r) => s0(i, r) }), D0 = { id: "tts-browser", name: "Browser TTS (Web Speech)", version: "1.0.0", kind: "tts", builtin: !0, description: "window.speechSynthesis — no key, no network.", createEngine: () => ({ async speak(u, a = {}) {
  if (typeof window > "u" || !window.speechSynthesis) return null;
  a.cancelPrevious && window.speechSynthesis.cancel();
  let i = new SpeechSynthesisUtterance(u);
  return i.lang = a.lang || "pt-BR", i.rate = a.rate || 1, i.pitch = a.pitch || 1, i.volume = a.volume ?? 1, a.voice && (i.voice = a.voice), window.speechSynthesis.speak(i), i;
}, stop() {
  typeof window < "u" && window.speechSynthesis && window.speechSynthesis.cancel();
} }) }, E0 = Z("tts-tiktok", "TikTok TTS", "tiktok", "Keyless TikTok voices (br_003/br_005)."), C0 = Z("tts-elevenlabs", "ElevenLabs", "elevenlabs", "ElevenLabs multilingual (needs API key)."), c0 = Z("tts-google", "Google Cloud TTS", "google", "Google Cloud Text-to-Speech (needs API key)."), d0 = Z("tts-azure", "Azure TTS", "azure", "Azure Cognitive Services Speech (needs API key)."), m0 = { id: "tts-piper", name: "Piper (on-device ONNX)", version: "1.0.0", kind: "tts", builtin: !0, description: "Browser-side neural TTS via piper-tts-web + onnxruntime-web (optional deps).", async init(u) {
  let a = u && u.config || {};
  if (a.piperModelUrl) try {
    let { preloadPiper: i } = await import("./piper-tts-NYPYRUIX-DfVlYNZt.js");
    i(a.piperModelUrl, a.piperModelConfigUrl).catch(() => {
    });
  } catch {
  }
}, createEngine: (u) => {
  let a = u && u.config || {}, i = null;
  return { async synthesize(e, r = {}) {
    let { initPiper: n, piperSynthesize: o } = await import("./piper-tts-NYPYRUIX-DfVlYNZt.js");
    return a.piperModelUrl && await n(a.piperModelUrl, a.piperModelConfigUrl), o(e, { speakerId: r.speakerId ?? a.piperSpeakerId });
  }, async speak(e, r = {}) {
    let { audioUrl: n } = await this.synthesize(e, r);
    if (i) try {
      i.pause();
    } catch {
    }
    let o = new Audio(n);
    return i = o, o.addEventListener("ended", () => URL.revokeObjectURL(n), { once: !0 }), await o.play(), o;
  }, stop() {
    if (i) {
      try {
        i.pause();
      } catch {
      }
      i = null;
    }
  } };
} }, F0 = { id: "stt-browser", name: "Browser STT (Web Speech)", version: "1.0.0", kind: "stt", builtin: !0, description: "webkitSpeechRecognition — Chrome/Edge only, no key.", createEngine: () => ({ provider: "browser" }) }, k0 = { id: "stt-google", name: "Google Cloud STT", version: "1.0.0", kind: "stt", builtin: !0, description: "Google Cloud Speech-to-Text (needs API key).", createEngine: () => ({ provider: "google" }) }, g0 = { id: "wakeword-onnx", name: "Wake Word (OpenWakeWord ONNX)", version: "1.0.0", kind: "wakeword", builtin: !0, defaultEnabled: !1, description: "On-device wake word via onnxruntime-web (optional dep).", createEngine: async () => {
  let { getWakeWordEngine: u } = await import("./wake-word-engine-LDLQEVNE-CB7Gotvf.js");
  return u();
} }, h0 = { id: "action-audio", name: "Action Audio", version: "1.0.0", kind: "action", builtin: !0, description: "Plays an action config's base64 audio when the action fires.", createHandler: () => ({ onAction(u) {
  return u && u.audio_base64 ? B0(u.audio_base64, u.audio_delay_ms || 0) : null;
} }) }, p0 = [D0, E0, C0, c0, d0, m0, F0, k0, g0, h0], v0 = { browser: "tts-browser", tiktok: "tts-tiktok", elevenlabs: "tts-elevenlabs", google: "tts-google", azure: "tts-azure", piper: "tts-piper" }, Ki = { browser: "stt-browser", google: "stt-google" }, y0 = (u) => {
  for (let a of p0) u.get(a.id) || u.register(a);
}, Li = (u) => {
  if (!u) return null;
  let a = u.toLowerCase().split("+").map((e) => e.trim()), i = { ctrl: !1, alt: !1, shift: !1, meta: !1, key: "" };
  for (let e of a) switch (e) {
    case "ctrl":
    case "control":
      i.ctrl = !0;
      break;
    case "alt":
      i.alt = !0;
      break;
    case "shift":
      i.shift = !0;
      break;
    case "meta":
    case "cmd":
    case "command":
    case "win":
      i.meta = !0;
      break;
    default:
      i.key = e;
  }
  return i.key ? i : null;
}, Ui = (u, a) => !a || u.ctrlKey !== a.ctrl || u.altKey !== a.alt || u.shiftKey !== a.shift || u.metaKey !== a.meta ? !1 : u.key.toLowerCase() === a.key, x0 = "ania-avatar-cache", N = "avatars", G = null, b0 = () => typeof indexedDB < "u" && indexedDB !== null, O = () => new Promise((u) => {
  if (G) {
    u(G);
    return;
  }
  if (!b0()) {
    u(null);
    return;
  }
  let a = indexedDB.open(x0, 1);
  a.onerror = () => u(null), a.onsuccess = (i) => {
    G = i.target.result, u(G);
  }, a.onupgradeneeded = (i) => {
    let e = i.target.result;
    e.objectStoreNames.contains(N) || e.createObjectStore(N, { keyPath: "url" });
  };
}), w0 = (u) => {
  let a = 0;
  for (let i = 0; i < u.length; i++) a = (a << 5) - a + u.charCodeAt(i), a = a & a;
  return a.toString(36);
}, z0 = async (u) => {
  try {
    let a = await O();
    return a ? await new Promise((i) => {
      let e = a.transaction([N], "readonly").objectStore(N).get(u);
      e.onerror = () => i(null), e.onsuccess = () => {
        let r = e.result;
        if (!r) {
          i(null);
          return;
        }
        let n = Date.now() - r.timestamp, o = 10080 * 60 * 1e3;
        if (n > o) {
          Su(u), i(null);
          return;
        }
        i(r.data);
      };
    }) : null;
  } catch {
    return null;
  }
}, f0 = async (u, a, i = !1) => {
  try {
    let e = await O();
    if (!e) return;
    e.transaction([N], "readwrite").objectStore(N).put({ url: u, data: a, isEncrypted: i, timestamp: Date.now(), hash: w0(u) });
  } catch {
  }
}, Su = async (u) => {
  try {
    let a = await O();
    if (!a) return;
    a.transaction([N], "readwrite").objectStore(N).delete(u);
  } catch {
  }
}, S0 = async () => {
  try {
    let u = await O();
    if (!u) return;
    u.transaction([N], "readwrite").objectStore(N).clear();
  } catch {
  }
}, M0 = (u) => {
  if (u === 0) return "0 Bytes";
  let a = 1024, i = ["Bytes", "KB", "MB", "GB"], e = Math.floor(Math.log(u) / Math.log(a));
  return `${parseFloat((u / Math.pow(a, e)).toFixed(2))} ${i[e]}`;
}, T0 = async () => {
  try {
    let u = await O();
    return u ? await new Promise((a) => {
      let i = u.transaction([N], "readonly").objectStore(N).getAll();
      i.onsuccess = () => {
        let e = i.result || [], r = 0;
        for (let n of e) typeof n.data == "object" && (r += JSON.stringify(n.data).length);
        a({ count: e.length, size: r, sizeFormatted: M0(r) });
      }, i.onerror = () => a({ count: 0, size: 0, sizeFormatted: "0 Bytes" });
    }) : { count: 0, size: 0, sizeFormatted: "0 Bytes" };
  } catch {
    return { count: 0, size: 0, sizeFormatted: "0 Bytes" };
  }
}, Hi = { get: z0, set: f0, delete: Su, clear: S0, stats: T0 }, N0 = { chat: { input: { placeholder: "Иҭажәгал шәацҳара...", listening: "Аӡырҩра..." }, enableSound: "Абжьы аҿактәуп", stt: { transcribing: "Атранскрипциа: ", micActive: "Амикрофон активуп...", heardError: "Саҭамыз, убжьы смаҳаит. Даҽазнык шәҽазышәшәа.", micAccessError: "Амикрофон ахь анеира ауам. Азинқәа гәашәҭ." }, speed: { idle: "Аусда:", talk: "Ацәажәара:" } }, avatar: { loading: "Аватар аҭагалара...", title: { maximize: "Амаксималтәра", minimize: "Аминималтәра", close: "Иарктәуп", clickToMaximize: "Амаксимализациа азы ақәыӷәӷәара", clickToMinimize: "Ирмаҷразы шәақәыӷәӷәа" }, error: { loadFailed: "Аватар аҭагалара ауам: {{error}} ", playerNotLoaded: "АниаПлеер иҭагалаӡам", passwordRequired: "Ишәарҭоу .ania афаил азы иаҭахуп амаӡажәа", noSource: "Аватар ахыҵхырҭа аҭаӡам (avatarUrl мамзаргьы avatarData)" } }, greetings: { 0: "Салам! Сышԥабыцхраари иахьа?", 1: "Бзиара умаз! Бзиала шәаабеит! Иҟасҵар сылшозеи?", 2: "Мшыбзиа! Даара сеигәырӷьоит шәацәажәара!", 3: "Бзиара умаз! Сара абра сыҟоуп ацхырааразы. Иуҭахузеи?", 4: "Бзиара умаз! Шәшԥаҟоу? Ишԥасылшо ахәарҭа сзаанагар?" }, waiting: { 0: "Сазхәыцып...", 1: "Знык...", 2: "Аус адулара...", 3: "Секундк...", 4: "Сара уи уара узы игәасҭоит..." } }, j0 = { chat: { input: { placeholder: "Ketik pesan droeneuh...", listening: "Teungoh tadeungo..." }, enableSound: "Aktifkan Su", stt: { transcribing: "Transkripsi: ", micActive: "Mikrofon aktif...", heardError: "Maaf, hana jeut lon deungoe. Neu cuba lom.", micAccessError: "Hana jeuet ta akses mikrofon. Cek izin." }, speed: { idle: "Nganggur:", talk: "Ceramah:" } }, avatar: { loading: "Meumuat avatar...", title: { maximize: "Maksimalkan", minimize: "Meuminimalkan", close: "Tutop", clickToMaximize: "Klik keu maksimal", clickToMinimize: "Klik keu neu minimalkan" }, error: { loadFailed: "Gagal memuat avatar: {{error}} . ", playerNotLoaded: "AniaPlayer hana geumuat", passwordRequired: "Kata sandi nyang peureulee keu file .ania nyang ka teusandi .", noSource: "Hana sumber avatar nyang ka geubri (Url avatar atawa Data avatar)" } }, greetings: { 0: "Hai! Pakriban cara lôn tulông gata uroenyoe?", 1: "Halo! Saleuem! Peue nyang jeuet ulôn peubuet keu gata?", 2: "Euk! Jadi seunang that meututo ngon droeneuh!", 3: "Halo! Lon disinoe keuneuk bantu. Peue nyang gata peureulée?", 4: "Hai! Puhaba? Pakriban cara jeuet keu manfaat?" }, waiting: { 0: "Bah lon pike...", 1: "Saboh saat...", 2: "Peuproses...", 3: "Cuma si detik...", 4: "Lon cek nyan keu droeneuh..." } }, P0 = { chat: { input: { placeholder: "Co lok ni...", listening: "Wiinyo..." }, enableSound: "Yer dwan", stt: { transcribing: "Coyo lok: ", micActive: "Microphone tye ka tic...", heardError: "Tima kica, pe atwero winyo lokki. Tim ber item doki.", micAccessError: "Pe itwero donyo i cim. Nen twero." }, speed: { idle: "Pe tiyo:", talk: "Lok:" } }, avatar: { loading: "Tye ka keto cal ma ki lwongo ni avatar...", title: { maximize: "Med", minimize: "Dwok piny", close: "Cego", clickToMaximize: "Dii me medo", clickToMinimize: "Dii me dwoko piny" }, error: { loadFailed: "Pe ki twero keto cal: {{error}} ", playerNotLoaded: "AniaPlayer pe ki keto", passwordRequired: "Lok me donyo ma mite pi karatac ma ki keto i .ania", noSource: "Pe kimiyo kama ki kwanyo iye cal (avatarUrl onyo avatarData)" } }, greetings: { 0: "Apwoyo! Atwero konyi nining tin?", 1: "Amoti! Wa joli! Atwero timo gin ango piri?", 2: "Amoto wu! Cwinya yom me lok kwedi!", 3: "Amoti! Atye kany me konyi. Gin ango ma imito?", 4: "Amoti kactoma! Itye ma be? Atwero bedo ki kony nining?" }, waiting: { 0: "Wek atam...", 1: "Cawa acel...", 2: "Tiimo...", 3: "Pi ceken manok...", 4: "Atye ka neno ni piri..." } }, K0 = { chat: { input: { placeholder: "Tik jou boodskap...", listening: "Luister tans..." }, enableSound: "Aktiveer klank", stt: { transcribing: "Transkripsie: ", micActive: "Mikrofoon aktief...", heardError: "Jammer, kon jou nie hoor nie. Probeer asseblief weer.", micAccessError: "Kan nie toegang tot mikrofoon kry nie. Gaan toestemmings na." }, speed: { idle: "Idle:", talk: "Praat:" } }, avatar: { loading: "Laai tans avatar …", title: { maximize: "Maksimeer", minimize: "Minimaliseer", close: "Maak toe", clickToMaximize: "Klik om te maksimeer", clickToMinimize: "Klik om te minimaliseer" }, error: { loadFailed: "Kon nie avatar laai nie: {{error}} ", playerNotLoaded: "AniaPlayer nie gelaai nie", passwordRequired: "Wagwoord word vereis vir geënkripteerde .ania-lêer", noSource: "Geen avatarbron verskaf nie (avatarUrl of avatarData)" } }, greetings: { 0: "Hallo! Hoe kan ek jou vandag help?", 1: "Hallo! Welkom! Wat kan ek vir jou doen?", 2: "Hallo daar! So bly om met jou te praat!", 3: "Hallo! Ek is hier om te help. Wat het jy nodig?", 4: "Hallo! Hoe gaan dit met jou? Hoe kan ek nuttig wees?" }, waiting: { 0: "Laat my dink...", 1: "Een oomblik...", 2: "Verwerk tans …", 3: "Net 'n sekonde...", 4: "Ek kyk dit vir jou..." } }, L0 = { chat: { input: { placeholder: "Type wo nkrasɛm no...", listening: "Tie a woretie..." }, enableSound: "Ma Nnyigyei nyɛ adwuma", stt: { transcribing: "Nsɛm a wɔkyerɛw: ", micActive: "Microphone a ɛyɛ adwuma...", heardError: "Yɛpa wo kyɛw, mantumi ante wo. Yɛsrɛ sɛ sɔ hwɛ bio.", micAccessError: "Wontumi nkɔ afiri a wɔde kasa no so. Hwɛ tumi krataa ahorow." }, speed: { idle: "Idle: 1 .", talk: "Ɔkasa:" } }, avatar: { loading: "Wode avatar rekɔ so...", title: { maximize: "Maximize", minimize: "Tew so", close: "Bɛto mu", clickToMaximize: "Klik so na fa yɛ kɛse", clickToMinimize: "Klik so na fa ketewaa bi" }, error: { loadFailed: "Wɔantumi anhyɛ avatar: {{error}} . ", playerNotLoaded: "AniaPlayer no nnyɛ load", passwordRequired: "Password a ɛho hia ma .ania fael a wɔabɔ no kokoam", noSource: "Wɔamfa avatar fibea biara amma (avatarUrl anaa avatarData) ." } }, greetings: { 0: "Hi! Mɛyɛ dɛn aboa wo nnɛ?", 1: "Hɛlo! Akwaaba! Dɛn na metumi ayɛ ama wo?", 2: "Wo a wowɔ hɔ! Anigye kɛse sɛ me ne wo bɛkasa!", 3: "Hɛlo! Mewɔ ha sɛ merebɛboa. Dɛn na wuhia?", 4: "Hi! Wo ho te sɛn? Mɛyɛ dɛn atumi anya mfaso?" }, waiting: { 0: "Ma mensusuw ho...", 1: "Bere tiaa bi...", 2: "Nneɛma a wɔyɛ...", 3: "Sekan biako pɛ...", 4: "Me deɛ, merehwɛ saa ama wo..." } }, U0 = { chat: { input: { placeholder: "Kyewo lembe peri...", listening: "Winjo..." }, enableSound: "Wek dwal", stt: { transcribing: "Goyo: ", micActive: "Microphone utiye ka tic...", heardError: "Tima kisa, awinjo ngo. Tem kendu.", micAccessError: "Icopo nwangu ngo microphone. Nen twero." }, speed: { idle: "Idle:", talk: "Wec:" } }, avatar: { loading: "Ube ketho avatar...", title: { maximize: "Medu", minimize: "Dwok piny", close: "Cego", clickToMaximize: "Dii pi medu", clickToMinimize: "Dii pi jwigo piny" }, error: { loadFailed: "Utimo ngo avatar: {{error}} ", playerNotLoaded: "AniaPlayer epe", passwordRequired: "Lanyuth mitere pi .ania file ma jugwoko", noSource: "Kabedo pa avatar moko epe (avatarUrl nyo avatarData)" } }, greetings: { 0: "Amothi! Acopo konyi nenedi tin?", 1: "Maberi! Wofoyo bino! Ango ma acopo timo iri?", 2: "Nenedi kuca! Cwinya yom ni wecu kudi!", 3: "Maberi! Atiye kany pi konyo. Imito ango?", 4: "Maberi! Itye nenedi? Acopo bedo ku kony nenedi?" }, waiting: { 0: "Wek aparu...", 1: "Saa moko...", 2: "Tiyu...", 3: "Sekond kende...", 4: "Abe ngiyo eni piri..." } }, H0 = { chat: { input: { placeholder: "መልእክትህን ተይብ...", listening: "በማዳመጥ ላይ..." }, enableSound: "ድምጽን አንቃ", stt: { transcribing: "ገለባብጦ፡ ", micActive: "ማይክሮፎን ገባሪ...", heardError: "ይቅርታ፣ አልሰማህም። እባክዎ እንደገና ይሞክሩ።", micAccessError: "ማይክሮፎን መድረስ አልተቻለም። ፈቃዶችን ያረጋግጡ።" }, speed: { idle: "ስራ ፈት", talk: "ንግግር፡-" } }, avatar: { loading: "አምሳያ በመጫን ላይ...", title: { maximize: "ከፍ አድርግ", minimize: "አሳንስ", close: "ዝጋ", clickToMaximize: "ከፍ ለማድረግ ጠቅ ያድርጉ", clickToMinimize: "ለመቀነስ ጠቅ ያድርጉ" }, error: { loadFailed: "አምሳያ መጫን አልተሳካም፦ {{error}} ", playerNotLoaded: "AniaPlayer አልተጫነም።", passwordRequired: "ለተመሰጠረ .ania ፋይል የይለፍ ቃል ያስፈልጋል", noSource: "ምንም የአቫታር ምንጭ አልቀረበም (አቫታር ዩአርኤል ወይም አቫታር ዳታ)" } }, greetings: { 0: "ሰላም! ዛሬ እንዴት ልረዳህ እችላለሁ?", 1: "ሀሎ! እንኳን ደህና መጣህ! ምን ላድርግለወት፧", 2: "ሃይ እንዴት ናችሁ! ከእርስዎ ጋር ማውራት በጣም ደስ ብሎኛል!", 3: "ሀሎ! እኔ ለመርዳት እዚህ ነኝ። ምን ያስፈልግዎታል?", 4: "ሃይ! ስላም፧ እንዴት ጠቃሚ መሆን እችላለሁ?" }, waiting: { 0: "እስቲ ላስብበት...", 1: "አንድ አፍታ...", 2: "በማስሄድ ላይ...", 3: "አንድ ሰከንድ ብቻ...", 4: "ለአንተ እያጣራሁህ ነው..." } }, q0 = { chat: { input: { placeholder: "اكتب رسالتك...", listening: "جاري الاستماع..." }, enableSound: "تمكين الصوت", stt: { transcribing: "النسخ: ", micActive: "الميكروفون نشط...", heardError: "آسف، لم أتمكن من سماعك. يرجى المحاولة مرة أخرى.", micAccessError: "غير قادر على الوصول إلى الميكروفون. تحقق من الأذونات." }, speed: { idle: "خامل:", talk: "نقاش:" } }, avatar: { loading: "جارٍ تحميل الصورة الرمزية...", title: { maximize: "تعظيم", minimize: "تصغير", close: "إغلاق", clickToMaximize: "انقر للتكبير", clickToMinimize: "انقر للتصغير" }, error: { loadFailed: "فشل تحميل الصورة الرمزية: {{error}} ", playerNotLoaded: "لم يتم تحميل برنامج AniaPlayer", passwordRequired: "كلمة المرور مطلوبة لملف .ania المشفر", noSource: "لم يتم توفير مصدر الصورة الرمزية (avatarUrl أو avatarData)" } }, greetings: { 0: "مرحبًا! كيف يمكنني مساعدتك اليوم؟", 1: "مرحبًا! مرحباً! ما الذي يمكنني أن أفعله من أجلك؟", 2: "أهلاً! سعيدة جدا بالتحدث معك!", 3: "مرحبًا! أنا هنا للمساعدة. ماذا تحتاج؟", 4: "أهلاً! كيف حالك؟ كيف يمكنني أن أكون مفيداً؟" }, waiting: { 0: "دعني أفكر...", 1: "لحظة واحدة...", 2: "جارٍ المعالجة...", 3: "مجرد ثانية...", 4: "أنا أتحقق من ذلك بالنسبة لك ..." } }, R0 = { chat: { input: { placeholder: "আপোনাৰ বাৰ্তা টাইপ কৰক...", listening: "শুনা..." }, enableSound: "শব্দ সামৰ্থবান কৰক", stt: { transcribing: "লিপিবদ্ধ কৰা: ", micActive: "মাইক্ৰ'ফোন সক্ৰিয়...", heardError: "ক্ষমা কৰিব, শুনিব নোৱাৰিলোঁ। অনুগ্ৰহ কৰি পুনৰ চেষ্টা কৰক।", micAccessError: "মাইক্ৰ'ফোনত প্ৰৱেশ কৰিব পৰা নাই। অনুমতিসমূহ পৰীক্ষা কৰক।" }, speed: { idle: "অচল:", talk: "আলোচনা:" } }, avatar: { loading: "লোড কৰি আছে অৱতাৰ...", title: { maximize: "সৰ্বাধিক কৰক", minimize: "নূন্যতম কৰক", close: "বন্ধ কৰক", clickToMaximize: "সৰ্বাধিক কৰিবলৈ ক্লিক কৰক", clickToMinimize: "নূন্যতম কৰিবলৈ ক্লিক কৰক" }, error: { loadFailed: "অৱতাৰ লোড কৰাত ব্যৰ্থ: {{error}} ", playerNotLoaded: "AniaPlayer লোড কৰা হোৱা নাই", passwordRequired: "এনক্ৰিপ্ট কৰা .ania ফাইলৰ বাবে পাছৱৰ্ডৰ প্ৰয়োজন", noSource: "কোনো অৱতাৰ উৎস প্ৰদান কৰা হোৱা নাই (avatarUrl বা avatarData)" } }, greetings: { 0: "হাই! আজি মই আপোনাক কেনেকৈ সহায় কৰিম?", 1: "নমস্কাৰ! স্বাগতম! মই তোমাৰ বাবে কি কৰিম?", 2: "নমস্কাৰ! আপোনাৰ লগত কথা পাতি ইমানেই আনন্দিত!", 3: "নমস্কাৰ! মই ইয়াত সহায় কৰিবলৈ আহিছো। কি লাগে আপোনাক?", 4: "নমস্কাৰ! আপোনাৰ কেনে? মই কেনেকৈ উপযোগী হ’ব পাৰো?" }, waiting: { 0: "মই ভাবিবলৈ দিয়ক...", 1: "এক মুহূৰ্ত...", 2: "প্ৰচেছিং...", 3: "মাত্ৰ এটা চেকেণ্ড...", 4: "মই আপোনাৰ বাবে সেইটো পৰীক্ষা কৰি আছো..." } }, I0 = { chat: { input: { placeholder: "आपन संदेश टाइप करा...", listening: "सुनत अहैं..." }, enableSound: "ध्वनि सक्षम करा", stt: { transcribing: "प्रतिलेखन: ", micActive: "माइक्रोफोन सक्रिय है...", heardError: "माफ करब, आपका नाहीं सुन पावा। कृपया फिर से कोशिश करा।", micAccessError: "माइक्रोफोन तक पहुँचै में असमर्थ। अनुमतियन का जाँच करा।" }, speed: { idle: "निष्क्रिय:", talk: "बात:" } }, avatar: { loading: "अवतार लोड हो रहा है...", title: { maximize: "अधिकतम करा", minimize: "कम से कम करा", close: "बंद करा", clickToMaximize: "अधिकतम करै के ताईं क्लिक करा", clickToMinimize: "कम से कम करै के ताईं क्लिक करा" }, error: { loadFailed: "अवतार लोड करै मा विफल रहा: {{error}} ", playerNotLoaded: "अनियाप्लेयर लोड नाहीं भवा", passwordRequired: "एन्क्रिप्टेड .ania फ़ाइल के लिए पासवर्ड आवश्यक है", noSource: "अवतार स्रोत प्रदान नाहीं कीन गा है (अवतारयूआरएल या अवतारडाटा)" } }, greetings: { 0: "हाय! आज मैं आपकी कैसे मदद कर सकत हउँ?", 1: "हेलो! स्वागत! मैं तोहरे बरे का कर सकत हउँ?", 2: "नमस्ते! आपसे बात करै मा बहुत खुशी भै!", 3: "हेलो! मैं मदद करै के लिए हियाँ हउँ। तोहका का चाही?", 4: "नमस्ते! तुम कइसे हौ? मैं उपयोगी कैसे होइ सकत हउँ?" }, waiting: { 0: "हमका सोचै देइ...", 1: "एक क्षण...", 2: "प्रसंस्करण...", 3: "बस एक सेकंड...", 4: "हम आपके लिए ई जाँच करत हई..." } }, O0 = { chat: { input: { placeholder: "Uka yatiyawi qillqt’aña...", listening: "Ist'añax..." }, enableSound: "Sonido ukar ch’amanchaña", stt: { transcribing: "Transcripción luraña: 1.1. ", micActive: "Micrófono ukax activo ukhamawa...", heardError: "Disculpa, janiw ist’irjamäkti. Ukhamaraki, mayampi yant’apxañani.", micAccessError: "Micrófono ukar mantañax janiw ch’amäkiti. Permisonaka uñakipt’aña." }, speed: { idle: "Ocioso: 1.1.", talk: "Arstʼäwi:" } }, avatar: { loading: "Avatar ukax apkatatawa...", title: { maximize: "Maximizar ukax mä juk’a pachanakanwa", minimize: "Jisk’achaña", close: "Jist’antaña", clickToMaximize: "Ukax mä jach’a uñacht’äwiwa", clickToMinimize: "Ukax jisk’aptayañatakiw ch’iqt’añama" }, error: { loadFailed: "Avatar ukax janiw utjkiti: {{error}} . ", playerNotLoaded: "AniaPlayer ukax janiw utjkiti", passwordRequired: "Contraseña ukax .ania qillqatan encriptado ukatakiw wakisi", noSource: "Janiw kuna avatar phunchhawis utjkiti (avatarUrl jan ukax avatarData) ." } }, greetings: { 0: "¡Hi! ¿Kunjamsa jichhürunakan yanaptʼirista?", 1: "Kamisaki! Aski jutäwi! ¿Kunsa nayajj jumatak luririsma?", 2: "Kamisaki! ¡Ukham jumamp parltʼasajj wal kusista!", 3: "Kamisaki! Nayax yanapt'añatakiw akanktxa. ¿Kunas jumatakix wakisi?", 4: "Kamisaki! Kamisaraki? ¿Kunjamsa nayajj yanaptʼirista?" }, waiting: { 0: "Nayax amuyt’apxäma...", 1: "Mä juk’a pachax...", 2: "Uka lurawixa...", 3: "Mä segunda kutikiw...", 4: "Nayax jumatakix uk uñakipt'askta..." } }, W0 = { chat: { input: { placeholder: "Mesajınızı yazın...", listening: "Dinlənir..." }, enableSound: "Səsi aktivləşdirin", stt: { transcribing: "Transkripsiya: ", micActive: "Mikrofon aktivdir...", heardError: "Bağışlayın, sizi eşitmək mümkün olmadı. Yenidən cəhd edin.", micAccessError: "Mikrofona daxil olmaq mümkün deyil. İcazələri yoxlayın." }, speed: { idle: "Boş:", talk: "Danışmaq:" } }, avatar: { loading: "Avatar yüklənir...", title: { maximize: "Maksimallaşdırın", minimize: "minimuma endir", close: "Bağlayın", clickToMaximize: "Maksimum artırmaq üçün klikləyin", clickToMinimize: "Küçültmək üçün klikləyin" }, error: { loadFailed: "Avatarı yükləmək alınmadı: {{error}} ", playerNotLoaded: "AniaPlayer yüklənməyib", passwordRequired: "Şifrələnmiş .ania faylı üçün parol tələb olunur", noSource: "Heç bir avatar mənbəyi təqdim edilməyib (avatarUrl və ya avatarData)" } }, greetings: { 0: "salam! Bu gün sizə necə kömək edə bilərəm?", 1: "salam! Xoş gəldiniz! Mən sizin üçün nə edə bilərəm?", 2: "salam! Sizinlə danışmağa çox şadam!", 3: "salam! Mən kömək etmək üçün buradayam. sənə nə lazımdır?", 4: "salam! necesen Necə faydalı ola bilərəm?" }, waiting: { 0: "Qoy fikirləşim...", 1: "Bir an...", 2: "Emal edilir...", 3: "Bir saniyə...", 4: "Bunu sizin üçün yoxlayıram..." } }, _0 = { chat: { input: { placeholder: "Хәбәрегеҙҙе яҙығыҙ...", listening: "Тыңлау..." }, enableSound: "Тауышты индереү", stt: { transcribing: "Транскрипциялау: ", micActive: "Микрофон әүҙем...", heardError: "Ғәфү итегеҙ, һеҙҙе ишетә алманым. Зинһар, тағы ла тырышығыҙ.", micAccessError: "Микрофонға инә алмай. Рөхсәттәрҙе тикшерергә." }, speed: { idle: "Буш:", talk: "Һөйләшеү:" } }, avatar: { loading: "Аватар тейәп...", title: { maximize: "Максималь", minimize: "Минимизациялау", close: "Ябыҡ", clickToMaximize: "Максимизациялау өсөн баҫығыҙ", clickToMinimize: "Минимизациялау өсөн баҫығыҙ" }, error: { loadFailed: "Аватар тейәп булманы: {{error}} ", playerNotLoaded: "АниаПлейер тейәлмәгән", passwordRequired: "Шифрланған .ania файлы өсөн пароль кәрәк", noSource: "Аватар сығанағы бирелмәгән (аватарUrl йәки аватарМәғлүмәттәре)" } }, greetings: { 0: "Һаумыһығыҙ! Бөгөн мин һиңә нисек ярҙам итә алам?", 1: "Һаумыһығыҙ! Рәхим итегеҙ! Мин һиңә нимә эшләй алам?", 2: "Сәләм! Шул тиклем шатмын һеҙҙең менән һөйләшергә!", 3: "Һаумыһығыҙ! Мин бында ярҙам итергә килдем. Һиңә нимә кәрәк?", 4: "Сәләм! Хәлдәр нисек? Нисек файҙалы булырға?" }, waiting: { 0: "Уйларға рөхсәт итегеҙ...", 1: "Бер мәл...", 2: "Эшкәртеү...", 3: "Бер секунд ҡына...", 4: "Мин һинең өсөн тикшерәм..." } }, G0 = { chat: { input: { placeholder: "Ketik pabesen Sametoné...", listening: "Mirengang..." }, enableSound: "Aktipang Suara", stt: { transcribing: "Transkripsi: ", micActive: "Mikropon aktif...", heardError: "Ampura, nénten prasida mirengang Sameton. Indayang malih.", micAccessError: "Nénten prasida ngaksés mikropon. Priksa ijin" }, speed: { idle: "Nganggur:", talk: "Bebaosan:" } }, avatar: { loading: "Ngunggahang avatar...", title: { maximize: "Maksimalkan", minimize: "Kirangin", close: "Tutup", clickToMaximize: "Klik anggén maksimal", clickToMinimize: "Klik anggén ngirangin" }, error: { loadFailed: "Gagal ngunggahang avatar: {{error}} ", playerNotLoaded: "AniaPlayer nénten kamuat", passwordRequired: "Sandi sané kaperluang anggén berkas .ania sané kaenkripsi", noSource: "Nénten wénten sumber avatar sané kasediaang (Url avatar utawi Data avatar)" } }, greetings: { 0: "Hai! Sapunapi antuk tiang nulungin ragane ring rahinane mangkin?", 1: "Om Swastiastu! Rahajeng rauh! Napike sane prasida laksanayang tiang pabuat semeton?", 2: "Hai! Dados seneng mabebaosan sareng semeton!", 3: "Om Swastiastu! Tiang iriki jagi nulungin. Napi sane kabuatang?", 4: "Om Swastiastu! Punapi gatra? Sapunapiang titiang mangda prasida mawiguna?" }, waiting: { 0: "Ngiring titiang mapikayun...", 1: "Asiki galah...", 2: "Ngolah...", 3: "Wantah ajebos...", 4: "Tiang nureksain punika anggén Sameton..." } }, V0 = { chat: { input: { placeholder: "Ketik ma pesanmu...", listening: "Manangihon..." }, enableSound: "Aktifhon ma Suara", stt: { transcribing: "Manurat: ", micActive: "Mikrofon aktif...", heardError: "Sattabi, dang boi hubege hamu. Please try again.", micAccessError: "Ndang boi be masuk tu mikrofon. Pareso ma izinna." }, speed: { idle: "Nganggur:", talk: "Jamita:" } }, avatar: { loading: "Mamuat avatar...", title: { maximize: "Maksimalhon", minimize: "Meminimalkan", close: "Tutup", clickToMaximize: "Click to maximize", clickToMinimize: "Klik asa diminimalhon ." }, error: { loadFailed: "Gagal mamuat avatar: {{error}} . ", playerNotLoaded: "AniaPlayer not loaded", passwordRequired: "Dihaporluhon do sandi tu file .ania na dienkripsi .", noSource: "Dang adong sumber avatar na disediahon (Url avatar manang avatarData)" } }, greetings: { 0: "Horas! Songon dia do ahu boi mangurupi hamu sadarion?", 1: "Horas! Horas ro! What can I do for you?", 2: "Ale nadisan! So glad to talk to you!", 3: "Horas! Au dison laho mangurupi. Aha do na porlu di hamu?", 4: "Ale! Nungga songondia? How can I be useful?" }, waiting: { 0: "Loas au marpikkir...", 1: "Sada tingki...", 2: "Pangolahan...", 3: "Just a second...", 4: "Hupareso do i di ho..." } }, $0 = { chat: { input: { placeholder: "Увядзіце паведамленне...", listening: "Слуханне..." }, enableSound: "Уключыць гук", stt: { transcribing: "Транскрыпцыя: ", micActive: "Мікрафон уключаны...", heardError: "Прабачце, не пачуў вас. Калі ласка, паспрабуйце яшчэ раз.", micAccessError: "Немагчыма атрымаць доступ да мікрафона. Праверце дазволы." }, speed: { idle: "Прастой:", talk: "Размова:" } }, avatar: { loading: "Загрузка аватара...", title: { maximize: "Максімізаваць", minimize: "Мінімізаваць", close: "Блізка", clickToMaximize: "Націсніце, каб павялічыць", clickToMinimize: "Націсніце, каб згарнуць" }, error: { loadFailed: "Не ўдалося загрузіць аватар: {{error}} ", playerNotLoaded: "AniaPlayer не загружаецца", passwordRequired: "Патрабуецца пароль для зашыфраванага файла .ania", noSource: "Крыніца аватара не пададзена (avatarUrl або avatarData)" } }, greetings: { 0: "Прывітанне! Чым я магу дапамагчы вам сёння?", 1: "Прывітанне! Сардэчна запрашаем! Што я магу зрабіць для вас?", 2: "Прывітанне! Так рады пагаварыць з вамі!", 3: "Прывітанне! Я тут, каб дапамагчы. Што вам трэба?", 4: "Прывітанне! як справы Чым я магу быць карысным?" }, waiting: { 0: "Дай падумаць...", 1: "Хвілінку...", 2: "Апрацоўка...", 3: "Секундочку...", 4: "Я правяраю гэта для вас..." } }, J0 = { chat: { input: { placeholder: "Taipa imbila yobe...", listening: "Ukukutika..." }, enableSound: "Suminisheni Iciunda", stt: { transcribing: "Ukupilibula: ", micActive: "Maikulofoni ilebomba...", heardError: "Mutwelele, nshaumfwile. Mukwai esheniko nakabili.", micAccessError: "Teti mukwate maikulofoni. Moneni ifyasuminishiwa." }, speed: { idle: "Uushabomba:", talk: "Ukulanshanya:" } }, avatar: { loading: "Ukubika icikope...", title: { maximize: "Ukukulisha", minimize: "Ukucefyako", close: "Isaleni", clickToMaximize: "Tinikeni pakukulisha", clickToMinimize: "Tinikeni pakucefyako" }, error: { loadFailed: "Cafilwa ukubika icikope: {{error}} ", playerNotLoaded: "Icakubelenga ica Ania tacibikwa", passwordRequired: "Ishiwi lya kwisalilako lilekabilwa ku fayelo ya .ania iyafisama", noSource: "Tapali intuntuko ya cikope iyapeelwe (Url ya cikope nangu amashiwi ya cikope)" } }, greetings: { 0: "Mwapoleni! Bushe kuti namwafwa shani lelo?", 1: "Muli shani! Ukusengela! Cinshi ningamucitila?", 2: "Muli shani imwe! Nalitemwa nga nshi ukulanda naimwe!", 3: "Muli shani! Naisa pano ku kwafwilisha. Cinshi ico mulekabila?", 4: "Muli shani! Muli shani? Bushe kuti naba shani uwacindama?" }, waiting: { 0: "Lekeni ntontonkanye...", 1: "Inshita imo...", 2: "Ukubombela pa...", 3: "Sekondi fye imo...", 4: "Naleceeceeta ifyo kuli imwe..." } }, Z0 = { chat: { input: { placeholder: "Ketik pesan lu...", listening: "Dengerin..." }, enableSound: "Aktifin suara", stt: { transcribing: "Menranskripsi: ", micActive: "Mikrofon aktif...", heardError: "Maaf, kagak bisa denger lu. Tolong coba lagi.", micAccessError: "Gak bisa akses mikrofon. Cek izin." }, speed: { idle: "Nganggur:", talk: "Ngomong:" } }, avatar: { loading: "Lagi muat avatar...", title: { maximize: "Maksimalkan", minimize: "Minimalisir", close: "Tutup", clickToMaximize: "Klik buat maksimalin", clickToMinimize: "Klik buat ngecilin" }, error: { loadFailed: "Gagal muat avatar: {{error}} ", playerNotLoaded: "AniaPlayer kagak dimuat", passwordRequired: "Kata sandi dibutuhin buat file .ania yang dienkripsi", noSource: "Gak ada sumber avatar yang disediain (avatarUrl atau avatarData)" } }, greetings: { 0: "Hai! Gimane caranya gue bisa bantu lu hari ini?", 1: "Halo! Selamet dateng! Apa yang bisa gue lakuin buat lo?", 2: "Hai! Seneng banget bisa ngobrol sama lu!", 3: "Halo! Gue disini buat bantuin. Lu butuh apaan?", 4: "Woy! Gimane kabarnye? Gimana caranya gue bisa berguna?" }, waiting: { 0: "Biar gue pikir...", 1: "Satu saat...", 2: "Ngolah...", 3: "Cuma sebentar...", 4: "Gue lagi ngecek itu buat lu..." } }, Y0 = { chat: { input: { placeholder: "Въведете вашето съобщение...", listening: "Слушам..." }, enableSound: "Активиране на звука", stt: { transcribing: "транскрибиране: ", micActive: "Микрофонът е активен...", heardError: "Съжалявам, не те чух. Моля, опитайте отново.", micAccessError: "Няма достъп до микрофона. Проверете разрешенията." }, speed: { idle: "Неактивен:", talk: "разговор:" } }, avatar: { loading: "Аватарът се зарежда...", title: { maximize: "Увеличете максимално", minimize: "Минимизиране", close: "затвори", clickToMaximize: "Кликнете, за да увеличите", clickToMinimize: "Кликнете, за да минимизирате" }, error: { loadFailed: "Неуспешно зареждане на аватара: {{error}} ", playerNotLoaded: "AniaPlayer не е зареден", passwordRequired: "Изисква се парола за шифрован .ania файл", noSource: "Не е предоставен източник на аватар (avatarUrl или avatarData)" } }, greetings: { 0: "здрасти Как мога да ви помогна днес?", 1: "здравей Добре дошли! Какво мога да направя за вас?", 2: "здравейте! Толкова се радвам да говоря с вас!", 3: "здравей Тук съм, за да помогна. какво ти трябва", 4: "здрасти как си С какво мога да бъда полезен?" }, waiting: { 0: "Нека помисля...", 1: "Един момент...", 2: "Обработва се...", 3: "Само секунда...", 4: "Проверявам това за вас..." } }, Q0 = { chat: { input: { placeholder: "आपन संदेश टाइप करीं...", listening: "सुनत बानी..." }, enableSound: "साउंड के सक्षम करीं", stt: { transcribing: "प्रतिलिपि बनावल जा रहल बा: ", micActive: "माइक्रोफोन सक्रिय बा...", heardError: "माफ करब, रउरा के ना सुन पवनी. कृपया दोबारा कोशिश करीं।", micAccessError: "माइक तक पहुंचे में असमर्थ बानी। अनुमति के जांच करीं।" }, speed: { idle: "बेकार बा: 1।", talk: "बात कइल जाव : १." } }, avatar: { loading: "अवतार लोड हो रहल बा...", title: { maximize: "अधिकतम कइल जाव", minimize: "कम से कम कर दिहल जाव", close: "बंद कर दीं", clickToMaximize: "अधिकतम करे खातिर क्लिक करीं", clickToMinimize: "कम से कम करे खातिर क्लिक करीं" }, error: { loadFailed: "अवतार लोड करे में विफल: {{error}} ", playerNotLoaded: "AniaPlayer लोड नइखे भइल", passwordRequired: "एन्क्रिप्टेड .ania फाइल खातिर पासवर्ड के जरूरत बा", noSource: "कवनो अवतार स्रोत ना दिहल गइल (avatarUrl या avatarData)" } }, greetings: { 0: "हाय! आज हम रउरा के कइसे मदद करब?", 1: "प्रणाम! स्वागत! हम तोहरा खातिर का कर सकीले?", 2: "राम-राम! रउरा से बात करत अतना खुशी भइल!", 3: "प्रणाम! हम मदद करे खातिर आइल बानी। रउरा का चाहीं?", 4: "एहो! का हाल बा? हम कइसे उपयोगी हो सकेनी?" }, waiting: { 0: "हम सोचत बानी...", 1: "एक पल के...", 2: "प्रोसेसिंग के काम हो रहल बा...", 3: "बस एक सेकंड के...", 4: "हम रउरा खातिर ऊ चेक कर रहल बानी..." } }, X0 = { chat: { input: { placeholder: "I-type an saimong mensahe...", listening: "Nagdadangog..." }, enableSound: "I-enable an Tanog", stt: { transcribing: "Pag-transcribe: ", micActive: "Aktibo an mikropono...", heardError: "Pasensya na, dai taka nadangog. Pakiprobaran giraray.", micAccessError: "Dai kayang mag-access sa mikropono. Hilingon an mga pagtugot." }, speed: { idle: "Daing gibo:", talk: "Pahayag:" } }, avatar: { loading: "Nagloading nin avatar...", title: { maximize: "Padakulaon", minimize: "Pababaon", close: "Isara", clickToMaximize: "I-click tanganing ma-maximize", clickToMinimize: "Mag-click tanganing maibanan" }, error: { loadFailed: "Dai naka-load an avatar: {{error}} ", playerNotLoaded: "Dai pa nakarga an AniaPlayer", passwordRequired: "Kaipuhan an sekretong panlaog para sa naka-encrypt na .ania na file", noSource: "Mayo nin itinaong pinagkukuanan nin avatar (avatarUrl o avatarData)" } }, greetings: { 0: "Hi! Pano ko kamo matatabangan ngunyan?", 1: "Kumusta! Dagos! Ano an magigibo ko para saimo?", 2: "Kumusta! Maogma akong makaolay ka!", 3: "Kumusta! Yaon ako digdi para magtabang. Ano an kaipuhan mo?", 4: "Kumusta! Kumusta ka? Paano ako magigin kapaki-pakinabang?" }, waiting: { 0: "Mag-isip ako...", 1: "Sarong momento...", 2: "Pagproseso...", 3: "Sarong segundo sana...", 4: "Sinisiyasat ko iyan para saimo..." } }, u4 = { chat: { input: { placeholder: "I ka cikan sɛbɛn...", listening: "Lamɛnni kɛli..." }, enableSound: "Mankan (Mankan) daminɛ", stt: { transcribing: "Sɛbɛnni kɛli: ", micActive: "Microphone active...", heardError: "Baasi tɛ, n ma se k'i ka kuma mɛn. Aw ye aw jija ka segin a kan.", micAccessError: "A tɛ se ka don mikro la. Aw ye yamaruyaw lajɛ." }, speed: { idle: "Idle:", talk: "Jɛmu:" } }, avatar: { loading: "Avatar bɛ ka chargement...", title: { maximize: "A ka ca a la", minimize: "Aw ye a dɔgɔya", close: "A da tugu", clickToMaximize: "Klik walasa ka fɛn caman kɛ", clickToMinimize: "Klik walasa ka dɔgɔya" }, error: { loadFailed: "A ma se ka avatar doni: {{error}} . ", playerNotLoaded: "AniaPlayer ma doni", passwordRequired: "Password min ka kan ka kɛ .ania file sirilen na", noSource: "Avatar sɔrɔyɔrɔ si ma di (avatarUrl walima avatarData) ." } }, greetings: { 0: "Bonjour! Ne bɛ se k’i dɛmɛ cogo di bi?", 1: "Aw ni baara! I danse! Ne bɛ se ka mun kɛ aw ye?", 2: "Ani ce yan! A nisɔndiyara kosɛbɛ ka kuma i fɛ!", 3: "Aw ni baara! Ne bɛ yan ka dɛmɛ don. I mago bɛ mun na?", 4: "Aw ni baara! I ka kɛnɛ wa? Ne bɛ se ka kɛ mɔgɔ nafama ye cogo di?" }, waiting: { 0: "A to n ka miiri...", 1: "Waati kelen...", 2: "Baarakɛcogo...", 3: "Seginnkanni dɔrɔn...", 4: "N b'o lajɛ aw ye..." } }, a4 = { chat: { input: { placeholder: "আপনার বার্তা টাইপ করুন...", listening: "শুনছি..." }, enableSound: "সাউন্ড সক্ষম করুন", stt: { transcribing: "প্রতিলিপি করা: ", micActive: "মাইক্রোফোন সক্রিয়...", heardError: "দুঃখিত, আপনার কথা শুনতে পারিনি। আবার চেষ্টা করুন.", micAccessError: "মাইক্রোফোন অ্যাক্সেস করতে অক্ষম। অনুমতি পরীক্ষা করুন." }, speed: { idle: "নিষ্ক্রিয়:", talk: "কথা:" } }, avatar: { loading: "অবতার লোড হচ্ছে...", title: { maximize: "সর্বাধিক করুন", minimize: "ছোট করুন", close: "বন্ধ", clickToMaximize: "সর্বাধিক করতে ক্লিক করুন", clickToMinimize: "ছোট করতে ক্লিক করুন" }, error: { loadFailed: "অবতার লোড করতে ব্যর্থ হয়েছে: {{error}} ", playerNotLoaded: "AniaPlayer লোড হয়নি", passwordRequired: "এনক্রিপ্ট করা .ania ফাইলের জন্য পাসওয়ার্ড প্রয়োজন", noSource: "কোন অবতার উৎস প্রদান করা হয়নি (avatarUrl বা avatarData)" } }, greetings: { 0: "হাই! আমি আজ কিভাবে আপনাকে সাহায্য করতে পারি?", 1: "নমস্কার! স্বাগতম! আমি তোমার জন্য কি করতে পারি?", 2: "হাই সেখানে! আপনার সাথে কথা বলে খুব খুশি!", 3: "নমস্কার! আমি সাহায্য করতে এখানে আছি. তোমার কি দরকার?", 4: "হাই! কেমন আছেন? আমি কিভাবে দরকারী হতে পারে?" }, waiting: { 0: "আমাকে ভাবতে দাও...", 1: "এক মুহূর্ত...", 2: "প্রক্রিয়া করা হচ্ছে...", 3: "মাত্র এক সেকেন্ড...", 4: "আমি আপনার জন্য এটি পরীক্ষা করছি..." } }, e4 = { chat: { input: { placeholder: "Bizskrivit ho kemennadenn...", listening: "O selaou..." }, enableSound: "Gweredekaat ar son", stt: { transcribing: "Treuzskrivañ : ", micActive: "Mikrofon oberiant...", heardError: "Digarez, n'em eus ket klevet ac'hanoc'h. Klaskit en-dro mar plij.", micAccessError: "N'haller ket mont e darempred gant ar mikro. Gwiriañ an aotreoù." }, speed: { idle: "Didalvoud :", talk: "Komz :" } }, avatar: { loading: "O kargañ an avatar...", title: { maximize: "Brasaat", minimize: "Bihanaat", close: "Serriñ", clickToMaximize: "Klikañ evit brasaat", clickToMinimize: "Klikañ evit digreskiñ" }, error: { loadFailed: "C'hwitet war kargañ an avatar : {{error}} ", playerNotLoaded: "N'eo ket bet karget AniaPlayer", passwordRequired: "Ur ger-tremen ret evit ar restr .ania enrineget", noSource: "Mammenn avatar ebet kinniget (avatarUrl pe avatarData)" } }, greetings: { 0: "Salud ! Penaos e c'hellan sikour ac'hanoc'h hiziv?", 1: "Salud deoc'h! Degemer mat! Petra a c'hellan ober evidoc'h?", 2: "Ac'hanta tudoù! Laouen on o komz ganeoc'h !", 3: "Salud deoc'h! Amañ emaon evit sikour. Petra hoc'h eus ezhomm?", 4: "Salud! Mont a ra? Penaos e c'hellan bezañ talvoudus?" }, waiting: { 0: "Lakait ac'hanon da soñjal...", 1: "Ur pennadig...", 2: "O treuzfurmiñ...", 3: "Un eilenn hepken...", 4: "Gwiriañ a ran an dra-se evidoc'h..." } }, i4 = { chat: { input: { placeholder: "Upišite svoju poruku...", listening: "slušam..." }, enableSound: "Omogući zvuk", stt: { transcribing: "Transkripcija: ", micActive: "Mikrofon aktivan...", heardError: "Izvinite, nisam vas čuo. Molimo pokušajte ponovo.", micAccessError: "Nije moguće pristupiti mikrofonu. Provjerite dozvole." }, speed: { idle: "mirovanje:", talk: "razgovor:" } }, avatar: { loading: "Učitavanje avatara...", title: { maximize: "Maksimiziraj", minimize: "Minimizirajte", close: "Zatvori", clickToMaximize: "Kliknite da povećate", clickToMinimize: "Kliknite da minimizirate" }, error: { loadFailed: "Učitavanje avatara nije uspjelo: {{error}} ", playerNotLoaded: "AniaPlayer nije učitan", passwordRequired: "Lozinka je potrebna za šifriranu .ania datoteku", noSource: "Nije naveden izvor avatara (avatarUrl ili avatarData)" } }, greetings: { 0: "Zdravo! Kako vam mogu pomoći danas?", 1: "Zdravo! Dobrodošli! Šta mogu učiniti za vas?", 2: "Zdravo! Drago mi je da razgovaram sa vama!", 3: "Zdravo! Tu sam da pomognem. sta ti treba", 4: "Zdravo! Kako si? Kako mogu biti koristan?" }, waiting: { 0: "pusti me da razmislim...", 1: "jedan trenutak...", 2: "Obrada...", 3: "Samo trenutak...", 4: "Provjeravam to za tebe..." } }, r4 = { chat: { input: { placeholder: "Ketik ma pesan nassiam...", listening: "Manangar..." }, enableSound: "Aktifkon Soara", stt: { transcribing: "Manranskripsihon: ", micActive: "Mikrofon aktif...", heardError: "Santabi, lang tarbogei ham. Uji ma use.", micAccessError: "Lang boi masuk hu mikrofon. Pareksa ma ijin." }, speed: { idle: "Lang marhorja:", talk: "Marsahap:" } }, avatar: { loading: "Mamuat avatar...", title: { maximize: "Maksimalhon", minimize: "Paetek", close: "Tutup", clickToMaximize: "Klik laho mamaksimalhon", clickToMinimize: "Klik laho mangurangi" }, error: { loadFailed: "Gagal mamuat avatar: {{error}} ", playerNotLoaded: "AniaPlayer lang i muat", passwordRequired: "Hata sandi na ihaporluhon bani file .ania na terenkripsi", noSource: "Lang dong sumber avatar na ibere (avatarUrl atap avatarData)" } }, greetings: { 0: "Horas! Sonaha ahu boi mangurupi ham sadari on?", 1: "Horas! Selamat datang! Aha ma na boi bahenonku bamu?", 2: "Oi baya! Malas tumang uhurhu marsahap pakon nassiam!", 3: "Horas! Ijon do ahu laho mangurupi. Aha do na porlu bamu?", 4: "Horas! Aha kabarmu? Sonaha ase boi ahu marguna?" }, waiting: { 0: "Paturut ham ma ahu marpingkir...", 1: "Sada panorang...", 2: "Mamproses...", 3: "Sadetik dassa...", 4: "Hupareksa do ai bamu..." } }, n4 = { chat: { input: { placeholder: "Ketikken pesanndu...", listening: "Megiken..." }, enableSound: "Aktifken Sora", stt: { transcribing: "Mentranskripsiken: ", micActive: "Mikrofon enggo aktif...", heardError: "Sentabi, la banci kubegi kam. Tolong cubakenndu mulihi.", micAccessError: "Labo banci iaksesna mikrofon. Periksalah izin-izin si lit." }, speed: { idle: "Nganggur:", talk: "Ceramah:" } }, avatar: { loading: "Muat avatar...", title: { maximize: "Maksimalken", minimize: "Minimalken", close: "Tutup", clickToMaximize: "Klik guna memaksimalken .", clickToMinimize: "Klik guna meminimalken ." }, error: { loadFailed: "Gagal muat avatar: {{error}} . ", playerNotLoaded: "AniaPemain la i muat .", passwordRequired: "Kata sandi si iperluken guna file .ania si enggo i enkripsi .", noSource: "La lit sumber avatar si isediaken (Url avatar ntah pe Data avatar)" } }, greetings: { 0: "Hai! Uga banci kusampati kam sendah?", 1: "Halo! Selamat datang! Kai kin banci kubahan man bandu?", 2: "Uga! Emaka meriah kel ukurku ngerana ras kam!", 3: "Halo! Aku i jenda guna nampati. Kai si iperlukenndu?", 4: "Halo! Uga berita ndu? Uga carana gelah banci aku erguna?" }, waiting: { 0: "Mari ku ukuri...", 1: "Sada paksa...", 2: "Pengolahen...", 3: "Sada detik ngenca...", 4: "Kuperiksa nge e man bandu..." } }, t4 = { chat: { input: { placeholder: "Мэдүүлэлээ бэшэгты...", listening: "Шагнажа байнаб..." }, enableSound: "Абяа нээхэ", stt: { transcribing: "Транскрипци: ", micActive: "Микрофон эдэбхитэй...", heardError: "Хүлисыт, таанадые дуулаагүйб. Дахин туршагты.", micAccessError: "Микрофондо орохо аргагүй. Зүбшөөлнүүдые шалгаха." }, speed: { idle: "Хооһон:", talk: "Хөөрэлдөөн:" } }, avatar: { loading: "Аватар ашаглажа байна...", title: { maximize: "Ехэ болгохо", minimize: "Бага болгохо", close: "Хааха", clickToMaximize: "Томо болгохын тула дараха", clickToMinimize: "Бага болгохын тула дараха" }, error: { loadFailed: "Аватар ашаглажа шадаагүй: {{error}} ", playerNotLoaded: "AniaPlayer ашаглагдаагүй", passwordRequired: "Шифрлэгдэһэн .ania файлда нууц үгэ хэрэгтэй", noSource: "Аватарай эхи үгы (avatarUrl гү, али avatarData)" } }, greetings: { 0: "Амар мэндэ! Мүнөөдэр би шамда яажа туһалхабиб?", 1: "Мэндээ! Орожо хайрлыт! Би шамда юу хэжэ шадахабиб?", 2: "Сайн! Таанадтай хөөрэлдэхэдөө ехэ баяртайб!", 3: "Мэндээ! Би эндэ туһалхаяа ерээб. Юун хэрэгтэйб?", 4: "Сайн! Хэр байнабта? Би яажа туһатай байхаб?" }, waiting: { 0: "Би бодожо үзэе...", 1: "Нэгэ агшин...", 2: "Болбосоруулха...", 3: "Нэгэ секундын...", 4: "Би шамда шалгажа байнаб..." } }, o4 = { chat: { input: { placeholder: "Escriu el teu missatge...", listening: "Escoltant..." }, enableSound: "Activa el so", stt: { transcribing: "Transcripció: ", micActive: "Micròfon actiu...", heardError: "Ho sento, no t'he pogut escoltar. Si us plau, torna-ho a provar.", micAccessError: "No es pot accedir al micròfon. Comproveu els permisos." }, speed: { idle: "Inactiu:", talk: "Xerrada:" } }, avatar: { loading: "S'està carregant l'avatar...", title: { maximize: "Maximitzar", minimize: "Minimitzar", close: "Tancar", clickToMaximize: "Feu clic per maximitzar", clickToMinimize: "Feu clic per minimitzar" }, error: { loadFailed: "No s'ha pogut carregar l'avatar: {{error}} ", playerNotLoaded: "AniaPlayer no carregat", passwordRequired: "Cal una contrasenya per al fitxer .ania xifrat", noSource: "No s'ha proporcionat cap font d'avatar (avatarUrl o avatarData)" } }, greetings: { 0: "hola! Com et puc ajudar avui?", 1: "hola! Benvingut! Què puc fer per tu?", 2: "Hola! Molt content de parlar amb tu!", 3: "hola! Estic aquí per ajudar. Què necessites?", 4: "hola! Com estàs? Com puc ser útil?" }, waiting: { 0: "Deixa'm pensar...", 1: "Un moment...", 2: "S'està processant...", 3: "Només un segon...", 4: "T'estic comprovant..." } }, l4 = { chat: { input: { placeholder: "I-type ang imong mensahe...", listening: "Nagpaminaw..." }, enableSound: "I-enable ang Tingog", stt: { transcribing: "Pag-transcribe: ", micActive: "Aktibo ang mikropono...", heardError: "Sorry, dili ko makadungog nimo. Palihug sulayi pag-usab.", micAccessError: "Dili ma-access ang mikropono. Susiha ang mga permiso." }, speed: { idle: "walay pulos:", talk: "Pakigsulti:" } }, avatar: { loading: "Nagkarga sa avatar...", title: { maximize: "I-maximize", minimize: "Pagminus", close: "Duol", clickToMaximize: "I-klik aron ma-maximize", clickToMinimize: "Pag-klik aron maminusan" }, error: { loadFailed: "Napakyas sa pag-load sa avatar: {{error}} ", playerNotLoaded: "Wala gikarga ang AniaPlayer", passwordRequired: "Kinahanglan ang password para sa na-encrypt nga .ania file", noSource: "Walay gihatag nga tinubdan sa avatar (avatarUrl o avatarData)" } }, greetings: { 0: "Hi! Unsaon nako pagtabang kanimo karon?", 1: "Hello! Welcome! Unsa may akong mabuhat para nimo?", 2: "Kumusta diha! Nalipay kaayo nga nakigsulti kanimo!", 3: "Hello! Ania ko aron motabang. Unsay imong gikinahanglan?", 4: "Hi! Naunsa ka? Sa unsang paagi ako mahimong mapuslanon?" }, waiting: { 0: "Pahunahuna ko...", 1: "Usa ka higayon...", 2: "Nagproseso...", 3: "Kadiyot lang...", 4: "Gisusi ko kana alang kanimo ..." } }, A4 = { chat: { input: { placeholder: "Tamu obutumwa bwawe...", listening: "Okuhurikiza..." }, enableSound: "Taho Amaraka", stt: { transcribing: "Okuhandiika: ", micActive: "Amazindaaro gariho...", heardError: "Nsasira, tindabaasize kukuhurira. Hakyiri ogyezeho ogundi murundi.", micAccessError: "Titurikubaasa kutunga akazindaaro. Reeba orusa." }, speed: { idle: "Obutakora:", talk: "Okugamba:" } }, avatar: { loading: "Okutaho ekishushani...", title: { maximize: "Okwongyera", minimize: "Kyendeeza", close: "Kwinga", clickToMaximize: "Nyiga kutunguura", clickToMinimize: "Nyiga kukyendeeza" }, error: { loadFailed: "Kiremirwe kutaho ekishushani: {{error}} ", playerNotLoaded: "AniaPlayer terikuteebwaho", passwordRequired: "Password neeyetengyesa ahabwa fairo ya .ania esherekirwe", noSource: "Tihariho entandikwa y'ekishushani erikuheebwa (ekishushaniUrl narishi ekishushaniData)" } }, greetings: { 0: "Haro! Nimbaasa kukuhwera nta erizooba?", 1: "Haro! Kurikayo! Nkakukorera ki?", 2: "Ori ota okwe! Ninshemererwa munonga kugamba naiwe!", 3: "Haro! Ndi aha kuyamba. Noyetenga ki?", 4: "Haro! Oragambaki? Nimbaasa kuba nta ow’omugasho?" }, waiting: { 0: "Reka ntekateeke...", 1: "Akaanya kamwe...", 2: "Okukora...", 3: "Akasekondi kakye...", 4: "Ekyo ninkikyebera ahabwawe..." } }, B4 = { chat: { input: { placeholder: "Шке серышым возо...", listening: "Колыштмаш..." }, enableSound: "Йӱкым ышташ", stt: { transcribing: "Транскрипций: ", micActive: "Микрофон пашам ышта...", heardError: "Чаманен каласыман, тендам колын омыл. Пожалуйста, угыч ыштен ончо.", micAccessError: "Микрофон деке пураш ок лий. Разрешенийым тергымаш." }, speed: { idle: "Яра:", talk: "Ойлымаш:" } }, avatar: { loading: "Аватарым загрузка...", title: { maximize: "Максимизировать", minimize: "Минимизировать", close: "Петыраш", clickToMaximize: "Кугу лийже манын, темдал", clickToMinimize: "Иземдаш манын, темдал" }, error: { loadFailed: "Аватар загрузкым ыштен кертын огыл: {{error}} ", playerNotLoaded: "AniaPlayer огеш нал", passwordRequired: "Шифроватлыме .ania файллан шолыпмут кӱлеш", noSource: "Аватар источникым пуымо огыл (avatarUrl але avatarData)" } }, greetings: { 0: "Салам лийже! Таче мый тыланет кузе полшен кертам?", 1: "Салам! Пагален ӱжына! Тыланда мом ыштен кертам?", 2: "Чылалан салам! Тендан дене мутланаш моткоч куаненам!", 3: "Салам! Мый тыште полшаш улам. Мо кӱлеш?", 4: "Салам! Кандайсыз? Кузе мый пайдале лийын кертам?" }, waiting: { 0: "Шоналтыза...", 1: "Ик тат...", 2: "Обрабатыватлымаш...", 3: "Ик секунд веле...", 4: "Мый тидым тыланет тергем..." } }, s4 = { chat: { input: { placeholder: "نامەکەت بنووسە...", listening: "گوێگرتن..." }, enableSound: "دەنگ چالاک بکە", stt: { transcribing: "نووسینەوە: ", micActive: "مایکرۆفۆن چالاکە...", heardError: "ببورە، نەمتوانی گوێم لێت بێت. تکایە دووبارە هەوڵبدەرەوە.", micAccessError: "ناتوانرێت دەستت بگات بە مایکرۆفۆن. مۆڵەتەکان بپشکنە." }, speed: { idle: "بێکار:", talk: "قسە:" } }, avatar: { loading: "بارکردنی ئاڤاتاری...", title: { maximize: "زۆرترین", minimize: "کەمکردنەوە", close: "دابخە", clickToMaximize: "بۆ زۆرترین کلیک کلیک بکە", clickToMinimize: "بۆ کەمکردنەوە کلیک بکە" }, error: { loadFailed: "شکستی هێنا لە بارکردنی ئاڤاتاری: {{error}} ", playerNotLoaded: "AniaPlayer بار نەکراوە", passwordRequired: "وشەی نهێنی پێویستە بۆ پەڕگەی .ania کۆدکراو", noSource: "هیچ سەرچاوەیەکی ئاڤاتاری دابین نەکراوە (avatarUrl یان avatarData)" } }, greetings: { 0: "سڵاو! ئەمڕۆ چۆن بتوانم یارمەتیت بدەم؟", 1: "سڵاو! بەخێربێیت! چیت بۆ بکەم؟", 2: "سڵاو! زۆر خۆشحاڵم کە قسەت لەگەڵ دەکەم!", 3: "سڵاو! من لێرەم بۆ یارمەتیدان. چیت پێویستە؟", 4: "سڵاو! چۆنی؟ چۆن بتوانم سوودم هەبێت؟" }, waiting: { 0: "با بیر لەوە بکەمەوە...", 1: "یەک سات...", 2: "پرۆسێسکردن...", 3: "تەنها یەک چرکە...", 4: "من ئەوەت بۆ دەپشکنم..." } }, D4 = { chat: { input: { placeholder: "Na cakuat kha ttial...", listening: "Ngaih..." }, enableSound: "Aw kha On", stt: { transcribing: "Ca ṭial: ", micActive: "Microphone a cawlcang...", heardError: "Ngaihthiam, na bia kan thei kho lo. Zaangfahnak tein rak i zuam tthan.", micAccessError: "Microphone hman khawh a si lo. Nawlpeknak hna kha zoh." }, speed: { idle: "Riantuan lo:", talk: "Biachim:" } }, avatar: { loading: "Avatar a luh lio...", title: { maximize: "A tam bik tuah", minimize: "Tlawmter", close: "Khar", clickToMaximize: "A tam bik tuah awkah hmet", clickToMinimize: "Tlawmter awkah hmet" }, error: { loadFailed: "Avatar load tuah khawh a si lo: {{error}} ", playerNotLoaded: "AniaPlayer cu a lut lo", passwordRequired: "Encrypted .ania file caah password a herh", noSource: "Avatar hrampi pek a si lo (avatarUrl asiloah avatarData)" } }, greetings: { 0: "Hi! Nihin ah zeitindah kan bawmh khawh lai?", 1: "Halo! Don! Zeidah kan tuah piak khawh lai?", 2: "Halo! Nangmah he bia i ruah cu kaa lawm tuk!", 3: "Halo! Bawmh awkah ka um. Zeidah na herh?", 4: "Hi! Na dam maw? Zeitindah santlaihnak ka ngeih khawh lai?" }, waiting: { 0: "Ka ruah tuah...", 1: "Caan tlawmpal...", 2: "Tuah...", 3: "Second pakhat te lawng...", 4: "Cucu nangmah caah ka zohfel..." } }, E4 = { chat: { input: { placeholder: "Scrivite u vostru messagiu...", listening: "Ascolta..." }, enableSound: "Attivà u sonu", stt: { transcribing: "Trascrizione: ", micActive: "Microfonu attivu...", heardError: "Scusate, ùn ti pudia sente. Per piacè pruvate di novu.", micAccessError: "Impossibile à accede à u microfonu. Verificate i permessi." }, speed: { idle: "Idle:", talk: "Parlà:" } }, avatar: { loading: "Caricamentu di l'avatar...", title: { maximize: "Maximize", minimize: "Minimizà", close: "Chiudi", clickToMaximize: "Cliccate per maximizà", clickToMinimize: "Cliccate per minimizzà" }, error: { loadFailed: "Fallu di carica l'avatar: {{error}} ", playerNotLoaded: "AniaPlayer ùn hè micca caricatu", passwordRequired: "Password necessaria per u schedariu .ania criptatu", noSource: "Nisuna fonte di avatar furnita (avatarUrl o avatarData)" } }, greetings: { 0: "Salute ! Cumu possu aiutà vi oghje ?", 1: "Bonghjornu! Benvenuti! Chì possu fà per voi ?", 2: "Bonghjornu à tutti! Cusì felice di parlà cun voi!", 3: "Bonghjornu! Sò quì per aiutà. Chì avete bisognu?", 4: "Salute ! Cumu si? Cumu possu esse utile?" }, waiting: { 0: "Lasciami pensà...", 1: "Un mumentu...", 2: "Trattamentu...", 3: "Solu un secondu...", 4: "Aghju verificatu chì per voi..." } }, C4 = { chat: { input: { placeholder: "Хаберинъизни язынъыз...", listening: "Динълемек..." }, enableSound: "Сесни чалыштырмакъ .", stt: { transcribing: "Транскрипция япмакъ: ", micActive: "Микрофон фааль...", heardError: "Афу этинъиз, сизни эшитип оламадым. Риджа этем, бир даа тырышынъыз.", micAccessError: "Микрофонгъа кирмек мумкюн дегиль. Иджазелерни тешкеринъиз." }, speed: { idle: "Бош:", talk: "Лакъырды:" } }, avatar: { loading: "Аватар юклене...", title: { maximize: "Максималь .", minimize: "Энъ эксиклештирмек", close: "Якъын", clickToMaximize: "Энъ буюклештирмек ичюн басынъыз .", clickToMinimize: "Кичиклештирмек ичюн басынъыз ." }, error: { loadFailed: "Аватарны юклемек мумкюн олмады: {{error}} ", playerNotLoaded: "АниаПлейер юкленмеди .", passwordRequired: "Шифрленген .ania файлы ичюн пароль керек .", noSource: "Аватар менбасы берильмеген (avatarUrl я да avatarData)" } }, greetings: { 0: "Селям алейкум! Бугунь мен санъа насыл ярдым этерим?", 1: "Мераба! Хош кельдинъ! Мен санъа не япайым?", 2: "Мераба! Сизнен лаф этмеге пек къуванам!", 3: "Мераба! Мен мында ярдым этмеге кельдим. Санъа не керек?", 4: "Селям! Ишлер насыл? Насыл этип файдалы ола билем?" }, waiting: { 0: "Тюшюнейим...", 1: "Бир дакъкъа...", 2: "Ишлев...", 3: "Тек бир саниеде...", 4: "Мен буны сиз ичюн тешкерип бакъайым..." } }, c4 = { chat: { input: { placeholder: "tip ou mesaz...", listening: "pe ekoute..." }, enableSound: "permet son", stt: { transcribing: "Transkripsyon: ", micActive: "Mikro i aktiv...", heardError: "dezole, mon pa'n kapab tann ou. silvouple esey ankor.", micAccessError: "pa kapab ganny akse avek mikro. Tyek bann permisyon." }, speed: { idle: "inaktif:", talk: "Koze:" } }, avatar: { loading: "pe load avatar...", title: { maximize: "maksimize", minimize: "minimiz", close: "Fermen", clickToMaximize: "Klik pou maksimiz", clickToMinimize: "Klik pou minimiz" }, error: { loadFailed: "pa'n reisi load avatar: {{error}} ", playerNotLoaded: "AniaPlayer pa'n ganny load", passwordRequired: "Modpas i neseser pou en dosye .ania enkripte", noSource: "napa sours avatar ki'n ganny donnen (avatarUrl oubyen avatarData)" } }, greetings: { 0: "Bonzour! ki mannyer mon kapab ed ou ozordi?", 1: "Alo! Byenveni! Ki mon kapab fer pour ou?", 2: "Alo! mon vreman kontan pou koz avek ou!", 3: "Alo! Mon la pou ede. Ki ou bezwen?", 4: "Alo! Konman ou sava? ki mannyer mon kapab itil?" }, waiting: { 0: "les mwan mazinen...", 1: "en moman...", 2: "Pe prosese...", 3: "zis en segonn...", 4: "mon pe tyek sa pou ou..." } }, d4 = { chat: { input: { placeholder: "Napište svou zprávu...", listening: "Poslouchám..." }, enableSound: "Povolit zvuk", stt: { transcribing: "přepis: ", micActive: "Mikrofon aktivní...", heardError: "Promiň, neslyšel jsem tě. Zkuste to prosím znovu.", micAccessError: "Nelze získat přístup k mikrofonu. Zkontrolujte oprávnění." }, speed: { idle: "Nečinný:", talk: "mluvit:" } }, avatar: { loading: "Načítání avatara...", title: { maximize: "Maximalizovat", minimize: "Minimalizovat", close: "Zavřít", clickToMaximize: "Kliknutím maximalizujete", clickToMinimize: "Kliknutím minimalizujete" }, error: { loadFailed: "Nepodařilo se načíst avatar: {{error}} ", playerNotLoaded: "AniaPlayer není načten", passwordRequired: "Pro zašifrovaný soubor .ania je vyžadováno heslo", noSource: "Nebyl poskytnut žádný zdroj avatara (avatarUrl nebo avatarData)" } }, greetings: { 0: "Ahoj! Jak vám dnes mohu pomoci?", 1: "Ahoj! Vítejte! co pro vás mohu udělat?", 2: "Dobrý den! Jsem rád, že s vámi mohu mluvit!", 3: "Ahoj! Jsem tady, abych vám pomohl. co potřebuješ", 4: "Ahoj! Jak se máte? Jak mohu být užitečný?" }, waiting: { 0: "Nech mě přemýšlet...", 1: "Moment...", 2: "Zpracovává se...", 3: "Jen vteřinku...", 4: "Ověřuji ti to..." } }, m4 = { chat: { input: { placeholder: "Хӑвӑрӑн ҫырӑва ҫырӑр...", listening: "Итлесе..." }, enableSound: "Сасса ӗҫлеттер", stt: { transcribing: "Транскрипцилесси: ", micActive: "Микрофон ӗҫлет...", heardError: "Каҫарӑр, сире илтеймерӗм. Тархасшӑн, тепӗр хут тытӑнса пӑхӑр.", micAccessError: "Микрофон патне кӗме май ҫук. Ирӗксене тӗрӗслӗр." }, speed: { idle: "Ӗҫсӗр:", talk: "Калаҫу:" } }, avatar: { loading: "Аватар загрузки...", title: { maximize: "Пысӑклат", minimize: "Пӗчӗклет", close: "Хуп", clickToMaximize: "Пысӑклатма пусӑр", clickToMinimize: "Пӗчӗклетме пусӑр" }, error: { loadFailed: "Аватара илме май килмерӗ: {{error}} ", playerNotLoaded: "AniaPlayer ҫӗкленмен", passwordRequired: "Шифрланӑ .ania файл валли пароль кирлӗ", noSource: "Аватар ҫӑлкуҫӗ ҫук (avatarUrl е avatarData)" } }, greetings: { 0: "Салам! Паян эпӗ сана мӗнле пулӑшма пултаратӑп?", 1: "Салам! Ырӑ сунса кӗтетпӗр! Мӗн тума пултаратӑп-ха эпӗ саншӑн?", 2: "Пурне те салам! Сирӗнпе калаҫма питӗ хавас!", 3: "Салам! Эпӗ кунта пулӑшма килтӗм. Мӗн кирлӗ сана?", 4: "Салам! Мӗнле пурӑнатӑр? Эпӗ мӗнле усӑллӑ пулма пултаратӑп?" }, waiting: { 0: "Шухӑшласа пӑхам-ха...", 1: "Пӗр самант...", 2: "Ӗҫлесе хатӗрлесси...", 3: "Пӗр ҫеккунт кӑна...", 4: "Эпӗ ӑна сирӗншӗн тӗрӗслетӗп..." } }, F4 = { chat: { input: { placeholder: "Teipiwch eich neges...", listening: "Wrth wrando..." }, enableSound: "Galluogi Sain", stt: { transcribing: "Trawsgrifio: ", micActive: "Meicroffon yn weithredol...", heardError: "Mae'n ddrwg gennym, methu clywed chi. Ceisiwch eto.", micAccessError: "Methu cyrchu meicroffon. Gwirio caniatadau." }, speed: { idle: "segur:", talk: "Sgwrs:" } }, avatar: { loading: "Wrthi'n llwytho avatar...", title: { maximize: "Mwyhau", minimize: "Lleihewch", close: "Cau", clickToMaximize: "Cliciwch i wneud y mwyaf", clickToMinimize: "Cliciwch i leihau" }, error: { loadFailed: "Wedi methu llwytho avatar: {{error}} ", playerNotLoaded: "AniaPlayer heb ei lwytho", passwordRequired: "Mae angen cyfrinair ar gyfer ffeil .ania wedi'i hamgryptio", noSource: "Ni ddarparwyd ffynhonnell avatar (avatarUrl neu avatarData)" } }, greetings: { 0: "Helo! Sut gallaf eich helpu heddiw?", 1: "Helo! Croeso! Beth alla i ei wneud i chi?", 2: "Helo yno! Mor falch o siarad â chi!", 3: "Helo! Rydw i yma i helpu. Beth sydd ei angen arnoch chi?", 4: "Helo! Sut wyt ti? Sut alla i fod yn ddefnyddiol?" }, waiting: { 0: "Gadewch i mi feddwl...", 1: "Un eiliad...", 2: "Wrthi'n prosesu...", 3: "Dim ond eiliad...", 4: "Rwy'n gwirio hynny i chi ..." } }, k4 = { chat: { input: { placeholder: "Skriv din besked...", listening: "Lytter..." }, enableSound: "Aktiver lyd", stt: { transcribing: "Transskribering: ", micActive: "Mikrofon aktiv...", heardError: "Undskyld, jeg kunne ikke høre dig. Prøv venligst igen.", micAccessError: "Kan ikke få adgang til mikrofonen. Tjek tilladelser." }, speed: { idle: "Inaktiv:", talk: "Snak:" } }, avatar: { loading: "Indlæser avatar...", title: { maximize: "Maksimer", minimize: "Minimer", close: "Luk", clickToMaximize: "Klik for at maksimere", clickToMinimize: "Klik for at minimere" }, error: { loadFailed: "Kunne ikke indlæse avatar: {{error}} ", playerNotLoaded: "AniaPlayer ikke indlæst", passwordRequired: "Adgangskode påkrævet til krypteret .ania-fil", noSource: "Ingen avatarkilde angivet (avatarUrl eller avatarData)" } }, greetings: { 0: "Hej! Hvordan kan jeg hjælpe dig i dag?", 1: "Hej! Velkomst! Hvad kan jeg gøre for dig?", 2: "Hej! Så glad for at tale med dig!", 3: "Hej! Jeg er her for at hjælpe. Hvad har du brug for?", 4: "Hej! Hvordan har du det? Hvordan kan jeg være nyttig?" }, waiting: { 0: "Lad mig tænke...", 1: "Et øjeblik...", 2: "Behandler...", 3: "Bare et sekund...", 4: "Jeg tjekker det for dig..." } }, g4 = { chat: { input: { placeholder: "Geben Sie Ihre Nachricht ein...", listening: "Zuhören..." }, enableSound: "Ton aktivieren", stt: { transcribing: "Transkribieren: ", micActive: "Mikrofon aktiv...", heardError: "Tut mir leid, ich konnte dich nicht hören. Bitte versuchen Sie es erneut.", micAccessError: "Auf das Mikrofon kann nicht zugegriffen werden. Überprüfen Sie die Berechtigungen." }, speed: { idle: "Leerlauf:", talk: "Vortrag:" } }, avatar: { loading: "Avatar wird geladen...", title: { maximize: "Maximieren", minimize: "Minimieren", close: "Schließen", clickToMaximize: "Klicken Sie zum Maximieren", clickToMinimize: "Klicken Sie zum Minimieren" }, error: { loadFailed: "Avatar konnte nicht geladen werden: {{error}} ", playerNotLoaded: "AniaPlayer nicht geladen", passwordRequired: "Für die verschlüsselte .ania-Datei ist ein Passwort erforderlich", noSource: "Keine Avatar-Quelle angegeben (avatarUrl oder avatarData)" } }, greetings: { 0: "Hallo! Wie kann ich Ihnen heute helfen?", 1: "Hallo! Willkommen! Was kann ich für Sie tun?", 2: "Hallo! Ich freue mich sehr, mit Ihnen zu sprechen!", 3: "Hallo! Ich bin hier, um zu helfen. Was brauchen Sie?", 4: "Hallo! Wie geht es dir? Wie kann ich nützlich sein?" }, waiting: { 0: "Lass mich nachdenken...", 1: "Einen Moment...", 2: "Verarbeitung...", 3: "Nur eine Sekunde...", 4: "Ich überprüfe das für Sie..." } }, h4 = { chat: { input: { placeholder: "Gät wɛ̈tdu...", listening: "Piŋ..." }, enableSound: "Tääu ë röl", stt: { transcribing: "Gät de wël: ", micActive: "Miikröfon atɔ̈u...", heardError: "Pääl ɣën awuoc, këc yïn pïŋ. Yïn thiëcku ba bɛɛr them.", micAccessError: "Acïï lëu bï yök në maikrofon yic. Tïŋ kä cïke puɔ̈l." }, speed: { idle: "Kë cïn kë lui:", talk: "Jam:" } }, avatar: { loading: "Tääu ë thura...", title: { maximize: "Tääu ë kë dït", minimize: "Koor", close: "Thiök", clickToMaximize: "Tuany ba dït", clickToMinimize: "Tuany ba cɔk koor" }, error: { loadFailed: "Acï löny bï thura tääu thïn: {{error}} ", playerNotLoaded: "AniaPlëyer akëc tääu", passwordRequired: "Wɛ̈t ë gël akɔɔr tënë athör cï thiaan .ania", noSource: "Acïn të bïï ë kë cï nyuɔɔth thïn cï bɛ̈i (kë cï nyuɔɔthUrl wɛ̈lɛ̈/ka Kä cïke nyuɔɔth)" } }, greetings: { 0: "Yïn yök! Yeŋö ba looi ba yï kony akölë?", 1: "Ɣä! Taue thin! Yeŋö ba looi tënë yï?", 2: "Kuudwal käjuec! Ku ɣɛn acï puɔ̈u miɛt ba jam kek yïn!", 3: "Ɣä! Ɣɛn tɔ̈ ëtënë ba kuɔny. Yeŋö wïc yïn?", 4: "Yin ca möth! Loi ɣëdε? Yeŋö lëu ba ya luui?" }, waiting: { 0: "Cɔk ɣɛn tak...", 1: "Thaar tök...", 2: "Luɔɔi...", 3: "Aköl tök abac...", 4: "Ɣɛn ye yeen tïŋ tënë yïn..." } }, p4 = { chat: { input: { placeholder: "अपना मैसेज टाइप करो...", listening: "सुनते हुए..." }, enableSound: "साउंड सक्षम करो", stt: { transcribing: "लिपिबद्ध करना: ", micActive: "माइक्रोफोन सक्रिय ऐ...", heardError: "माफ करना, सुनी नहीं सकेया। कृपा करियै दुबारा कोशश करो।", micAccessError: "माइक एक्सेस करने च असमर्थ। अनुमतियां दी जांच करो।" }, speed: { idle: "बेकार:", talk: "गल्ल करो:" } }, avatar: { loading: "अवतार लोड हो रहा है...", title: { maximize: "अधिकतम करो", minimize: "कम से कम कर दे", close: "बंद करो", clickToMaximize: "अधिकतम करने लेई क्लिक करो", clickToMinimize: "कम से कम करने लेई क्लिक करो" }, error: { loadFailed: "अवतार लोड करने च असफल: {{error}} ", playerNotLoaded: "AniaPlayer लोड नहीं होया", passwordRequired: "एन्क्रिप्टेड .ania फाइल आस्तै पासवर्ड दी लोड़ ऐ", noSource: "कोई अवतार स्रोत नेईं दित्ता गेआ (avatarUrl जां avatarData)" } }, greetings: { 0: "हाय ! अज्ज मैं तुंदी मदद किस चाल्ली करी सकना ऐ?", 1: "नमस्कार! सुआगत! मैं तुहाडे वास्ते की कर सकदा हां?", 2: "नमस्ते! तुहाडे नाल गल्ल करन दी इतनी खुशी हो गई!", 3: "नमस्कार! मैं इत्थे मदद करन लई आया हां। तुसेंगी केह़ लोड़ ऐ?", 4: "नमस्ते! थुआढ़ा केह् हाल ऐ? मैं किवें उपयोगी हो सकदा हां?" }, waiting: { 0: "मैं सोचदा हां...", 1: "इक पल...", 2: "प्रोसेसिंग करदे होई...", 3: "बस इक सेकंड...", 4: "मैं तुहाडे वास्ते ओह चेक कर रेहा हां..." } }, v4 = { chat: { input: { placeholder: "Lemba mulumbe wako...", listening: "Kuswiilizya..." }, enableSound: "Bikka Muzuzumo", stt: { transcribing: "Kulemba: ", micActive: "Maikkulofooni ilikubeleka...", heardError: "ndausa, teensi ndakakumvwa. Kosola alimwi.", micAccessError: "Tachikonzyi kunjila mumaikkulofooni. Langa zyeelelo." }, speed: { idle: "Kakwiina kuchita:", talk: "Makani:" } }, avatar: { loading: "Kubikka avatar...", title: { maximize: "Kuyungizya", minimize: "Kucesya", close: "Jala", clickToMaximize: "Dina kuti uyungizye", clickToMinimize: "Dina kuti uchiche" }, error: { loadFailed: "Kwakachilwa kubikka avatar: {{error}} ", playerNotLoaded: "AniaPlayer tiiyakabikkwa pe", passwordRequired: "Ipasiwedi ilayandika kufailo lya .ania lilembedwe", noSource: "Taakwe nkobakajana zifwanikiso (avatarUrl naa avatarData)" } }, greetings: { 0: "Wapona! Ino inga ndakugwasya biyeni sunu?", 1: "Mbiyeni! Watambulwa! Ino ndilakuchitilaanzi?", 2: "Wapona oko! Ndabotelwa kwaambuula ayebo!", 3: "Mbiyeni! Ndili aano kugwasya. Ninzi nchoyanda?", 4: "Wapona! Ulibiyeni? Ino inga ndagwasya biyeni?" }, waiting: { 0: "Ndileke ndiyeeye...", 1: "Chimwi chiindi...", 2: "Kubamba...", 3: "Muchindi chifwiifwi...", 4: "Ndili mukukulanga eecho kuli nduwe..." } }, y4 = { chat: { input: { placeholder: "ތިޔަ މެސެޖު ޓައިޕް ކުރާށެވެ...", listening: "އަޑުއަހަން..." }, enableSound: "އަޑު އެނެބަލް ކުރާށެވެ", stt: { transcribing: "ޓްރާންސްކްރިޕްޓް ކުރުން: ", micActive: "މައިކްރޯފޯން އެކްޓިވް...", heardError: "ސޮރީ، އަޑު އިވޭ ގޮތެއް ނުވި. އަނެއްކާވެސް މަސައްކަތް ކުރައްވާށެވެ.", micAccessError: "މައިކް އަށް ވަދެވޭނެ ގޮތެއް ނުވި އެވެ. ހުއްދަތައް ޗެކްކުރުން." }, speed: { idle: "އައިޑަލް:", talk: "ވާހަކަ:" } }, avatar: { loading: "އަވަޓަރ ލޯޑް ކުރަނީ...", title: { maximize: "މެކްސިމަޒް ކުރުން", minimize: "އެންމެ ކުޑަކުރުން", close: "ބަންދުކޮށްލާށެވެ", clickToMaximize: "މެކްސިމަޒް ކުރުމަށް ކްލިކް ކުރާށެވެ", clickToMinimize: "މިނިމައިޒް ކުރުމަށް ކްލިކް ކުރާށެވެ" }, error: { loadFailed: "އަވަޓަރ ލޯޑް ނުކުރެވިއްޖެ: {{error}} ", playerNotLoaded: "AniaPlayer ލޯޑް ނުކުރެވިއްޖެއެވެ", passwordRequired: "އެންކްރިޕްޓް ކުރެވިފައިވާ .ania ފައިލް އަށް ޕާސްވޯޑް ބޭނުންވެއެވެ", noSource: "އަވަޓަރ ސޯސްއެއް ފޯރުކޮށްދީފައެއް ނުވެއެވެ (avatarUrl ނުވަތަ avatarData)" } }, greetings: { 0: "ހައި! މިއަދު އަހަރެން ކަލެއަށް އެހީތެރިވެދެވޭނީ ކިހިނެއް ހެއްޔެވެ؟", 1: "އައްސަލާމް ޢަލައިކުމް! މަރުޙަބާ! އަހަރެން ކަލެއަށް ކޮށްދެވޭނީ ކޮންކަމެއް ހެއްޔެވެ؟", 2: "އައްސަލާމް ޢަލައިކުމް! ސޯ ގްރޭޑް ޓު ޓޯކް ޓު ޔޫ!", 3: "އައްސަލާމް ޢަލައިކުމް! އަހަރެން މިހުރީ އެހީތެރިވާން. ބޭނުންވަނީ ކޮންކަމެއް ހެއްޔެވެ؟", 4: "އައްސަލާމް ޢަލައިކުމް! ހާލު ކިހިނެތް؟ އަހަރެން ބޭނުންތެރި ވާނީ ކިހިނެއް ހެއްޔެވެ؟" }, waiting: { 0: "އަޅުގަނޑު ވިސްނާލަން...", 1: "އެއް ހިނދުކޮޅު...", 2: "ޕްރޮސެސިންގ...", 3: "އެންމެ ސިކުންތެއް...", 4: "އަހަރެން އެކަން ޗެކް ކުރަނީ ކަލެއަށް..." } }, x4 = { chat: { input: { placeholder: "ཁྱོད་རའི་འཕྲིན་དོན་ཡིག་དཔར་རྐྱབས།", listening: "ཉན་བཞིན་པ།" }, enableSound: "སྒྲ་སྐད་ལྕོགས་ཅན་བཟོ།", stt: { transcribing: "ཡིག་བསྒྱུར་འབད་དོ། ", micActive: "མའི་ཀོརོ་ཕོན་ཤུགས་ལྡན་...", heardError: "དགོངས་དག་ཞུ། ཁྱོད་ཀྱི་གོ་མ་ཚུགས། ལོག་སྟེ་འབད་རྩོལ་བསྐྱེད་གནང་།", micAccessError: "སྐད་འཕྲིན་འཛུལ་སྤྱོད་འབད་མ་ཚུགས། གནང་བ་ཚུ་ཞིབ་དཔྱད་འབད།" }, speed: { idle: "ལཱ་མེད་:", talk: "གསུང་བཤད།" } }, avatar: { loading: "གཟུགས་བརྙན་མངོན་གསལ་འབད་དོ།", title: { maximize: "ཆེར་བསྐྱེད་འབད།", minimize: "ཉུང་ཉུང་བཟོ།", close: "ཁ་བསྡམས།", clickToMaximize: "ཆེར་བསྐྱེད་འབད་ནི་ལུ་ཨེབ་གཏང་།", clickToMinimize: "ཆུང་ཀུ་བཟོ་ནི་ལུ་ཨེབ་གཏང་།" }, error: { loadFailed: "གཟུགས་བརྙན་མངོན་གསལ་འབད་ནི་ལུ་འཐུས་ཤོར་བྱུང་ཡོདཔ།: {{error}} ", playerNotLoaded: "AniaPlayer མངོན་གསལ་མ་འབད་བས།", passwordRequired: "གསང་བཟོས་ .ania ཡིག་སྣོད་ཀྱི་དོན་ལུ་ཆོག་ཡིག་དགོཔ།", noSource: "ཨེ་ཝ་ཊར་འབྱུང་ཁུངས་བྱིན་མ་བཏུབ་ (avatarUrl ཡང་ན་ avatarData)" } }, greetings: { 0: "ཧི་! ད་རེས་ང་གིས་ཁྱོད་ལུ་ག་དེ་སྦེ་ཆ་རོགས་འབད་ནི་སྨོ?", 1: "སྐུ༌གཟུགས༌བཟང༌པོ! འབྱོན་པར་ལེགས་སོ! ང་གིས་ཁྱོད་ལུ་ག་ཅི་འབད་ཚུགས་ནི་སྨོ།", 2: "གེ༌ར༌ལུ༌སྐུ༌གཟུགས༌བཟང༌པོ! ཁྱོད་དང་མཉམ་དུ་ཁ་སླབ་པར་དགའ་པོ་བྱུང་།", 3: "སྐུ༌གཟུགས༌བཟང༌པོ! ང་འདིར་རོགས་རམ་བྱ་བར་འོང༌། ག་ཅི་དགོཔ་སྨོ?", 4: "སྐུ༌གཟུགས༌བཟང༌པོ! ཁྱོད༌ག༌དེ༌སྦེ༌ཡོད? ཕན་ཐོགས་ག་དེ་སྦེ་འབྱུང་ཚུགས།" }, waiting: { 0: "ང་ལུ་བསམ་བློ་གཏང་བཅུག...", 1: "སྐར་མ་གཅིག་...", 2: "ལས་སྦྱོར་འབད་དོ།", 3: "སྐར་མ་གཅིག་རྐྱངམ་གཅིག...", 4: "ང་ཁྱོད་ཀྱི་དོན་ལུ་བརྟག་དཔྱད་འབད་དོ།" } }, b4 = { chat: { input: { placeholder: "Ŋlɔ wò gbedasi...", listening: "Toɖoɖo..." }, enableSound: "Na Gbeɖiɖi Nawɔ dɔ", stt: { transcribing: "Nuŋɔŋlɔ ŋɔŋlɔ: ", micActive: "Nuƒomɔ̃ si le dɔ wɔm...", heardError: "Kpeɖeŋutɔ, nyemete ŋu se wò nya o. Taflatse gadze agbagba ake.", micAccessError: "Mete ŋu ge ɖe nuƒomɔ̃a me o. Kpɔ mɔɖeɖewo ɖa." }, speed: { idle: "Dɔmawɔmawɔ:", talk: "Nuƒo:" } }, avatar: { loading: "Wole avatar xɔm...", title: { maximize: "Madzi ɖe edzi", minimize: "Ðe edzi", close: "Kloe", clickToMaximize: "Zi edzi be nàkpɔe wòalolo wu", clickToMinimize: "Zi edzi be nàɖe edzi akpɔtɔ" }, error: { loadFailed: "Do kpo avatar ƒe agba tsɔtsɔ: {{error}} . ", playerNotLoaded: "AniaPlayer metsɔ agba o", passwordRequired: "Nyagbe si hiã na .ania faɛl si wotsɔ nya ɣaɣlawo ŋlɔ", noSource: "Wometsɔ avatar dzɔtsoƒe aɖeke na o (avatarUrl alo avatarData) ." } }, greetings: { 0: "Hi! Aleke mate ŋu akpe ɖe ŋuwò egbea?", 1: "Hello! Woezɔ̃! Nukae mate ŋu awɔ na wò?", 2: "Medo gbe na mi! Edzɔ dzi nam ŋutɔ be meƒo nu kpli wò!", 3: "Hello! Meva afisia be makpe ɖe ŋunye. Nukae nèhiã?", 4: "Alekee! Efɔ̃a? Aleke mate ŋu aɖe vi?" }, waiting: { 0: "Mina mabu eŋu be...", 1: "Ɣeyiɣi ɖeka...", 2: "Dɔwɔwɔ tso eŋu...", 3: "Sɛkɛnd ɖeka pɛ ko...", 4: "Mele ŋku lém ɖe ema ŋu na wò..." } }, w4 = { chat: { input: { placeholder: "Πληκτρολογήστε το μήνυμά σας...", listening: "Ακούγοντας..." }, enableSound: "Ενεργοποίηση ήχου", stt: { transcribing: "Μεταγραφή: ", micActive: "Ενεργό μικρόφωνο...", heardError: "Συγγνώμη, δεν σε άκουσα. Δοκιμάστε ξανά.", micAccessError: "Δεν είναι δυνατή η πρόσβαση στο μικρόφωνο. Ελέγξτε τις άδειες." }, speed: { idle: "Σε αδράνεια:", talk: "Συζήτηση:" } }, avatar: { loading: "Φόρτωση avatar...", title: { maximize: "Μεγιστοποίηση", minimize: "Ελαχιστοποίηση", close: "Κλείσιμο", clickToMaximize: "Κάντε κλικ για μεγιστοποίηση", clickToMinimize: "Κάντε κλικ για ελαχιστοποίηση" }, error: { loadFailed: "Η φόρτωση του avatar απέτυχε: {{error}} ", playerNotLoaded: "Το AniaPlayer δεν έχει φορτωθεί", passwordRequired: "Απαιτείται κωδικός πρόσβασης για κρυπτογραφημένο αρχείο .ania", noSource: "Δεν παρέχεται πηγή avatar (avatarUrl ή avatarData)" } }, greetings: { 0: "Γεια σου! Πώς μπορώ να σας βοηθήσω σήμερα;", 1: "Γειά σου! Καλωσόρισμα! Τι μπορώ να κάνω για σένα;", 2: "Γεια σου! Χαίρομαι που μιλάω μαζί σου!", 3: "Γειά σου! Είμαι εδώ για να βοηθήσω. Τι χρειάζεσαι;", 4: "Γεια! Τι κάνετε; Πώς μπορώ να είμαι χρήσιμος;" }, waiting: { 0: "Άσε με να σκεφτώ...", 1: "Μια στιγμή...", 2: "Επεξεργασία...", 3: "Μόλις ένα δευτερόλεπτο...", 4: "Το τσεκάρω για σένα..." } }, z4 = { "chat.input.placeholder": "Type your message...", "chat.input.listening": "Listening...", "chat.enableSound": "Enable Sound", "chat.stt.transcribing": "Transcribing: ", "chat.stt.micActive": "Microphone active...", "chat.stt.heardError": "Sorry, couldn't hear you. Please try again.", "chat.stt.micAccessError": "Unable to access microphone. Check permissions.", "chat.speed.idle": "Idle:", "chat.speed.talk": "Talk:", "avatar.loading": "Loading avatar...", "avatar.title.maximize": "Maximize", "avatar.title.minimize": "Minimize", "avatar.title.close": "Close", "avatar.title.clickToMaximize": "Click to maximize", "avatar.title.clickToMinimize": "Click to minimize", "avatar.error.loadFailed": "Failed to load avatar: {{error}}", "avatar.error.playerNotLoaded": "AniaPlayer not loaded", "avatar.error.passwordRequired": "Password required for encrypted .ania file", "avatar.error.noSource": "No avatar source provided (avatarUrl or avatarData)", greetings: { 0: "Hi! How can I help you today?", 1: "Hello! Welcome! What can I do for you?", 2: "Hi there! So glad to talk to you!", 3: "Hello! I'm here to help. What do you need?", 4: "Hi! How are you? How can I be useful?" }, waiting: { 0: "Let me think...", 1: "One moment...", 2: "Processing...", 3: "Just a second...", 4: "I'm checking that for you..." } }, f4 = { chat: { input: { placeholder: "Tajpu vian mesaĝon...", listening: "Aŭskultante..." }, enableSound: "Ebligu Sonon", stt: { transcribing: "Transskribado: ", micActive: "Aktiva mikrofono...", heardError: "Pardonu, mi ne povis aŭdi vin. Bonvolu provi denove.", micAccessError: "Ne eblas aliri mikrofonon. Kontrolu permesojn." }, speed: { idle: "Neaktiva:", talk: "Diskuto:" } }, avatar: { loading: "Ŝarĝante avataron...", title: { maximize: "Maksimumigi", minimize: "Minimumigi", close: "Fermu", clickToMaximize: "Klaku por maksimumigi", clickToMinimize: "Klaku por minimumigi" }, error: { loadFailed: "Malsukcesis ŝargi avataron: {{error}} ", playerNotLoaded: "AniaPlayer ne ŝargita", passwordRequired: "Pasvorto necesa por ĉifrita .ania dosiero", noSource: "Neniu avatarfonto disponigita (avatarUrl aŭ avatarData)" } }, greetings: { 0: "Saluton! Kiel mi povas helpi vin hodiaŭ?", 1: "Saluton! Bonvenon! Kion mi povas fari por vi?", 2: "Saluton! Tiel ĝojas paroli kun vi!", 3: "Saluton! Mi estas ĉi tie por helpi. Kion vi bezonas?", 4: "Saluton! Kiel vi fartas? Kiel mi povas esti utila?" }, waiting: { 0: "Lasu min pensi...", 1: "Unu momento...", 2: "Prilaborado...", 3: "Nur sekundo...", 4: "Mi kontrolas tion por vi..." } }, S4 = { chat: { input: { placeholder: "Escribe tu mensaje...", listening: "Escuchando..." }, enableSound: "Habilitar sonido", stt: { transcribing: "Transcribiendo: ", micActive: "Micrófono activo...", heardError: "Lo siento, no pude oírte. Por favor inténtalo de nuevo.", micAccessError: "No se puede acceder al micrófono. Verificar permisos." }, speed: { idle: "Inactivo:", talk: "Charla:" } }, avatar: { loading: "Cargando avatar...", title: { maximize: "maximizar", minimize: "minimizar", close: "Cerrar", clickToMaximize: "Haga clic para maximizar", clickToMinimize: "Haga clic para minimizar" }, error: { loadFailed: "No se pudo cargar el avatar: {{error}} ", playerNotLoaded: "AniaPlayer no cargado", passwordRequired: "Se requiere contraseña para el archivo .ania cifrado", noSource: "No se proporciona ninguna fuente de avatar (avatarUrl o avatarData)" } }, greetings: { 0: "¡Hola! ¿Cómo puedo ayudarte hoy?", 1: "¡Hola! ¡Bienvenido! ¿Qué puedo hacer por ti?", 2: "¡Hola! ¡Me alegra mucho hablar contigo!", 3: "¡Hola! Estoy aquí para ayudar. ¿Qué necesitas?", 4: "¡Hola! ¿Cómo estás? ¿Cómo puedo ser útil?" }, waiting: { 0: "Déjame pensar...", 1: "Un momento...", 2: "Procesando...", 3: "Sólo un segundo...", 4: "Estoy comprobando eso por ti..." } }, M4 = { chat: { input: { placeholder: "Sisestage oma sõnum...", listening: "Kuulan..." }, enableSound: "Luba heli", stt: { transcribing: "Transkribeerimine: ", micActive: "Mikrofon aktiivne...", heardError: "Vabandust, ma ei kuulnud teid. Palun proovi uuesti.", micAccessError: "Mikrofonile ei pääse juurde. Kontrolli õigusi." }, speed: { idle: "Tühikäik:", talk: "Rääkige:" } }, avatar: { loading: "Avatari laadimine...", title: { maximize: "Maksimeerida", minimize: "Minimeeri", close: "Sule", clickToMaximize: "Maksimeerimiseks klõpsake", clickToMinimize: "Minimeerimiseks klõpsake" }, error: { loadFailed: "Avatari laadimine ebaõnnestus: {{error}} ", playerNotLoaded: "AniaPlayerit pole laaditud", passwordRequired: "Krüptitud .ania-faili jaoks on vaja parooli", noSource: "Avatari allikat ei pakuta (avatarUrl või avatarData)" } }, greetings: { 0: "Tere! Kuidas saan teid täna aidata?", 1: "Tere! Tere tulemast! Mida ma saan teie heaks teha?", 2: "Tere! Nii hea meel teiega rääkida!", 3: "Tere! Olen siin, et aidata. Mida sa vajad?", 4: "Tere! Kuidas läheb? Kuidas saan kasulik olla?" }, waiting: { 0: "Las ma mõtlen...", 1: "Üks hetk...", 2: "Töötlemine...", 3: "Vaid sekund...", 4: "Ma kontrollin seda teie jaoks..." } }, T4 = { chat: { input: { placeholder: "Idatzi zure mezua...", listening: "Entzuten..." }, enableSound: "Gaitu soinua", stt: { transcribing: "Transkripzioa: ", micActive: "Mikrofonoa aktibo...", heardError: "Barkatu, ezin zaitut entzun. Mesedez, saiatu berriro.", micAccessError: "Ezin da mikrofonora sartu. Egiaztatu baimenak." }, speed: { idle: "Inaktibo:", talk: "Hitzaldia:" } }, avatar: { loading: "Avatarra kargatzen...", title: { maximize: "Maximizatu", minimize: "Minimizatu", close: "Itxi", clickToMaximize: "Egin klik maximizatzeko", clickToMinimize: "Egin klik minimizatzeko" }, error: { loadFailed: "Ezin izan da avatarra kargatu: {{error}} ", playerNotLoaded: "AniaPlayer ez da kargatu", passwordRequired: "Pasahitza behar da enkriptatutako .ania fitxategirako", noSource: "Ez da avatar iturririk eman (avatarUrl edo avatarData)" } }, greetings: { 0: "Kaixo! Nola lagundu dezaket gaur?", 1: "Kaixo! Ongi etorri! Zer egin dezaket zuretzat?", 2: "Kaixo! Pozten naiz zurekin hitz egiteaz!", 3: "Kaixo! Hemen nago laguntzeko. Zer behar duzu?", 4: "Kaixo! Zer moduz zaude? Nola izan naiteke erabilgarria?" }, waiting: { 0: "Utzidazu pentsatzen...", 1: "Momentu bat...", 2: "Prozesatzen...", 3: "Segundo bat besterik ez...", 4: "Zuretzat egiaztatzen ari naiz..." } }, N4 = { chat: { input: { placeholder: "پیام خود را تایپ کنید...", listening: "گوش دادن..." }, enableSound: "صدا را فعال کنید", stt: { transcribing: "رونویسی: ", micActive: "میکروفون فعال ...", heardError: "متاسفم، نتونستم صداتو بشنوم لطفا دوباره امتحان کنید.", micAccessError: "دسترسی به میکروفون امکان پذیر نیست. مجوزها را بررسی کنید." }, speed: { idle: "بیکار:", talk: "بحث:" } }, avatar: { loading: "در حال بارگیری نماد...", title: { maximize: "به حداکثر رساندن", minimize: "به حداقل رساندن", close: "بستن", clickToMaximize: "برای به حداکثر رساندن کلیک کنید", clickToMinimize: "برای کوچک کردن کلیک کنید" }, error: { loadFailed: "آواتار بارگیری نشد: {{error}} ", playerNotLoaded: "AniaPlayer بارگذاری نشده است", passwordRequired: "رمز عبور برای فایل .ania رمزگذاری شده مورد نیاز است", noSource: "منبع آواتاری ارائه نشده است (avatarUrl یا avatarData)" } }, greetings: { 0: "سلام! امروز چگونه می توانم به شما کمک کنم؟", 1: "سلام! خوش آمدید! چه کاری می توانم برای شما انجام دهم؟", 2: "سلام! خیلی خوشحالم که با شما صحبت می کنم!", 3: "سلام! من اینجا هستم تا کمک کنم. چه چیزی نیاز دارید؟", 4: "سلام! چطوری؟ چگونه می توانم مفید باشم؟" }, waiting: { 0: "بذار فکر کنم...", 1: "یک لحظه...", 2: "در حال پردازش...", 3: "فقط یک ثانیه...", 4: "من این را برای شما بررسی می کنم ..." } }, j4 = { chat: { input: { placeholder: "Winndu mesaas maa...", listening: "Heɗtaade..." }, enableSound: "Softin Sonngo", stt: { transcribing: "Binndol: ", micActive: "Mikro ina golloo...", heardError: "Yaafo mi, mi waawaa nande ma. Tiiɗno enndu kadi.", micAccessError: "Waawaa heɓde mikroo. Ƴeewto jamirooje." }, speed: { idle: "Idle:", talk: "Haala:" } }, avatar: { loading: "Lowde nate...", title: { maximize: "Maksima", minimize: "Ustu", close: "Uddit", clickToMaximize: "Ɓoɗɗu ngam ɓeydude", clickToMinimize: "Ɓoɗɗu ngam ustude" }, error: { loadFailed: "Waawaa loowde avatar: {{error}} ", playerNotLoaded: "AniaPlayer oo jolnaaka", passwordRequired: "Konngol kuutorteengol ngam fiilde .ania sifirnde", noSource: "Alaa iwdi avatar rokkaa (Url avatar walla Data avatar)" } }, greetings: { 0: "Hi! Hol no mbaawirmi wallude ma hannde?", 1: "Sanu! Jabbama! Hol ko mbaawmi wacfde ma?", 2: "Mi hofni! So weltaare haaldude e maa!", 3: "Sanu! Miɗo ɗoo ngam wallude. Hol ko njiɗɗaa?", 4: "Sanu! Noy? Hol no mbaawirmi wonde nafoore?" }, waiting: { 0: "Mi miijo...", 1: "Wakkati gooto...", 2: "Gollirde...", 3: "Sekonnde tan...", 4: "Miɗo ƴeewtoo ɗum ngam maa..." } }, P4 = { chat: { input: { placeholder: "Kirjoita viestisi...", listening: "Kuuntelee..." }, enableSound: "Ota ääni käyttöön", stt: { transcribing: "Transkriptio: ", micActive: "Mikrofoni aktiivinen...", heardError: "Anteeksi, en kuullut sinua. Yritä uudelleen.", micAccessError: "Mikrofonia ei voi käyttää. Tarkista käyttöoikeudet." }, speed: { idle: "Tyhjäkäynti:", talk: "Puhu:" } }, avatar: { loading: "Ladataan avataria...", title: { maximize: "Maksimoi", minimize: "Minimoi", close: "Sulje", clickToMaximize: "Klikkaa suurentaaksesi", clickToMinimize: "Napsauta pienentääksesi" }, error: { loadFailed: "Avatarin lataaminen epäonnistui: {{error}} ", playerNotLoaded: "AniaPlayeria ei ladattu", passwordRequired: "Salattua .ania-tiedostoa varten vaaditaan salasana", noSource: "Avatar-lähdettä ei ole annettu (avatarUrl tai avatarData)" } }, greetings: { 0: "Hei! Kuinka voin auttaa sinua tänään?", 1: "Hei! Tervetuloa! Voinko auttaa?", 2: "Hei! Niin ilo puhua kanssasi!", 3: "Hei! Olen täällä auttamassa. Mitä sinä tarvitset?", 4: "Hei! Miten voit? Kuinka voin olla hyödyllinen?" }, waiting: { 0: "Anna minun ajatella...", 1: "Yksi hetki...", 2: "Käsitellään...", 3: "Hetki...", 4: "Tarkistan sen puolestasi..." } }, K4 = { chat: { input: { placeholder: "I-type ang iyong mensahe...", listening: "Nakikinig..." }, enableSound: "Paganahin ang Tunog", stt: { transcribing: "Pagsasalin: ", micActive: "Aktibo ang mikropono...", heardError: "Paumanhin, hindi kita marinig. Pakisubukang muli.", micAccessError: "Hindi ma-access ang mikropono. Suriin ang mga pahintulot." }, speed: { idle: "Idle:", talk: "Talk:" } }, avatar: { loading: "Nilo-load ang avatar...", title: { maximize: "I-maximize", minimize: "I-minimize", close: "Isara", clickToMaximize: "I-click upang i-maximize", clickToMinimize: "I-click para i-minimize" }, error: { loadFailed: "Nabigong i-load ang avatar: {{error}} ", playerNotLoaded: "Hindi na-load ang AniaPlayer", passwordRequired: "Kinakailangan ang password para sa naka-encrypt na .ania file", noSource: "Walang ibinigay na mapagkukunan ng avatar (avatarUrl o avatarData)" } }, greetings: { 0: "Hi! Paano kita matutulungan ngayon?", 1: "Hello! Maligayang pagdating! Ano ang maaari kong gawin para sa iyo?", 2: "Kumusta! Kaya natutuwa akong kausapin ka!", 3: "Hello! Nandito ako para tumulong. Ano ang kailangan mo?", 4: "Hi! kamusta ka na? Paano ako magiging kapaki-pakinabang?" }, waiting: { 0: "Hayaan mong isipin ko...", 1: "Isang sandali...", 2: "Pinoproseso...", 3: "Sandali lang...", 4: "Sinusuri ko iyon para sa iyo..." } }, L4 = { chat: { input: { placeholder: "Taipataka na nomu itukutuku...", listening: "Vakarorogo..." }, enableSound: "Vakatara na rorogo", stt: { transcribing: "Vakadewataki: ", micActive: "Sa bula tiko na maikrofoni...", heardError: "Veivosoti, sega ni rawa ni rogoci iko. Kerekere mo tovolea tale.", micAccessError: "E sega ni rawa ni curu ki na maikrofoni. Raica na veivakadonui." }, speed: { idle: "Sega ni cakacaka:", talk: "Veivosaki:" } }, avatar: { loading: "Vakavodoki tiko na ivakatakarakara...", title: { maximize: "Vakalevutaka", minimize: "Vakalailaitaka", close: "Voleka", clickToMaximize: "Kiliki me vakalevutaki", clickToMinimize: "Kiliki me vakalailaitaka" }, error: { loadFailed: "Sega ni rawa ni vakavodoki na iyaloyalo: {{error}} ", playerNotLoaded: "Aniaplayer sega ni vakavodoki", passwordRequired: "Na vosanicuru e gadrevi me baleta na faile ni .ania vakacurumi", noSource: "E sega ni dua na ivurevure ni avatar vakarautaki (avatarUrl se avatarData)" } }, greetings: { 0: "Bula vinaka! Au na vukei iko vakacava nikua?", 1: "Bula! Kidavaki! Na cava au rawa ni cakava vei iko?", 2: "Bula vinaka! Sa marau vakalevu meu veitalanoa kei iko!", 3: "Bula! Au sa tiko eke meu veivuke. Na cava o gadreva?", 4: "Bula vinaka! O vakacava tiko? Au na yaga vakacava?" }, waiting: { 0: "Meu vakasamataka mada...", 1: "Dua na gauna...", 2: "Vakarautaki...", 3: "Dua ga na sekodi...", 4: "Au sa dikeva tiko vei iko..." } }, U4 = { chat: { input: { placeholder: "Tapez votre message...", listening: "À l'écoute..." }, enableSound: "Activer le son", stt: { transcribing: "Transcription : ", micActive: "Micro actif....", heardError: "Désolé, je ne t'ai pas entendu. Veuillez réessayer.", micAccessError: "Impossible d'accéder au microphone. Vérifiez les autorisations." }, speed: { idle: "Inactif :", talk: "Parler :" } }, avatar: { loading: "Chargement de l'avatar...", title: { maximize: "Maximiser", minimize: "Réduire", close: "Fermer", clickToMaximize: "Cliquez pour agrandir", clickToMinimize: "Cliquez pour minimiser" }, error: { loadFailed: "Échec du chargement de l'avatar : {{error}} ", playerNotLoaded: "AniaPlayer n'est pas chargé", passwordRequired: "Mot de passe requis pour le fichier .ania crypté", noSource: "Aucune source d'avatar fournie (avatarUrl ou avatarData)" } }, greetings: { 0: "Salut ! Comment puis-je vous aider aujourd'hui ?", 1: "Salut! Accueillir! Que puis-je faire pour vous ?", 2: "Salut! Je suis tellement content de te parler !", 3: "Salut! Je suis là pour vous aider. De quoi avez-vous besoin?", 4: "Salut! Comment ça va? Comment puis-je être utile ?" }, waiting: { 0: "Laisse-moi réfléchir...", 1: "Un instant...", 2: "Traitement...", 3: "Juste une seconde...", 4: "Je vérifie ça pour toi..." } }, H4 = { chat: { input: { placeholder: "Tapez votre message...", listening: "A l'écoute..." }, enableSound: "Activer le son", stt: { transcribing: "Transcription : ", micActive: "Micro actif....", heardError: "Désolé, je ne t'ai pas entendu. Veuillez réessayer.", micAccessError: "Impossible d'accéder au microphone. Vérifiez les autorisations." }, speed: { idle: "Inactif :", talk: "Parler :" } }, avatar: { loading: "Chargement de l'avatar...", title: { maximize: "Maximiser", minimize: "Réduire", close: "Fermer", clickToMaximize: "Cliquez pour agrandir", clickToMinimize: "Cliquez pour minimiser" }, error: { loadFailed: "Échec du chargement de l'avatar : {{error}} ", playerNotLoaded: "AniaPlayer n'est pas chargé", passwordRequired: "Mot de passe requis pour le fichier .ania crypté", noSource: "Aucune source d'avatar fournie (avatarUrl ou avatarData)" } }, greetings: { 0: "Salut ! Comment puis-je vous aider aujourd'hui ?", 1: "Bonjour! Accueillir! Que puis-je faire pour vous ?", 2: "Salut! Je suis tellement content de te parler !", 3: "Bonjour! Je suis là pour vous aider. De quoi avez-vous besoin?", 4: "Salut! Comment vas-tu? Comment puis-je être utile ?" }, waiting: { 0: "Laisse-moi réfléchir...", 1: "Un instant...", 2: "Traitement...", 3: "Juste une seconde...", 4: "Je vérifie ça pour toi..." } }, q4 = { chat: { input: { placeholder: "Typ jo berjocht...", listening: "Harkje..." }, enableSound: "Lûd ynskeakelje", stt: { transcribing: "Transkripsje: ", micActive: "Mikrofoan aktyf...", heardError: "Sorry, koe dy net hearre. Besykje it nochris.", micAccessError: "Gjin tagong ta mikrofoan. Kontrolearje tagongsrjochten." }, speed: { idle: "Idle:", talk: "Oerlis:" } }, avatar: { loading: "Avatar laden...", title: { maximize: "Maksimalisearje", minimize: "Minimalisearje", close: "Slút", clickToMaximize: "Klikje om te maksimalisearjen", clickToMinimize: "Klikje om te minimalisearjen" }, error: { loadFailed: "It laden fan avatar mislearre: {{error}} ", playerNotLoaded: "AniaPlayer net laden", passwordRequired: "Wachtwurd nedich foar fersifere .ania-bestân", noSource: "Gjin avatarboarne levere (avatarUrl of avatarData)" } }, greetings: { 0: "Hi! Hoe kin ik jo hjoed helpe?", 1: "Hallo! Wolkom! Wat kin ik foar dy dwaan?", 2: "Hoi! Sa bliid mei dy te praten!", 3: "Hallo! Ik bin hjir om te helpen. Wat hawwe jo nedich?", 4: "Hoi! Hoe giet it mei dy? Hoe kin ik nuttich wêze?" }, waiting: { 0: "Lit my tinke...", 1: "Ien momint...", 2: "It ferwurkjen...", 3: "Noch in sekonde ...", 4: "Ik kontrolearje dat foar jo ..." } }, R4 = { chat: { input: { placeholder: "Clóscríobh do theachtaireacht...", listening: "Ag éisteacht..." }, enableSound: "Cumasaigh Fuaim", stt: { transcribing: "Ag tras-scríobh: ", micActive: "Micreafón gníomhach...", heardError: "Tá brón orm, níorbh fhéidir thú a chloisteáil. Bain triail eile as.", micAccessError: "Ní féidir rochtain a fháil ar an micreafón. Seiceáil ceadanna." }, speed: { idle: "Díomhaoin:", talk: "Labhair:" } }, avatar: { loading: "Avatar á lódáil...", title: { maximize: "Uasmhéadaigh", minimize: "Íoslaghdaigh", close: "Dún", clickToMaximize: "Cliceáil chun uasmhéadú", clickToMinimize: "Cliceáil chun a íoslaghdú" }, error: { loadFailed: "Theip ar an avatar a lódáil: {{error}} ", playerNotLoaded: "AniaPlayer gan luchtú", passwordRequired: "Pasfhocal ag teastáil le haghaidh comhad .ania criptithe", noSource: "Níor soláthraíodh aon fhoinse avatar (avatarUrl nó avatarData)" } }, greetings: { 0: "Dia duit! Conas is féidir liom cabhrú leat inniu?", 1: "Dia duit! Fáilte romhat! Cad is féidir liom a dhéanamh duit?", 2: "Dia duit ann! Chomh sásta labhairt leat!", 3: "Dia duit! Tá mé anseo chun cabhrú leat. Cad atá uait?", 4: "Dia duit! Conas atá tú? Conas is féidir liom a bheith úsáideach?" }, waiting: { 0: "Lig dom smaoineamh...", 1: "Nóiméad amháin...", 2: "Próiseáil...", 3: "Níl ach soicind...", 4: "Tá mé ag seiceáil sin duit ..." } }, I4 = { chat: { input: { placeholder: "Taipa oshɛɛ sane...", listening: "Toiboo..." }, enableSound: "Ha Gbee lɛ atsu nii", stt: { transcribing: "Niŋmaa: ", micActive: "Maikrofon miitsu nii...", heardError: "Kɛ ke mi, mi nyɛɛɛ manu bo. Ofainɛ kaa ekoŋŋ.", micAccessError: "Enyɛɛɛ oya maikrofon nɔ. Kwɛmɔ gbɛŋmɛɛi." }, speed: { idle: "Etsuuu nii:", talk: "Wiemɔ:" } }, avatar: { loading: "Amɛwoɔ avatar...", title: { maximize: "Feemɔ babaoo", minimize: "Tsɔɔmɔ shi", close: "Gbalamɔ", clickToMaximize: "Klikimɔ nɔ koni ona babaoo", clickToMinimize: "Klikimɔ nɔ ni okɛba shi" }, error: { loadFailed: "Eyeee akɛ ekɛ avatar lɛ baawo mli: {{error}} ", playerNotLoaded: "AniaShwɛmɔ lɛ ehiɛɛɛ", passwordRequired: "Password he hiaa kɛha .ania faili ni akɛwo mli", noSource: "Akɛ avatar jɛɛhe ko haaa (avatarUrl loo avatarData)" } }, greetings: { 0: "Hi! Te mafee tɛŋŋ maye mabua bo ŋmɛnɛ?", 1: "Hɛloo! Afeee noko! Mɛni ma nyɛ ma pee ma ha mo?", 2: "Agoo! Eŋɔɔ mi naa waa akɛ mikɛ bo baawie!", 3: "Hɛloo! Miyɛ biɛ koni maye mabua. Mɛni he hiaa bo?", 4: "Amɛɛ! Te oyɔɔ tɛŋŋ? Te mafee tɛŋŋ mafee mɔ ni he yɔɔ sɛɛnamɔ?" }, waiting: { 0: "Ha masusu he...", 1: "Be kome...", 2: "Etsuɔ nii...", 3: "Sɛkɛndi kome pɛ...", 4: "Miikwɛ nakai miha bo..." } }, O4 = { chat: { input: { placeholder: "Sgrìobh do theachdaireachd...", listening: "Ag èisteachd..." }, enableSound: "Dèan comas air Fuaim", stt: { transcribing: "Ag ath-sgrìobhadh: ", micActive: "Microfòn gnìomhach ...", heardError: "Duilich, cha chualas tu. Feuch ris a-rithist.", micAccessError: "Chan urrainn dhuinn cothrom fhaighinn air a’ mhicreofon. Thoir sùil air ceadan." }, speed: { idle: "Dìomhair:", talk: "Bruidhinn:" } }, avatar: { loading: "A luchdachadh a-nuas bho avatar.. .", title: { maximize: "Meudaich", minimize: "Lùghdaich", close: "Dùin", clickToMaximize: "Cliog gus a mheudachadh", clickToMinimize: "Cliog gus a lughdachadh" }, error: { loadFailed: "Cha b’ urrainn dhuinn an avatar a luchdachadh: {{error}} ", playerNotLoaded: "Aniaplayer cha deach a luchdadh", passwordRequired: "Facal-faire a dhìth airson faidhle .ania crioptaichte", noSource: "Chan eil stòr avatar air a thoirt seachad (avatarUrl no avatarData)" } }, greetings: { 0: "Hi! Ciamar as urrainn dhomh do chuideachadh an-diugh?", 1: "Halò! Fàilte! Dè as urrainn dhomh a dhèanamh dhut?", 2: "Haigh! Cho toilichte bruidhinn riut!", 3: "Halò! Tha mi an seo airson cuideachadh. Dè tha a dhìth ort?", 4: "Hi! Ciamar a tha thu? Ciamar as urrainn dhomh a bhith feumail?" }, waiting: { 0: "Leig leam smaoineachadh ...", 1: "Aon mhionaid...", 2: "A' giullachd...", 3: "Dìreach diog...", 4: "Tha mi a’ dèanamh sgrùdadh air sin dhut..." } }, W4 = { chat: { input: { placeholder: "Escribe a túa mensaxe...", listening: "Escoitando..." }, enableSound: "Activa o son", stt: { transcribing: "Transcrición: ", micActive: "Micrófono activo...", heardError: "Sentímolo, non puiden escoitarte. Téntao de novo.", micAccessError: "Non se pode acceder ao micrófono. Comproba os permisos." }, speed: { idle: "Inactivo:", talk: "Conversa:" } }, avatar: { loading: "Cargando avatar...", title: { maximize: "Maximizar", minimize: "Minimizar", close: "Pechar", clickToMaximize: "Fai clic para maximizar", clickToMinimize: "Fai clic para minimizar" }, error: { loadFailed: "Produciuse un erro ao cargar o avatar: {{error}} ", playerNotLoaded: "AniaPlayer non cargado", passwordRequired: "O contrasinal é necesario para o ficheiro .ania cifrado", noSource: "Non se proporcionou ningunha fonte de avatar (avatarUrl ou avatarData)" } }, greetings: { 0: "Ola! Como podo axudarche hoxe?", 1: "Ola! Benvido! Que podo facer por ti?", 2: "Ola! Moi feliz de falar contigo!", 3: "Ola! Estou aquí para axudar. Que necesitas?", 4: "Ola! Como estás? Como podo ser útil?" }, waiting: { 0: "Déixame pensar...", 1: "Un momento...", 2: "Procesando...", 3: "Só un segundo...", 4: "Estou comprobando por ti..." } }, _4 = { chat: { input: { placeholder: "Ehai ne marandu...", listening: "Ohendúvo..." }, enableSound: "Emboguata Sonido rehegua", stt: { transcribing: "Ojetranscripción: 1.1. ", micActive: "Micrófono activo...", heardError: "Perdón, ndaikatúikuri rohendu. Eñeha’ã jey.", micAccessError: "Ndaikatúi ojeike micrófono-pe. Ehecháke umi permiso." }, speed: { idle: "Ocioso: 1.1.", talk: "Ñe’ẽasa:" } }, avatar: { loading: "Ojekarga hína avatar...", title: { maximize: "Oñemomba’eguasuvévo", minimize: "Oñemboguejy michĩmi", close: "Oñemboty", clickToMaximize: "Emboguejy embotuichave hag̃ua", clickToMinimize: "Emboguejy emboguejy hag̃ua" }, error: { loadFailed: "Ndoikói ojekarga haguã avatar: {{error}} ", playerNotLoaded: "AniaPlayer ndojekargái", passwordRequired: "Ñe’ẽñemi oñeikotevẽva .ania vore oñembohekopyrévape g̃uarã", noSource: "Ndaipóri avatar ypykue oñeme’ẽva (avatarUrl térã avatarData) ." } }, greetings: { 0: "Hi! Mbaʼéichapa ikatu roipytyvõ ko árape?", 1: "Mba'éichapa! Tapeg̃uahẽporãite! Mbaʼépa ikatu ajapo nderehehápe?", 2: "Maitei! ¡Avyʼaiterei añeʼẽ haguére nendive!", 3: "Mba'éichapa! Che aime ko'ápe aipytyvõ haguã. Mbaʼépa reikotevẽ?", 4: "Mba'éichapa! Mba'éichapa reime? Mbaʼéichapa ikatu chepytyvõ?" }, waiting: { 0: "Tapensamína...", 1: "Peteĩ momento...", 2: "Procesamiento rehegua...", 3: "Peteĩ segundonte...", 4: "Che ahecha hína upéva ndéve g̃uarã..." } }, G4 = { chat: { input: { placeholder: "तुमचो संदेश टाइप करचो...", listening: "आयकून..." }, enableSound: "आवाज सक्षम करचो", stt: { transcribing: "प्रतिलिपी करप: १. ", micActive: "मायक्रोफोन सक्रिय...", heardError: "माफ करात, आयकूंक मेळ्ळें ना. उपकार करून परतून यत्न करात.", micAccessError: "मायक्रोफोन ऍक्सॅस करूंक शकना. परवानगी तपासात." }, speed: { idle: "निश्क्रीय: 1.1.", talk: "उलोवप: १." } }, avatar: { loading: "अवतार लोड करतना...", title: { maximize: "चडांत चड करप", minimize: "उण्यांत उणें करप", close: "बंद करचें", clickToMaximize: "चडांत चड करपाक क्लिक करात", clickToMinimize: "उण्यांत उणें करपाक क्लिक करात" }, error: { loadFailed: "अवतार लोड करपाक अपेस: {{error}} ", playerNotLoaded: "AniaPlayer लोड जावंक ना", passwordRequired: "एनक्रिप्टेड .ania फायलीक पासवर्ड जाय", noSource: "अवतार स्त्रोत दिवंक ना (avatarUrl वा avatarData)" } }, greetings: { 0: "हाय! आयज हांव तुका कशी मजत करूं?", 1: "हॅलो! येवकार! तुजे खातीर हांव कितें करूं?", 2: "हे नमस्कार! तुमचे कडेन उलोवपाक इतली खोस!", 3: "हॅलो! हांव हांगा मजत करपाक आयलां. तुमकां कितें जाय?", 4: "हाय! तूं कसो आसा? हांव कसो उपेगी पडूं येता?" }, waiting: { 0: "म्हाका विचार करूं...", 1: "एक खीण...", 2: "प्रक्रिया करप...", 3: "फकत एक सेकंद...", 4: "हांव तुमकां तें तपासतां..." } }, V4 = { chat: { input: { placeholder: "તમારો સંદેશ લખો...", listening: "સાંભળી રહ્યું છે..." }, enableSound: "સાઉન્ડ સક્ષમ કરો", stt: { transcribing: "ટ્રાન્સક્રિબિંગ: ", micActive: "માઇક્રોફોન સક્રિય...", heardError: "માફ કરશો, તમને સાંભળી શક્યા નથી. કૃપા કરીને ફરી પ્રયાસ કરો.", micAccessError: "માઇક્રોફોનને ઍક્સેસ કરવામાં અસમર્થ. પરવાનગીઓ તપાસો." }, speed: { idle: "નિષ્ક્રિય:", talk: "વાત:" } }, avatar: { loading: "અવતાર લોડ કરી રહ્યું છે...", title: { maximize: "મહત્તમ કરો", minimize: "નાનું કરો", close: "બંધ કરો", clickToMaximize: "મહત્તમ કરવા માટે ક્લિક કરો", clickToMinimize: "ઘટાડવા માટે ક્લિક કરો" }, error: { loadFailed: "અવતાર લોડ કરવામાં નિષ્ફળ: {{error}} ", playerNotLoaded: "AniaPlayer લોડ થયેલ નથી", passwordRequired: "એનક્રિપ્ટેડ .ania ફાઇલ માટે પાસવર્ડ જરૂરી છે", noSource: "કોઈ અવતાર સ્ત્રોત પ્રદાન કરેલ નથી (avatarUrl અથવા avatarData)" } }, greetings: { 0: "હાય! આજે હું તમને કેવી રીતે મદદ કરી શકું?", 1: "હેલો! સ્વાગત છે! હું તમારા માટે શું કરી શકું?", 2: "હાય ત્યાં! તમારી સાથે વાત કરીને ખૂબ આનંદ થયો!", 3: "હેલો! હું મદદ કરવા માટે અહીં છું. તમારે શું જોઈએ છે?", 4: "હાય! તમે કેમ છો? હું કેવી રીતે ઉપયોગી થઈ શકું?" }, waiting: { 0: "મને વિચારવા દો...", 1: "એક ક્ષણ...", 2: "પ્રક્રિયા કરી રહ્યું છે...", 3: "માત્ર એક સેકન્ડ...", 4: "હું તમારા માટે તે તપાસી રહ્યો છું..." } }, $4 = { chat: { input: { placeholder: "Buga sakon ku...", listening: "Ana saurare..." }, enableSound: "Kunna Sauti", stt: { transcribing: "Rubutu: ", micActive: "Makirufo yana aiki...", heardError: "Yi haƙuri, ban ji ku ba. Da fatan za a sake gwadawa.", micAccessError: "An kasa samun damar makirufo. Duba izini." }, speed: { idle: "Rago:", talk: "Magana:" } }, avatar: { loading: "Ana loda avatar...", title: { maximize: "Girma", minimize: "Rage girman", close: "Kusa", clickToMaximize: "Danna don ƙara girma", clickToMinimize: "Danna don rage girman" }, error: { loadFailed: "An kasa loda avatar: {{error}} ", playerNotLoaded: "AniaPlayer ba a loda shi ba", passwordRequired: "Ana buƙatar kalmar sirri don fayil ɗin .ania rufaffen", noSource: "Babu tushen avatar da aka bayar (avatarUrl ko avatarData)" } }, greetings: { 0: "Sannu! Ta yaya zan iya taimaka muku a yau?", 1: "Sannu! Barka da zuwa! Me zan iya yi maka?", 2: "Sannu dai! Don haka ina farin cikin magana da ku!", 3: "Sannu! Ina nan don taimakawa. Me kuke bukata?", 4: "Sannu! Yaya lafiya? Ta yaya zan iya zama da amfani?" }, waiting: { 0: "Bari in yi tunani...", 1: "Lokaci guda...", 2: "Ana aiwatarwa...", 3: "Dakika daya kawai...", 4: "Ina duba muku hakan..." } }, J4 = { chat: { input: { placeholder: "Kākau i kāu memo...", listening: "Ke hoʻolohe nei..." }, enableSound: "E ho'ā i ke kani", stt: { transcribing: "Ke unuhi nei: ", micActive: "Microphone hoʻoikaika...", heardError: "E kala mai, ʻaʻole hiki ke lohe iā ʻoe. E ʻoluʻolu e hoʻāʻo hou.", micAccessError: "ʻAʻole hiki ke komo i ka microphone. E nānā i nā ʻae." }, speed: { idle: "hana ʻole:", talk: "Kūkākūkā:" } }, avatar: { loading: "Ke hoʻouka nei i ka avatar...", title: { maximize: "Hoʻonui", minimize: "Hoemi", close: "Pani", clickToMaximize: "Kaomi e hoʻonui", clickToMinimize: "Kaomi e hōʻemi" }, error: { loadFailed: "ʻAʻole hiki ke hoʻouka i ka avatar: {{error}} ", playerNotLoaded: "ʻAʻole i hoʻouka ʻia ʻo AniaPlayer", passwordRequired: "Pono ka ʻōlelo huna no ka faila .ania i hoʻopili ʻia", noSource: "ʻAʻohe kumu avatar i hāʻawi ʻia (avatarUrl a i ʻole avatarData)" } }, greetings: { 0: "Aloha! Pehea e hiki ai iaʻu ke kōkua iā ʻoe i kēia lā?", 1: "Aloha! Welina! He aha kaʻu e hana ai iā ʻoe?", 2: "Aloha! Hauʻoli e kamaʻilio pū me ʻoe!", 3: "Aloha! Aia wau e kōkua. He aha kāu mea e pono ai?", 4: "Hui! Pehea ʻoe? Pehea wau e pono ai?" }, waiting: { 0: "E noʻonoʻo wau ...", 1: "Hoʻokahi manawa...", 2: "Ke hana nei...", 3: "Kekona wale nō...", 4: "Ke nānā nei au iā ʻoe..." } }, Z4 = { chat: { input: { placeholder: "הקלד את הודעתך...", listening: "מקשיב..." }, enableSound: "אפשר סאונד", stt: { transcribing: "מתמלל: ", micActive: "מיקרופון פעיל...", heardError: "מצטער, לא יכולתי לשמוע אותך. אנא נסה שוב.", micAccessError: "לא ניתן לגשת למיקרופון. בדוק הרשאות." }, speed: { idle: "סרק:", talk: "שיחה:" } }, avatar: { loading: "טוען דמות...", title: { maximize: "למקסם", minimize: "הקטינו", close: "סגור", clickToMaximize: "לחץ כדי למקסם", clickToMinimize: "לחץ כדי למזער" }, error: { loadFailed: "טעינת הדמות נכשלה: {{error}} ", playerNotLoaded: "AniaPlayer לא נטען", passwordRequired: "נדרשת סיסמה לקובץ ania מוצפן", noSource: "לא סופק מקור דמות (avatarUrl או avatarData)" } }, greetings: { 0: "היי! איך אני יכול לעזור לך היום?", 1: "שלום! קַבָּלַת פָּנִים! מה אני יכול לעשות בשבילך?", 2: "שלום לך! כל כך שמח לדבר איתך!", 3: "שלום! אני כאן כדי לעזור. מה אתה צריך?", 4: "היי! מה שלומך? איך אני יכול להיות שימושי?" }, waiting: { 0: "תן לי לחשוב...", 1: "רגע אחד...", 2: "מעבד...", 3: "רק שנייה...", 4: "אני בודק את זה בשבילך..." } }, Y4 = { chat: { input: { placeholder: "अपना संदेश टाइप करें...", listening: "सुन रहा हूँ..." }, enableSound: "ध्वनि सक्षम करें", stt: { transcribing: "प्रतिलेखन: ", micActive: "माइक्रोफ़ोन सक्रिय...", heardError: "क्षमा करें, आपकी बात सुन नहीं सका। कृपया पुन: प्रयास करें।", micAccessError: "माइक्रोफ़ोन तक पहुंचने में असमर्थ. अनुमतियाँ जांचें." }, speed: { idle: "निष्क्रिय:", talk: "बात करें:" } }, avatar: { loading: "अवतार लोड हो रहा है...", title: { maximize: "अधिकतम करें", minimize: "न्यूनतम करें", close: "बंद करें", clickToMaximize: "अधिकतम करने के लिए क्लिक करें", clickToMinimize: "छोटा करने के लिए क्लिक करें" }, error: { loadFailed: "अवतार लोड करने में विफल: {{error}} ", playerNotLoaded: "AniaPlayer लोड नहीं हुआ", passwordRequired: "एन्क्रिप्टेड .ania फ़ाइल के लिए पासवर्ड आवश्यक है", noSource: "कोई अवतार स्रोत प्रदान नहीं किया गया (अवतारयूआरएल या अवतारडेटा)" } }, greetings: { 0: "नमस्ते! आज मैं आपकी मदद करने में कैसे सक्षम हूं?", 1: "नमस्ते! स्वागत! मैं तुम्हारे लिए क्या कर सकता हूँ?", 2: "नमस्ते! आपसे बात करके बहुत ख़ुशी हुई!", 3: "नमस्ते! मैं मदद के लिए यहां हूं. आपको किस चीज़ की जरूरत है?", 4: "नमस्ते! आप कैसे हैं? मैं कैसे उपयोगी हो सकता हूँ?" }, waiting: { 0: "मुझे सोचने दो...", 1: "एक पल...", 2: "प्रसंस्करण...", 3: "बस एक सेकंड...", 4: "मैं आपके लिए इसकी जाँच कर रहा हूँ..." } }, Q4 = { chat: { input: { placeholder: "I-type ang imo mensahe...", listening: "Nagapamati..." }, enableSound: "I-enable ang Sound", stt: { transcribing: "Pag-transcribe: ", micActive: "Aktibo ang mikropono...", heardError: "Pasensya na, indi ko ikaw mabatian. Palihog tilawi liwat.", micAccessError: "Indi maka-access sa mikropono. Tan-awa ang mga pagtugot." }, speed: { idle: "Idle:", talk: "Pamulongpulong:" } }, avatar: { loading: "Naga-load sang avatar...", title: { maximize: "Padakuon", minimize: "Pagamay", close: "Magsira", clickToMaximize: "I-klik para ma-maximize", clickToMinimize: "I-klik para mabuhinan" }, error: { loadFailed: "Napaslawan sa pag-load sang avatar: {{error}} ", playerNotLoaded: "Ang AniaPlayer wala ma-load", passwordRequired: "Kinahanglan ang password para sa naka-encrypt nga .ania file", noSource: "Wala sing ginhatag nga ginhalinan sang avatar (avatarUrl ukon avatarData)" } }, greetings: { 0: "Hi! Paano ko ikaw mabuligan subong nga adlaw?", 1: "Kamusta! Gina-abiabi! Ano ang mahimo ko para sa imo?", 2: "Kamusta ka! Nalipay gid ako nga makaistorya sa imo!", 3: "Kamusta! Ari ako para magbulig. Ano ang kinahanglan mo?", 4: "Kamusta! Kamusta ikaw? Paano ako mangin mapuslanon?" }, waiting: { 0: "Tuguti ako nga maghunahuna...", 1: "Isa ka tion...", 2: "Nagaproseso...", 3: "Isa lang ka segundo...", 4: "Ginausisa ko ina para sa imo..." } }, X4 = { chat: { input: { placeholder: "Ntaus koj cov lus...", listening: "Mloog..." }, enableSound: "Qhib Suab", stt: { transcribing: "Kev sau ntawv: ", micActive: "Lub microphone ua haujlwm ...", heardError: "Thov txim, tsis tau hnov koj. Thov rov sim dua.", micAccessError: "Tsis tuaj yeem nkag mus rau microphone. Tshawb xyuas kev tso cai." }, speed: { idle: "Idle:", talk: "Tham:" } }, avatar: { loading: "Loading avatar...", title: { maximize: "Maximize", minimize: "Tsawg kawg", close: "Kaw", clickToMaximize: "Nyem rau qhov loj", clickToMinimize: "Nyem kom txo qis" }, error: { loadFailed: "Ua tsis tiav rau kev thauj khoom avatar: {{error}} ", playerNotLoaded: "AniaPlayer tsis loaded", passwordRequired: "Password yuav tsum tau encrypted .ania cov ntaub ntawv", noSource: "Tsis muaj avatar qhov chaw muab (avatarUrl lossis avatarData)" } }, greetings: { 0: "Nyob zoo! Kuv yuav pab tau koj li cas hnub no?", 1: "Nyob zoo! Zoo siab txais tos! Kuv tuaj yeem ua dab tsi rau koj?", 2: "Nyob zoo! Zoo siab nrog koj tham!", 3: "Nyob zoo! Kuv nyob ntawm no los pab. Koj xav tau dab tsi?", 4: "Nyob zoo! Koj nyob li cas? Kuv yuav pab tau li cas?" }, waiting: { 0: "Cia kuv xav tias...", 1: "Ib pliag...", 2: "Kev ua...", 3: "Tsuas yog ib pliag xwb...", 4: "Kuv tab tom tshawb xyuas qhov ntawd rau koj ..." } }, ua = { chat: { input: { placeholder: "Upišite svoju poruku...", listening: "Slušanje..." }, enableSound: "Omogući zvuk", stt: { transcribing: "Transkripcija: ", micActive: "Mikrofon aktivan...", heardError: "Žao mi je, nisam vas čuo. Molimo pokušajte ponovo.", micAccessError: "Nije moguće pristupiti mikrofonu. Provjerite dopuštenja." }, speed: { idle: "mirovanje:", talk: "Razgovor:" } }, avatar: { loading: "Učitavanje avatara...", title: { maximize: "Maksimiziraj", minimize: "Minimiziraj", close: "Zatvori", clickToMaximize: "Kliknite za povećanje", clickToMinimize: "Kliknite za smanjivanje" }, error: { loadFailed: "Neuspješno učitavanje avatara: {{error}} ", playerNotLoaded: "AniaPlayer nije učitan", passwordRequired: "Lozinka je potrebna za šifriranu .ania datoteku", noSource: "Nije naveden izvor avatara (avatarUrl ili avatarData)" } }, greetings: { 0: "Bok! Kako vam mogu pomoći danas?", 1: "Zdravo! Dobrodošli! Što mogu učiniti za vas?", 2: "Bok! Tako mi je drago razgovarati s tobom!", 3: "Zdravo! Ovdje sam da pomognem. što ti treba", 4: "Bok! Kako ste? Kako mogu biti koristan?" }, waiting: { 0: "pusti me da razmislim...", 1: "Trenutak...", 2: "Obrada...", 3: "Samo trenutak...", 4: "Provjeravam to za vas..." } }, aa = { chat: { input: { placeholder: "Tuu tayn pexeet xraype...", listening: "Heere..." }, enableSound: "Klang aktiviire", stt: { transcribing: "Transkriptsioon: ", micActive: "Mikrofoon aktief...", heardError: "Sorry, khont tich nët heere. Tuu khanst noch mool proope.", micAccessError: "Mikrofoon khan net tsuu khome. Kontroliire ti erlaupnis." }, speed: { idle: "Leetich:", talk: "Reet:" } }, avatar: { loading: "Avatar am laate...", title: { maximize: "Maximiiseere", minimize: "Minimiiseere", close: "Tsum", clickToMaximize: "Klik fer se maximiire", clickToMinimize: "Klik fer se minimiiseere" }, error: { loadFailed: "Tas avatar is net kelaat: {{error}} ", playerNotLoaded: "AniaPlayer is nët geladen", passwordRequired: "Passwort ferlangt fer ti ferxtëkelte .ania-file", noSource: "Keen Avatar-Quelle (AvatarUrl oder AvatarData)" } }, greetings: { 0: "Hallo! Wii khan ich tich hayt hëlfe?", 1: "Halo! Wilkhome! Was khan ich fer aych mache?", 2: "Oi! Soo froo tas ich mit aych xpreche khan!", 3: "Halo! Ich sin hier fer se helfe. Was prauchst tuu?", 4: "Oi! Wii keets tich? Wii khan ich nutslich sin?" }, waiting: { 0: "Los mich tënke...", 1: "Een momënt...", 2: "Ferarbeitung...", 3: "Ploos een sekund...", 4: "Ich kontroliire tas fer tich..." } }, ea = { chat: { input: { placeholder: "Tape mesaj ou a...", listening: "Tande..." }, enableSound: "Pèmèt son", stt: { transcribing: "Transkripsyon: ", micActive: "Mikwofòn aktif...", heardError: "Padon, mwen pa t 'kapab tande ou. Tanpri eseye ankò.", micAccessError: "Pa kapab jwenn aksè nan mikwofòn. Tcheke otorizasyon yo." }, speed: { idle: "San fè anyen konsa:", talk: "Pale:" } }, avatar: { loading: "Chaje avatar...", title: { maximize: "Maksimize", minimize: "Minimize", close: "Fèmen", clickToMaximize: "Klike pou maksimize", clickToMinimize: "Klike pou minimize" }, error: { loadFailed: "Echwe pou chaje avatar: {{error}} ", playerNotLoaded: "AniaPlayer pa chaje", passwordRequired: "Modpas obligatwa pou fichye .ania chiffres", noSource: "Pa gen sous avatar bay (avatarUrl oswa avatarData)" } }, greetings: { 0: "Alo! Kouman mwen ka ede w jodi a?", 1: "Bonjou! Byenvini! Kisa mwen ka fè pou ou?", 2: "Bonjou la! Se konsa, mwen kontan pale ak ou!", 3: "Bonjou! Mwen la pou ede. Kisa ou bezwen?", 4: "Alo! koman ou ye? Kouman mwen ka itil?" }, waiting: { 0: "Kite m panse...", 1: "Yon moman...", 2: "Pwosesis...", 3: "Jis yon segond...", 4: "Mwen tcheke sa pou ou..." } }, ia = { chat: { input: { placeholder: "Írja be üzenetét...", listening: "Hallgat..." }, enableSound: "Hang engedélyezése", stt: { transcribing: "Átírás: ", micActive: "Mikrofon aktív...", heardError: "Sajnálom, nem hallottam. Kérjük, próbálja újra.", micAccessError: "Nem lehet hozzáférni a mikrofonhoz. Ellenőrizze az engedélyeket." }, speed: { idle: "Üresjárat:", talk: "Beszélgetés:" } }, avatar: { loading: "Avatar betöltése...", title: { maximize: "Maximalizálás", minimize: "Minimalizálja", close: "Bezárás", clickToMaximize: "Kattintson a maximalizáláshoz", clickToMinimize: "Kattintson a kicsinyítéshez" }, error: { loadFailed: "Nem sikerült betölteni az avatart: {{error}} ", playerNotLoaded: "Az AniaPlayer nincs betöltve", passwordRequired: "A titkosított .ania fájlhoz jelszó szükséges", noSource: "Nincs megadva avatarforrás (avatarUrl vagy avatarData)" } }, greetings: { 0: "Szia! Hogyan segíthetek ma?", 1: "Helló! Üdvözöljük! Mit tehetek érted?", 2: "Sziasztok! Nagyon örülök, hogy beszélhetek veled!", 3: "Helló! Azért vagyok itt, hogy segítsek. Mi kell neked?", 4: "Szia! Hogy vagy? Hogyan lehetek hasznos?" }, waiting: { 0: "Hadd gondolkozzam...", 1: "Egy pillanat...", 2: "Feldolgozás...", 3: "Csak egy pillanat...", 4: "Ezt ellenőrzöm neked..." } }, ra = { chat: { input: { placeholder: "Մուտքագրեք ձեր հաղորդագրությունը...", listening: "Լսելով..." }, enableSound: "Միացնել ձայնը", stt: { transcribing: "Տառադարձում. ", micActive: "Խոսափողն ակտիվ է...", heardError: "Կներեք, չլսեցի ձեզ: Խնդրում ենք կրկին փորձել:", micAccessError: "Հնարավոր չէ մուտք գործել խոսափող: Ստուգեք թույլտվությունները:" }, speed: { idle: "Պարապ:", talk: "Զրույց:" } }, avatar: { loading: "Ավատարի բեռնում...", title: { maximize: "Առավելագույնի հասցնել", minimize: "Նվազագույնի հասցնել", close: "Փակել", clickToMaximize: "Սեղմեք՝ առավելագույնի հասցնելու համար", clickToMinimize: "Սեղմեք՝ նվազագույնի հասցնելու համար" }, error: { loadFailed: "Չհաջողվեց բեռնել ավատարը՝ {{error}} ", playerNotLoaded: "AniaPlayer-ը բեռնված չէ", passwordRequired: "Կոդավորված .ania ֆայլի համար անհրաժեշտ է գաղտնաբառ", noSource: "Ավատարի աղբյուր չի տրամադրվել (avatarUrl կամ avatarData)" } }, greetings: { 0: "Ողջույն Ինչպե՞ս կարող եմ օգնել ձեզ այսօր:", 1: "Ողջույն Բարի գալուստ Ի՞նչ կարող եմ անել ձեզ համար:", 2: "Բարև ձեզ: Այնքան ուրախ եմ ձեզ հետ խոսելու համար:", 3: "Ողջույն Ես այստեղ եմ օգնելու համար: Ինչ է ձեզ պետք:", 4: "Ողջույն Ինչպե՞ս ես։ Ինչպե՞ս կարող եմ օգտակար լինել:" }, waiting: { 0: "Թող մտածեմ...", 1: "Մի պահ...", 2: "Մշակվում է...", 3: "Ընդամենը մի վայրկյան...", 4: "Ես դա ստուգում եմ ձեզ համար ..." } }, na = { chat: { input: { placeholder: "Ketik pesan Anda...", listening: "Mendengarkan..." }, enableSound: "Aktifkan Suara", stt: { transcribing: "Mentranskripsikan: ", micActive: "Mikrofon aktif...", heardError: "Maaf, saya tidak dapat mendengar Anda. Silakan coba lagi.", micAccessError: "Tidak dapat mengakses mikrofon. Periksa izin." }, speed: { idle: "Menganggur:", talk: "Pembicaraan:" } }, avatar: { loading: "Memuat avatar...", title: { maximize: "Maksimalkan", minimize: "Minimalkan", close: "Tutup", clickToMaximize: "Klik untuk memaksimalkan", clickToMinimize: "Klik untuk memperkecil" }, error: { loadFailed: "Gagal memuat avatar: {{error}} ", playerNotLoaded: "AniaPlayer tidak dimuat", passwordRequired: "Kata sandi diperlukan untuk file .ania terenkripsi", noSource: "Tidak ada sumber avatar yang disediakan (avatarUrl atau avatarData)" } }, greetings: { 0: "Hai! Apa yang bisa saya bantu hari ini?", 1: "Halo! Selamat datang! Apa yang bisa saya lakukan untuk Anda?", 2: "Hai, yang di sana! Senang sekali bisa berbicara dengan Anda!", 3: "Halo! Saya di sini untuk membantu. Apa yang kamu butuhkan?", 4: "Hai! Apa kabarmu? Bagaimana saya bisa berguna?" }, waiting: { 0: "Biarkan aku berpikir...", 1: "Suatu saat...", 2: "Memproses...", 3: "Tunggu sebentar...", 4: "Aku sedang memeriksanya untukmu..." } }, ta = { chat: { input: { placeholder: "Pịnye ozi gị...", listening: "Na-ege ntị..." }, enableSound: "Kwado ụda", stt: { transcribing: "Na-edegharị: ", micActive: "Igwe okwu na-arụ ọrụ...", heardError: "Ndo, enweghị ike ịnụ gị. Biko nwaa ọzọ.", micAccessError: "Enweghị ike ịnweta igwe okwu. Lelee ikike." }, speed: { idle: "Akwụsịghị ọrụ:", talk: "Kwuo okwu:" } }, avatar: { loading: "Na-ebu avatar...", title: { maximize: "Bulie elu", minimize: "Wedata", close: "Mechie", clickToMaximize: "Pịa ka iwelie elu", clickToMinimize: "Pịa ka ibelata" }, error: { loadFailed: "Ịbunye avatar agaghị eme: {{error}} ", playerNotLoaded: "Ejurughi AniaPlayer", passwordRequired: "Okwuntughe achọrọ maka faịlụ .ania ezoro ezo", noSource: "Enweghị isi iyi avatar enyere (avatarUrl ma ọ bụ avatarData)" } }, greetings: { 0: "Ndewo! Kedu ka m ga-esi nyere gị aka taa?", 1: "Nnọọ! Nnọọ! Kedu ihe m ga-emere gị?", 2: "Ndewo ebe ahụ! Obi dị m ụtọ ịgwa gị okwu!", 3: "Nnọọ! Abịara m ebe a iji nyere aka. Kedu ihe ị chọrọ?", 4: "Ndewo! Kedu ka ị mere? Kedu ka m ga-esi baa uru?" }, waiting: { 0: "Ka m chee...", 1: "Otu oge...", 2: "Na-ahazi...", 3: "Naanị otu sekọnd...", 4: "Ana m elele nke ahụ maka gị..." } }, oa = { chat: { input: { placeholder: "I-type ti mensahem...", listening: "Dumdumngeg..." }, enableSound: "Pagbalinen ti Uni", stt: { transcribing: "Panag-transkripsion: ", micActive: "Aktibo ti mikropono...", heardError: "Sorry, diak nangngeg. Pangngaasiyo ta padasenyo manen.", micAccessError: "Saan a makastrek iti mikropono. Kitaen dagiti pammalubos." }, speed: { idle: "Idle:", talk: "Palawag:" } }, avatar: { loading: "Karga ti avatar...", title: { maximize: "Maximize ti", minimize: "Pabassitem", close: "Agserra", clickToMaximize: "I-click tapno ma-maximize", clickToMinimize: "I-click tapno mapabassit" }, error: { loadFailed: "Napaay a mangikarga iti avatar: {{error}} . ", playerNotLoaded: "AniaPlayer saan a naikarga", passwordRequired: "Kasapulan ti password para iti na-encrypt a .ania file", noSource: "Awan ti naited a taudan ti avatar (avatarUrl wenno avatarData) ." } }, greetings: { 0: "Hi! Kasano a matulongakkayo ita nga aldaw?", 1: "Hello! Naragsak nga isasangbay! Ania ti maaramidak para kenka?", 2: "Hi kaniam! Maragsakanak unay a makisarita kadakayo!", 3: "Hello! Addaak ditoy tapno tumulong. Ania ti kasapulam?", 4: "Hi! Kumusta kan? Kasano a makagunggonaak?" }, waiting: { 0: "Bay-anyo a panunotek...", 1: "Maysa a kanito...", 2: "Panagproseso ti...", 3: "Maysa laeng a segundo...", 4: "I-check ko dayta para kenka..." } }, la = { chat: { input: { placeholder: "Sláðu inn skilaboðin þín...", listening: "Hlustar..." }, enableSound: "Virkja hljóð", stt: { transcribing: "Umritun: ", micActive: "Hljóðnemi virkur...", heardError: "Því miður, ég heyrði ekki í þér. Vinsamlegast reyndu aftur.", micAccessError: "Ekki hægt að nálgast hljóðnema. Athugaðu heimildir." }, speed: { idle: "Aðgerðarlaus:", talk: "Spjall:" } }, avatar: { loading: "Hleður avatar...", title: { maximize: "Hámarka", minimize: "Lágmarka", close: "Loka", clickToMaximize: "Smelltu til að hámarka", clickToMinimize: "Smelltu til að lágmarka" }, error: { loadFailed: "Mistókst að hlaða avatar: {{error}} ", playerNotLoaded: "AniaPlayer ekki hlaðinn", passwordRequired: "Lykilorð krafist fyrir dulkóðaða .ania skrá", noSource: "Engin avataruppspretta veitt (avatarUrl eða avatarData)" } }, greetings: { 0: "Hæ! Hvernig get ég hjálpað þér í dag?", 1: "Halló! Velkomin! Hvað get ég gert fyrir þig?", 2: "Hæ! Svo gaman að tala við þig!", 3: "Halló! Ég er hér til að hjálpa. Hvað þarftu?", 4: "Hæ! Hvernig hefurðu það? Hvernig get ég verið gagnleg?" }, waiting: { 0: "Leyfðu mér að hugsa...", 1: "Eitt augnablik...", 2: "Vinnur...", 3: "Bara sekúndu...", 4: "Ég er að athuga það fyrir þig..." } }, Aa = { chat: { input: { placeholder: "Type your message...", listening: "Ascoltando..." }, enableSound: "Enable Sound", stt: { transcribing: "Transcribing: ", micActive: "Microphone active...", heardError: "Mi dispiace, non ti ho sentito. Please try again.", micAccessError: "Impossibile accedere al microfono. Check permissions." }, speed: { idle: "Idle:", talk: "Talk:" } }, avatar: { loading: "Loading avatar...", title: { maximize: "Massimizzare", minimize: "Ridurre al minimo", close: "Close", clickToMaximize: "Click to maximize", clickToMinimize: "Click to minimize" }, error: { loadFailed: "Impossibile caricare l'avatar: {{error}} ", playerNotLoaded: "AniaPlayer not loaded", passwordRequired: "Password richiesta per il file .ania crittografato", noSource: "Nessuna origine avatar fornita (avatarUrl o avatarData)" } }, greetings: { 0: "Ciao! Come posso aiutarti oggi?", 1: "Ciao! Benvenuto! Cosa posso fare per lei?", 2: "Ciao! Sono così felice di parlare con te!", 3: "Ciao! I'm here to help. Di che cosa hai bisogno?", 4: "CIAO! Come stai? Come posso essere utile?" }, waiting: { 0: "Let me think...", 1: "One moment...", 2: "Elaborazione...", 3: "Solo un secondo...", 4: "Lo sto controllando per te..." } }, Ba = { chat: { input: { placeholder: "メッセージを入力してください...", listening: "聞いています..." }, enableSound: "サウンドを有効にする", stt: { transcribing: "転写: ", micActive: "マイクがアクティブです...", heardError: "申し訳ありませんが、聞こえませんでした。もう一度試してください。", micAccessError: "マイクにアクセスできません。権限を確認してください。" }, speed: { idle: "アイドル:", talk: "トーク:" } }, avatar: { loading: "アバターを読み込んでいます...", title: { maximize: "最大化する", minimize: "最小化する", close: "閉じる", clickToMaximize: "クリックして最大化します", clickToMinimize: "クリックして最小化します" }, error: { loadFailed: "アバターのロードに失敗しました: {{error}} ", playerNotLoaded: "AniaPlayer がロードされていません", passwordRequired: "暗号化された .ania ファイルにはパスワードが必要です", noSource: "アバター ソースが提供されていません (avatarUrl または avatarData)" } }, greetings: { 0: "こんにちは！今日はどのようにお手伝いできますか?", 1: "こんにちは！いらっしゃいませ！どういうご用件ですか？", 2: "やあ！お話しできてとても嬉しいです！", 3: "こんにちは！私は手伝うためにここにいます。あなたは何が必要ですか？", 4: "こんにちは！元気ですか？どうしたら役に立てるでしょうか？" }, waiting: { 0: "考えさせてください...", 1: "ちょっと...", 2: "処理中...", 3: "ちょっと…", 4: "あなたの代わりにそれを確認しています..." } }, sa = { chat: { input: { placeholder: "Ketik pesen sampeyan...", listening: "Ngrungokake..." }, enableSound: "Aktifake Swara", stt: { transcribing: "Transkripsi: ", micActive: "Mikropon aktif...", heardError: "Sorry, ora bisa krungu sampeyan. Coba maneh.", micAccessError: "Ora bisa ngakses mikropon. Priksa ijin." }, speed: { idle: "nganggur:", talk: "Dhiskusi:" } }, avatar: { loading: "Loading avatar...", title: { maximize: "maksimalake", minimize: "nyilikake", close: "Nutup", clickToMaximize: "Klik kanggo nggedhekake", clickToMinimize: "Klik kanggo nyilikake" }, error: { loadFailed: "Gagal mbukak avatar: {{error}} ", playerNotLoaded: "AniaPlayer ora dimuat", passwordRequired: "Tembung sandhi dibutuhake kanggo file .ania sing dienkripsi", noSource: "Ora ana sumber avatar sing diwenehake (avatarUrl utawa avatarData)" } }, greetings: { 0: "Hi! Kepiye carane aku bisa nulungi sampeyan dina iki?", 1: "Hello! Sugeng rawuh! Apa sing bisa daktindakake kanggo sampeyan?", 2: "Sugeng rawuh! Seneng banget ngomong karo sampeyan!", 3: "Hello! Aku kene kanggo bantuan. Apa sing sampeyan butuhake?", 4: "Hi! piye kabare? Kepiye carane bisa migunani?" }, waiting: { 0: "Ayo aku mikir ...", 1: "Sedhela...", 2: "Ngolah...", 3: "Sedhela wae...", 4: "Aku mriksa sampeyan ..." } }, Da = { chat: { input: { placeholder: "ჩაწერეთ თქვენი შეტყობინება...", listening: "მოსმენა..." }, enableSound: "ჩართეთ ხმა", stt: { transcribing: "ტრანსკრიფცია: ", micActive: "მიკროფონი აქტიურია...", heardError: "უკაცრავად, ვერ გავიგე. გთხოვთ, სცადოთ ხელახლა.", micAccessError: "მიკროფონზე წვდომა შეუძლებელია. შეამოწმეთ ნებართვები." }, speed: { idle: "უმოქმედო:", talk: "საუბარი:" } }, avatar: { loading: "იტვირთება ავატარი...", title: { maximize: "მაქსიმიზაცია", minimize: "მინიმიზაცია", close: "დახურვა", clickToMaximize: "დააწკაპუნეთ მაქსიმიზაციისთვის", clickToMinimize: "დააწკაპუნეთ მინიმუმამდე" }, error: { loadFailed: "ავატარის ჩატვირთვა ვერ მოხერხდა: {{error}} ", playerNotLoaded: "AniaPlayer არ არის ჩატვირთული", passwordRequired: "დაშიფრული .ania ფაილისთვის საჭიროა პაროლი", noSource: "ავატარის წყარო არ არის მოწოდებული (avatarUrl ან avatarData)" } }, greetings: { 0: "გამარჯობა! როგორ შემიძლია დაგეხმაროთ დღეს?", 1: "გამარჯობა! მოგესალმებით! რა გავაკეთო შენთვის?", 2: "გამარჯობა! ძალიან მიხარია თქვენთან საუბარი!", 3: "გამარჯობა! მე აქ დასახმარებლად ვარ. რა გჭირდება?", 4: "გამარჯობა! როგორ ხარ? როგორ ვიყო სასარგებლო?" }, waiting: { 0: "მოდი ვიფიქრო...", 1: "ერთი მომენტი...", 2: "დამუშავება...", 3: "სულ რაღაც წამი...", 4: "ამას შენთვის ვამოწმებ..." } }, Ea = { chat: { input: { placeholder: "Хабарламаңызды теріңіз...", listening: "Тыңдалуда..." }, enableSound: "Дыбысты қосу", stt: { transcribing: "Транскрипциялау: ", micActive: "Микрофон белсенді...", heardError: "Кешіріңіз, сізді ести алмадым. Қайталап көріңіз.", micAccessError: "Микрофонға кіру мүмкін емес. Рұқсаттарды тексеріңіз." }, speed: { idle: "Бос:", talk: "Әңгімелесу:" } }, avatar: { loading: "Аватар жүктелуде...", title: { maximize: "Үлкейту", minimize: "Кішірейту", close: "Жабу", clickToMaximize: "Үлкейту үшін басыңыз", clickToMinimize: "Кішірейту үшін басыңыз" }, error: { loadFailed: "Аватар жүктелмеді: {{error}} ", playerNotLoaded: "AniaPlayer жүктелмеді", passwordRequired: "Шифрланған .ania файлы үшін құпия сөз қажет", noSource: "Аватар көзі берілмеді (avatarUrl немесе avatarData)" } }, greetings: { 0: "Сәлем! Бүгін мен сізге қалай көмектесе аламын?", 1: "Сәлем! Қош келдіңіз! Мен сен үшін не істей аламын?", 2: "Сәлем! Сізбен сөйлескеніме қуаныштымын!", 3: "Сәлем! Мен көмектесуге келдім. Саған не қажет?", 4: "Сәлем! Қалдарыңыз қалай? Мен қалай пайдалы бола аламын?" }, waiting: { 0: "Ойланайыншы...", 1: "Бір сәт...", 2: "Өңдеуде...", 3: "Бір секунд...", 4: "Мен мұны сіз үшін тексеріп жатырмын ..." } }, Ca = { chat: { input: { placeholder: "វាយបញ្ចូលសាររបស់អ្នក...", listening: "កំពុងស្តាប់..." }, enableSound: "បើកសំឡេង", stt: { transcribing: "ប្រតិចារិក៖ ", micActive: "មីក្រូហ្វូនសកម្ម...", heardError: "សូមអភ័យទោស មិនអាចឮអ្នកបានទេ។ សូមព្យាយាមម្តងទៀត។", micAccessError: "មិនអាចចូលប្រើមីក្រូហ្វូនបានទេ។ ពិនិត្យការអនុញ្ញាត។" }, speed: { idle: "ទំនេរ៖", talk: "និយាយ៖" } }, avatar: { loading: "កំពុងផ្ទុករូបតំណាង...", title: { maximize: "អតិបរមា", minimize: "បង្រួមអប្បបរមា", close: "បិទ", clickToMaximize: "ចុចដើម្បីពង្រីកអតិបរមា", clickToMinimize: "ចុចដើម្បីបង្រួមអប្បបរមា" }, error: { loadFailed: "បរាជ័យក្នុងការផ្ទុករូបតំណាង៖ {{error}} ", playerNotLoaded: "AniaPlayer មិន​បាន​ផ្ទុក", passwordRequired: "ទាមទារពាក្យសម្ងាត់សម្រាប់ឯកសារ .ania ដែលបានអ៊ិនគ្រីប", noSource: "មិនមានប្រភពរូបតំណាងដែលបានផ្តល់ឱ្យទេ (avatarUrl ឬ avatarData)" } }, greetings: { 0: "សួស្តី! តើខ្ញុំអាចជួយអ្នកនៅថ្ងៃនេះដោយរបៀបណា?", 1: "សួស្តី! សូមស្វាគមន៍! តើខ្ញុំអាចធ្វើអ្វីសម្រាប់អ្នក?", 2: "សួស្តី! រីករាយណាស់ដែលបាននិយាយជាមួយអ្នក!", 3: "សួស្តី! ខ្ញុំនៅទីនេះដើម្បីជួយ។ តើអ្នកត្រូវការអ្វី?", 4: "សួស្តី! សុខសប្បាយជាទេ? តើខ្ញុំអាចមានប្រយោជន៍យ៉ាងដូចម្តេច?" }, waiting: { 0: "អោយខ្ញុំគិត...", 1: "មួយសន្ទុះ...", 2: "កំពុងដំណើរការ...", 3: "មួយវិនាទី...", 4: "ខ្ញុំកំពុងពិនិត្យមើលវាសម្រាប់អ្នក ..." } }, ca = { chat: { input: { placeholder: "ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಟೈಪ್ ಮಾಡಿ...", listening: "ಕೇಳುತ್ತಿದೆ..." }, enableSound: "ಧ್ವನಿಯನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ", stt: { transcribing: "ಲಿಪ್ಯಂತರ: ", micActive: "ಮೈಕ್ರೊಫೋನ್ ಸಕ್ರಿಯವಾಗಿದೆ...", heardError: "ಕ್ಷಮಿಸಿ, ನಿಮ್ಮ ಮಾತು ಕೇಳಲಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.", micAccessError: "ಮೈಕ್ರೊಫೋನ್ ಪ್ರವೇಶಿಸಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ. ಅನುಮತಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ." }, speed: { idle: "ನಿಷ್ಕ್ರಿಯ:", talk: "ಚರ್ಚೆ:" } }, avatar: { loading: "ಅವತಾರ್ ಲೋಡ್ ಆಗುತ್ತಿದೆ...", title: { maximize: "ಗರಿಷ್ಠಗೊಳಿಸು", minimize: "ಕಡಿಮೆಗೊಳಿಸು", close: "ಮುಚ್ಚಿ", clickToMaximize: "ಗರಿಷ್ಠಗೊಳಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ", clickToMinimize: "ಕಡಿಮೆ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ" }, error: { loadFailed: "ಅವತಾರ್ ಲೋಡ್ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ: {{error}} ", playerNotLoaded: "AniaPlayer ಲೋಡ್ ಆಗಿಲ್ಲ", passwordRequired: "ಎನ್‌ಕ್ರಿಪ್ಟ್ ಮಾಡಿದ .ania ಫೈಲ್‌ಗೆ ಪಾಸ್‌ವರ್ಡ್ ಅಗತ್ಯವಿದೆ", noSource: "ಯಾವುದೇ ಅವತಾರ್ ಮೂಲವನ್ನು ಒದಗಿಸಲಾಗಿಲ್ಲ (avatarUrl ಅಥವಾ avatarData)" } }, greetings: { 0: "ನಮಸ್ತೆ! ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?", 1: "ನಮಸ್ಕಾರ! ಸ್ವಾಗತ! ನಾನು ನಿಮಗಾಗಿ ಏನು ಮಾಡಬಹುದು?", 2: "ನಮಸ್ಕಾರ! ನಿಮ್ಮೊಂದಿಗೆ ಮಾತನಾಡಲು ತುಂಬಾ ಸಂತೋಷವಾಗಿದೆ!", 3: "ನಮಸ್ಕಾರ! ನಾನು ಸಹಾಯ ಮಾಡಲು ಇಲ್ಲಿದ್ದೇನೆ. ನಿಮಗೆ ಏನು ಬೇಕು?", 4: "ನಮಸ್ತೆ! ಹೇಗಿದ್ದೀಯಾ? ನಾನು ಹೇಗೆ ಉಪಯುಕ್ತವಾಗಬಹುದು?" }, waiting: { 0: "ನಾನು ಯೋಚಿಸಲಿ ...", 1: "ಒಂದು ಕ್ಷಣ...", 2: "ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುತ್ತಿದೆ...", 3: "ಕೇವಲ ಒಂದು ಸೆಕೆಂಡ್...", 4: "ನಾನು ಅದನ್ನು ನಿಮಗಾಗಿ ಪರಿಶೀಲಿಸುತ್ತಿದ್ದೇನೆ..." } }, da = { chat: { input: { placeholder: "메시지를 입력하세요...", listening: "듣는 중..." }, enableSound: "소리 활성화", stt: { transcribing: "스크립트 작성 중: ", micActive: "마이크 활성...", heardError: "죄송합니다. 귀하의 목소리를 들을 수 없습니다. 다시 시도해 주세요.", micAccessError: "마이크에 액세스할 수 없습니다. 권한을 확인하세요." }, speed: { idle: "유휴:", talk: "이야기:" } }, avatar: { loading: "아바타 로드 중...", title: { maximize: "최대화", minimize: "최소화", close: "닫기", clickToMaximize: "최대화하려면 클릭하세요.", clickToMinimize: "최소화하려면 클릭하세요." }, error: { loadFailed: "아바타 로드 실패: {{error}} ", playerNotLoaded: "AniaPlayer가 로드되지 않았습니다.", passwordRequired: "암호화된 .ania 파일에 비밀번호가 필요합니다.", noSource: "제공된 아바타 소스가 없습니다(avatarUrl 또는 AvatarData)." } }, greetings: { 0: "안녕하세요! 오늘은 무엇을 도와드릴까요?", 1: "안녕하세요! 환영! 제가 당신을 위해 무엇을 도와드릴까요?", 2: "안녕하세요! 당신과 이야기하게 되어 정말 기뻐요!", 3: "안녕하세요! 저는 도와드리려고 왔습니다. 뭐가 필요하세요?", 4: "안녕! 어떻게 지내세요? 어떻게 하면 유용할 수 있나요?" }, waiting: { 0: "생각해보자...", 1: "잠시만요...", 2: "처리 중...", 3: "잠시만요...", 4: "내가 당신을 위해 그걸 확인하고 있어요..." } }, ma = { chat: { input: { placeholder: "Tayp yu mɛsej...", listening: "We yu de lisin..." }, enableSound: "Enable Saund", stt: { transcribing: "We dɛn de transkrib: ", micActive: "Maykrofon aktif...", heardError: "Sɔri, a nɔ bin ebul fɔ yɛri yu. Duya tray bak.", micAccessError: "Nɔ ebul fɔ akses maykrofon. Chek di permishɔn dɛn." }, speed: { idle: "Idle:", talk: "Tɔk:" } }, avatar: { loading: "We yu de lod avatar...", title: { maximize: "Maksimayz am", minimize: "Minimiz am", close: "Klos", clickToMaximize: "Klik fɔ mek yu maksimayz", clickToMinimize: "Klik fɔ mek yu smɔl smɔl" }, error: { loadFailed: "Fail fɔ lod avatar: {{error}} . ", playerNotLoaded: "AniaPlayer nɔ lod", passwordRequired: "Paswɔd nid fɔ enkript .ania fayl", noSource: "No avatar sɔs nɔ de we dɛn gi (avatarUrl ɔ avatarData)" } }, greetings: { 0: "Hi! Aw a go ɛp yu tide?", 1: "Adu! Wɛlkɔm! Wetin a go du fɔ yu?", 2: "Kushɛ-o! So gladi fɔ tɔk to yu!", 3: "Adu! A de ya fɔ ɛp. Wetin yu nid?", 4: "Kushɛ! Aw di bɔdi? Aw a go bi yusful pɔsin?" }, waiting: { 0: "Mek a tink se...", 1: "Wan mɔnt...", 2: "Di we aw dɛn de prosɛs...", 3: "Jɔs wan sɛkɔn...", 4: "A de chɛk dat fɔ yu..." } }, Fa = { chat: { input: { placeholder: "Sonika nsangu na nge...", listening: "Kuwidikila..." }, enableSound: "Kangula Makelele", stt: { transcribing: "Kusonika: ", micActive: "Micro ke sala...", heardError: "Lolula mono, mono lendaka kuwa nge ve. Mulemvo meka diaka.", micAccessError: "Kukonda kukuka na kukota na mikro. Tala nswa." }, speed: { idle: "Kukonda kisalu:", talk: "Diskure:" } }, avatar: { loading: "Kutula kifwanisu...", title: { maximize: "Kukumisa mingi", minimize: "Kukulumusa", close: "Kanga", clickToMaximize: "Fina sambu na kuyedisa", clickToMinimize: "Fina sambu na kukulumusa" }, error: { loadFailed: "Kukonda kutula kifwanisu: {{error}} ", playerNotLoaded: "Aniajoueur me fuluka ve", passwordRequired: "Mot de passe kele mfunu sambu na fichier .ania ya kukangama", noSource: "Bo me pesa ve kisina ya kifwani (Url ya kifwani to bansangu ya kifwani)" } }, greetings: { 0: "Mbote! Inki mutindu mono lenda sadisa nge bubu yai?", 1: "Mbote! Kukwisa ya mbote! Inki mono lenda sala sambu na nge?", 2: "Mbote na beno! Kiese mingi na kusolula ti nge!", 3: "Mbote! Mu ke awa samu na kusadisa. Inki nge kele na yo mfunu?", 4: "Mbote! Ebwe? Inki mutindu mono lenda vanda mfunu?" }, waiting: { 0: "Bika mono yindula...", 1: "Ntangu mosi...", 2: "Kuyidika...", 3: "Kaka sekondi mosi...", 4: "Mono ke tala yo sambu na nge..." } }, ka = { chat: { input: { placeholder: "Peyama xwe binivîse...", listening: "Guhdarîkirin..." }, enableSound: "Deng çalak bike", stt: { transcribing: "Veguheztin: ", micActive: "Mîkrofona çalak...", heardError: "Bibore, min nebihîst. Ji kerema xwe dîsa biceribîne.", micAccessError: "Nikare bigihîje mîkrofonê. Destûran kontrol bikin." }, speed: { idle: "Bêkar:", talk: "Nîqaş:" } }, avatar: { loading: "Avatar tê barkirin...", title: { maximize: "Mezin bikin", minimize: "Kêmkirin", close: "Close", clickToMaximize: "Bikirtînin da ku zêde bikin", clickToMinimize: "Bikirtînin da ku kêm bikin" }, error: { loadFailed: "Barkirina avatar bi ser neket: {{error}} ", playerNotLoaded: "AniaPlayer nehat barkirin", passwordRequired: "Ji bo pelê .ania şîfrekirî şîfre hewce dike", noSource: "Çavkaniyek avatar nayê peyda kirin (avatarUrl an avatarData)" } }, greetings: { 0: "Hi! Ez îro çawa dikarim alîkariya te bikim?", 1: "Slav! Bi xêr hatî! Ez dikarim ji bo we çi bikim?", 2: "Silav! Ji ber ku ez bi we re dipeyivim pir kêfxweş im!", 3: "Slav! Ez ji bo alîkariyê li vir im. Çi hewcedariya we heye?", 4: "Merheba! Halê we çawa ye? Ez çawa dikarim bikêr bim?" }, waiting: { 0: "Bihêle ez bifikirim...", 1: "Demek...", 2: "Pêvajo...", 3: "Tenê saniyeyek...", 4: "Ez wê ji bo we kontrol dikim ..." } }, ga = { chat: { input: { placeholder: "Кабарыңызды териңиз...", listening: "Угууда..." }, enableSound: "Үндү иштетүү", stt: { transcribing: "Транскрипциялоо: ", micActive: "Микрофон активдүү...", heardError: "Кечиресиз, сизди уга албадым. Сураныч, кайра аракет кылыңыз.", micAccessError: "Микрофонго кирүү мүмкүн эмес. Уруксаттарды текшерүү." }, speed: { idle: "Бош:", talk: "Сүйлөшүү:" } }, avatar: { loading: "Аватар жүктөлүүдө...", title: { maximize: "Максималдуу кылуу", minimize: "Кичирейтүү", close: "Жабуу", clickToMaximize: "Чоңойтуу үчүн чыкылдатыңыз", clickToMinimize: "Кичирейтүү үчүн чыкылдатыңыз" }, error: { loadFailed: "Аватар жүктөлгөн жок: {{error}} ", playerNotLoaded: "AniaPlayer жүктөлгөн жок", passwordRequired: "Шифрленген .ania файлы үчүн сырсөз талап кылынат", noSource: "Аватар булагы берилген эмес (avatarUrl же avatarData)" } }, greetings: { 0: "салам! Бүгүн мен сага кантип жардам бере алам?", 1: "Салам! Кош келдиңиз! Мен сен үчүн эмне кыла алам?", 2: "Салам! Сиз менен сүйлөшүүгө кубанычтамын!", 3: "Салам! Мен жардам берүү үчүн келдим. сага эмне керек?", 4: "Салам! Кандайсыз? Кантип мен пайдалуу боло алам?" }, waiting: { 0: "Ойлонуп көрөйүн...", 1: "Бир көз ирмем...", 2: "Иштелүүдө...", 3: "Бир секунда...", 4: "Мен муну сиз үчүн текшерип жатам..." } }, ha = { chat: { input: { placeholder: "Typus nuntium tuum.", listening: "Auditio..." }, enableSound: "Sonus activare", stt: { transcribing: "Transcribendo: ", micActive: "Tortor ligula ac...", heardError: "Ignosce, te audire non potuit. Quaeso, iterum conare.", micAccessError: "'Non accedere tortor ligula. Perscriptio permissionum." }, speed: { idle: "Otiosa:", talk: "Loquere:" } }, avatar: { loading: "Loading avatar...", title: { maximize: "Maximize", minimize: "Minimize", close: "Close", clickToMaximize: "Click ut maximize", clickToMinimize: "Click ad circumscribendam" }, error: { loadFailed: "Failed to load avatar: {{error}}", playerNotLoaded: "AniaPlayer non loaded", passwordRequired: "Password requisiti encrypted .ania lima", noSource: "Nulla copia avatar (avatarUrl vel avatarData)" } }, greetings: { 0: "Salve! Quomodo te adiuvare possum hodie?", 1: "salve! salve! quid faciam tibi?", 2: "Salve! Gaudeo igitur tecum loqui!", 3: "salve! Sum hic ad auxilium. Quid opus est tibi?", 4: "Salve! Quomodo vales? Quomodo utilis esse possum?" }, waiting: { 0: "Cogitem...", 1: "Unum momentum...", 2: "Processus...", 3: "Justo secundo...", 4: "Im 'reprehendo quod pro te ..." } }, pa = { chat: { input: { placeholder: "Schreift Äre Message ...", listening: "Lauschtert ..." }, enableSound: "Sound aktivéieren", stt: { transcribing: "Transkriptioun: ", micActive: "Mikrofon aktiv ...", heardError: "Sorry, konnt dech net héieren. Probéiert w.e.g. nach eng Kéier.", micAccessError: "Kann net Zougang zum Mikrofon kréien. Check Permissiounen." }, speed: { idle: "Idle:", talk: "Diskussioun:" } }, avatar: { loading: "Luet den Avatar ...", title: { maximize: "Maximaliséieren", minimize: "Minimiséieren", close: "Zoumaachen", clickToMaximize: "Klickt fir ze maximéieren", clickToMinimize: "Klickt fir ze minimiséieren" }, error: { loadFailed: "Konnt den Avatar net lueden: {{error}} ", playerNotLoaded: "AniaPlayer net gelueden", passwordRequired: "Passwuert néideg fir verschlësselte .ania Fichier", noSource: "Keng Avatarquell geliwwert (avatarUrl oder avatarData)" } }, greetings: { 0: "Moien! Wéi kann ech Iech haut hëllefen?", 1: "Hallo! Wëllkomm! Wat kann ech fir dech maachen?", 2: "Moien alleguer! Sou frou mat Iech ze schwätzen!", 3: "Hallo! Ech sinn hei fir ze hëllefen. Wat brauchs du?", 4: "Salut! Wéi geet et dir? Wéi kann ech nëtzlech sinn?" }, waiting: { 0: "Loosst mech denken ...", 1: "Ee Moment ...", 2: "Veraarbechtung...", 3: "Just eng Sekonn ...", 4: "Ech kontrolléieren dat fir Iech ..." } }, va = { chat: { input: { placeholder: "Wandiika obubaka bwo...", listening: "Okuwuliriza..." }, enableSound: "Ssobozesa Eddoboozi", stt: { transcribing: "Okuwandiika: ", micActive: "Microphone ekola...", heardError: "Bambi, saasobola kukuwulira. Nsaba oddemu ogezeeko.", micAccessError: "Tesobola kuyingira mu mayirofooni. Kebera olukusa." }, speed: { idle: "Idle:", talk: "Emboozi:" } }, avatar: { loading: "Okutikka avatar...", title: { maximize: "Maximize nnyo", minimize: "Kikendeeze ku nsonga eno", close: "Ggalawo", clickToMaximize: "Nyiga okufuna ebisingawo", clickToMinimize: "Nyiga okendeeze" }, error: { loadFailed: "Eremereddwa okutikka avatar: {{error}} ", playerNotLoaded: "AniaPlayer tetikkiddwa", passwordRequired: "Password eyeetaagibwa ku fayiro ya .ania ensirifu", noSource: "Tewali nsibuko ya avatar eweereddwa (avatarUrl oba avatarData) ." } }, greetings: { 0: "Hi! Nnyinza ntya okukuyamba leero?", 1: "Nkulamusizza! Kaale! Kiki kye nnyinza okukukolera?", 2: "Nkulamusizaako! Nsanyuse nnyo okwogera naawe!", 3: "Nkulamusizza! Nze ndi wano okuyamba. Kiki kye weetaaga?", 4: "Nkulamusizza! Oli otya? Nnyinza ntya okuba ow’omugaso?" }, waiting: { 0: "Ka ndowooza nti...", 1: "Akaseera kamu...", 2: "Okukola ku nsonga eno...", 3: "Akasekondi katono...", 4: "Ekyo nkikebera ku lulwo..." } }, ya = { chat: { input: { placeholder: "Typ eur boodsjap...", listening: "Luustere..." }, enableSound: "Geluid insjakele", stt: { transcribing: "Transcrire: ", micActive: "Microfoon actief...", heardError: "Sorry, ik koos dich neet heure. Probeer nog ummer.", micAccessError: "Neet touwgaank tot de microfoon. Controleer de rechte." }, speed: { idle: "Idle:", talk: "Gesprek:" } }, avatar: { loading: "Avatar laden...", title: { maximize: "Maximisere", minimize: "Minimaliseer", close: "Sluite", clickToMaximize: "Klik um te maximalisere", clickToMinimize: "Klik um te minimalisere" }, error: { loadFailed: "Avatar neet gelaoje: {{error}} ", playerNotLoaded: "AniaPlayer neet gelaod", passwordRequired: "Wachwoord nuudig veur versleutelde .ania-bestand", noSource: "Geen avatarbron verstrek (avatarUrl of avatarData)" } }, greetings: { 0: "Hallo! Wie kin ich dich vandaag helpe?", 1: "Hallo! Welkom! Wat kin ich veur dich doon?", 2: "Hoi! Ich bin zoe blie um mit uch te praote!", 3: "Hallo! Ich bin hei um te helpe. Wat höbste nuudig?", 4: "Hoi! Wie geit het? Wie kin ich nuttig zien?" }, waiting: { 0: "Laot mich dinke...", 1: "Ein momint...", 2: "Verwèrking...", 3: "Mer un seconde...", 4: "Ich controleer dat veur uch..." } }, xa = { chat: { input: { placeholder: "Digita o teu messaggio...", listening: "Ascoltâ..." }, enableSound: "Attiva o son", stt: { transcribing: "Trascriçion: ", micActive: "Micròfono attivo...", heardError: "Scusa, no son stæto bon de sentite. Pe favô, provâ torna.", micAccessError: "No l'é poscibile açede a-o microfòn. Controllâ e autorizzaçioin." }, speed: { idle: "Inattivo:", talk: "Discorso:" } }, avatar: { loading: "Carregando l'avatar...", title: { maximize: "Mascimizzâ", minimize: "Minimizzâ", close: "Serrâ", clickToMaximize: "Clicca pe mascimizzâ", clickToMinimize: "Clicca pe redue a-o minimo" }, error: { loadFailed: "No l'é stæto poscibile carregâ l'avatar: {{error}} ", playerNotLoaded: "AniaPlayer no carregou", passwordRequired: "A password a l'é neçessäia pe-o file .ania criptou", noSource: "Nisciuña vivagna d'avatar fornia (Url d'avatar ò Dæti d'avatar)" } }, greetings: { 0: "Ciao! Comm'o peu ëse che ti pòsso aggiuttâ ancheu?", 1: "Ciao! Benvegnuo! Cossa posso fâ pe ti?", 2: "Ehilà! Tanto contento de parlâ con ti!", 3: "Ciao! Son chì pe aggiuttâ. Cossa gh'é de beseugno?", 4: "Ciao! Comme ti stæ? Comm'o peu ëse utile?" }, waiting: { 0: "Lasciame pensâ...", 1: "Un momento...", 2: "Elaboraçion...", 3: "Solo un segondo...", 4: "Sto controllando quello pe ti..." } }, ba = { chat: { input: { placeholder: "Digita el tò messaj...", listening: "Ascoltar..." }, enableSound: "Abilita el son", stt: { transcribing: "Trascriziun: ", micActive: "Micròfon atif...", heardError: "Scusa, pudevi minga sentirte. Per piasé pruva ancamò.", micAccessError: "Impossibil acceder al microfono. Cuntrula i permess." }, speed: { idle: "Inattivo:", talk: "Parlà:" } }, avatar: { loading: "Caricament del avatar...", title: { maximize: "Massimizar", minimize: "Minimizar", close: "Serra", clickToMaximize: "Clicca per massimizar", clickToMinimize: "Clicca per minimizar" }, error: { loadFailed: "L'è minga sta pusibel caricà l'avatar: {{error}} ", playerNotLoaded: "AniaPlayer minga caricà", passwordRequired: "Password dumandada per el file .ania criptà", noSource: "Nissun funt d’avatar furnida (Url d’avatar o dati d’avatar)" } }, greetings: { 0: "Ciao! Cuma pœu vuttàt incœu?", 1: "Uela! Benvegnud! Cossa pœdi far per ti?", 2: "Uei! Cusì contento de parlà cun ti!", 3: "Uela! Sun chi per vùtar. De che g’he bisugn?", 4: "Uela! Comè steet? Cuma pœu vèss ütil?" }, waiting: { 0: "Lassèm pensà...", 1: "Un mument...", 2: "Elaboraziun...", 3: "Solo un segund...", 4: "Sto controlland per ti..." } }, wa = { chat: { input: { placeholder: "Tyá message na yo...", listening: "Koyoka..." }, enableSound: "Activer Son", stt: { transcribing: "Kokoma na mikanda: ", micActive: "Microphone ezali kosala...", heardError: "Pardon, nakokaki koyoka yo te. Svp meka lisusu.", micAccessError: "Kokoka te kokɔta na micro. Talá ndingisa." }, speed: { idle: "Kosala mosala te:", talk: "Lisolo:" } }, avatar: { loading: "Nazali ko charger avatar...", title: { maximize: "Maximiser yango mingi", minimize: "Bosala ete ezala moke", close: "Bokanga", clickToMaximize: "Cliquez pona ko maximiser", clickToMinimize: "Cliquez pona ko minimiser" }, error: { loadFailed: "Elongi te ko charger avatar: {{error}} ", playerNotLoaded: "AniaPlayer ezo charger te", passwordRequired: "Mot de passe esengeli mpo na fichier .ania chiffré", noSource: "Liziba ya avatar epesami te (avatarUrl to avatarData)" } }, greetings: { 0: "Mbote Mbote! Ndenge nini nakoki kosalisa yo lelo?", 1: "Mbote! Boyei malamu! Nakoki kosala nini mpo na yo?", 2: "Mbote kuna! Esengo mingi ya kosolola na yo!", 3: "Mbote! Nazali awa mpo na kosalisa. Ozali na mposa ya nini?", 4: "Mbote! Boni? Ndenge nini nakoki kozala na ntina?" }, waiting: { 0: "Tika nakanisa...", 1: "Moment moko...", 2: "Traitement ya...", 3: "Kaka na segɔnde moko...", 4: "Nazo vérifier yango pona bino..." } }, za = { chat: { input: { placeholder: "ພິມຂໍ້ຄວາມຂອງເຈົ້າ...", listening: "ກຳລັງຟັງ..." }, enableSound: "ເປີດໃຊ້ສຽງ", stt: { transcribing: "ການຖອດຂໍ້ຄວາມ: ", micActive: "ໄມໂຄຣໂຟນເປີດຢູ່...", heardError: "ຂໍອະໄພ, ບໍ່ໄດ້ຍິນເຈົ້າ. ກະລຸນາລອງອີກຄັ້ງ.", micAccessError: "ບໍ່ສາມາດເຂົ້າເຖິງໄມໂຄຣໂຟນໄດ້. ກວດສອບການອະນຸຍາດ." }, speed: { idle: "Idle:", talk: "ສົນທະນາ:" } }, avatar: { loading: "ກຳລັງໂຫລດຮູບແທນຕົວ...", title: { maximize: "ສູງສຸດ", minimize: "ຫຍໍ້", close: "ປິດ", clickToMaximize: "ຄລິກເພື່ອຂະຫຍາຍສູງສຸດ", clickToMinimize: "ຄລິກເພື່ອຫຍໍ້ລົງ" }, error: { loadFailed: "ໂຫຼດຮູບແທນຕົວບໍ່ສຳເລັດ: {{error}} ", playerNotLoaded: "AniaPlayer ບໍ່ໄດ້ໂຫລດ", passwordRequired: "ຕ້ອງການລະຫັດຜ່ານສໍາລັບການເຂົ້າລະຫັດໄຟລ໌ .ania", noSource: "ບໍ່ມີການສະໜອງແຫຼ່ງຮູບແທນຕົວ (avatarUrl ຫຼື avatarData)" } }, greetings: { 0: "ສະບາຍດີ! ຂ້ອຍສາມາດຊ່ວຍເຈົ້າໄດ້ແນວໃດໃນມື້ນີ້?", 1: "ສະບາຍດີ! ຍິນດີຕ້ອນຮັບ! ຂ້ອຍສາມາດເຮັດຫຍັງໄດ້ແດ່?", 2: "ສະບາຍດີ! ຍິນດີທີ່ໄດ້ລົມກັບເຈົ້າ!", 3: "ສະບາຍດີ! ຂ້ອຍຢູ່ທີ່ນີ້ເພື່ອຊ່ວຍ. ທ່ານຕ້ອງການຫຍັງ?", 4: "ສະບາຍດີ! ເຈົ້າສະບາຍດີບໍ? ຂ້ອຍຈະເປັນປະໂຫຍດໄດ້ແນວໃດ?" }, waiting: { 0: "ໃຫ້ຂ້ອຍຄິດ...", 1: "ຄາວໜຶ່ງ...", 2: "ກຳລັງປະມວນຜົນ...", 3: "ວິນາທີ...", 4: "ຂ້ອຍ ກຳ ລັງກວດເບິ່ງນັ້ນ ສຳ ລັບເຈົ້າ ..." } }, fa = { chat: { input: { placeholder: "Įveskite savo žinutę...", listening: "Klausau..." }, enableSound: "Įjungti garsą", stt: { transcribing: "Transkribavimas: ", micActive: "Mikrofonas aktyvus...", heardError: "Atsiprašau, negirdėjau. Bandykite dar kartą.", micAccessError: "Nepavyko pasiekti mikrofono. Patikrinkite leidimus." }, speed: { idle: "Tuščia eiga:", talk: "Pokalbis:" } }, avatar: { loading: "Įkeliamas pseudoportretas...", title: { maximize: "Maksimaliai", minimize: "Sumažinti", close: "Uždaryti", clickToMaximize: "Spustelėkite, kad padidintumėte", clickToMinimize: "Spustelėkite, kad sumažintumėte" }, error: { loadFailed: "Nepavyko įkelti avataro: {{error}} ", playerNotLoaded: "AniaPlayer neįkeltas", passwordRequired: "Užšifruotam .ania failui reikalingas slaptažodis", noSource: "Nepateiktas avataro šaltinis (avatarUrl arba avatarData)" } }, greetings: { 0: "Sveiki! Kaip aš galiu tau padėti šiandien?", 1: "Sveiki! Sveiki atvykę! Ką aš galiu jums padėti?", 2: "Sveiki! Labai malonu su tavimi pasikalbėti!", 3: "Sveiki! Aš čia, kad padėčiau. ko tau reikia?", 4: "Sveiki! kaip sekasi? Kaip aš galiu būti naudingas?" }, waiting: { 0: "Leisk man pagalvoti...", 1: "Viena akimirka...", 2: "Apdorojama...", 3: "Tik sekundę...", 4: "Aš tai tikrinu už jus..." } }, Sa = { chat: { input: { placeholder: "Īroksti sovu ziņu...", listening: "Klausūtīs..." }, enableSound: "Īspējuot skaņu", stt: { transcribing: "Pīraksteišona: ", micActive: "Mikrofons aktivs...", heardError: "Atlaidit, navarēju jūs dzierdēt. Lyudzu, raugi vēļreiz.", micAccessError: "Navar pīkļyut mikrofonam. Pārbaudiet atļaujas." }, speed: { idle: "Tukšums:", talk: "Saruna:" } }, avatar: { loading: "Īluodejūt avataru...", title: { maximize: "Maksimali palelynuot", minimize: "Samazynuot", close: "Aizvērt", clickToMaximize: "Nūspīd, lai maksimali palelynuotu .", clickToMinimize: "Nūspīd, lai samazynuotu ." }, error: { loadFailed: "Naizadeve īluodēt avataru: {{error}} . ", playerNotLoaded: "AniaSpēlētuojs nav īluodāts", passwordRequired: "100 doc#1159 Vajadzeiga parole šifrātam .ania failam .", noSource: "Nav snāgts avatara olūts (avataraUrl voi avataraDati)" } }, greetings: { 0: "Sveiks! Kai es varu tev paleidzēt šudiņ?", 1: "Loba dīna! Sveicynuot! Kū es tev varu dareit?", 2: "Vasals! Tik prīca ar tevi parunuot!", 3: "Loba dīna! Es asu ite, lai paleidzātu. Kū tev vajag?", 4: "Vasals! Kai tev īt? Kai es varu byut nūdereigs?" }, waiting: { 0: "Ļauj maņ padūmuot...", 1: "Vīnu breidi...", 2: "Apstruode...", 3: "Tikai sekundi...", 4: "Es tū puorbaudu deļ teve..." } }, Ma = { chat: { input: { placeholder: "Ndik ote mari...", listening: "Winjo..." }, enableSound: "Yawo Dwol", stt: { transcribing: "Ndiko weche: ", micActive: "Maikrofon tiyo...", heardError: "<2Zepa> Akwayo ng'uono, ne ok anyal winjo wachni. Yie mondo item kendo.", micAccessError: "Ok nyal yudo maikrofon. Rang chike ma imiye." }, speed: { idle: "Ok otiyo:", talk: "Wach:" } }, avatar: { loading: "Oting'o tipo...", title: { maximize: "Medo maduong'", minimize: "Duok piny", close: "Lor", clickToMaximize: "Gwel mondo imed", clickToMinimize: "Gwel mondo iduok piny" }, error: { loadFailed: "Orem keto avatar: {{error}} ", playerNotLoaded: "Jatugo mar Ania pok oting'o", passwordRequired: "Wach mar kadho dwarore mar fail mar .ania mondiki", noSource: "Onge kama avatar wuokie (Url mar rang'iny kata data mar rang'iny)" } }, greetings: { 0: "Amosi! Ere kaka anyalo konyi sani?", 1: "Misawa! Machiegni! Ang’o ma anyalo timo ni in?", 2: "Amosi kanyo! Omiyo, amor ahinya wuoyo kodi!", 3: "Misawa! An kae mondo akony. Ang'o ma dwarore?", 4: "Amosi! Idhi nade? Ere kaka inyalo bedo gi konyruok?" }, waiting: { 0: "We apar...", 1: "Kinde achiel...", 2: "Tiyo...", 3: "Sekon achiel kende...", 4: "Arang'o mano kuomi..." } }, Ta = { chat: { input: { placeholder: "I message kha type la...", listening: "Ngaithlatu..." }, enableSound: "Sound tih kha enable rawh", stt: { transcribing: "Thuziak (Transcribing) tih hi: ", micActive: "Microphone active a nih chuan...", heardError: "Ngaidam rawh, ka hre thei lo. Khawngaihin han lo try leh teh.", micAccessError: "Microphone a lut thei lo. Permissions te chu enfiah rawh." }, speed: { idle: "Idle-ah chuan:", talk: "Thusawi:" } }, avatar: { loading: "Avatar load mek a ni...", title: { maximize: "Maximize rawh", minimize: "Minimize rawh", close: "Khar rawh", clickToMaximize: "Maximize turin click la", clickToMinimize: "Click la, minimize rawh" }, error: { loadFailed: "Avatar load theih loh: {{error}} ", playerNotLoaded: "AniaPlayer a load lo", passwordRequired: "Encrypted .ania file atan chuan password a ngai", noSource: "Avatar source pek a ni lo (avatarUrl emaw avatarData emaw)" } }, greetings: { 0: "Hi! Vawiin hian engtin nge ka puih theih ang che?", 1: "Chibai! Chibai! Engtin nge ka tihsak theih ang che?", 2: "Chibai le! Ka biak theih che hi ka lawm tak zet!", 3: "Chibai! Ka tanpui turin ka lo kal a ni. Eng nge i mamawh?", 4: "Chibai! I dam em? Engtin nge ka tangkai theih ang?" }, waiting: { 0: "Ka ngaihtuah ang...", 1: "Hun khat chu...", 2: "Processing a ni...", 3: "Second khat chauh...", 4: "Chu chu ka check sak che a ni..." } }, Na = { chat: { input: { placeholder: "Ierakstiet savu ziņojumu...", listening: "Klausos..." }, enableSound: "Iespējot skaņu", stt: { transcribing: "Transkribēšana: ", micActive: "Mikrofons aktīvs...", heardError: "Atvainojiet, nevarēju jūs dzirdēt. Lūdzu, mēģiniet vēlreiz.", micAccessError: "Nevar piekļūt mikrofonam. Pārbaudiet atļaujas." }, speed: { idle: "Dīkstāve:", talk: "Runājiet:" } }, avatar: { loading: "Notiek iemiesojuma ielāde...", title: { maximize: "Maksimizēt", minimize: "Minimizēt", close: "Aizvērt", clickToMaximize: "Noklikšķiniet, lai palielinātu", clickToMinimize: "Noklikšķiniet, lai samazinātu" }, error: { loadFailed: "Neizdevās ielādēt iemiesojumu: {{error}} ", playerNotLoaded: "AniaPlayer nav ielādēts", passwordRequired: "Šifrētam .ania failam nepieciešama parole", noSource: "Nav norādīts iemiesojuma avots (avatarUrl vai avatarData)" } }, greetings: { 0: "Sveiki! Kā es varu jums palīdzēt šodien?", 1: "Sveiki! Laipni lūdzam! Ko es varu darīt jūsu labā?", 2: "Sveiki! Tik priecīgs ar jums runāt!", 3: "Sveiki! Esmu šeit, lai palīdzētu. Ko tev vajag?", 4: "Sveiki! kā tev iet? Kā es varu būt noderīgs?" }, waiting: { 0: "Ļaujiet man padomāt...", 1: "Viens mirklis...", 2: "Notiek apstrāde...", 3: "Tikai sekundi...", 4: "Es to pārbaudu jūsu vietā..." } }, ja = { chat: { input: { placeholder: "अपन संदेश टाइप करू...", listening: "सुनैत छी..." }, enableSound: "ध्वनि सक्षम करू", stt: { transcribing: "प्रतिलेखन : १. ", micActive: "माइक्रोफोन सक्रिय...", heardError: "माफ करब, अहाँक बात नहि सुनि सकलहुँ। कृपया पुनः प्रयास करू।", micAccessError: "माइक तक पहुँचने में असमर्थ। अनुमति जाँच करू।" }, speed: { idle: "निष्क्रिय : १.", talk: "गप्प-सप्प : १." } }, avatar: { loading: "अवतार लोड भ रहल अछि...", title: { maximize: "अधिकतम करब", minimize: "न्यूनतम करब", close: "बंद करू", clickToMaximize: "अधिकतम करबाक लेल क्लिक करू", clickToMinimize: "न्यूनतम करबाक लेल क्लिक करू" }, error: { loadFailed: "अवतार लोड करबामे विफल: {{error}} ", playerNotLoaded: "AniaPlayer लोड नहि भेल", passwordRequired: "एन्क्रिप्टेड .ania फाइल क लेल पासवर्ड आवश्यक अछि", noSource: "कोनो अवतार स्रोत उपलब्ध नै अछि (avatarUrl या avatarData)" } }, greetings: { 0: "हाय! आइ हम अहाँक कोना मदद करब।", 1: "नमस्कार! स्वागत! हम अहाँक लेल की क' सकैत छी?", 2: "नमस्ते! अहाँ स गप्प करबा मे एतेक खुशी भेल!", 3: "नमस्कार! हम एतय मदद करय लेल आयल छी। अहाँकेँ की चाही?", 4: "नमस्कार! अहांक कोना छी? हम कोना उपयोगी भ' सकब।" }, waiting: { 0: "हम सोचैत छी...", 1: "एक क्षण...", 2: "प्रसंस्करण के...", 3: "बस एक सेकेंड के...", 4: "हम अहाँक लेल से चेक क' रहल छी..." } }, Pa = { chat: { input: { placeholder: "Ketik pesannu...", listening: "Nalangngere..." }, enableSound: "Enable Sound", stt: { transcribing: "Antulisiki: ", micActive: "Microphone active...", heardError: "Maaf, tena nakkulle kulangngere. Please try again.", micAccessError: "Tena nakkulle antama ri mikrofon. Check permissions." }, speed: { idle: "Tena anjama:", talk: "A'bicara:" } }, avatar: { loading: "Loading avatar...", title: { maximize: "Maksimalkan", minimize: "Kurangi", close: "tutupi", clickToMaximize: "Click to maximize", clickToMinimize: "Klik untu' ampa'kurangi" }, error: { loadFailed: "Tena nakkulle antama avatar: {{error}} ", playerNotLoaded: "AniaPlayer tena na ni muat", passwordRequired: "Kata sandi niparalluangi untuk file .ania yang terenkripsi", noSource: "Tena sumber avatar nipassareang (avatarUrl atau avatarData)" } }, greetings: { 0: "Hi! Antekamma bateku ambantuko anne alloa?", 1: "Halo! Salama battu! What can I do for you?", 2: "Woy anjorengnga! Sanna' rannuna a'bicara siagang ikatte!", 3: "Halo! I'm here to help. Apa nuparalluangi?", 4: "Hai! Apa kareba? Antekamma bateku akkulle a'matu-matu?" }, waiting: { 0: "Let me think...", 1: "Se're wattu...", 2: "Amproses...", 3: "Se're detikji...", 4: "Inakke ansalidiki anjo untuk ikatte..." } }, Ka = { chat: { input: { placeholder: "Soraty ny hafatrao...", listening: "Mihaino..." }, enableSound: "Alefaso ny feo", stt: { transcribing: "Mandika: ", micActive: "Microphone mavitrika...", heardError: "Miala tsiny fa tsy nahare anao. Andramo indray azafady.", micAccessError: "Tsy afaka miditra mikrofona. Jereo ny fahazoan-dàlana." }, speed: { idle: "tsy miasa:", talk: "Resaka:" } }, avatar: { loading: "Mametraka avatar...", title: { maximize: "Maximize", minimize: "Manamaivana", close: "Akatona", clickToMaximize: "Kitiho raha ampitomboina", clickToMinimize: "Tsindrio raha hanamaivana" }, error: { loadFailed: "Tsy nahomby ny fampidirana avatar: {{error}} ", playerNotLoaded: "Tsy voaloa ny AniaPlayer", passwordRequired: "Ilaina ny tenimiafina ho an'ny rakitra .ania miafina", noSource: "Tsy misy loharano avatar omena (avatarUrl na avatarData)" } }, greetings: { 0: "Salama! Ahoana no ahafahako manampy anao anio?", 1: "Salama! Tongasoa! Inona no azoko atao ho anao?", 2: "Salama e! Tena faly miresaka aminao!", 3: "Salama! Eto aho hanampy. Inona no ilainao?", 4: "Salama! Manao ahoana ianao? Ahoana no hahasoa ahy?" }, waiting: { 0: "Avelao aho hieritreritra...", 1: "Indray mandeha...", 2: "Mikarakara...", 3: "Kely kely...", 4: "Manamarina izany ho anao aho..." } }, La = { chat: { input: { placeholder: "Patohia to karere...", listening: "Whakarongo..." }, enableSound: "Whakahohe Oro", stt: { transcribing: "Whakatuhi: ", micActive: "Hohe hopuoro...", heardError: "Aroha mai, kaore i rongo i a koe. Me ngana ano.", micAccessError: "Kaore e taea te uru ki te hopuoro. Tirohia nga whakaaetanga." }, speed: { idle: "Karekau:", talk: "Korero:" } }, avatar: { loading: "Uta ana te avatar...", title: { maximize: "Whakanuia", minimize: "Whakaiti", close: "Katia", clickToMaximize: "Pāwhiri ki te whakanui", clickToMinimize: "Patohia ki te whakaiti" }, error: { loadFailed: "I rahua te uta i te avatar: {{error}} ", playerNotLoaded: "Kaore a AniaPlayer i utaina", passwordRequired: "Kupuhipa e hiahiatia ana mo te konae .ania whakamunatia", noSource: "Kaore he puna avatar i whakaratohia (avatarUrl, avatarData ranei)" } }, greetings: { 0: "Kia ora! Me pehea taku awhina i a koe i tenei ra?", 1: "Kia ora! Nau mai haere mai! He aha taku mahi mo koe?", 2: "Kia ora! Tena koa ki te korero ki a koe!", 3: "Kia ora! Kei konei ahau ki te awhina. He aha e hiahia ana koe?", 4: "Kia ora! Kei te pehea koe? Me pehea e whai hua ai ahau?" }, waiting: { 0: "Kia whakaaro ahau...", 1: "Kotahi te wa...", 2: "Tukatuka...", 3: "He rua noa...", 4: "Kei te tirotiro ahau mo koe..." } }, Ua = { chat: { input: { placeholder: "Ketik pasan Sanak...", listening: "Mandangakan..." }, enableSound: "Aktifkan Suaro", stt: { transcribing: "Mantranskripsikan: ", micActive: "Mikrofon aktif...", heardError: "Maaf, indak bisa mandanga. Tolong cubo baliak.", micAccessError: "Indak dapek maakses mikrofon. Pareso izinnyo." }, speed: { idle: "Nganggur:", talk: "Bicaro:" } }, avatar: { loading: "Mamuek gambar...", title: { maximize: "Maksimalkan", minimize: "Minimalisir", close: "Tutuik", clickToMaximize: "Klik untuak mamaksimalkan", clickToMinimize: "Klik untuak maminimalikan" }, error: { loadFailed: "Gagal mamuek avatar: {{error}} ", playerNotLoaded: "AniaPamain indak dimuek", passwordRequired: "Kato sandi diparalukan untuak berkas .ania nan dienkripsi", noSource: "Indak ado sumber avatar nan disadiokan (Url avatar atauData avatar)" } }, greetings: { 0: "Hai! Baa caronyo ambo bisa mambantu sanak hari ko?", 1: "Halo! Salamaik datang! Apo nan bisa ambo lakukan untuak sanak?", 2: "Halo nan di sinan! Jadi sanang mangecek jo sanak!", 3: "Halo! Ambo di siko untuak mambantu. Apo nan paralu?", 4: "Oi! Baa kaba angku? Baa caronyo ambo bisa baguno?" }, waiting: { 0: "Bia ambo bapikia...", 1: "Sakatiko...", 2: "Pangolahan...", 3: "Sadetik sajo...", 4: "Ambo mamareso itu untuak sanak..." } }, Ha = { chat: { input: { placeholder: "Напишете ја вашата порака...", listening: "Слушање..." }, enableSound: "Овозможи звук", stt: { transcribing: "Препишување: ", micActive: "Активен микрофон...", heardError: "Извини, не можев да те слушнам. Ве молиме обидете се повторно.", micAccessError: "Не може да се пристапи до микрофонот. Проверете ги дозволите." }, speed: { idle: "Неактивен:", talk: "Разговор:" } }, avatar: { loading: "Се вчитува аватарот...", title: { maximize: "Максимизирај", minimize: "Минимизирајте", close: "Затвори", clickToMaximize: "Кликнете за да го максимизирате", clickToMinimize: "Кликнете за минимизирање" }, error: { loadFailed: "Не успеа да се вчита аватарот: {{error}} ", playerNotLoaded: "AniaPlayer не е вчитан", passwordRequired: "Потребна е лозинка за шифрирана датотека .ania", noSource: "Не е обезбеден извор на аватар (avatarUrl или avatarData)" } }, greetings: { 0: "Здраво! Како можам да ви помогнам денес?", 1: "Здраво! Добредојдовте! Што можам да направам за тебе?", 2: "Здраво! Многу ми е мило што разговарам со вас!", 3: "Здраво! Јас сум тука да помогнам. Што ви треба?", 4: "Здраво! како си? Како можам да бидам корисен?" }, waiting: { 0: "Дозволете ми да размислам...", 1: "Еден момент...", 2: "Се обработува...", 3: "Само секунда...", 4: "Тоа ти го проверувам..." } }, qa = { chat: { input: { placeholder: "നിങ്ങളുടെ സന്ദേശം ടൈപ്പ് ചെയ്യുക...", listening: "കേൾക്കുന്നു..." }, enableSound: "ശബ്ദം പ്രവർത്തനക്ഷമമാക്കുക", stt: { transcribing: "ട്രാൻസ്ക്രൈബ് ചെയ്യുന്നത്: ", micActive: "മൈക്രോഫോൺ സജീവമാണ്...", heardError: "ക്ഷമിക്കണം, നിങ്ങൾ പറയുന്നത് കേൾക്കാൻ കഴിഞ്ഞില്ല. ദയവായി വീണ്ടും ശ്രമിക്കുക.", micAccessError: "മൈക്രോഫോൺ ആക്‌സസ് ചെയ്യാനാവുന്നില്ല. അനുമതികൾ പരിശോധിക്കുക." }, speed: { idle: "നിഷ്‌ക്രിയം:", talk: "സംവാദം:" } }, avatar: { loading: "അവതാർ ലോഡ് ചെയ്യുന്നു...", title: { maximize: "പരമാവധിയാക്കുക", minimize: "ചെറുതാക്കുക", close: "അടയ്ക്കുക", clickToMaximize: "പരമാവധിയാക്കാൻ ക്ലിക്ക് ചെയ്യുക", clickToMinimize: "ചെറുതാക്കാൻ ക്ലിക്ക് ചെയ്യുക" }, error: { loadFailed: "അവതാർ ലോഡ് ചെയ്യുന്നതിൽ പരാജയപ്പെട്ടു: {{error}} ", playerNotLoaded: "AniaPlayer ലോഡ് ചെയ്തിട്ടില്ല", passwordRequired: "എൻക്രിപ്റ്റ് ചെയ്ത .ania ഫയലിന് പാസ്‌വേഡ് ആവശ്യമാണ്", noSource: "അവതാർ ഉറവിടങ്ങളൊന്നും നൽകിയിട്ടില്ല (avatarUrl അല്ലെങ്കിൽ avatarData)" } }, greetings: { 0: "ഹായ്! ഇന്ന് എനിക്ക് നിങ്ങളെ എങ്ങനെ സഹായിക്കാനാകും?", 1: "ഹലോ! സ്വാഗതം! എനിക്ക് നിനക്കായി എന്തുചെയ്യാൻ കഴിയൂം?", 2: "ഹേയ്, അവിടെയുണ്ടോ! നിങ്ങളോട് സംസാരിച്ചതിൽ വളരെ സന്തോഷം!", 3: "ഹലോ! സഹായിക്കാൻ ഞാൻ ഇവിടെയുണ്ട്. നിനക്കെന്താണ് ആവശ്യം?", 4: "ഹായ്! സുഖമാണോ? എനിക്ക് എങ്ങനെ ഉപയോഗപ്രദമാകും?" }, waiting: { 0: "ഞാൻ ആലോചിക്കട്ടെ...", 1: "ഒരു നിമിഷം...", 2: "പ്രോസസ്സ് ചെയ്യുന്നു...", 3: "ഒരു നിമിഷം...", 4: "ഞാൻ അത് നിങ്ങൾക്കായി പരിശോധിക്കുന്നു..." } }, Ra = { chat: { input: { placeholder: "Зурвасаа бичнэ үү...", listening: "Сонсож байна..." }, enableSound: "Дууг идэвхжүүл", stt: { transcribing: "Шилжүүлэх: ", micActive: "Микрофон идэвхтэй...", heardError: "Уучлаарай, таныг сонсож чадсангүй. Дахин оролдоно уу.", micAccessError: "Микрофонд хандах боломжгүй. Зөвшөөрлийг шалгана уу." }, speed: { idle: "Сул зогсолт:", talk: "Ярилцах:" } }, avatar: { loading: "Аватарыг ачаалж байна...", title: { maximize: "Томруулах", minimize: "Багасгах", close: "Хаах", clickToMaximize: "Томруулахын тулд товшино уу", clickToMinimize: "Багасгахын тулд товшино уу" }, error: { loadFailed: "Аватарыг ачаалж чадсангүй: {{error}} ", playerNotLoaded: "AniaPlayer ачаалагдаагүй байна", passwordRequired: "Шифрлэгдсэн .ania файлд нууц үг шаардлагатай", noSource: "Аватар эх сурвалж өгөөгүй (avatarUrl эсвэл avatarData)" } }, greetings: { 0: "Сайн уу! Өнөөдөр би чамд яаж туслах вэ?", 1: "Сайн байна уу! Тавтай морил! Би чиний төлөө юу хийж чадах вэ?", 2: "Сайн уу! Тантай ярилцаж байгаадаа баяртай байна!", 3: "Сайн байна уу! Би туслахаар ирлээ. Танд юу хэрэгтэй вэ?", 4: "Сайн уу! Сайн байна уу? Би яаж ашигтай байх вэ?" }, waiting: { 0: "Бодоод үз дээ...", 1: "Нэг хором...", 2: "Боловсруулж байна...", 3: "Ганцхан секунд...", 4: "Би үүнийг чиний төлөө шалгаж байна ..." } }, Ia = { chat: { input: { placeholder: "ꯑꯗꯣꯃꯒꯤ ꯄꯥꯎꯖꯦꯜ ꯑꯗꯨ ꯇꯥꯏꯞ ꯇꯧꯕꯤꯌꯨ...", listening: "ꯇꯥꯕꯥ ꯐꯪꯂꯤꯕꯥ..." }, enableSound: "ꯁꯥꯎꯟꯗ ꯏꯅꯦꯕꯜ ꯇꯧꯕꯥ꯫", stt: { transcribing: "ꯇ꯭ꯔꯥꯟꯁꯛꯔꯤꯄꯁꯟ ꯇꯧꯕꯥ: ꯱. ", micActive: "ꯃꯥꯏꯛꯔꯣꯐꯣꯟ ꯑꯦꯛꯇꯤꯕ ꯑꯣꯏꯕꯥ...", heardError: "ꯁꯣꯔꯤ, ꯅꯉꯒꯤ ꯋꯥꯐꯝ ꯇꯥꯕꯥ ꯉꯃꯈꯤꯗꯦ꯫ ꯆꯥꯅꯕꯤꯗꯨꯅꯥ ꯑꯃꯨꯛ ꯍꯟꯅꯥ ꯍꯣꯠꯅꯕꯤꯌꯨ꯫", micAccessError: "ꯃꯥꯏꯛꯔꯣꯐꯣꯟ ꯑꯦꯛꯁꯦꯁ ꯇꯧꯕꯥ ꯉꯃꯗꯕꯥ꯫ ꯑꯌꯥꯕꯥ ꯄꯤꯌꯨ꯫" }, speed: { idle: "ꯑꯥꯏꯗꯦꯟꯇꯤꯇꯤ ꯂꯩꯕꯥ: .", talk: "ꯋꯥꯔꯤ ꯁꯥꯅꯕꯥ: ꯱." } }, avatar: { loading: "ꯑꯋꯇꯥꯔ ꯂꯣꯗ ꯇꯧꯔꯤ...", title: { maximize: "ꯃꯦꯛꯁꯤꯃꯥꯏꯖ ꯇꯧꯕꯥ꯫", minimize: "ꯃꯤꯅꯤꯃꯥꯏꯖ ꯇꯧꯕꯥ꯫", close: "ꯀ꯭ꯂꯣꯖ ꯇꯧꯕꯥ꯫", clickToMaximize: "ꯃꯦꯛꯁꯤꯃꯥꯏꯖ ꯇꯧꯅꯕꯥ ꯀ꯭ꯂꯤꯛ ꯇꯧꯔꯣ꯫", clickToMinimize: "ꯃꯤꯅꯤꯃꯥꯏꯖ ꯇꯧꯅꯕꯥ ꯀ꯭ꯂꯤꯛ ꯇꯧꯔꯣ꯫" }, error: { loadFailed: "ꯑꯋꯇꯥꯔ ꯂꯣꯗ ꯇꯧꯕꯥ ꯉꯃꯗꯦ: {{error}} ", playerNotLoaded: "AniaPlayer ꯂꯣꯗ ꯇꯧꯗ꯭ꯔꯤ꯫", passwordRequired: "ꯑꯦꯅꯛꯔꯤꯞꯇ ꯇꯧꯔꯕꯥ .ania ꯐꯥꯏꯂꯒꯤꯗꯃꯛ ꯄꯥꯁꯋꯥꯔꯗ ꯃꯊꯧ ꯇꯥꯏ꯫", noSource: "ꯑꯋꯇꯥꯔ ꯁꯣꯔꯁ ꯑꯃꯠꯇꯥ ꯄꯤꯈꯤꯗꯦ (avatarUrl ꯅꯠꯔꯒꯥ avatarData)" } }, greetings: { 0: "ꯍꯥꯌ! ꯉꯁꯤ ꯑꯩꯍꯥꯛꯅꯥ ꯑꯗꯣꯃꯕꯨ ꯀꯔꯝꯅꯥ ꯃꯇꯦꯡ ꯄꯥꯡꯒꯅꯤ?", 1: "ꯍꯦꯜꯂꯣ! ꯇꯔꯥꯝꯅ ꯑꯣꯛꯆꯔꯤ! ꯑꯩꯅꯥ ꯅꯉꯒꯤꯗꯃꯛ ꯀꯔꯤ ꯇꯧꯕꯥ ꯌꯥꯕꯒꯦ?", 2: "ꯍꯥꯌ ꯃꯐꯃꯗꯨꯗꯥ! ꯑꯗꯣꯃꯒꯥ ꯋꯥꯔꯤ ꯁꯥꯅꯕꯗꯥ ꯌꯥꯝꯅꯥ ꯅꯨꯡꯉꯥꯏꯕꯥ ꯐꯥꯑꯣꯏ!", 3: "ꯍꯦꯜꯂꯣ! ꯑꯩꯍꯥꯛ ꯃꯐꯝ ꯑꯁꯤꯗꯥ ꯃꯇꯦꯡ ꯄꯥꯡꯅꯕꯥ ꯂꯥꯛꯂꯤ꯫ ꯑꯗꯣꯝ ꯀꯔꯤ ꯃꯊꯧ ꯇꯥꯔꯤꯕꯒꯦ?", 4: "ꯍꯥꯏ! ꯑꯗꯣꯝ ꯀꯝꯗꯧꯔꯤ? ꯑꯩꯅꯥ ꯀꯔꯝꯅꯥ ꯀꯥꯟꯅꯕꯥ ꯐꯪꯒꯅꯤ?" }, waiting: { 0: "ꯑꯩꯍꯥꯛꯅꯥ ꯈꯅꯖꯒꯦ...", 1: "ꯃꯤꯀꯨꯞ ꯑꯃꯗꯥ...", 2: "ꯄ꯭ꯔꯣꯁꯦꯁꯤꯡ ꯇꯧꯕꯥ...", 3: "ꯁꯦꯀꯦꯟꯗ ꯑꯃꯈꯛꯇꯪ...", 4: "ꯑꯩꯍꯥꯛꯅꯥ ꯑꯗꯣꯃꯒꯤꯗꯃꯛ ꯃꯗꯨ ꯆꯦꯛ ꯇꯧꯔꯤ..." } }, Oa = { chat: { input: { placeholder: "तुमचा संदेश टाइप करा...", listening: "ऐकत आहे..." }, enableSound: "ध्वनी सक्षम करा", stt: { transcribing: "लिप्यंतरण: ", micActive: "मायक्रोफोन सक्रिय...", heardError: "सॉरी, तुम्हाला ऐकू आले नाही. कृपया पुन्हा प्रयत्न करा.", micAccessError: "मायक्रोफोनमध्ये प्रवेश करण्यात अक्षम. परवानग्या तपासा." }, speed: { idle: "निष्क्रिय:", talk: "चर्चा:" } }, avatar: { loading: "अवतार लोड करत आहे...", title: { maximize: "कमाल करा", minimize: "कमी करा", close: "बंद करा", clickToMaximize: "कमाल करण्यासाठी क्लिक करा", clickToMinimize: "लहान करण्यासाठी क्लिक करा" }, error: { loadFailed: "अवतार लोड करण्यात अयशस्वी: {{error}} ", playerNotLoaded: "AniaPlayer लोड नाही", passwordRequired: "एनक्रिप्टेड .ania फाइलसाठी पासवर्ड आवश्यक आहे", noSource: "कोणताही अवतार स्रोत प्रदान केलेला नाही (avatarUrl किंवा avatarData)" } }, greetings: { 0: "हाय! आज मी तुम्हाला कशी मदत करू शकतो?", 1: "नमस्कार! स्वागत आहे! मी तुमच्यासाठी काय करू शकतो?", 2: "नमस्कार! तुमच्याशी बोलून खूप आनंद झाला!", 3: "नमस्कार! मी मदत करण्यासाठी येथे आहे. तुला काय हवे आहे?", 4: "हाय! कसे आहात? मी कसा उपयोगी होऊ शकतो?" }, waiting: { 0: "मला विचार करू दे...", 1: "एक क्षण...", 2: "प्रक्रिया करत आहे...", 3: "फक्त एक सेकंद...", 4: "मी ते तुमच्यासाठी तपासत आहे..." } }, Wa = { chat: { input: { placeholder: "تاڤق ميسيج اندا...", listening: "مندڠر..." }, enableSound: "مڠوبهسواي سوارا", stt: { transcribing: "ترنسكريڤسي: ", micActive: "ميكروفون اكتيف...", heardError: "معاف، تيدق داڤت مندڠر اندا. سيلا چوبا سمولا.", micAccessError: "تيدق داڤت مڠاكسس ميكروفون. چيك كبنرن." }, speed: { idle: "تيدق برڬرق:", talk: "چرتا:" } }, avatar: { loading: "ممواتكن اۏاتر...", title: { maximize: "مكسيمالكن", minimize: "مينيمومكن", close: "توتوڤ", clickToMaximize: "كليك اونتوق ممكسيمالكن", clickToMinimize: "كليك اونتوق ممينيمالكن" }, error: { loadFailed: "ڬاڬل ممواتكن اوۏاتر: {{error}} ", playerNotLoaded: "AniaPlayer تيدق دمواتكن", passwordRequired: "كات كونچي دڤرلوكن اونتوق فايل .ania يڠ دسوليتكن", noSource: "تياد سومبر اڤاته يڠ دسدياكن (avatarUrl اتاو avatarData)" } }, greetings: { 0: "هاي! باڬايمانا ساي بوليه ممبنتو اندا هاري اين؟", 1: "هيلو! سلامت داتيڠ! اڤ يڠ بوليه ساي لاكوكن اونتوق اندا؟", 2: "هاي! ساڠت ڬمبيرا اونتوق برچاكڤ دڠن اندا!", 3: "هيلو! ساي اد د سيني اونتوق ممبنتو. اڤ يڠ اندا ڤرلوكن؟", 4: "هاي! اوق اڤ خبر؟ باڬايمانا ساي بوليه برڬونا؟" }, waiting: { 0: "ايذينكن ساي برفيكير...", 1: "ساتو دتيق...", 2: "ممڤروسيس...", 3: "سكجڤ سهاج...", 4: "ساي ممريقسا ايت اونتوق اندا..." } }, _a = { chat: { input: { placeholder: "Taip mesej anda...", listening: "Mendengar..." }, enableSound: "Dayakan Bunyi", stt: { transcribing: "Mentranskripsi: ", micActive: "Mikrofon aktif...", heardError: "Maaf, tidak dapat mendengar anda. Sila cuba lagi.", micAccessError: "Tidak dapat mengakses mikrofon. Semak kebenaran." }, speed: { idle: "terbiar:", talk: "ceramah:" } }, avatar: { loading: "Memuatkan avatar...", title: { maximize: "Maksimumkan", minimize: "Minimumkan", close: "tutup", clickToMaximize: "Klik untuk memaksimumkan", clickToMinimize: "Klik untuk meminimumkan" }, error: { loadFailed: "Gagal memuatkan avatar: {{error}} ", playerNotLoaded: "AniaPlayer tidak dimuatkan", passwordRequired: "Kata laluan diperlukan untuk fail .ania yang disulitkan", noSource: "Tiada sumber avatar disediakan (avatarUrl atau avatarData)" } }, greetings: { 0: "Hai! Bagaimana saya boleh membantu anda hari ini?", 1: "hello! Selamat datang! Apa yang boleh saya lakukan untuk awak?", 2: "Hai! Sangat gembira untuk bercakap dengan anda!", 3: "hello! Saya di sini untuk membantu. Apa yang anda perlukan?", 4: "Hai! apa khabar Bagaimana saya boleh berguna?" }, waiting: { 0: "Biar saya fikir...", 1: "sekejap...", 2: "Memproses...", 3: "Kejap lagi...", 4: "Saya sedang menyemaknya untuk anda..." } }, Ga = { chat: { input: { placeholder: "Daħħal il-messaġġ tiegħek...", listening: "Nisimgħu..." }, enableSound: "Ippermetti Sound", stt: { transcribing: "Traskrizzjoni: ", micActive: "Mikrofonu attiv...", heardError: "Jiddispjacini, ma stajtx nismagħk. Jekk jogħġbok erġa' pprova.", micAccessError: "Ma tistax taċċessa l-mikrofonu. Iċċekkja l-permessi." }, speed: { idle: "Idle:", talk: "Tkellem:" } }, avatar: { loading: "Tagħbija avatar...", title: { maximize: "Timmassimizza", minimize: "Imminimizza", close: "Agħlaq", clickToMaximize: "Ikklikkja biex timmassimizza", clickToMinimize: "Ikklikkja biex timminimizza" }, error: { loadFailed: "Naqas milli tgħabbi l-avatar: {{error}} ", playerNotLoaded: "AniaPlayer mhux mgħobbi", passwordRequired: "Password meħtieġa għall-fajl .ania encrypted", noSource: "L-ebda sors tal-avatar ipprovdut (avatarUrl jew avatarData)" } }, greetings: { 0: "Hi! Kif nista’ ngħinek illum?", 1: "Hello! Merħba! X'nista' nagħmel għalik?", 2: "Hi hemm! Hekk ferħan li nitkellem miegħek!", 3: "Hello! Jien hawn biex ngħin. X'għandek bżonn?", 4: "Hi! Kif int? Kif nista' nkun utli?" }, waiting: { 0: "Ħallini naħseb...", 1: "Mument wieħed...", 2: "Ipproċessar...", 3: "Sekondi biss...", 4: "Qed niċċekkja li għalik..." } }, Va = { chat: { input: { placeholder: "သင့်မက်ဆေ့ခ်ျကို ရိုက်ထည့်ပါ...", listening: "နားထောင်နေသည်..." }, enableSound: "အသံဖွင့်ပါ။", stt: { transcribing: "ကူးယူဖော်ပြခြင်း- ", micActive: "မိုက်ခရိုဖုန်း အသုံးပြုနေသည်...", heardError: "ဝမ်းနည်းပါတယ်၊ မင်းကို မကြားနိုင်ခဲ့ဘူး။ ထပ်စမ်းကြည့်ပါ။", micAccessError: "မိုက်ခရိုဖုန်းကို အသုံးပြု၍မရပါ။ ခွင့်ပြုချက်များကိုစစ်ဆေးပါ။" }, speed: { idle: "မလှုပ်မရှား-", talk: "စကားပြော-" } }, avatar: { loading: "ကိုယ်ပွားကို ဖွင့်နေသည်...", title: { maximize: "ချဲ့ပါ။", minimize: "လျှော့ပါ။", close: "ပိတ်လိုက်", clickToMaximize: "အကြီးချဲ့ရန် နှိပ်ပါ။", clickToMinimize: "လျှော့ချရန် နှိပ်ပါ။" }, error: { loadFailed: "ကိုယ်ပွားကို တင်၍မရပါ- {{error}} ", playerNotLoaded: "AniaPlayer ကို ဖွင့်မထားပါ။", passwordRequired: "ကုဒ်ဝှက်ထားသော .ania ဖိုင်အတွက် စကားဝှက် လိုအပ်သည်။", noSource: "ကိုယ်ပွားအရင်းအမြစ်ကို ပေးမထားပါ (avatarUrl သို့မဟုတ် avatarData)" } }, greetings: { 0: "မင်္ဂလာပါ ဒီနေ့ မင်းကို ငါဘယ်လိုကူညီနိုင်မလဲ။", 1: "မင်္ဂလာပါ! ကြိုဆိုပါတယ် ကျွန်တော်ဘာလုပ်ပေးရမလဲ?", 2: "ဟိုင်း! မင်းနဲ့စကားပြောရတာ အရမ်းပျော်တယ်။", 3: "မင်္ဂလာပါ! ကူညီဖို့ ရောက်နေတာ။ သင်ဘာလိုအပ်ပါသလဲ?", 4: "မင်္ဂလာပါ နေကောင်းလား? ငါဘယ်လိုအသုံးဝင်နိုင်မလဲ။" }, waiting: { 0: "ငါစဉ်းစားပါရစေ...", 1: "ခဏလေး...", 2: "လုပ်ဆောင်နေသည်...", 3: "တစ်စက္ကန့်ပဲ...", 4: "မင်းအတွက် ငါစစ်ဆေးနေတယ်..." } }, $a = { chat: { input: { placeholder: "आफ्नो सन्देश टाइप गर्नुहोस्...", listening: "सुन्दै..." }, enableSound: "ध्वनि सक्षम गर्नुहोस्", stt: { transcribing: "ट्रान्सक्राइब गर्दै: ", micActive: "माइक्रोफोन सक्रिय...", heardError: "माफ गर्नुहोस्, तपाईं सुन्न सकेन। कृपया पुन: प्रयास गर्नुहोस्।", micAccessError: "माइक्रोफोन पहुँच गर्न असमर्थ। अनुमतिहरू जाँच गर्नुहोस्।" }, speed: { idle: "निष्क्रिय:", talk: "कुराकानी:" } }, avatar: { loading: "अवतार लोड गर्दै...", title: { maximize: "अधिकतम गर्नुहोस्", minimize: "न्यूनतम गर्नुहोस्", close: "बन्द गर्नुहोस्", clickToMaximize: "अधिकतम गर्न क्लिक गर्नुहोस्", clickToMinimize: "न्यूनीकरण गर्न क्लिक गर्नुहोस्" }, error: { loadFailed: "अवतार लोड गर्न असफल: {{error}} ", playerNotLoaded: "AniaPlayer लोड गरिएको छैन", passwordRequired: "एन्क्रिप्टेड .ania फाइलको लागि पासवर्ड आवश्यक छ", noSource: "कुनै अवतार स्रोत प्रदान गरिएको छैन (avatarUrl वा avatarData)" } }, greetings: { 0: "नमस्ते! आज म तपाईंलाई कसरी मद्दत गर्न सक्छु?", 1: "नमस्ते! स्वागत छ! म तिम्रो लागि के गर्न सक्छु?", 2: "नमस्ते! तपाईसँग कुरा गर्न पाउँदा खुसी लाग्यो!", 3: "नमस्ते! म मद्दत गर्न यहाँ छु। तपाईलाई के चाहिन्छ?", 4: "नमस्ते! कस्तो छ ? म कसरी उपयोगी हुन सक्छु?" }, waiting: { 0: "मलाई सोच्न दिनुहोस् ...", 1: "एक पल...", 2: "प्रशोधन गर्दै...", 3: "एक सेकेन्ड मात्र...", 4: "म तिम्रो लागि जाँच गर्दैछु..." } }, Ja = { chat: { input: { placeholder: "छिगु हसना टाइप यानादिसँ ...", listening: "न्यनाच्वना ..." }, enableSound: "सःयात सक्षम या", stt: { transcribing: "ट्रान्सक्रिप्टिङ्ग : ", micActive: "माइक्रोफोन सक्रिय ...", heardError: "क्षमा यानादिसँ, छिगु खँ न्यने मफुत । हानं कुतः यानादिसँ ।", micAccessError: "माइक्रोफोनय् दुहां वने मफुत । अनुमति जाँच या ।" }, speed: { idle: "निष्क्रिय :", talk: "खँल्हाबल्हा :" } }, avatar: { loading: "अवतार लोड जुयाच्वन ...", title: { maximize: "अप्वयेकि", minimize: "म्ह्व या", close: "तिनाब्यु", clickToMaximize: "अप्वयेकेत क्लिक यानादिसँ ।", clickToMinimize: "म्ह्व यायेत क्लिक यानादिसँ ।" }, error: { loadFailed: "Failed to load avatar: {{error}}", playerNotLoaded: "एनिया प्लेयर लोड मजूनि", passwordRequired: "इन्क्रिप्ट यानातःगु .ania फाइलया निंतिं पासवर्ड माः", noSource: "अवतार स्रोत मदु (अवतारयूआरएल बाय् अवतारडाटा)" } }, greetings: { 0: "ज्वजलपा ! थौं जिं छन्त गथे यानाः ग्वाहालि याये फै ?", 1: "ज्वजलपा! लशकुश! जिं छंगु निंतिं छु याये फै ?", 2: "नमस्ते! छि नाप खँ ल्हाये दयाः तसकं लय् ताः !", 3: "ज्वजलपा! जि थन ग्वाहालि यायेत वयागु खः । छन्त छु माः ?", 4: "ज्वजलपा! म्हं फु ला? जि गथे यानाः ज्याख्यले जुइ फै ?" }, waiting: { 0: "जितः बिचाः याकेब्यु ....", 1: "छगू क्षण ....", 2: "प्रशोधन ...", 3: "छगू सेकेण्ड जक ...", 4: "जिं छंगु निंतिं व जाँच यानाच्वना ..." } }, Za = { chat: { input: { placeholder: "Typ uw bericht...", listening: "Luisteren..." }, enableSound: "Schakel geluid in", stt: { transcribing: "Transcriberen: ", micActive: "Microfoon actief...", heardError: "Sorry, ik kon je niet horen. Probeer het opnieuw.", micAccessError: "Kan geen toegang krijgen tot de microfoon. Controleer machtigingen." }, speed: { idle: "Inactief:", talk: "Praten:" } }, avatar: { loading: "Avatar laden...", title: { maximize: "Maximaliseer", minimize: "Minimaliseer", close: "Sluiten", clickToMaximize: "Klik om te maximaliseren", clickToMinimize: "Klik om te minimaliseren" }, error: { loadFailed: "Kan avatar niet laden: {{error}} ", playerNotLoaded: "AniaPlayer niet geladen", passwordRequired: "Wachtwoord vereist voor gecodeerd .ania-bestand", noSource: "Geen avatarbron opgegeven (avatarUrl of avatarData)" } }, greetings: { 0: "Hallo! Hoe kan ik je vandaag helpen?", 1: "Hallo! Welkom! Wat kan ik voor je doen?", 2: "Hoi! Ik ben zo blij om met je te praten!", 3: "Hallo! Ik ben hier om te helpen. Wat heb je nodig?", 4: "Hoi! Hoe is het met je? Hoe kan ik nuttig zijn?" }, waiting: { 0: "Laat me denken...", 1: "Een ogenblik...", 2: "Verwerken...", 3: "Een ogenblikje...", 4: "Ik controleer het voor je..." } }, Ya = { chat: { input: { placeholder: "Skriv inn meldingen din...", listening: "Lytter..." }, enableSound: "Aktiver lyd", stt: { transcribing: "Transkribering: ", micActive: "Mikrofon aktiv...", heardError: "Beklager, jeg kunne ikke høre deg. Vennligst prøv igjen.", micAccessError: "Får ikke tilgang til mikrofonen. Sjekk tillatelser." }, speed: { idle: "Inaktiv:", talk: "Snakk:" } }, avatar: { loading: "Laster inn avatar ...", title: { maximize: "Maksimer", minimize: "Minimer", close: "Lukk", clickToMaximize: "Klikk for å maksimere", clickToMinimize: "Klikk for å minimere" }, error: { loadFailed: "Kunne ikke laste avataren: {{error}} ", playerNotLoaded: "AniaPlayer ikke lastet", passwordRequired: "Passord kreves for kryptert .ania-fil", noSource: "Ingen avatarkilde oppgitt (avatarUrl eller avatarData)" } }, greetings: { 0: "Hei! Hvordan kan jeg hjelpe deg i dag?", 1: "Hallo! Velkomst! Hva kan jeg gjøre for deg?", 2: "Hei! Så glad for å snakke med deg!", 3: "Hallo! Jeg er her for å hjelpe. Hva trenger du?", 4: "Hei! Hvordan har du det? Hvordan kan jeg være nyttig?" }, waiting: { 0: "La meg tenke...", 1: "Et øyeblikk...", 2: "Behandler...", 3: "Bare et sekund...", 4: "Jeg sjekker det for deg..." } }, Qa = { chat: { input: { placeholder: "Tlola umlayezwakho...", listening: "Ukulalela..." }, enableSound: "Vumela umdumo", stt: { transcribing: "Ukutlola: ", micActive: "Imakrofoni isebenza...", heardError: "Uxolo, azange ngikuzwe. Sibawa ulinge godu.", micAccessError: "Akukghoni ukufikelela imakrofoni. Hlola iimvume." }, speed: { idle: "Ungenzi lutho:", talk: "Ikulumo:" } }, avatar: { loading: "Ukulayisha i-avatar...", title: { maximize: "Khulisa", minimize: "Nciphisa", close: "Vala", clickToMaximize: "Tlika ukuze ukhulise", clickToMinimize: "Tlika ukunciphisa" }, error: { loadFailed: "Kwehlulekile ukulayisha i-avatar: {{error}} ", playerNotLoaded: "I-AniaPlayer ayilayitjhwa", passwordRequired: "Iphasiwedi iyatlhogeka efayeleni le-.ania elifihliweko", noSource: "Akukho mthombo we-avatar onikelwe (i-avatarUrl nofana i-avatarData)" } }, greetings: { 0: "Sawubona! Ngingakusiza njani namhlanjesi?", 1: "Lotjha! Siyakwamukela! Ngingakwenzelani?", 2: "Lotjha! Ngithabile ukukhuluma nawe!", 3: "Lotjha! Ngilapha ukuzokusiza. Khuyini oyitlhogako?", 4: "Lotjha! Unjani? Ngingaba lisizo njani?" }, waiting: { 0: "Akhe ngicabange...", 1: "Umzuzu owodwa...", 2: "Ukucubungula...", 3: "Umzuzwana nje...", 4: "Ngiyakuhlolela lokho..." } }, Xa = { chat: { input: { placeholder: "Thaepa molaetša wa gago...", listening: "Go theeletša..." }, enableSound: "Kgontšha Modumo", stt: { transcribing: "Go ngwalolla: . ", micActive: "Maekrofouno e šomago...", heardError: "Maswabi, ga se ka kgona go go kwa. Hle leka gape.", micAccessError: "Ga a kgone go fihlelela maekrofouno. Lekola ditumelelo." }, speed: { idle: "Go se dire selo: .", talk: "Polelo: ." } }, avatar: { loading: "Go laetša avatar...", title: { maximize: "Godiša", minimize: "Fokotša", close: "Tswala", clickToMaximize: "Tobetsa go godiša", clickToMinimize: "Tobetsa go fokotša" }, error: { loadFailed: "E paletšwe ke go laetša avatar: {{error}} . ", playerNotLoaded: "AniaPlayer ga se ya imelwa", passwordRequired: "Phasewete e nyakegago bakeng sa faele ya .ania yeo e šitišitšwego", noSource: "Ga go na mothopo wa avatar wo o filwego (avatarUrl goba avatarData) ." } }, greetings: { 0: "Thobela! Nka go thuša bjang lehono?", 1: "Thobela! Le amogetšwe! Nka go direla eng?", 2: "Dumela moo! Ke thabile kudu go bolela le wena!", 3: "Thobela! Ke mo go thuša. O hloka eng?", 4: "Thobela! Le kae? Nka ba le mohola bjang?" }, waiting: { 0: "E re ke nagane...", 1: "Motsotso o tee...", 2: "Tshepedišo ya...", 3: "Motsotswana feela...", 4: "Ke go lekola seo..." } }, ue = { chat: { input: { placeholder: "Gɔ̱ri ruacdu...", listening: "Li̱eŋ..." }, enableSound: "Enable jɔw", stt: { transcribing: "Tra̱ni̱thkri̱piŋ: ", micActive: "Mai̱kröpuɔɔn lätdɛ...", heardError: "Sorry, couldn't hear you. Ɣän göörä ɣöö bä nyɔk kɛ ɣɔ̱n.", micAccessError: "Unable to access microphone. Check permi̱cini̱." }, speed: { idle: "/Thiɛl:", talk: "Ruac:" } }, avatar: { loading: "Kämdɛ raar avatar...", title: { maximize: "Makdhi̱maidhe", minimize: "Mini̱mai̱dhi̱", close: "Ga̱ŋ", clickToMaximize: "Click kɛ ɣöö biɛ kulɛ di̱t", clickToMinimize: "Click kɛ ɣöö ba kulɛ jakä kuiy" }, error: { loadFailed: "Failed to load avatar:  {{error}} ", playerNotLoaded: "AniaPlɛyɛr /ka̱nɛ kuëŋ thi̱n", passwordRequired: "Password required for encrypted .ania file", noSource: "/Thiɛlɛ gua̱a̱th in tuɔɔk avatar thi̱n mi̱ ca ŋun (abatarUrl kiɛ abatarData)" } }, greetings: { 0: "Ɣi̱! How can I help you today?", 1: "Malɛ! Ca ji nho̱k bën! Ɛŋu mi dëë lät kä ji̱?", 2: "Ma̱lɛ! Kä ɣän tɛɛth lɔcdä ɛlɔ̱ŋ kɛ ruac kɛ ji̱!", 3: "Malɛ! Ɣän ta̱a̱ wanɛ mɛ kɛ ɣöö bä ji̱ luäk. Ɛŋu mi go̱o̱ri?", 4: "Ne̱rä ji! Ma̱l puɔ̱nydu? Ɣän bä tekɛ luɔt i̱di?" }, waiting: { 0: "Ɣän cä car...", 1: "Kɛ gua̱a̱th kɛl...", 2: "La̱tdɛ...", 3: "Ɛ thɛkɔnd kärɔa...", 4: "I'm checking that for you..." } }, ae = { chat: { input: { placeholder: "Lembani uthenga wanu...", listening: "Kumvetsera..." }, enableSound: "Yambitsani Phokoso", stt: { transcribing: "Kulemba: ", micActive: "Maikolofoni ikugwira ntchito...", heardError: "Pepani, sindinamve. Chonde yesaninso.", micAccessError: "Takanika kupeza cholankhulira. Onani zilolezo." }, speed: { idle: "Zopanda ntchito:", talk: "Kulankhula:" } }, avatar: { loading: "Kutsegula avatar...", title: { maximize: "Onetsani", minimize: "Chepetsani", close: "Tsekani", clickToMaximize: "Dinani kuti muwonjezere", clickToMinimize: "Dinani kuti muchepetse" }, error: { loadFailed: "Zalephera kutsitsa avatar: {{error}} ", playerNotLoaded: "AniaPlayer sanakwezedwe", passwordRequired: "Mawu achinsinsi ofunikira pa fayilo yobisidwa ya .ania", noSource: "Palibe avatar yoperekedwa (avatarUrl kapena avatarData)" } }, greetings: { 0: "Moni! Ndingakuthandizeni bwanji lero?", 1: "Moni! Takulandirani! Ndingakuchitireni chiyani?", 2: "Muno kumeneko! Ndine wokondwa kuyankhula nanu!", 3: "Moni! Ndabwera kudzathandiza. Mukufuna chiyani?", 4: "Moni! Muli bwanji? Ndingakhale wothandiza bwanji?" }, waiting: { 0: "Ndiloleni ndiganize...", 1: "Mphindi imodzi...", 2: "Kukonza...", 3: "Sekondi imodzi...", 4: "Ndikukufunirani izi..." } }, ee = { chat: { input: { placeholder: "Picatz vòstre messatge...", listening: "Escotant..." }, enableSound: "Activar lo son", stt: { transcribing: "Transcripcion: ", micActive: "Micròfon actiu...", heardError: "O planhèm, vos ai pas pogut ausir. Ensajatz tornarmai.", micAccessError: "Impossible d'accedir al micrò. Verificar las permissions." }, speed: { idle: "Inactiu:", talk: "Conferéncia:" } }, avatar: { loading: "En cargament d'avatar...", title: { maximize: "Maximizar", minimize: "Minimizar", close: "Barrar", clickToMaximize: "Clicatz per maximizar", clickToMinimize: "Clicatz per minimizar" }, error: { loadFailed: "Fracàs de cargar l'avatar : {{error}} ", playerNotLoaded: "AniaPlayer pas cargat", passwordRequired: "Senhal requerit pel fichièr .ania chifrat", noSource: "Cap de font avatar provesida (avatarUrl o avatarData)" } }, greetings: { 0: "Salut! Cossí vos pòdi ajudar uèi?", 1: "Adieu! Benvengut! Qué pòdi far per tu?", 2: "Adieu l'òme! Tan content de vos parlar!", 3: "Adieu! Soi aquí per ajudar. De qué vos cal?", 4: "Adieu! Cossí va? Cossí pòdi èsser util?" }, waiting: { 0: "Me daissatz pensar...", 1: "Un moment...", 2: "Tractament...", 3: "Sonque una segonda...", 4: "Verifiqui aquò per tu..." } }, ie = { chat: { input: { placeholder: "Ergaa keessan barreessaa...", listening: "Dhaggeeffachaa..." }, enableSound: "Sagalee Dandeessisi", stt: { transcribing: "Barreessuu: 1.1. ", micActive: "Maaykiroofooniin hojiirra jiru...", heardError: "Dhiifama, si dhaga'uu hin dandeenye. Mee irra deebi'ii yaalaa.", micAccessError: "Maaykiroofoonii argachuu hin dandeenye. Hayyama ilaali." }, speed: { idle: "Hojii malee: .", talk: "Haasaa:" } }, avatar: { loading: "Avatar fe'amaa jira...", title: { maximize: "Maximize gochuu", minimize: "Xiqqeessuu", close: "Cufi", clickToMaximize: "Guddisuuf cuqaasaa", clickToMinimize: "Xiqqeessuuf cuqaasaa" }, error: { loadFailed: "Avatar fe'uu hin dandeenye: {{error}} . ", playerNotLoaded: "AniaPlayer hin fe'amne", passwordRequired: "Jecha icciitii faayilii .ania icciitii ta'eef barbaachisa", noSource: "Maddi avatar hin kennamne (avatarUrl ykn avatarData) ." } }, greetings: { 0: "Hi! Har'a akkamittan isin gargaaruu danda'a?", 1: "Akkam! Baga nagaan dhufte! Maal siif gochuu danda'a?", 2: "Achi kan jirtu! Si haasofsiisuu kootti baay'een gammada!", 3: "Akkam! Gargaaruuf as jira. Maal si barbaachisa?", 4: "Akkam! Akkam jirta? Akkamittan faayidaa qabaachuu danda'a?" }, waiting: { 0: "Mee akkan yaadutti...", 1: "Yeroo tokko...", 2: "Adeemsa hojii...", 3: "Sekondii tokko qofa...", 4: "Sana isiniif sakatta'aa jira..." } }, re = { chat: { input: { placeholder: "ଆପଣଙ୍କର ବାର୍ତ୍ତା ଟାଇପ୍ କରନ୍ତୁ ...", listening: "ଶୁଣିବା ..." }, enableSound: "ଧ୍ୱନି ସକ୍ଷମ କରନ୍ତୁ |", stt: { transcribing: "ଟ୍ରାନ୍ସକ୍ରିପସନ୍: ", micActive: "ମାଇକ୍ରୋଫୋନ୍ ସକ୍ରିୟ ...", heardError: "ଦୁ Sorry ଖିତ, ତୁମ କଥା ଶୁଣି ପାରିଲି ନାହିଁ ଦୟାକରି ପୁନର୍ବାର ଚେଷ୍ଟା କରନ୍ତୁ |", micAccessError: "ମାଇକ୍ରୋଫୋନ୍ ପ୍ରବେଶ କରିବାକୁ ଅସମର୍ଥ | ଅନୁମତିଗୁଡିକ ଯାଞ୍ଚ କରନ୍ତୁ |" }, speed: { idle: "ନିଷ୍କ୍ରିୟ:", talk: "କଥାବାର୍ତ୍ତା:" } }, avatar: { loading: "ଅବତାର ଲୋଡିଂ ...", title: { maximize: "ସର୍ବାଧିକ କରନ୍ତୁ |", minimize: "କମ୍ କରନ୍ତୁ |", close: "ବନ୍ଦ", clickToMaximize: "ସର୍ବାଧିକ କରିବାକୁ କ୍ଲିକ୍ କରନ୍ତୁ |", clickToMinimize: "କମ୍ କରିବାକୁ କ୍ଲିକ୍ କରନ୍ତୁ |" }, error: { loadFailed: "ଅବତାର ଲୋଡ୍ କରିବାରେ ବିଫଳ: {{error}} ", playerNotLoaded: "AniaPlayer ଲୋଡ୍ ହୋଇନାହିଁ |", passwordRequired: "ଏନକ୍ରିପ୍ଟ ହୋଇଥିବା .ania ଫାଇଲ୍ ପାଇଁ ପାସୱାର୍ଡ ଆବଶ୍ୟକ |", noSource: "କ av ଣସି ଅବତାର ଉତ୍ସ ପ୍ରଦାନ କରାଯାଇ ନାହିଁ (ଅବତାର ଉର୍ଲ କିମ୍ବା ଅବତାର ଡାଟା)" } }, greetings: { 0: "ହାଏ! ଆଜି ମୁଁ ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?", 1: "ନମସ୍କାର! ସ୍ Welcome ାଗତ! ମୁଁ ତୁମ ପାଇଁ କ’ଣ କରିପାରିବି?", 2: "ନମସ୍କାର! ତୁମ ସହ କଥା ହୋଇ ବହୁତ ଖୁସି!", 3: "ନମସ୍କାର! ମୁଁ ସାହାଯ୍ୟ କରିବାକୁ ଏଠାରେ ଅଛି ତୁମର କ’ଣ ଦରକାର?", 4: "ହାଏ! ଆପଣ କେମିତି ଅଛନ୍ତି? ମୁଁ କିପରି ଉପଯୋଗୀ ହୋଇପାରେ?" }, waiting: { 0: "ମୋତେ ଭାବିବାକୁ ଦିଅ ...", 1: "ଗୋଟିଏ ମୁହୂର୍ତ୍ତ ...", 2: "ପ୍ରକ୍ରିୟାକରଣ ...", 3: "ମାତ୍ର ଏକ ସେକେଣ୍ଡ୍ ...", 4: "ମୁଁ ତୁମ ପାଇଁ ତାହା ଯାଞ୍ଚ କରୁଛି ..." } }, ne = { chat: { input: { placeholder: "اپنا سنیہا ٹائپ کرو...", listening: "سُن رئے..." }, enableSound: "آواز فعال کرو", stt: { transcribing: "نقل کرنا: ", micActive: "مائیکروفون ایکٹو...", heardError: "معاف کرنا، تہانوں نئیں سن سکیا۔ مہربانی کر کے فیر کوشش کرو۔", micAccessError: "مائیک تک رسائی حاصل کرن توں قاصر۔ اجازتاں چیک کرو۔" }, speed: { idle: "بیکار:", talk: "گل بات:" } }, avatar: { loading: "اوتار لوڈ ہو رہیا اے...", title: { maximize: "زیادہ توں زیادہ", minimize: "کم توں کم کرو", close: "بند کرو", clickToMaximize: "ودھ توں ودھ کرن لئی کلک کرو", clickToMinimize: "کم توں کم کرن لئی کلک کرو" }, error: { loadFailed: "اوتار لوڈ کرن چ ناکام: {{error}} ", playerNotLoaded: "انیا پلیئر لوڈ نئیں ہویا", passwordRequired: "خفیہ کردہ .ania فائل لئی پاس ورڈ دی لوڑ اے", noSource: "اوتار دا کوئی وسیلہ نئیں دتا گیا (اوتار یو آر ایل یا اوتار ڈیٹا)" } }, greetings: { 0: "ہیلو! میں اج تہاڈی کیویں مدد کر سکنا واں؟", 1: "ہیلو! جی آیاں نوں کہنا! میں تیرے لئی کیہ کر سکدا واں؟", 2: "ہیلو جناب! تہاڈے نال گل کرن چ بہوں خوشی ہوئی!", 3: "ہیلو! میں مدد کرن لئی ایتھے آں۔ تہانوں کی چاہیدا اے؟", 4: "ہیلو! تہاڈا کی حال اے؟ میں کیویں کم آ سکدا واں؟" }, waiting: { 0: "مینوں سوچن دیو...", 1: "اک پل...", 2: "پروسیسنگ...", 3: "بس اک سیکنڈ...", 4: "میں تہاڈے لی ایہ چیک کر ریا واں..." } }, te = { chat: { input: { placeholder: "ਆਪਣਾ ਸੁਨੇਹਾ ਟਾਈਪ ਕਰੋ...", listening: "ਸੁਣ ਰਿਹਾ ਹੈ..." }, enableSound: "ਧੁਨੀ ਚਾਲੂ ਕਰੋ", stt: { transcribing: "ਟ੍ਰਾਂਸਕ੍ਰਾਈਬਿੰਗ: ", micActive: "ਮਾਈਕ੍ਰੋਫ਼ੋਨ ਕਿਰਿਆਸ਼ੀਲ...", heardError: "ਮਾਫ਼ ਕਰਨਾ, ਤੁਹਾਨੂੰ ਸੁਣ ਨਹੀਂ ਸਕਿਆ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।", micAccessError: "ਮਾਈਕ੍ਰੋਫੋਨ ਤੱਕ ਪਹੁੰਚ ਕਰਨ ਵਿੱਚ ਅਸਮਰੱਥ। ਅਨੁਮਤੀਆਂ ਦੀ ਜਾਂਚ ਕਰੋ।" }, speed: { idle: "ਵਿਹਲਾ:", talk: "ਗੱਲਬਾਤ:" } }, avatar: { loading: "ਅਵਤਾਰ ਲੋਡ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...", title: { maximize: "ਵੱਧ ਤੋਂ ਵੱਧ", minimize: "ਛੋਟਾ ਕਰੋ", close: "ਬੰਦ ਕਰੋ", clickToMaximize: "ਵੱਧ ਤੋਂ ਵੱਧ ਕਰਨ ਲਈ ਕਲਿੱਕ ਕਰੋ", clickToMinimize: "ਛੋਟਾ ਕਰਨ ਲਈ ਕਲਿੱਕ ਕਰੋ" }, error: { loadFailed: "ਅਵਤਾਰ ਲੋਡ ਕਰਨ ਵਿੱਚ ਅਸਫਲ: {{error}} ", playerNotLoaded: "AniaPlayer ਲੋਡ ਨਹੀਂ ਹੋਇਆ", passwordRequired: "ਐਨਕ੍ਰਿਪਟਡ .ania ਫਾਈਲ ਲਈ ਪਾਸਵਰਡ ਲੋੜੀਂਦਾ ਹੈ", noSource: "ਕੋਈ ਅਵਤਾਰ ਸਰੋਤ ਪ੍ਰਦਾਨ ਨਹੀਂ ਕੀਤਾ ਗਿਆ (avatarUrl ਜਾਂ avatarData)" } }, greetings: { 0: "ਹੈਲੋ! ਅੱਜ ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?", 1: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਜੀ ਆਇਆਂ ਨੂੰ! ਮੈਂ ਤੁਹਾਡੇ ਲਈ ਕੀ ਕਰ ਸਕਦਾ ਹਾਂ?", 2: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਤੁਹਾਡੇ ਨਾਲ ਗੱਲ ਕਰਕੇ ਬਹੁਤ ਖੁਸ਼ੀ ਹੋਈ!", 3: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਮਦਦ ਕਰਨ ਲਈ ਇੱਥੇ ਹਾਂ। ਤੁਹਾਨੂੰ ਕੀ ਚਾਹੀਦਾ ਹੈ?", 4: "ਹੈਲੋ! ਤੁਸੀ ਕਿਵੇਂ ਹੋ? ਮੈਂ ਕਿਵੇਂ ਲਾਭਦਾਇਕ ਹੋ ਸਕਦਾ ਹਾਂ?" }, waiting: { 0: "ਮੈਨੂੰ ਸੋਚਣ ਦਿਓ...", 1: "ਇੱਕ ਪਲ...", 2: "ਪ੍ਰਕਿਰਿਆ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...", 3: "ਬਸ ਇੱਕ ਸਕਿੰਟ...", 4: "ਮੈਂ ਤੁਹਾਡੇ ਲਈ ਇਸਦੀ ਜਾਂਚ ਕਰ ਰਿਹਾ ਹਾਂ..." } }, oe = { chat: { input: { placeholder: "I-type so mensahe mo...", listening: "Mandedengel..." }, enableSound: "I-enable so Sound", stt: { transcribing: "Man-transcribe: ", micActive: "Aktibo so mikropono...", heardError: "Pasensya la, ag ta ka narengel. Ipangasin salien lamet.", micAccessError: "Ag makaloob ed mikropono. I-tsek iray permiso." }, speed: { idle: "Anggapoy gagawaen:", talk: "Paliwawa:" } }, avatar: { loading: "Loading avatar...", title: { maximize: "Palaknaben", minimize: "Paabebaen", close: "Saraan", clickToMaximize: "Pindoten pian napalaknab", clickToMinimize: "Pindoten pian nabawasan" }, error: { loadFailed: "Ag aka-load so avatar: {{error}} ", playerNotLoaded: "Ag-aka-load so AniaPlayer", passwordRequired: "Kaukolan so password parad aka-encrypt ya .ania file", noSource: "Anggapoy niiter ya nanlapuan na avatar (avatarUrl o avatarData)" } }, greetings: { 0: "Hi! Panon ta kan natulongan natan?", 1: "Hello! Naabrasa kayo! Antoy nagawaan ko parad sika?", 2: "Kumusta kayo! Malikeliket ak ya makapitongtong ed sika!", 3: "Hello! Wadya ak pian ontulong. Antoy kaukolan mo?", 4: "Hi! Kumusta ka? Panon ak ya magmaliw ya mausar?" }, waiting: { 0: "Isipen ko pa...", 1: "Sakey a bekta...", 2: "Manproseso...", 3: "Sakey segundo labat...", 4: "I-check ko itan parad sika..." } }, le = { chat: { input: { placeholder: "I-type me ing kekang mensahi...", listening: "Makiramdam..." }, enableSound: "I-enable ing Sound", stt: { transcribing: "Transcribe: ", micActive: "Microphone active...", heardError: "Pasensya na, eku daka dimdam. Subukan meng pasibayu.", micAccessError: "E malyaring lungub keng mikropono. Lawen la reng kapaintulutan." }, speed: { idle: "alang gagawan:", talk: "Magsalita:" } }, avatar: { loading: "Loading avatar...", title: { maximize: "Maximize", minimize: "Bawasan", close: "malapit", clickToMaximize: "Pindutan me para mas maragul", clickToMinimize: "Pindutan me para mabawas" }, error: { loadFailed: "mebigu yang me load ing avatar: {{error}} ", playerNotLoaded: "E ya makaload ing AniaPlayer", passwordRequired: "kailangan ing password para keng encrypted a .ania file", noSource: "Ala yang avatar source (avatarUrl o avatarData)" } }, greetings: { 0: "Hi! makananu dakang asaupan ngeni?", 1: "Komusta! Salangi! Nanung agyu kung gawan para keka?", 2: "Hello! Masaya kung akasabi daka!", 3: "Komusta! Atyu ku keni para sumaup. Nanu ing kailangan mu?", 4: "Komusta! Komusta naka? Makananu kung maging kapakibatan?" }, waiting: { 0: "isipan ku...", 1: "Metung a penandit...", 2: "Processing...", 3: "Saguli mu...", 4: "tignan ke ita para keka..." } }, Ae = { chat: { input: { placeholder: "Skirbi bo mensahe...", listening: "Skuchando..." }, enableSound: "Habilitá Zonido", stt: { transcribing: "Transkripshon: ", micActive: "Mikrofon aktivo...", heardError: "Diskulpa, no por a tende bo. Por fabor purba atrobe.", micAccessError: "No por haña akseso na mikrofon. Kontrolá pèrmitnan." }, speed: { idle: "Inaktivo:", talk: "Charla:" } }, avatar: { loading: "Ta kargando avatar...", title: { maximize: "Maksimisá", minimize: "Minimisá", close: "Sera", clickToMaximize: "Klik pa maksimisá", clickToMinimize: "Klik pa minimalisá" }, error: { loadFailed: "No a logra karga avatar: {{error}} ", playerNotLoaded: "AniaPlayer no a wòrdu kargá", passwordRequired: "Kontraseña nesesario pa un archivo .ania enkriptá", noSource: "No tin fuente di avatar suministrá (avatarUrl òf avatarData)" } }, greetings: { 0: "Alo! Kon mi por yuda bo awe?", 1: "Halo! Bon bini! Kiko mi por hasi pa bo?", 2: "Hei konta! Mi ta kontentu di papia ku bo!", 3: "Halo! Mi ta aki pa yuda. Kiko bo mester?", 4: "Hei! Kon ta ku bo? Kon mi por ta útil?" }, waiting: { 0: "Laga mi pensa...", 1: "Un momentu...", 2: "Prosesamentu...", 3: "Djis un ratu...", 4: "Mi ta kontrolá esei pa bo..." } }, Be = { chat: { input: { placeholder: "Wpisz wiadomość...", listening: "Słucham..." }, enableSound: "Włącz dźwięk", stt: { transcribing: "Transkrypcja: ", micActive: "Mikrofon aktywny...", heardError: "Przepraszam, nie słyszałem cię. Spróbuj ponownie.", micAccessError: "Nie można uzyskać dostępu do mikrofonu. Sprawdź uprawnienia." }, speed: { idle: "Bezczynność:", talk: "Dyskusja:" } }, avatar: { loading: "Ładowanie awatara...", title: { maximize: "Maksymalizuj", minimize: "Minimalizuj", close: "Zamknij", clickToMaximize: "Kliknij, aby zmaksymalizować", clickToMinimize: "Kliknij, aby zminimalizować" }, error: { loadFailed: "Nie udało się załadować awatara: {{error}} ", playerNotLoaded: "AniaPlayer nie został załadowany", passwordRequired: "Hasło wymagane do zaszyfrowanego pliku .ania", noSource: "Nie podano źródła awatara (avatarUrl lub avatarData)" } }, greetings: { 0: "Cześć! Jak mogę Ci dzisiaj pomóc?", 1: "Cześć! Powitanie! Co mogę dla Ciebie zrobić?", 2: "Cześć! Bardzo się cieszę, że mogę z tobą porozmawiać!", 3: "Cześć! Jestem tu, żeby pomóc. Czego potrzebujesz?", 4: "Cześć! Jak się masz? Jak mogę się przydać?" }, waiting: { 0: "Daj mi pomyśleć...", 1: "Jedna chwila...", 2: "Przetwarzanie...", 3: "Tylko sekundę...", 4: "Sprawdzam to dla ciebie..." } }, se = { chat: { input: { placeholder: "خپل پیغام ټایپ کړئ ...", listening: "اوریدل..." }, enableSound: "غږ فعال کړئ", stt: { transcribing: "نقل کول: ", micActive: "مایکروفون فعال...", heardError: "بخښنه غواړم، تاسو یې نه اوریدلي. مهرباني وکړئ بیا هڅه وکړئ.", micAccessError: "مایکروفون ته د لاسرسي توان نلري. اجازې چیک کړئ." }, speed: { idle: "بې کاره:", talk: "خبرې اترې:" } }, avatar: { loading: "اوتار پورته کول...", title: { maximize: "اعظمي کړئ", minimize: "ټیټ کړئ", close: "تړل", clickToMaximize: "د اعظمي کولو لپاره کلیک وکړئ", clickToMinimize: "د کمولو لپاره کلیک وکړئ" }, error: { loadFailed: "د اوتار په پورته کولو کې پاتې راغلی: {{error}} ", playerNotLoaded: "انیا پلیر نه دی پورته شوی", passwordRequired: "د کوډ شوي .ania فایل لپاره پاسورډ اړین دی", noSource: "د اوتار سرچینه نه ده ورکړل شوې (avatarUrl یا avatarData)" } }, greetings: { 0: "سلام! نن څنګه زه ستاسو سره مرسته کولی شم؟", 1: "سلام! ښه راغلاست! زه ستاسو لپاره څه کولی شم؟", 2: "سلام پر تاسو! له تاسو سره په خبرو کولو خوښ یم!", 3: "سلام! زه دلته د مرستې لپاره یم. څه د پکار دی؟", 4: "سلام! تاسو څنګه یئ؟ زه څنګه ګټور کیدی شم؟" }, waiting: { 0: "اجازه راکړئ فکر وکړم ...", 1: "یوه شیبه...", 2: "پروسس کول...", 3: "یوازې یوه ثانیه ...", 4: "زه دا ستاسو لپاره ګورم ..." } }, De = { "chat.input.placeholder": "Digite sua mensagem...", "chat.input.listening": "Ouvindo...", "chat.enableSound": "Ativar som", "chat.stt.transcribing": "Transcrevendo: ", "chat.stt.micActive": "Microfone ativo...", "chat.stt.heardError": "Desculpe, não consegui te ouvir. Tente novamente.", "chat.stt.micAccessError": "Não foi possível acessar o microfone. Verifique as permissões.", "chat.speed.idle": "Parado:", "chat.speed.talk": "Falando:", "avatar.loading": "Carregando avatar...", "avatar.title.maximize": "Maximizar", "avatar.title.minimize": "Minimizar", "avatar.title.close": "Fechar", "avatar.title.clickToMaximize": "Clique para maximizar", "avatar.title.clickToMinimize": "Clique para minimizar", "avatar.error.loadFailed": "Falha ao carregar o avatar: {{error}}", "avatar.error.playerNotLoaded": "AniaPlayer não foi carregado", "avatar.error.passwordRequired": "Senha necessária para arquivo .ania criptografado", "avatar.error.noSource": "Nenhuma fonte de avatar fornecida (avatarUrl ou avatarData)", greetings: { 0: "Olá! Como posso te ajudar hoje?", 1: "Oi! Boas-vindas! O que posso fazer por você?", 2: "Olá! Que bom falar com você!", 3: "Oi! Estou aqui para ajudar. Do que você precisa?", 4: "Olá! Tudo bem? Como posso ser útil?" }, waiting: { 0: "Deixe-me pensar...", 1: "Um momento...", 2: "Processando...", 3: "Só um instante...", 4: "Estou verificando isso para você..." } }, Ee = { chat: { input: { placeholder: "Introduza a sua mensagem...", listening: "Ouvindo..." }, enableSound: "Ativar som", stt: { transcribing: "Transcrever: ", micActive: "Microfone ativo...", heardError: "Desculpe, não o consegui ouvir. Por favor, tente novamente.", micAccessError: "Não foi possível aceder ao microfone. Verifique as permissões." }, speed: { idle: "Inativo:", talk: "Fale:" } }, avatar: { loading: "Carregando avatar...", title: { maximize: "Maximizar", minimize: "Minimizar", close: "Fechar", clickToMaximize: "Clique para maximizar", clickToMinimize: "Clique para minimizar" }, error: { loadFailed: "Falha ao carregar o avatar: {{error}} ", playerNotLoaded: "AniaPlayer não carregado", passwordRequired: "Palavra-passe necessária para ficheiro .ania encriptado", noSource: "Nenhuma fonte de avatar fornecida (avatarUrl ou avatarData)" } }, greetings: { 0: "Olá! Como posso ajudá-lo hoje?", 1: "Olá! Bem-vindo! O que posso fazer por si?", 2: "Olá! Que bom falar consigo!", 3: "Olá! Estou aqui para ajudar. O que precisa?", 4: "Oi! Como vai? Como posso ser útil?" }, waiting: { 0: "Deixe-me pensar...", 1: "Um momento...", 2: "Processamento...", 3: "Só um segundo...", 4: "Estou a verificar isso para si..." } }, Ce = { chat: { input: { placeholder: "Willakuyniykita qillqay...", listening: "Uyarispa..." }, enableSound: "T’uqyayta atichiy", stt: { transcribing: "Transcripción: 1.1. ", micActive: "Micrófono activo...", heardError: "Pampachaykuway, mana uyariyta atirqaykichu. Ama hina kaspa, hukmanta kallpachakuy.", micAccessError: "Micrófonoman mana yaykuyta atispa. Permisokunata qhaway." }, speed: { idle: "Ocioso: 1.1.", talk: "Rimanakuy:" } }, avatar: { loading: "Avatarta kargachkanki...", title: { maximize: "Maximizar", minimize: "Minimizar", close: "Wichqay", clickToMaximize: "Aswan hatun kananpaq ñit’iy", clickToMinimize: "Aswan pisi kananpaq ñit’iy" }, error: { loadFailed: "Mana avatarta kargayta atirqanchu: {{error}} . ", playerNotLoaded: "AniaPlayer mana kargasqachu", passwordRequired: "Chifrasqa .ania willañiqipaq yaykuna rimay munasqa", noSource: "Mana avatar pukyuta qusqachu (avatarUrl icha avatarData) ." } }, greetings: { 0: "¡Hola! ¿Imaynatataq kunan punchaw yanapaykiman?", 1: "Allinllachu! Allinlla chayaykamuy! ¿Imatataq qampaq ruwayman?", 2: "Imaynallam! ¡Ancha kusisqan qanwan rimaspa!", 3: "Allinllachu! Yanapanaypaqmi kaypi kachkani. ¿Imatataq necesitanki?", 4: "Allinllachu! Imaynallam? ¿Imaynatataq yanapakuq kayman?" }, waiting: { 0: "Yuyaymanasaq...", 1: "Huk ratulla...", 2: "Procesamiento...", 3: "Huk segundolla...", 4: "Chayta qampaq qhawachkani..." } }, ce = { chat: { input: { placeholder: "Andika ubutumwa bwawe...", listening: "Kumviriza..." }, enableSound: "Gushoboza Ijwi", stt: { transcribing: "Guhindura: ", micActive: "Mikoro irakora...", heardError: "Mbabarira, sinshobora kukwumva. Ndagusavye wongere ugerageze.", micAccessError: "Ntishobora gushika ku mikoro. Suzuma uruhusha." }, speed: { idle: "Ubusa:", talk: "Ikiganiro:" } }, avatar: { loading: "Gushiramwo ishusho...", title: { maximize: "Gushiramwo vyinshi", minimize: "Kugabanya", close: "Gufunga", clickToMaximize: "Fyonda kugira ngo ushire hejuru", clickToMinimize: "Fyonda kugira ngo ugabanye" }, error: { loadFailed: "Yananiwe gushiramwo avatar: {{error}} ", playerNotLoaded: "AniaPlayer ntiyashizwemwo", passwordRequired: "Ijambobanga rikenewe kuri dosiye .ania yashizwemwo", noSource: "Nta nkomoko y'ishusho yatanzwe (Url y'ishusho canke amakuru y'ishusho)" } }, greetings: { 0: "Ndagusavye! None nogufasha gute uno musi?", 1: "Mwaramutse! Muratumiwe! None nogukorera iki?", 2: "Mwaramutse! Nishimiye cane kuvugana nawe!", 3: "Mwaramutse! Ndi hano kugira mfashe. None wewe ukeneye iki?", 4: "Mwaramutse! Umerewe gute? Noba ngirakamaro gute?" }, waiting: { 0: "Reka niyumvire...", 1: "Umusi umwe...", 2: "Gutunganya...", 3: "Umusegonda gusa...", 4: "Ivyo ndabisuzuma kuri wewe..." } }, de = { chat: { input: { placeholder: "Introduceți mesajul dvs....", listening: "Ascultând..." }, enableSound: "Activați sunet", stt: { transcribing: "Transcriere: ", micActive: "Microfon activ...", heardError: "Îmi pare rău, nu te-am auzit. Vă rugăm să încercați din nou.", micAccessError: "Nu se poate accesa microfonul. Verificați permisiunile." }, speed: { idle: "Inactiv:", talk: "Vorba:" } }, avatar: { loading: "Se încarcă avatarul...", title: { maximize: "Maximizați", minimize: "Minimizați", close: "Închide", clickToMaximize: "Faceți clic pentru a maximiza", clickToMinimize: "Faceți clic pentru a minimiza" }, error: { loadFailed: "Avatarul nu a putut fi încărcat: {{error}} ", playerNotLoaded: "AniaPlayer nu este încărcat", passwordRequired: "Este necesară parola pentru fișierul criptat .ania", noSource: "Nu este furnizată nicio sursă de avatar (avatarUrl sau avatarData)" } }, greetings: { 0: "Salut! Cum te pot ajuta azi?", 1: "Buna ziua! Bun venit! Cu ce ​​vă pot ajuta?", 2: "Bună! Mă bucur să vorbesc cu tine!", 3: "Buna ziua! Sunt aici să ajut. De ce ai nevoie?", 4: "Hi! Ce mai faci? Cum pot fi de folos?" }, waiting: { 0: "Lasă-mă să mă gândesc...", 1: "Un moment...", 2: "Se procesează...", 3: "Doar o secundă...", 4: "verific asta pentru tine..." } }, me = { chat: { input: { placeholder: "Xramosar tiro mesažo...", listening: "Shunen..." }, enableSound: "Aktivisar o avazi", stt: { transcribing: "Transkripcia: ", micActive: "Mikrofono aktivo...", heardError: "Sàr man, naśti te aśunav tut. Mangav tumen te zumaven pale.", micAccessError: "Nashti te resel pes o mikrofono. Dikh e permisie." }, speed: { idle: "Bibutjako:", talk: "Vorbin:" } }, avatar: { loading: "Te ćhivel pes o avatar...", title: { maximize: "Maj baro", minimize: "Te ciknjarel pes", close: "Phande", clickToMaximize: "Klikisar te barǒres", clickToMinimize: "Klikisar te ciknjares" }, error: { loadFailed: "Naśti te ćhivel pes o avatar: {{error}} ", playerNotLoaded: "AniaPlayer na si pherdo", passwordRequired: "Trubul o parovipen vaś o .ania lil kriptime", noSource: "Na si dino o źanglipe vaś o avatar (avatarUrl vaj avatarData)" } }, greetings: { 0: "Bachtalo! Sar shaj zhutiv tut adyes?", 1: "So keres! Miśto avilăn! So daștiv te kerav tuke?", 2: "So keres! But bahtalo te dav duma tusa!", 3: "So keres! Me sem kate te zhutiv. So trubul tut?", 4: "So keres! So keres? Sar śaj te avav laćho?" }, waiting: { 0: "Mukav man te gîndiv...", 1: "Jekh momento...", 2: "Procesing...", 3: "Numa jekh dujto...", 4: "Me dikhav kodo tuke..." } }, Fe = { chat: { input: { placeholder: "Введите сообщение...", listening: "Слушаю..." }, enableSound: "Включить звук", stt: { transcribing: "Транскрипция: ", micActive: "Микрофон активен...", heardError: "Извините, не услышал вас. Пожалуйста, попробуйте еще раз.", micAccessError: "Невозможно получить доступ к микрофону. Проверьте разрешения." }, speed: { idle: "Простой:", talk: "Обсуждение:" } }, avatar: { loading: "Загрузка аватара...", title: { maximize: "Максимизировать", minimize: "Свернуть", close: "Закрыть", clickToMaximize: "Нажмите, чтобы развернуть", clickToMinimize: "Нажмите, чтобы свернуть" }, error: { loadFailed: "Не удалось загрузить аватар: {{error}} ", playerNotLoaded: "AniaPlayer не загружен", passwordRequired: "Требуется пароль для зашифрованного файла .ania", noSource: "Не указан источник аватара (avatarUrl или avatarData)." } }, greetings: { 0: "Привет! Чем я могу помочь вам сегодня?", 1: "Привет! Добро пожаловать! Что я могу сделать для вас?", 2: "Всем привет! Так рад поговорить с тобой!", 3: "Привет! Я здесь, чтобы помочь. Что вам нужно?", 4: "Привет! Как вы? Чем я могу быть полезен?" }, waiting: { 0: "Дай мне подумать...", 1: "Один момент...", 2: "Обработка...", 3: "Всего секунду...", 4: "Я проверяю это для тебя..." } }, ke = { chat: { input: { placeholder: "Andika ubutumwa bwawe ...", listening: "Kumva ..." }, enableSound: "Gushoboza Ijwi", stt: { transcribing: "Kwandukura: ", micActive: "Microphone ikora ...", heardError: "Ihangane, ntushobora kukumva. Nyamuneka gerageza.", micAccessError: "Ntushobora kubona mikoro. Reba uruhushya." }, speed: { idle: "Ubusa:", talk: "Ikiganiro:" } }, avatar: { loading: "Gutwara avatar ...", title: { maximize: "Mugure", minimize: "Gabanya", close: "Funga", clickToMaximize: "Kanda kugirango ubone byinshi", clickToMinimize: "Kanda kugirango ugabanye" }, error: { loadFailed: "Kunanirwa gukuramo avatar: {{error}} ", playerNotLoaded: "AniaPlayer ntabwo yikorewe", passwordRequired: "Ijambobanga risabwa kubanga .ania dosiye", noSource: "Nta soko ya avatar yatanzwe (avatarUrl cyangwa avatarData)" } }, greetings: { 0: "Muraho! Nigute nshobora kugufasha uyu munsi?", 1: "Mwaramutse! Murakaza neza! Nakugirira nte?", 2: "Muraho! Nishimiye cyane kuvugana nawe!", 3: "Mwaramutse! Ndi hano gufasha. Ukeneye iki?", 4: "Muraho! Mumeze mute? Nigute nshobora kuba ingirakamaro?" }, waiting: { 0: "Reka ntekereze ...", 1: "Umwanya umwe ...", 2: "Gutunganya ...", 3: "Isegonda gusa ...", 4: "Ndimo kugenzura ibyo kubwawe ..." } }, ge = { chat: { input: { placeholder: "स्वसन्देशं टङ्कयन्तु...", listening: "श्रुत्वा..." }, enableSound: "ध्वनिं सक्षमं कुर्वन्तु", stt: { transcribing: "प्रतिलेखनम् : १. ", micActive: "माइक्रोफोन सक्रिय...", heardError: "क्षम्यतां, भवन्तं श्रोतुं न शक्तवान्। कृपया पुनः प्रयासं कुर्वन्तु।", micAccessError: "माइक्रोफोनं प्राप्तुं असमर्थः। अनुमतिः पश्यन्तु।" }, speed: { idle: "निष्क्रियः : १.", talk: "वार्तालापः : १." } }, avatar: { loading: "अवतार लोड् भवति...", title: { maximize: "अधिकतमं कुरुत", minimize: "न्यूनतमं कुरुत", close: "निमील्यताम्", clickToMaximize: "अधिकतमं कर्तुं क्लिक् कुर्वन्तु", clickToMinimize: "न्यूनीकर्तुं क्लिक् कुर्वन्तु" }, error: { loadFailed: "अवतारं लोड् कर्तुं असफलम्: {{error}} ", playerNotLoaded: "AniaPlayer न लोड् कृतम्", passwordRequired: "एन्क्रिप्टेड् .ania सञ्चिकायाः कृते गुप्तशब्दः आवश्यकः", noSource: "अवतारस्रोतः न प्रदत्तः (avatarUrl अथवा avatarData)" } }, greetings: { 0: "हाय ! अद्य अहं भवतः कथं साहाय्यं कर्तुं शक्नोमि?", 1: "नमस्ते! स्वागतम्‌! अहं भवतः कृते किं कर्तुं शक्नोमि ?", 2: "ही सर्वे! भवता सह वार्तालापं कृत्वा एतावत् प्रसन्नता!", 3: "नमस्ते! अहं साहाय्यं कर्तुं अत्र अस्मि। भवतः किं आवश्यकम् ?", 4: "नमस्कार! भवान्‌ कथमसि? कथं अहं उपयोगी भवेयम् ?" }, waiting: { 0: "अहं चिन्तयामि...", 1: "एकः क्षणः...", 2: "प्रसंस्करण...", 3: "केवलं एकं सेकण्डं...", 4: "अहं भवतः कृते तत् परीक्षयामि..." } }, he = { chat: { input: { placeholder: "Scrivi lu to messaggiu...", listening: "Ascultannu..." }, enableSound: "Attiva lu sonu", stt: { transcribing: "Trascrizzioni: ", micActive: "Micròfunu attivu...", heardError: "Scusa, non ti putìa sentiri. Pruva n'autra vota.", micAccessError: "Nun si po accèdiri ô micròfunu. Cuntrolla li pirmissi." }, speed: { idle: "Inattivu:", talk: "Parrari:" } }, avatar: { loading: "Caricamentu di l'avatar...", title: { maximize: "Massimizzari", minimize: "Ridùciri ô minimu", close: "Chiudi", clickToMaximize: "Clicca pi massimizzari", clickToMinimize: "Clicca pi ridùciri ô minimu" }, error: { loadFailed: "Nun arriniscìu a carricari l'avatar: {{error}} ", playerNotLoaded: "AniaPlayer nun caricatu", passwordRequired: "La password è nicissària pû file criptatu .ania", noSource: "Nun fu furnita nudda funti di l'avatar (Url di l'avatar o dati di l'avatar)" } }, greetings: { 0: "Saluti! Comu ti pozzu aiutari oggi?", 1: "Salutamu! Bimminutu! Chi ti pozzu fari?", 2: "Ou ḍḍocu! Accussì cuntentu di parrari cu tia!", 3: "Salutamu! Sugnu ccà pi aiutari. Chi ti servi?", 4: "Salutamu! Comu semu? Comu possu èssiri utili?" }, waiting: { 0: "Lassami pinzari...", 1: "Nu mumentu...", 2: "Elaborazzioni...", 3: "Basta nu secunnu...", 4: "Chistu lu cuntrullu pi tia..." } }, pe = { chat: { input: { placeholder: "پنهنجو پيغام ٽائيپ ڪريو...", listening: "ٻڌندڙ..." }, enableSound: "آواز کي فعال ڪريو", stt: { transcribing: "نقل ڪرڻ: ", micActive: "مائڪرو فون فعال...", heardError: "معاف ڪجو، توهان کي ٻڌي نه سگهيو. مهرباني ڪري ٻيهر ڪوشش ڪريو.", micAccessError: "مائڪروفون تائين رسائي نه ٿي سگھي. چيڪ ڪريو اجازتون." }, speed: { idle: "بيڪار:", talk: "ڳالهه ٻولهه:" } }, avatar: { loading: "اوتار لوڊ ٿي رهيو آهي...", title: { maximize: "وڌ ۾ وڌ ڪرڻ", minimize: "گھٽ ڪرڻ", close: "بند", clickToMaximize: "وڌ کان وڌ ڪرڻ لاءِ ڪلڪ ڪريو", clickToMinimize: "گھٽ ڪرڻ لاءِ ڪلڪ ڪريو" }, error: { loadFailed: "اوتار لوڊ ڪرڻ ۾ ناڪام ٿيو: {{error}} ", playerNotLoaded: "AniaPlayer لوڊ نه ٿيو", passwordRequired: "ڳجھو لفظ گھربل .ania فائل لاء", noSource: "ڪو به اوتار جو ذريعو مهيا نه ڪيو ويو آهي (avatarUrl يا avatarData)" } }, greetings: { 0: "هاءِ! مان اڄ ڪيئن توهان جي مدد ڪري سگهان ٿو؟", 1: "سلام! ڀلي ڪري آيا! مان توهان لاءِ ڇا ڪري سگهان ٿو؟", 2: "هيلو، تون آهين! توهان سان ڳالهائڻ لاء ڏاڍو خوش ٿيو!", 3: "سلام! مان مدد ڪرڻ لاءِ هتي آهيان. توکي ڪهڙي ضرورت آهي؟", 4: "سلام تون ڪيئن آهين؟ مان ڪيئن مفيد ٿي سگهان ٿو؟" }, waiting: { 0: "مون کي سوچڻ ڏي...", 1: "هڪ لحظه...", 2: "پروسيسنگ...", 3: "بس هڪ سيڪنڊ...", 4: "مان توهان لاءِ اهو چيڪ ڪري رهيو آهيان ..." } }, ve = { chat: { input: { placeholder: "Sû tokua ti mo...", listening: "Ti mä..." }, enableSound: "Zia son", stt: { transcribing: "Ti sû pekoni: ", micActive: "Micro ni ayeke sara kua...", heardError: "Pardon, mbi lingbi ti mä mo pëpe. Pardon, kiri mo tara ni.", micAccessError: "A lingbi ti wara micro. Bâ apermission ni." }, speed: { idle: "Idle:", talk: "Diskur:" } }, avatar: { loading: "A yeke zia avatar...", title: { maximize: "Maximisé", minimize: "Minimiser", close: "Fermé", clickToMaximize: "Cliqué na ndö ti maximiser .", clickToMinimize: "Cliqué na ndö ti minimiser ." }, error: { loadFailed: "A yeke wara na yâ ti avatar ni: {{error}} ", playerNotLoaded: "AniaJoueur a yeke charge ni pepe", passwordRequired: "A hunda ti zia mot de passe na yâ ti fichier .ania so a crypté ni .", noSource: "A mû pëpe mbeni lingu ti avatar (Url ti avatar wala asango ti avatar)" } }, greetings: { 0: "Bonjour! Mo lingbi ti mû maboko na mo laso tongana nyen?", 1: "Mbi bara ala! Nzoni gangon! Nyen la mbi lingbi ti sara ndali ti mo?", 2: "Bara ala ka! So mbi yeke na ngia ti sara lisoro na mo!", 3: "Mbi bara ala! Mbi yeke ge ti mû maboko. Nyen la mo yeke na bezoin ni?", 4: "Mbi bara ala! Tongana nyen? Tongana nyen la mo lingbi ti sara kua na ni?" }, waiting: { 0: "Zia mbi pensé...", 1: "Mbeni ngoi...", 2: "Sarango kua...", 3: "Gi mbeni seconde...", 4: "Mbi yeke bâ ni ndali ti mo..." } }, ye = { chat: { input: { placeholder: "ပေႃႉလိၵ်ႈၸဝ်ႈၵဝ်ႇ...", listening: "ထွမ်ႇယူႇ..." }, enableSound: "ပိုတ်ႇသဵင်", stt: { transcribing: "ၵၢၼ်တႅမ်ႈမၢႆ: ", micActive: "မၢႆၶရူဝ်ႇၾူၼ်း တူင်ႉၼိုင်ယူႇ...", heardError: "ၶႂၢင်းပၼ်ၶႃႈ ဢမ်ႇလႆႈငိၼ်းသဵင်သူ။ ၶိုၼ်းၶတ်းၸႂ်တူၺ်းၶႃႈ။", micAccessError: "ဢမ်ႇၸၢင်ႈၶဝ်ႈတူၺ်း မၢႆၾူင်း။ ထတ်းတူၺ်း ၶႂၢင်ႉ။" }, speed: { idle: "ဢမ်ႇႁဵတ်းၵၢၼ်", talk: "ဢုပ်ႇၵုမ်-" } }, avatar: { loading: "တၢင်ႇႁၢင်ႈၽၢင်...", title: { maximize: "ႁႂ်ႈသုင်သုတ်း", minimize: "လူတ်းယွမ်း", close: "ဢိုတ်း", clickToMaximize: "ၼဵၵ်းႁႂ်ႈၼမ်သုတ်း", clickToMinimize: "ၼဵၵ်းႁႂ်ႈဢေႇသုတ်း" }, error: { loadFailed: "ဢမ်ႇၸၢင်ႈဢဝ်ဢႃႇဝႃႇတႃႇ: {{error}} ", playerNotLoaded: "ဢၼိယႃႇပလႄး ဢမ်ႇလႆႈလူင်း", passwordRequired: "လူဝ်ႇလႆႈၸႂ်ႉမၢႆလပ်ႉ တႃႇၾၢႆႇ .ania ဢၼ်သႂ်ႇဝႆႉ", noSource: "ဢမ်ႇပၼ်ၶေႃႈမုၼ်း ဢႃႇဝႃႇတႃႇ (avatarUrl ဢမ်ႇၼၼ် ဢႃႇဝႃႇတႃႇData)" } }, greetings: { 0: "မႂ်ႇသုင်ၶႃႈ! မိူဝ်ႈၼႆႉ တေႁဵတ်းႁိုဝ်ၸွႆႈထႅမ်လႆႈ။", 1: "မႂ်ႇသုင်ၶႃႈ! ငိၼ်းၸူမ်းႁပ်ႉတွၼ်ႈ! ၵဝ်တေႁဵတ်းသင်ပၼ်လႆႈ၊", 2: "မႂ်ႇသုင်! ၸူမ်းၼႃႇ ဢၼ်လႆႈဢုပ်ႇၵၼ်!", 3: "မႂ်ႇသုင်ၶႃႈ! မႃးၸွႆႈထႅမ်ၶႃႈ လူဝ်ႇသင်၊", 4: "မႂ်ႇသုင်! ယူႇလီယူႇႁႃႉ? တေႁဵတ်းႁိုဝ် ႁႂ်ႈပဵၼ်ၽွၼ်းလီ၊" }, waiting: { 0: "ႁႂ်ႈၶႃႈဝူၼ်ႉ...", 1: "ၸူဝ်ႈၵႅပ်ႉၼိုင်ႈ...", 2: "ၵၢၼ်ႁဵတ်းၵၢၼ်...", 3: "ၼိုင်ႈၸူဝ်ႈမူင်းၵူၺ်း...", 4: "ၶႃႈထတ်းတူၺ်းပၼ်သူယူႇ..." } }, xe = { chat: { input: { placeholder: "ඔබගේ පණිවිඩය ටයිප් කරන්න...", listening: "සවන් දෙනවා..." }, enableSound: "ශබ්දය සක්රිය කරන්න", stt: { transcribing: "පිටපත් කිරීම: ", micActive: "මයික්‍රෆෝනය සක්‍රීය...", heardError: "කණගාටුයි, ඔබට ඇසීමට නොහැකි විය. කරුණාකර නැවත උත්සාහ කරන්න.", micAccessError: "මයික්‍රෆෝනයට ප්‍රවේශ විය නොහැක. අවසර පරීක්ෂා කරන්න." }, speed: { idle: "නිෂ්ක්‍රීය:", talk: "කතා කරන්න:" } }, avatar: { loading: "avatar පූරණය වෙමින්...", title: { maximize: "උපරිම කරන්න", minimize: "අවම කරන්න", close: "වසන්න", clickToMaximize: "උපරිම කිරීමට ක්ලික් කරන්න", clickToMinimize: "අවම කිරීමට ක්ලික් කරන්න" }, error: { loadFailed: "අවතාරය පූරණය කිරීමට අසමත් විය: {{error}} ", playerNotLoaded: "AniaPlayer පූරණය කර නැත", passwordRequired: "සංකේතනය කළ .ania ගොනුව සඳහා මුරපදය අවශ්‍ය වේ", noSource: "avatar මූලාශ්‍රයක් සපයා නැත (avatarUrl හෝ avatarData)" } }, greetings: { 0: "හායි! අද මම ඔබට උදව් කරන්නේ කෙසේද?", 1: "ආයුබෝවන්! සාදරයෙන් පිළිගනිමු! මට ඔයාට කළ හැක්කේ කුමක් ද?", 2: "ආයුබෝවන් කොහොම ද! ඔබ සමඟ කතා කිරීමට ලැබීම ගැන සතුටුයි!", 3: "ආයුබෝවන්! මම මෙතන ඉන්නේ උදව් කරන්න. ඔයාට අවශ්ය කුමක් ද?", 4: "හායි! ඔයාට කොහොම ද? මට ප්‍රයෝජනවත් විය හැක්කේ කෙසේද?" }, waiting: { 0: "මට හිතන්න දෙන්න...", 1: "එක මොහොතක්...", 2: "සකසමින්...", 3: "තත්පරයක්...", 4: "මම ඔබ වෙනුවෙන් එය පරීක්ෂා කරමි ..." } }, be = { chat: { input: { placeholder: "Napíšte svoju správu...", listening: "Počúvanie..." }, enableSound: "Povoliť zvuk", stt: { transcribing: "Prepis: ", micActive: "Mikrofón aktívny...", heardError: "Prepáčte, nepočul som vás. Skúste to znova.", micAccessError: "Nedá sa získať prístup k mikrofónu. Skontrolujte povolenia." }, speed: { idle: "Nečinný:", talk: "Hovor:" } }, avatar: { loading: "Načítava sa avatar...", title: { maximize: "Maximalizovať", minimize: "Minimalizovať", close: "Zavrieť", clickToMaximize: "Kliknutím maximalizujete", clickToMinimize: "Kliknutím minimalizujete" }, error: { loadFailed: "Nepodarilo sa načítať avatar: {{error}} ", playerNotLoaded: "AniaPlayer nie je načítaný", passwordRequired: "Pre zašifrovaný súbor .ania sa vyžaduje heslo", noSource: "Nebol poskytnutý žiadny zdroj avatara (avatarUrl alebo avatarData)" } }, greetings: { 0: "Ahoj! Ako ti dnes môžem pomôcť?", 1: "Dobrý deň! Vitajte! čo pre teba môžem urobiť?", 2: "Dobrý deň! Som rád, že s vami môžem hovoriť!", 3: "Dobrý deň! Som tu, aby som vám pomohol. čo potrebuješ", 4: "Ahoj! ako sa máš? Ako môžem byť užitočný?" }, waiting: { 0: "Nechaj ma premýšľať...", 1: "Moment...", 2: "Spracováva sa...", 3: "Len sekundu...", 4: "Kontrolujem ti to..." } }, we = { chat: { input: { placeholder: "Vnesite sporočilo ...", listening: "Poslušanje ..." }, enableSound: "Omogoči zvok", stt: { transcribing: "Prepisovanje: ", micActive: "Mikrofon aktiven...", heardError: "Oprostite, nisem vas slišal. prosim poskusite ponovno", micAccessError: "Do mikrofona ni mogoče dostopati. Preverite dovoljenja." }, speed: { idle: "nedejaven:", talk: "Pogovor:" } }, avatar: { loading: "Nalaganje avatarja ...", title: { maximize: "Povečaj", minimize: "Zmanjšaj", close: "Zapri", clickToMaximize: "Kliknite za povečavo", clickToMinimize: "Kliknite za pomanjšanje" }, error: { loadFailed: "Nalaganje avatarja ni uspelo: {{error}} ", playerNotLoaded: "AniaPlayer ni naložen", passwordRequired: "Za šifrirano datoteko .ania je potrebno geslo", noSource: "Vir avatarja ni naveden (avatarUrl ali avatarData)" } }, greetings: { 0: "zdravo Kako ti lahko danes pomagam?", 1: "pozdravljena Dobrodošli! Kaj lahko storim za vas?", 2: "Pozdravljeni! Zelo me veseli, da se pogovarjam s teboj!", 3: "pozdravljena Tukaj sem, da pomagam. kaj potrebuješ", 4: "zdravo kako si Kako sem lahko koristen?" }, waiting: { 0: "Naj pomislim...", 1: "Trenutek ...", 2: "Obdelava ...", 3: "Samo trenutek ...", 4: "To preverjam za vas ..." } }, ze = { chat: { input: { placeholder: "Tusi lau fe'au...", listening: "Fa'alogo..." }, enableSound: "Fa'aaga le leo", stt: { transcribing: "Tusitala: ", micActive: "Ua gaioi le masini faaleotele leo...", heardError: "Fa'amalie atu, ua le mafai ona fa'alogoina oe. Fa'amolemole toe taumafai.", micAccessError: "Le mafai ona maua le masini faaleotele leo. Siaki fa'atagaga." }, speed: { idle: "Pi'e:", talk: "Talanoaga:" } }, avatar: { loading: "Tu'u avatar...", title: { maximize: "Fa'atele", minimize: "Fa'aitiitiga", close: "Tapuni", clickToMaximize: "Kiliki e fa'ateleina", clickToMinimize: "Kiliki e fa'aitiitia" }, error: { loadFailed: "Ua le mafai ona uta le avatar: {{error}} ", playerNotLoaded: "AniaPlayer e le'i utaina", passwordRequired: "Manaomia upu fa'aigoa mo faila .ania fa'ailoga", noSource: "Leai se puna avatar ua saunia (avatarUrl po'o avatarData)" } }, greetings: { 0: "Talofa! E mafai faapefea ona ou fesoasoani ia te oe i le aso?", 1: "Talofa! Afio mai! O le a se mea e mafai ona ou faia mo oe?", 2: "O a mai oe! E fiafia lava e talanoa atu ia te oe!", 3: "Talofa! Ua ou i ai e fesoasoani. O a mea e te mana'omia?", 4: "Talofa! O a mai oe? E mafai faapefea ona ou aoga?" }, waiting: { 0: "Sei ou mafaufau...", 1: "E tasi le taimi...", 2: "Fa'agasolo...", 3: "Na'o sina sekone...", 4: "Ou te siakiina lena mea mo oe..." } }, fe = { chat: { input: { placeholder: "Nyora meseji yako...", listening: "Kuteerera..." }, enableSound: "Enesa Inzwi", stt: { transcribing: "Kunyora: ", micActive: "Maikorofoni inoshanda...", heardError: "Ndine urombo, handina kukunzwa. Ndapota edza zvakare.", micAccessError: "Tatadza kuwana maikorofoni. Tarisa mvumo." }, speed: { idle: "Idle:", talk: "Hurukuro:" } }, avatar: { loading: "Kurodha avatar...", title: { maximize: "Maximize", minimize: "Deredza", close: "Close", clickToMaximize: "Dzvanya kuti uwedzere", clickToMinimize: "Dzvanya kuti uderedze" }, error: { loadFailed: "Yatadza kurodha avatar: {{error}} ", playerNotLoaded: "AniaPlayer haina kurodha", passwordRequired: "Password inodiwa pa encrypted .ania file", noSource: "Hapana avatar sosi yakapihwa (avatarUrl kana avatarData)" } }, greetings: { 0: "Hi! Ndingakubatsira sei nhasi?", 1: "Mhoro! Mauya! Chii chandingakuitira?", 2: "Mhoroi apo! Ndafara kutaura newe!", 3: "Mhoro! Ndauya kuzobatsira. Unodei?", 4: "Mhoro! Makadii? Ndingabatsira sei?" }, waiting: { 0: "Rega ndifunge...", 1: "Imwe nguva...", 2: "Kugadzira...", 3: "Sekondi chete...", 4: "Ndiri kukutarisa kuti..." } }, Se = { chat: { input: { placeholder: "Ku qor fariintaada...", listening: "Dhegeysi..." }, enableSound: "Daar Codka", stt: { transcribing: "Qoraal: ", micActive: "Makarafoonka firfircoon...", heardError: "Waan ka xunahay, kuma maqli karin Fadlan isku day mar kale", micAccessError: "Aan awoodin in uu galo makarafoon Hubi ogolaanshaha" }, speed: { idle: "Shaqo la'aan", talk: "Hadal:" } }, avatar: { loading: "Soodejinaya avatar...", title: { maximize: "Kordhi", minimize: "Yaree", close: "Xir", clickToMaximize: "Guji si aad u badiso", clickToMinimize: "Guji si aad u yarayso" }, error: { loadFailed: "Ku guuldareystay inuu soo geliyo avatar: {{error}} ", playerNotLoaded: "AniaPlayer lama rarin", passwordRequired: "Erayga sirta ah ayaa looga baahan yahay faylka .ania sir ah", noSource: "Isha avatar lama bixiyo (avatarUrl ama avatarData)" } }, greetings: { 0: "Hi! Sideen ku caawin karaa maanta?", 1: "Hello! Soo dhawoow! Maxaan kuu qabtaa?", 2: "Waa salaaman tahay! Aad ayaan ugu faraxsanahay inaan kula hadlo!", 3: "Hello! waxaan u imid inaan caawiyo Maxaad u baahan tahay?", 4: "Hi! iska waran Sideen waxtar u yeelan karaa?" }, waiting: { 0: "Aan ka fikiro...", 1: "Hal daqiiqo...", 2: "Habaynta...", 3: "Kaliya hal ilbiriqsi...", 4: "Taas ayaan adiga kuu eegayaa..." } }, Me = { chat: { input: { placeholder: "Shkruani mesazhin tuaj...", listening: "Duke dëgjuar..." }, enableSound: "Aktivizo Tingullin", stt: { transcribing: "Transkriptimi: ", micActive: "Mikrofoni aktiv...", heardError: "Më falni, nuk ju dëgjova. Ju lutemi provoni përsëri.", micAccessError: "Nuk mund të qaset në mikrofon. Kontrolloni lejet." }, speed: { idle: "I papunë:", talk: "Bisedoni:" } }, avatar: { loading: "Po ngarkon avatarin...", title: { maximize: "Maksimizoni", minimize: "Minimizoje", close: "Mbylle", clickToMaximize: "Klikoni për të maksimizuar", clickToMinimize: "Kliko për të minimizuar" }, error: { loadFailed: "Ngarkimi i avatarit dështoi: {{error}} ", playerNotLoaded: "AniaPlayer nuk është ngarkuar", passwordRequired: "Kërkohet fjalëkalimi për skedarin .ania të koduar", noSource: "Nuk është dhënë asnjë burim avatar (avatarUrl ose avatarData)" } }, greetings: { 0: "Përshëndetje! Si mund t'ju ndihmoj sot?", 1: "Përshëndetje! Mirë se vini! Çfarë mund të bëj për ju?", 2: "Përshëndetje! Shumë i lumtur të flas me ju!", 3: "Përshëndetje! Unë jam këtu për të ndihmuar. Çfarë ju duhet?", 4: "Përshëndetje! si jeni? Si mund të jem i dobishëm?" }, waiting: { 0: "Më lër të mendoj...", 1: "Një moment...", 2: "Po përpunohet...", 3: "Vetëm një sekondë...", 4: "Po e kontrolloj për ty..." } }, Te = { chat: { input: { placeholder: "Унесите своју поруку...", listening: "слушам..." }, enableSound: "Омогући звук", stt: { transcribing: "Транскрипција: ", micActive: "Микрофон активан...", heardError: "Извините, нисам вас чуо. Покушајте поново.", micAccessError: "Није могуће приступити микрофону. Проверите дозволе." }, speed: { idle: "Неактиван:", talk: "разговор:" } }, avatar: { loading: "Учитавање аватара...", title: { maximize: "Максимизирајте", minimize: "Минимизирајте", close: "Затвори", clickToMaximize: "Кликните да бисте увећали", clickToMinimize: "Кликните да бисте минимизирали" }, error: { loadFailed: "Учитавање аватара није успело: {{error}} ", playerNotLoaded: "АниаПлаиер није учитан", passwordRequired: "Лозинка је потребна за шифровану .аниа датотеку", noSource: "Није наведен извор аватара (аватарУрл или аватарДата)" } }, greetings: { 0: "Здраво! Како вам могу помоћи данас?", 1: "Здраво! Добродошли! Шта могу учинити за вас?", 2: "Здраво! Драго ми је да разговарам са вама!", 3: "Здраво! Ту сам да помогнем. шта ти треба?", 4: "Здраво! како си? Како могу бити користан?" }, waiting: { 0: "да размислим...", 1: "један тренутак...", 2: "Обрада...", 3: "Само секунд...", 4: "Проверавам то за тебе..." } }, Ne = { chat: { input: { placeholder: "Thayipha umlayeto wakho...", listening: "Ngiyalalela..." }, enableSound: "Nika emandla Umsindvo", stt: { transcribing: "Kubhala phansi: ", micActive: "Imakrofoni iyasebenta...", heardError: "Ngiyacolisa, angizange ngikuve. Sicela uphindze uzame futsi.", micAccessError: "Ayikhoni kufinyelela emakhrofoni. Hlola timvume." }, speed: { idle: "Idle:", talk: "Inkhulumo:" } }, avatar: { loading: "Kulayisha i-avatar...", title: { maximize: "Khulisa", minimize: "Nciphisa", close: "Vala", clickToMaximize: "Chafata kute ukhulise", clickToMinimize: "Chafata kute unciphise" }, error: { loadFailed: "Kwehlulekile kulayisha i-avatar: {{error}} ", playerNotLoaded: "Umdlali we-Ania akalayishwa", passwordRequired: "Iphasiwedi ledzingekako yefayela le-.ania lelibhaliwe", noSource: "Kute umtfombo we-avatar loniketiwe (i-Url ye-avatar noma i-avatarData)" } }, greetings: { 0: "Sawubona! Ngingakusita njani lamuhla?", 1: "Sawubona! Kwemukela! Yini lengingakwentela yona?", 2: "Sawubona lapho! Ngiyajabula kakhulu kukhuluma nawe!", 3: "Sawubona! Ngilapha kute ngisite. Yini lokudzingako?", 4: "Sawubona! Unjani? Ngingaba njani lusito?" }, waiting: { 0: "Ake ngicabange...", 1: "Umzuzu munye...", 2: "Kucubungula...", 3: "Umzuzwana nje...", 4: "Ngikuhlolela loko..." } }, je = { chat: { input: { placeholder: "Ngola molaetsa oa hau...", listening: "Ke mametse..." }, enableSound: "Ntsha Modumo", stt: { transcribing: "Ngola: ", micActive: "Maekerofounu ea sebetsa...", heardError: "Tšoarelo, ha kea u utloa. Ka kopo, leka hape.", micAccessError: "Ha e khone ho fihlella maekrofounu. Sheba litumello." }, speed: { idle: "E sa sebetse:", talk: "Puo:" } }, avatar: { loading: "E kenya avatar...", title: { maximize: "Eketsa", minimize: "Fokotsa", close: "Koala", clickToMaximize: "Tobetsa ho holisa", clickToMinimize: "Tobetsa ho fokotsa" }, error: { loadFailed: "E hlolehile ho kenya avatar: {{error}} ", playerNotLoaded: "AniaPlayer ha e kentsoe", passwordRequired: "Lentsoe la lekunutu lea hlokahala bakeng sa faele e kentsoeng ea .ania", noSource: "Ha ho mohloli o fanoeng (avatarUrl kapa avatarData)" } }, greetings: { 0: "Lumela! Nka o thusa jwang kajeno?", 1: "Lumela! Rea u amohela! Nka u etsetsang?", 2: "Ho joang! Ke thabela ho bua le uena!", 3: "Lumela! Ke mona ho tla thusa. U hloka eng?", 4: "Lumela! U phela joang? Nka ba molemo joang?" }, waiting: { 0: "Ere ke nahane...", 1: "Motsotso o le mong...", 2: "E ntse e sebetsa...", 3: "Motsotsoana feela...", 4: "Ke u lekola seo..." } }, Pe = { chat: { input: { placeholder: "Ketik pesen anjeun...", listening: "Dengekeun..." }, enableSound: "Aktipkeun Sora", stt: { transcribing: "Transkripsi: ", micActive: "Mikropon aktip...", heardError: "Hapunten, teu tiasa ngadangu anjeun. Mangga cobian deui.", micAccessError: "Teu bisa ngakses mikropon. Pariksa idin." }, speed: { idle: "dianggurkeun:", talk: "Obrolan:" } }, avatar: { loading: "Ngamuat avatar...", title: { maximize: "Maksimalkeun", minimize: "Ngaleutikan", close: "Tutup", clickToMaximize: "Klik pikeun maksimalkeun pungsi", clickToMinimize: "Klik pikeun ngaleutikan" }, error: { loadFailed: "Gagal ngamuat avatar: {{error}} ", playerNotLoaded: "AniaPlayer teu dimuat", passwordRequired: "Sandi diperlukeun pikeun énkripsi file .ania", noSource: "Teu aya sumber avatar anu disayogikeun (avatarUrl atanapi avatarData)" } }, greetings: { 0: "Hai! Kumaha abdi tiasa ngabantosan anjeun dinten ayeuna?", 1: "Halo! Wilujeng sumping! Naon anu tiasa abdi lakukeun pikeun anjeun?", 2: "Héi anu di dinya! Jadi bungah ngobrol jeung anjeun!", 3: "Halo! Abdi di dieu pikeun mantuan. Kunaon anjeun peryogi?", 4: "Hai! Kumaha damang? Kumaha carana abdi tiasa mangpaat?" }, waiting: { 0: "Hayu atuh mikir...", 1: "Sakedap...", 2: "Ngolah...", 3: "Sakedap...", 4: "Abdi mariksa éta pikeun anjeun ..." } }, Ke = { chat: { input: { placeholder: "Skriv ditt meddelande...", listening: "Lyssnar..." }, enableSound: "Aktivera ljud", stt: { transcribing: "Transkribera: ", micActive: "Mikrofonen är aktiv...", heardError: "Förlåt, jag kunde inte höra dig. Försök igen.", micAccessError: "Det går inte att komma åt mikrofonen. Kontrollera behörigheter." }, speed: { idle: "Tomgång:", talk: "Prata:" } }, avatar: { loading: "Laddar avatar...", title: { maximize: "Maximera", minimize: "Minimera", close: "Stäng", clickToMaximize: "Klicka för att maximera", clickToMinimize: "Klicka för att minimera" }, error: { loadFailed: "Det gick inte att ladda avatar: {{error}} ", playerNotLoaded: "AniaPlayer har inte laddats", passwordRequired: "Lösenord krävs för krypterad .ania-fil", noSource: "Ingen avatarkälla tillhandahålls (avatarUrl eller avatarData)" } }, greetings: { 0: "Hej! Hur kan jag hjälpa dig idag?", 1: "Hej! Välkomna! Vad kan jag göra för dig?", 2: "Hej där! Så glad att få prata med dig!", 3: "Hej! Jag är här för att hjälpa till. Vad behöver du?", 4: "Hej! Hur mår du? Hur kan jag vara användbar?" }, waiting: { 0: "Låt mig tänka...", 1: "Ett ögonblick...", 2: "Bearbetar...", 3: "Bara en sekund...", 4: "Jag kollar det åt dig..." } }, Le = { chat: { input: { placeholder: "Andika ujumbe wako...", listening: "Inasikiliza..." }, enableSound: "Washa Sauti", stt: { transcribing: "Kunukuu: ", micActive: "Maikrofoni inatumika...", heardError: "Samahani, sikuweza kukusikia. Tafadhali jaribu tena.", micAccessError: "Haiwezi kufikia maikrofoni. Angalia ruhusa." }, speed: { idle: "Bila kufanya kitu:", talk: "Mazungumzo:" } }, avatar: { loading: "Inapakia avatar...", title: { maximize: "Ongeza", minimize: "Punguza", close: "Funga", clickToMaximize: "Bofya ili kuongeza", clickToMinimize: "Bofya ili kupunguza" }, error: { loadFailed: "Imeshindwa kupakia avatar: {{error}} ", playerNotLoaded: "AniaPlayer haijapakiwa", passwordRequired: "Nenosiri linahitajika kwa faili iliyosimbwa kwa njia fiche ya .ania", noSource: "Hakuna chanzo cha ishara kilichotolewa (avatarUrl au avatarData)" } }, greetings: { 0: "Habari! Nikusaidieje leo?", 1: "Habari! Karibu! Nikufanyie nini?", 2: "Habari! Nimefurahi sana kuzungumza nawe!", 3: "Habari! Niko hapa kusaidia. Unahitaji nini?", 4: "Habari! Habari yako? Ninawezaje kuwa na manufaa?" }, waiting: { 0: "Hebu nifikirie...", 1: "Dakika moja...", 2: "Inachakata...", 3: "Sekunde moja tu...", 4: "Ninakuangalia hiyo..." } }, Ue = { chat: { input: { placeholder: "Wpisz swoja wiadōmość...", listening: "Ôsłuchajōm..." }, enableSound: "Włōncz źwiynk", stt: { transcribing: "Przepisowanie: ", micActive: "Mikrofōn je aktywny...", heardError: "Przepraszam, niy mōg ci usłyszeć. Proszōm sprōbować jeszcze raz.", micAccessError: "Niy można dostympu do mikrofōnu. Sprawdź przizwolynia." }, speed: { idle: "Bezczynny:", talk: "Godanie:" } }, avatar: { loading: "Ładujōm awatar...", title: { maximize: "Maksymalizować", minimize: "Zminimalizować", close: "Zamknij", clickToMaximize: "Kliknij, coby zmaksymalizować", clickToMinimize: "Kliknij, coby zminimalizować" }, error: { loadFailed: "Niy udało sie załadować awatara: {{error}} ", playerNotLoaded: "AniaPlayer niy je załadowany", passwordRequired: "Wymogane hasło do zaszyfrowanego pliku .ania", noSource: "Brak podanego zdrzōdła awatara (Url awatara abo Dane awatara)" } }, greetings: { 0: "Cześć! Jak mogōm ci dzisiej pōmōc?", 1: "Witej! Witej! Co mogōm ci zrobić?", 2: "Witej! Tak cieszōm sie z tobom porozmawiać!", 3: "Witej! Jōn sōm tu, coby pōmōc. Co ci potrzebne?", 4: "Serwus! Jak sie mosz? Jak mogōm być przidajny?" }, waiting: { 0: "Pozwōl mi pomyśleć...", 1: "Jedna chwila...", 2: "Przetworzanie...", 3: "Ino sekunda...", 4: "Sprawdzōm to dlo ciebie..." } }, He = { chat: { input: { placeholder: "உங்கள் செய்தியை உள்ளிடவும்...", listening: "கேட்கிறது..." }, enableSound: "ஒலியை இயக்கு", stt: { transcribing: "படியெடுத்தல்: ", micActive: "மைக்ரோஃபோன் செயலில் உள்ளது...", heardError: "மன்னிக்கவும், உங்கள் பேச்சைக் கேட்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.", micAccessError: "மைக்ரோஃபோனை அணுக முடியவில்லை. அனுமதிகளைச் சரிபார்க்கவும்." }, speed: { idle: "சும்மா:", talk: "பேச்சு:" } }, avatar: { loading: "அவதாரத்தை ஏற்றுகிறது...", title: { maximize: "அதிகப்படுத்து", minimize: "குறைக்கவும்", close: "மூடு", clickToMaximize: "பெரிதாக்க கிளிக் செய்யவும்", clickToMinimize: "குறைக்க கிளிக் செய்யவும்" }, error: { loadFailed: "அவதாரத்தை ஏற்றுவதில் தோல்வி: {{error}} ", playerNotLoaded: "AniaPlayer ஏற்றப்படவில்லை", passwordRequired: "என்க்ரிப்ட் செய்யப்பட்ட .ania கோப்பிற்கு கடவுச்சொல் தேவை", noSource: "அவதார் ஆதாரம் எதுவும் வழங்கப்படவில்லை (avatarUrl அல்லது avatarData)" } }, greetings: { 0: "ஹாய்! இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?", 1: "வணக்கம்! வருக! நான் உனக்கு என்ன செய்ய முடியும்?", 2: "வணக்கம்! உங்களுடன் பேசுவதில் மிக்க மகிழ்ச்சி!", 3: "வணக்கம்! நான் உதவி செய்ய வந்துள்ளேன். உனக்கு என்ன வேண்டும்?", 4: "ஹாய்! எப்படி இருக்கிறீர்கள்? நான் எப்படி பயனுள்ளதாக இருக்க முடியும்?" }, waiting: { 0: "நான் சிந்திக்கட்டும்...", 1: "ஒரு கணம்...", 2: "செயலாக்குகிறது...", 3: "ஒரு நொடி...", 4: "நான் அதை உங்களுக்காக சரிபார்க்கிறேன்..." } }, qe = { chat: { input: { placeholder: "మీ సందేశాన్ని టైప్ చేయండి...", listening: "వింటూ..." }, enableSound: "ధ్వనిని ప్రారంభించండి", stt: { transcribing: "లిప్యంతరీకరణ: ", micActive: "మైక్రోఫోన్ యాక్టివ్...", heardError: "క్షమించండి, మీ మాట వినలేకపోయాను. దయచేసి మళ్లీ ప్రయత్నించండి.", micAccessError: "మైక్రోఫోన్‌ని యాక్సెస్ చేయడం సాధ్యపడలేదు. అనుమతులను తనిఖీ చేయండి." }, speed: { idle: "నిష్క్రియ:", talk: "చర్చ:" } }, avatar: { loading: "అవతార్ లోడ్ అవుతోంది...", title: { maximize: "గరిష్టీకరించు", minimize: "కనిష్టీకరించు", close: "మూసివేయి", clickToMaximize: "గరిష్టీకరించడానికి క్లిక్ చేయండి", clickToMinimize: "కనిష్టీకరించడానికి క్లిక్ చేయండి" }, error: { loadFailed: "అవతార్ లోడ్ చేయడంలో విఫలమైంది: {{error}} ", playerNotLoaded: "AniaPlayer లోడ్ చేయబడలేదు", passwordRequired: "గుప్తీకరించిన .ania ఫైల్ కోసం పాస్‌వర్డ్ అవసరం", noSource: "అవతార్ మూలం అందించబడలేదు (avatarUrl లేదా avatarData)" } }, greetings: { 0: "హాయ్! ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను?", 1: "హలో! స్వాగతం! నేను మీ కోసం ఏమి చేయగలను?", 2: "హాయ్! మీతో మాట్లాడినందుకు చాలా ఆనందంగా ఉంది!", 3: "హలో! నేను సహాయం చేయడానికి ఇక్కడ ఉన్నాను. మీకు ఏమి కావాలి?", 4: "హాయ్! మీరు ఎలా ఉన్నారు? నేను ఎలా ఉపయోగపడగలను?" }, waiting: { 0: "నన్ను ఆలోచించనివ్వండి...", 1: "ఒక్క క్షణం...", 2: "ప్రాసెస్ చేస్తోంది...", 3: "ఒక్క సెకను...", 4: "నేను మీ కోసం దాన్ని తనిఖీ చేస్తున్నాను..." } }, Re = { chat: { input: { placeholder: "Hakerek ita-boot nia mensajen...", listening: "Rona hela..." }, enableSound: "Habilita lian", stt: { transcribing: "Transkrisaun: ", micActive: "Mikrofone ativu...", heardError: "Deskulpa, labele rona ita-boot. Favor ida koko fali.", micAccessError: "Labele asesu ba mikrofone. Verifika lisensa sira." }, speed: { idle: "Ocioso:", talk: "Diskursu:" } }, avatar: { loading: "Karregamentu hela avatar...", title: { maximize: "Maksimiza", minimize: "Minimiza", close: "Taka", clickToMaximize: "Klik atu maximiza", clickToMinimize: "Klik atu minimiza" }, error: { loadFailed: "La konsege karrega avatar: {{error}} ", playerNotLoaded: "AniaPlayer la karrega", passwordRequired: "Presiza liafuan-xave ba arkivu .ania ne'ebé enkriptadu", noSource: "Laiha fonte avatar ne'ebé fornese (avatarUrl ka avatarData)" } }, greetings: { 0: "Olá! Oinsá ha'u bele ajuda ita-boot ohin?", 1: "Óla! Benvindo! Saida maka ha'u bele halo ba ita-boot?", 2: "Ola! Kontente tebes atu ko'alia ho ita-boot!", 3: "Óla! Ha'u iha ne'e atu ajuda. Ita presiza saida?", 4: "Óla! Di'ak ka lae? Oinsá ha'u bele sai útil?" }, waiting: { 0: "Husik ha'u hanoin...", 1: "Momentu ida...", 2: "Prosesamentu...", 3: "Segundu ida de'it...", 4: "Ha'u verifika hela ida-ne'e ba ita-boot..." } }, Ie = { chat: { input: { placeholder: "Паёми худро нависед...", listening: "Гӯш кардан..." }, enableSound: "Овозро фаъол созед", stt: { transcribing: "Тарҷума: ", micActive: "Микрофон фаъол...", heardError: "Бубахшед, шуморо шунида натавонистам. Лутфан бори дигар кӯшиш кунед.", micAccessError: "Дастрасӣ ба микрофон нест. Иҷозатҳоро тафтиш кунед." }, speed: { idle: "Бекор:", talk: "Баҳс:" } }, avatar: { loading: "Боркунии аватар...", title: { maximize: "Максимум кардан", minimize: "Кам кардан", close: "Пӯшед", clickToMaximize: "Барои калон кардан клик кунед", clickToMinimize: "Барои кам кардан клик кунед" }, error: { loadFailed: "Аватар бор карда нашуд: {{error}} ", playerNotLoaded: "AniaPlayer бор карда нашудааст", passwordRequired: "Рамз барои файли рамзгузоришудаи .ania лозим аст", noSource: "Ягон манбаи аватар пешниҳод нашудааст (avatarUrl ё avatarData)" } }, greetings: { 0: "Салом! Чӣ тавр ман имрӯз ба шумо кӯмак карда метавонам?", 1: "Салом! Хуш омадед! Ба шумо чи хизмат карда метавонам?", 2: "Салом! Аз сӯҳбат бо шумо хеле шодам!", 3: "Салом! Ман барои кӯмак омадаам. Ба шумо чӣ лозим?", 4: "Салом! Шумо чӣ хелед? Чӣ тавр ман метавонам муфид бошам?" }, waiting: { 0: "Биёед ман фикр кунам ...", 1: "Як лаҳза...", 2: "Коркард...", 3: "Танҳо як сония ...", 4: "Ман инро барои шумо тафтиш мекунам ..." } }, Oe = { chat: { input: { placeholder: "พิมพ์ข้อความของคุณ...", listening: "กำลังฟัง..." }, enableSound: "เปิดใช้งานเสียง", stt: { transcribing: "การถอดเสียง: ", micActive: "ไมโครโฟนทำงานอยู่...", heardError: "ขออภัย ไม่ได้ยินคุณ โปรดลองอีกครั้ง", micAccessError: "ไม่สามารถเข้าถึงไมโครโฟนได้ ตรวจสอบสิทธิ์" }, speed: { idle: "ไม่ได้ใช้งาน:", talk: "พูดคุย:" } }, avatar: { loading: "กำลังโหลดอวตาร...", title: { maximize: "ขยายใหญ่สุด", minimize: "ย่อเล็กสุด", close: "ปิด", clickToMaximize: "คลิกเพื่อขยายให้ใหญ่สุด", clickToMinimize: "คลิกเพื่อย่อขนาด" }, error: { loadFailed: "โหลดอวตารไม่สำเร็จ: {{error}} ", playerNotLoaded: "AniaPlayer ไม่ได้โหลด", passwordRequired: "ต้องใช้รหัสผ่านสำหรับไฟล์ .ania ที่เข้ารหัส", noSource: "ไม่มีแหล่งที่มาของอวาตาร์ (avatarUrl หรือ avatarData)" } }, greetings: { 0: "สวัสดี! วันนี้ฉันจะช่วยคุณได้อย่างไร?", 1: "สวัสดี! ยินดีต้อนรับ! ฉันจะทำอะไรให้คุณได้บ้าง?", 2: "สวัสดี! ดีใจมากที่ได้พูดคุยกับคุณ!", 3: "สวัสดี! ฉันมาที่นี่เพื่อช่วย คุณต้องการอะไร?", 4: "สวัสดี! คุณเป็นอย่างไร? ฉันจะมีประโยชน์ได้อย่างไร?" }, waiting: { 0: "ให้ฉันคิดว่า...", 1: "สักครู่...", 2: "กำลังประมวลผล...", 3: "แค่วินาทีเดียว...", 4: "ฉันกำลังตรวจสอบสิ่งนั้นให้คุณ..." } }, We = { chat: { input: { placeholder: "መልእኽትኻ ጽሓፍ...", listening: "ምስማዕ..." }, enableSound: "ድምጺ ኣንቅሕ", stt: { transcribing: "ምጽሓፍ፤ ", micActive: "ማይክሮፎን ንጡፍ...", heardError: "ይቕሬታ ክሰምዓካ ኣይከኣልኩን። በጃኹም ደጊምኩም ፈትኑ።", micAccessError: "ማይክሮፎን ክትረክብ ኣይከኣለትን። ፍቓድ ምፍታሽ።" }, speed: { idle: "ስራሕ ኣልቦ:", talk: "ዘረባ፤" } }, avatar: { loading: "ኣቫታር ኣብ ምጽዓን...", title: { maximize: "Maximize ምግባር", minimize: "ምጉዳል", close: "ዕጸዎ።", clickToMaximize: "ንኽትዓቢ ጠውቕ", clickToMinimize: "ንምንካይ ጠውቑ" }, error: { loadFailed: "ኣቫታር ምጽዓን ኣይተኻእለን: {{error}} ", playerNotLoaded: "AniaPlayer ኣይተጻዕነን።", passwordRequired: "ንዝተመሰጠረ .ania ፋይል ፓስዎርድ የድሊ", noSource: "ምንጪ ኣቫታር ኣይተዋህበን (avatarUrl ወይ avatarData)" } }, greetings: { 0: "ሰላም! ሎሚ ብኸመይ ክሕግዘካ ይኽእል?", 1: "ሰላም! እንኳዕ ደሓን መፁ! እንታይ ክገብረልካ ይኽእል?", 2: "ሰላም! ምሳኻ ምዝርራበይ ኣዝዩ ደስ ይብለኒ!", 3: "ሰላም! ክሕግዝ እየ ኣብዚ ዘለኹ። እንታይ የድልየካ?", 4: "ሰላም! ከመይ አለካ፧ ከመይ ጌረ እየ ጠቓሚ ክኸውን ዝኽእል?" }, waiting: { 0: "እስከ ክሓስብ...", 1: "ሓንቲ ህሞት...", 2: "መስርሕ...", 3: "ካልኢት ጥራይ...", 4: "ኣነ ንዓኻትኩም እየ ዝፍትሽ ዘለኹ..." } }, _e = { chat: { input: { placeholder: "Habaryňyzy ýazyň ...", listening: "Diňlemek ..." }, enableSound: "Ses açmak", stt: { transcribing: "Transkripsiýa: ", micActive: "Mikrofon işjeň ...", heardError: "Bagyşlaň, sizi diňläp bilmedim Gaýtadan synanyşmagyňyzy haýyş edýäris.", micAccessError: "Mikrofona girip bolmaýar Rugsatlary barlaň." }, speed: { idle: "Boş:", talk: "Gepleşik:" } }, avatar: { loading: "Awatar ýüklenýär ...", title: { maximize: "Ulaltmak", minimize: "Minimallaşdyryň", close: ".Akyn", clickToMaximize: "Ulaltmak üçin basyň", clickToMinimize: "Minimallaşdyrmak üçin basyň" }, error: { loadFailed: "Awatary ýükläp bilmedi: {{error}} ", playerNotLoaded: "AniaPlayer ýüklenmedi", passwordRequired: "Şifrlenen .ania faýly üçin parol gerek", noSource: "Awatar çeşmesi berilmedi (avatarUrl ýa-da avatarData)" } }, greetings: { 0: "Salam! Bu gün size nädip kömek edip bilerin?", 1: "Salam! Hoş geldiňiz! Men saňa näme edip bilerin?", 2: "Salam! Siziň bilen gürleşmäge şat!", 3: "Salam! Men kömek etmek üçin geldim. Size näme gerek?", 4: "Salam! ?Agdaýlaryňyz nähili? Nädip peýdaly bolup bilerin?" }, waiting: { 0: "Pikir edip göreýin ...", 1: "Bir pursat ...", 2: "Gaýtadan işlemek ...", 3: "Diňe bir sekunt ...", 4: "Men muny siziň üçin barlaýaryn ..." } }, Ge = { chat: { input: { placeholder: "Thaepa molaetsa wa gago...", listening: "Go reetsa..." }, enableSound: "Kgontsha Modumo", stt: { transcribing: "Go kwalolola: ", micActive: "Maekerofouno e a dira...", heardError: "Tshwarelo, ga ke a go utlwa. Tsweetswee leka gape.", micAccessError: "Ga e kgone go bona maekerofouno. Tlhola ditetlelelo." }, speed: { idle: "Idle:", talk: "Puo:" } }, avatar: { loading: "Go laisa setshwantsho...", title: { maximize: "Godisang", minimize: "Fokotsa", close: "Tswala", clickToMaximize: "Tobetsa go godisa", clickToMinimize: "Tobetsa go fokotsa" }, error: { loadFailed: "E paletswe ke go laisa setshwantsho: {{error}} ", playerNotLoaded: "Setshamekisi sa Ania ga se a laisiwa", passwordRequired: "Nomoro ya sephiri e a tlhokega mo faeleng ya .ania e e tsenngwang khoutu", noSource: "Ga go na motswedi wa setshwantsho o o neetsweng (Url ya setshwantsho kgotsa Tshedimosetso ya setshwantsho)" } }, greetings: { 0: "Dumela! Nka go thusa jang gompieno?", 1: "Dumelang! Amogelesega! Nka go direla eng?", 2: "Dumelang! Ke itumelela go bua le wena!", 3: "Dumelang! Ke fano go thusa. O tlhoka eng?", 4: "Dumelang! Le kae? Nka nna mosola jang?" }, waiting: { 0: "E re ke akanye...", 1: "Motsotso o le mongwe...", 2: "Go bereka...", 3: "Motsotswana fela...", 4: "Ke go tlhola seo..." } }, Ve = { chat: { input: { placeholder: "Mesajınızı yazın...", listening: "Dinleniyor..." }, enableSound: "Sesi Etkinleştir", stt: { transcribing: "Transkripsiyon: ", micActive: "Mikrofon aktif...", heardError: "Kusura bakmayın, sizi duyamadım. Lütfen tekrar deneyin.", micAccessError: "Mikrofona erişilemiyor. İzinleri kontrol edin." }, speed: { idle: "Boşta:", talk: "Konuşma:" } }, avatar: { loading: "Avatar yükleniyor...", title: { maximize: "Büyüt", minimize: "Küçült", close: "Kapat", clickToMaximize: "Büyütmek için tıklayın", clickToMinimize: "Küçültmek için tıklayın" }, error: { loadFailed: "Avatar yüklenemedi: {{error}} ", playerNotLoaded: "AniaPlayer yüklenmedi", passwordRequired: "Şifrelenmiş .ania dosyası için şifre gerekli", noSource: "Avatar kaynağı sağlanmadı (avatarUrl veya avatarData)" } }, greetings: { 0: "Merhaba! Bugün sana nasıl yardımcı olabilirim?", 1: "Merhaba! Hoş geldin! Sizin için ne yapabilirim?", 2: "Merhaba! Seninle konuştuğuma çok sevindim!", 3: "Merhaba! Yardım etmek için buradayım. Ne istiyorsun?", 4: "MERHABA! Nasılsın? Nasıl faydalı olabilirim?" }, waiting: { 0: "Bir düşüneyim...", 1: "Bir dakika...", 2: "İşleniyor...", 3: "Bir saniye...", 4: "Bunu senin için kontrol ediyorum..." } }, $e = { chat: { input: { placeholder: "Thayipha rungula ra wena...", listening: "Ku yingisela..." }, enableSound: "Endla leswaku Mpfumawulo wu tirha", stt: { transcribing: "Ku tsala: . ", micActive: "Microphone yi tirha...", heardError: "Sorry, a ndzi swi kotanga ku ku twa. Hi kombela u ringeta nakambe.", micAccessError: "A swi koteki ku nghena eka microphone. Languta mpfumelelo." }, speed: { idle: "Ku nga tirhi: .", talk: "Nkulumo: ." } }, avatar: { loading: "Ku layicha avatar...", title: { maximize: "Ku kurisa", minimize: "Ku hunguta", close: "Pfala", clickToMaximize: "Click ku kurisa", clickToMinimize: "Click ku hunguta" }, error: { loadFailed: "Ku tsandzekile ku layicha avatar: {{error}} . ", playerNotLoaded: "AniaPlayer a yi layichiwanga", passwordRequired: "Phasiwedi ya laveka eka fayili ya .ania leyi pfaleriweke", noSource: "Ku hava xihlovo xa avatar lexi nyikiweke (avatarUrl kumbe avatarData) ." } }, greetings: { 0: "Hi! Xana ndzi nga ku pfuna njhani namuntlha?", 1: "Avuxeni! Amukela! Xana ndzi nga ku endlela yini?", 2: "Avuxeni kwalaho! Ndzi tsakile swinene ku vulavula na wena!", 3: "Avuxeni! Ndzi kona ku ta pfuna. Xana u lava yini?", 4: "Xewani! Ku njhani? Xana ndzi nga pfuna njhani?" }, waiting: { 0: "Ndzi pfumeleleni ndzi ehleketa...", 1: "Nkarhi wun'we...", 2: "Ku lulamisiwa ka...", 3: "Sekoni ntsena...", 4: "Ndzi ku checker sweswo..." } }, Je = { chat: { input: { placeholder: "Хәбәрегезне языгыз ...", listening: "Тыңлау ..." }, enableSound: "Тавышны кушу", stt: { transcribing: "Транскрипция: ", micActive: "Микрофон актив ...", heardError: "Гафу итегез, сезне ишетә алмадым. Зинһар, кабатлап карагыз.", micAccessError: "Микрофонга керә алмый. Рөхсәтне тикшерегез." }, speed: { idle: "Эшсез:", talk: "Сөйләшү:" } }, avatar: { loading: "Аватар йөкләү ...", title: { maximize: "Максимальләштерегез", minimize: "Минимум", close: "Ябу", clickToMaximize: "Максимальләштерү өчен басыгыз", clickToMinimize: "Минимальләштерү өчен басыгыз" }, error: { loadFailed: "Аватарны йөкли алмады: {{error}} ", playerNotLoaded: "AniaPlayer йөкләнмәгән", passwordRequired: "Шифрланган .ania файл өчен серсүз кирәк", noSource: "Аватар чыганагы бирелмәгән (avatarUrl яки avatarData)" } }, greetings: { 0: "Сәлам! Бүген мин сезгә ничек ярдәм итә алам?", 1: "Сәлам! Рәхим итегез! Мин сезнең өчен нәрсә эшли алам?", 2: "Исәнмесез! Сезнең белән сөйләшергә бик шат!", 3: "Сәлам! Мин монда булышырга. Сезгә нәрсә кирәк?", 4: "Сәлам! Сез ничек? Мин ничек файдалы була алам?" }, waiting: { 0: "Уйлап карарга рөхсәт итегез ...", 1: "Бер мизгел ...", 2: "Эшкәртү ...", 3: "Бер секунд ...", 4: "Мин моны сезнең өчен тикшерәм ..." } }, Ze = { chat: { input: { placeholder: "ئۇچۇرىڭىزنى يېزىڭ ...", listening: "ئاڭلاش ..." }, enableSound: "ئاۋازنى قوزغىتىش", stt: { transcribing: "ترانسكرىپسىيە: ", micActive: "مىكروفون ئاكتىپ ...", heardError: "كەچۈرۈڭ ، سىزنى ئاڭلىيالمىدىم. قايتا سىناڭ.", micAccessError: "مىكروفوننى زىيارەت قىلالمىدى. ئىجازەتلەرنى تەكشۈرۈڭ." }, speed: { idle: "بىكار:", talk: "سۆھبەت:" } }, avatar: { loading: "يۈكلەنگەن يۈك ...", title: { maximize: "Maximize", minimize: "كىچىكلىتىڭ", close: "تاقاش", clickToMaximize: "چوڭايتىش ئۈچۈن چېكىڭ", clickToMinimize: "كىچىكلىتىش ئۈچۈن چېكىڭ" }, error: { loadFailed: "باش سۈرىتى يۈكلەنمىدى: {{error}} ", playerNotLoaded: "AniaPlayer يۈكلەنمىدى", passwordRequired: "مەخپىيلەشتۈرۈلگەن .ania ھۆججىتى ئۈچۈن پارول لازىم", noSource: "ھېچقانداق باش مەنبە تەمىنلەنمىگەن (avatarUrl ياكى avatarData)" } }, greetings: { 0: "ياخشىمۇسىز! بۈگۈن سىزگە قانداق ياردەم بېرەلەيمەن؟", 1: "ياخشىمۇسىز! خۇش كەپسىز! مەن سىزگە نېمە قىلالايمەن؟", 2: "ئەسسالامۇئەلەيكۇم! سىز بىلەن پاراڭلاشقانلىقىڭىزدىن خۇشالمەن!", 3: "ياخشىمۇسىز! مەن ياردەمگە كەلدىم. سىزگە نېمە لازىم؟", 4: "ياخشىمۇسىز! قانداق ئەھۋالىڭىز؟ مەن قانداقمۇ پايدىلىق بولالايمەن؟" }, waiting: { 0: "ئويلاپ باقاي ...", 1: "بىر دەم ...", 2: "بىر تەرەپ قىلىش ...", 3: "پەقەت بىر سېكۇنت ...", 4: "مەن ئۇنى تەكشۈرۈۋاتىمەن ..." } }, Ye = { chat: { input: { placeholder: "Введіть своє повідомлення...", listening: "Слухання..." }, enableSound: "Увімкнути звук", stt: { transcribing: "транскрибування: ", micActive: "Мікрофон активний...", heardError: "Вибачте, вас не чути. Спробуйте ще раз.", micAccessError: "Неможливо отримати доступ до мікрофона. Перевірте дозволи." }, speed: { idle: "Неактивний:", talk: "Розмова:" } }, avatar: { loading: "Завантаження аватара...", title: { maximize: "Максимізувати", minimize: "Згорнути", close: "Закрити", clickToMaximize: "Натисніть, щоб розгорнути", clickToMinimize: "Натисніть, щоб згорнути" }, error: { loadFailed: "Не вдалося завантажити аватар: {{error}} ", playerNotLoaded: "AniaPlayer не завантажується", passwordRequired: "Для зашифрованого файлу .ania потрібен пароль", noSource: "Джерело аватара не надано (avatarUrl або avatarData)" } }, greetings: { 0: "привіт Чим я можу тобі допомогти сьогодні?", 1: "Привіт! Ласкаво просимо! Що я можу для вас зробити?", 2: "Привіт! Так радий з вами поговорити!", 3: "Привіт! Я тут, щоб допомогти. що вам потрібно", 4: "привіт як справи Чим я можу бути корисним?" }, waiting: { 0: "Дай подумати...", 1: "Хвилинку...", 2: "Обробка...", 3: "Секундочку...", 4: "Я перевіряю це для вас..." } }, Qe = { chat: { input: { placeholder: "اپنا پیغام ٹائپ کریں...", listening: "سن رہا ہے..." }, enableSound: "آواز کو فعال کریں۔", stt: { transcribing: "نقل کرنا: ", micActive: "مائیکروفون فعال...", heardError: "معذرت، آپ کو سن نہیں سکا۔ براہ کرم دوبارہ کوشش کریں۔", micAccessError: "مائکروفون تک رسائی سے قاصر۔ اجازتیں چیک کریں۔" }, speed: { idle: "بیکار:", talk: "گفتگو:" } }, avatar: { loading: "اوتار لوڈ ہو رہا ہے...", title: { maximize: "زیادہ سے زیادہ کرنا", minimize: "کم سے کم کرنا", close: "بند", clickToMaximize: "زیادہ سے زیادہ کرنے کے لیے کلک کریں۔", clickToMinimize: "کم سے کم کرنے کے لیے کلک کریں۔" }, error: { loadFailed: "اوتار لوڈ کرنے میں ناکام: {{error}} ", playerNotLoaded: "AniaPlayer لوڈ نہیں ہوا۔", passwordRequired: "انکرپٹڈ .ania فائل کے لیے پاس ورڈ درکار ہے۔", noSource: "اوتار کا کوئی ذریعہ فراہم نہیں کیا گیا (avatarUrl یا avatarData)" } }, greetings: { 0: "ہائے! آج میں آپ کی مدد کیسے کر سکتا ہوں؟", 1: "ہیلو! خوش آمدید! میں آپ کے لیے کیا کر سکتا ہوں؟", 2: "ہیلو وہاں! آپ سے بات کر کے بہت خوشی ہوئی!", 3: "ہیلو! میں مدد کرنے کے لیے حاضر ہوں۔ تمہیں کیا چاہیے؟", 4: "ہائے! کیسی ہو؟ میں کس طرح مفید ہو سکتا ہوں؟" }, waiting: { 0: "مجھے سوچنے دو...", 1: "ایک لمحہ...", 2: "پروسیسنگ...", 3: "صرف ایک سیکنڈ...", 4: "میں اسے آپ کے لیے چیک کر رہا ہوں..." } }, Xe = { chat: { input: { placeholder: "Xabaringizni yozing...", listening: "Tinglanmoqda..." }, enableSound: "Ovozni yoqish", stt: { transcribing: "Transkripsiya: ", micActive: "Mikrofon faol...", heardError: "Kechirasiz, sizni eshitmadim. Iltimos, qayta urinib koʻring.", micAccessError: "Mikrofonga kirish imkonsiz. Ruxsatlarni tekshiring." }, speed: { idle: "Bo'sh:", talk: "Muloqot:" } }, avatar: { loading: "Avatar yuklanmoqda...", title: { maximize: "Maksimallashtirish", minimize: "Minimallashtirish", close: "Yopish", clickToMaximize: "Kattalashtirish uchun bosing", clickToMinimize: "Kichraytirish uchun bosing" }, error: { loadFailed: "Avatarni yuklab boʻlmadi: {{error}} ", playerNotLoaded: "AniaPlayer yuklanmagan", passwordRequired: "Shifrlangan .ania fayli uchun parol talab qilinadi", noSource: "Hech qanday avatar manbai berilmagan (avatarUrl yoki avatarData)" } }, greetings: { 0: "Salom! Bugun sizga qanday yordam bera olaman?", 1: "Salom! Xush kelibsiz! Sizga qanday yordam berishim mukin?", 2: "Salom! Siz bilan gaplashganimdan xursandman!", 3: "Salom! Men yordam berish uchun keldim. Sizga nima kerak?", 4: "Salom! Qalaysiz? Qanday qilib foydali bo'lishim mumkin?" }, waiting: { 0: "O'ylab ko'raylik...", 1: "Bir lahza...", 2: "Qayta ishlanmoqda...", 3: "Bir soniya...", 4: "Men buni siz uchun tekshiryapman ..." } }, ui = { chat: { input: { placeholder: "Nhập tin nhắn của bạn...", listening: "Đang nghe..." }, enableSound: "Bật âm thanh", stt: { transcribing: "Phiên âm: ", micActive: "Micrô đang hoạt động...", heardError: "Xin lỗi, không thể nghe thấy bạn. Vui lòng thử lại.", micAccessError: "Không thể truy cập micrô. Kiểm tra quyền." }, speed: { idle: "Nhàn rỗi:", talk: "Nói chuyện:" } }, avatar: { loading: "Đang tải hình đại diện...", title: { maximize: "Tối đa hóa", minimize: "Giảm thiểu", close: "Đóng", clickToMaximize: "Nhấp để tối đa hóa", clickToMinimize: "Bấm để thu nhỏ" }, error: { loadFailed: "Không tải được hình đại diện: {{error}} ", playerNotLoaded: "AniaPlayer chưa được tải", passwordRequired: "Yêu cầu mật khẩu cho tệp .ania được mã hóa", noSource: "Không có nguồn hình đại diện nào được cung cấp (avatarUrl hoặc avatarData)" } }, greetings: { 0: "Xin chào! Hôm nay tôi có thể giúp gì cho bạn?", 1: "Xin chào! Chào mừng! Tôi có thể làm gì cho bạn?", 2: "Chào bạn! Rất vui được nói chuyện với bạn!", 3: "Xin chào! Tôi ở đây để giúp đỡ. Bạn cần gì?", 4: "CHÀO! Bạn có khỏe không? Làm thế nào tôi có thể hữu ích?" }, waiting: { 0: "Để tôi nghĩ...", 1: "Một khoảnh khắc...", 2: "Đang xử lý...", 3: "Chỉ một giây thôi...", 4: "Tôi đang kiểm tra điều đó cho bạn..." } }, ai = { chat: { input: { placeholder: "Chwetheza umyalezo wakho...", listening: "Ndimamele..." }, enableSound: "Vula isandi", stt: { transcribing: "Ukukhuphela: ", micActive: "Imayikrofoni iyasebenza...", heardError: "Uxolo, andikuva. Nceda zama kwakhona.", micAccessError: "Ayikwazanga ukufikelela kwimayikrofoni. Jonga iimvume." }, speed: { idle: "Ayisebenzi:", talk: "Thetha:" } }, avatar: { loading: "Ilayisha i-avatar...", title: { maximize: "Yandisa", minimize: "Nciphisa", close: "Vala", clickToMaximize: "Cofa ukwandisa", clickToMinimize: "Cofa ukunciphisa" }, error: { loadFailed: "Ayiphumelelanga ukulayisha i-avatar: {{error}} ", playerNotLoaded: "I-AniaPlayer ayilayishwanga", passwordRequired: "Igama lokugqithisa elifunekayo kwifayile efihliweyo .ania", noSource: "Akukho mthombo we-avatar unikiweyo (i-avatarUrl okanye i-avatarData)" } }, greetings: { 0: "Molo! Ndingakunceda ngantoni namhlanje?", 1: "Mholo! Wamkelekile! Ndingakwenzela ntoni?", 2: "Molo apho! Ndiyavuya ukuthetha nawe!", 3: "Mholo! Ndilapha ukunceda. Ingaba udinga ntoni?", 4: "Mholo Icomo estas? Ndinokuba luncedo njani?" }, waiting: { 0: "Makhe ndicinge...", 1: "Umzuzu omnye...", 2: "Iyaqhuba...", 3: "Umzuzwana nje...", 4: "ndikujongela lonto..." } }, ei = { chat: { input: { placeholder: "שרייב דיין אָנזאָג ...", listening: "הערן..." }, enableSound: "געבן סאָונד", stt: { transcribing: "טראַנסקריבינג: ", micActive: "מיקראָפאָן אַקטיוו ...", heardError: "אנטשולדיגט, איך קען דיך נישט הערן. ביטע פּרוּווט ווידער.", micAccessError: "ניט געקענט צו צוטריט מיקראָפאָן. קוק פּערמישאַנז." }, speed: { idle: "ליידיק:", talk: "רעדן:" } }, avatar: { loading: "לאָדן אַוואַטאַר...", title: { maximize: "מאַקסאַמייז", minimize: "מינאַמייז", close: "נאָענט", clickToMaximize: "דריקט צו מאַקסאַמייז", clickToMinimize: "דריקט צו מינאַמייז" }, error: { loadFailed: "ניט אַנדערש צו לאָדן אַוואַטאַר: {{error}} ", playerNotLoaded: "AniaPlayer איז נישט לאָודיד", passwordRequired: "שפּריכוואָרט פארלאנגט פֿאַר ינקריפּטיד .אַניאַ טעקע", noSource: "קיין אַוואַטאַר מקור צוגעשטעלט (avatarUrl אָדער avatarData)" } }, greetings: { 0: "העלא! וויאזוי קען איך דיר היינט העלפן?", 1: "העלא! ברוכים הבאים! וואָס קען איך טאָן פֿאַר איר?", 2: "היי דאָרט! אַזוי צופרידן צו רעדן צו איר!", 3: "העלא! איך בין דאָ צו העלפן. וואָס טאָן איר דאַרפֿן?", 4: "העלא! ווי ביסטו? ווי קען איך זיין נוציק?" }, waiting: { 0: "לאז מיך טראכטן...", 1: "איין רגע ...", 2: "פּראַסעסינג...", 3: "נאָר אַ רגע ...", 4: "איך טשעק דאָס פֿאַר איר ..." } }, ii = { chat: { input: { placeholder: "Tẹ ifiranṣẹ rẹ sii ...", listening: "Nfeti..." }, enableSound: "Mu Ohun ṣiṣẹ", stt: { transcribing: "Ṣatunkọ: ", micActive: "Gbohungbohun ti nṣiṣe lọwọ...", heardError: "Ma binu, ko le gbọ rẹ. Jọwọ gbiyanju lẹẹkansi.", micAccessError: "Ko le wọle si gbohungbohun. Ṣayẹwo awọn igbanilaaye." }, speed: { idle: "Laiṣiṣẹ:", talk: "Ọrọ sisọ:" } }, avatar: { loading: "Nkojọpọ avatar...", title: { maximize: "O pọju", minimize: "Gbe sẹgbẹ", close: "Sunmọ", clickToMaximize: "Tẹ lati mu iwọn", clickToMinimize: "Tẹ lati dinku" }, error: { loadFailed: "Kuna lati kojọpọ avatar: {{error}} ", playerNotLoaded: "AniaPlayer ko kojọpọ", passwordRequired: "Ọrọigbaniwọle beere fun fifi ẹnọ kọ nkan faili .ania", noSource: "Ko si orisun avatar ti a pese (avatarUrl tabi avatarData)" } }, greetings: { 0: "Hi! Bawo ni MO ṣe le ran ọ lọwọ loni?", 1: "Pẹlẹ o! Kaabo! Kini mo le ṣe fun ọ?", 2: "Bawo ni nibe yen o! Inu mi dun lati ba ọ sọrọ!", 3: "Pẹlẹ o! Mo wa nibi lati ṣe iranlọwọ. Kini o nilo?", 4: "Hi! Bawo ni o se wa? Bawo ni MO ṣe le wulo?" }, waiting: { 0: "Jẹ ki n ronu...", 1: "Ni iṣẹju kan...", 2: "Nṣiṣẹ...", 3: "O kan iṣẹju kan...", 4: "Mo n ṣayẹwo iyẹn fun ọ..." } }, ri = { chat: { input: { placeholder: "Ts'íibt a t'aan...", listening: "Táan in wu'uyik..." }, enableSound: "Habilitar u juum", stt: { transcribing: "Transcripción: ", micActive: "Micrófono activo...", heardError: "Perdón, ma' tin wu'uyajech. Béet ka'a ilawil.", micAccessError: "Ma' tu páajtal u yokol micrófono. Ilawil le permiso'obo'." }, speed: { idle: "Ma' meyaj:", talk: "T'aan:" } }, avatar: { loading: "Táan u kuuch avatar...", title: { maximize: "Maximizar", minimize: "Minimizar", close: "Muts'ik", clickToMaximize: "u beetik clic uti'al u maximizar", clickToMinimize: "u beetik clic uti'al u xu'ulul" }, error: { loadFailed: "Ma' béeyak u kuuch avatar: {{error}} ", playerNotLoaded: "AniaPlayer ma' u kuuch", passwordRequired: "K'a'abéet u contraseña uti'al u archivo .ania encriptado", noSource: "Mix jump'éel fuente avatar proporcionada (avatarUrl wa avatarData)" } }, greetings: { 0: "¡Hola! ¿Bix je'el in wáantkech bejla'e'?", 1: "Bix túun! Ki'imak óolal! ba'ax je'el u páajtal in beetik ta wo'olal?", 2: "Ey! jach ki'imak in wóol in t'aan ta wéetel!", 3: "Bix túun! Teen waye' uti'al in wáantik. Ba'ax k'a'abéet ti' teech?", 4: "Bix a beel! Bix a beel? ¿Bix je'el u páajtal in meyaj?" }, waiting: { 0: "Cha' in tuukul...", 1: "Junsúutuk...", 2: "Procesamiento...", 3: "chéen jump'éel segundo...", 4: "Táan in wilik uti'al tech..." } }, ni = { chat: { input: { placeholder: "打你嘅訊息 ...", listening: "聽緊 ..." }, enableSound: "啟用聲音", stt: { transcribing: "轉錄緊： ", micActive: "麥克風有效 ...", heardError: "對唔住，聽唔到你講嘢。請試多一次。", micAccessError: "存取唔到麥克風。檢查權限。" }, speed: { idle: "閒置：", talk: "講嘢：" } }, avatar: { loading: "載入緊頭像 ...", title: { maximize: "最大化", minimize: "將佢減到最低", close: "閂咗", clickToMaximize: "撳一下就可以最大化", clickToMinimize: "撳一下就可以最小化" }, error: { loadFailed: "載入唔到頭像： {{error}} ", playerNotLoaded: "未載入 AniaPlayer", passwordRequired: "加密嘅 .ania 檔案需要密碼", noSource: "冇提供頭像來源（頭像網址或者頭像數據）" } }, greetings: { 0: "你好！我今日點樣幫到你？", 1: "你好！歡迎！我可以為你做啲咩？", 2: "喂！好開心同你傾偈！", 3: "你好！我喺度幫手。你需要啲咩？", 4: "你好！你點啊？我點樣可以有用？" }, waiting: { 0: "等我諗下 ...", 1: "有一刻 … …", 2: "處理緊 ...", 3: "只係一秒 ...", 4: "我幫你檢查緊 ..." } }, ti = { chat: { input: { placeholder: "输入您的消息...", listening: "听..." }, enableSound: "启用声音", stt: { transcribing: "抄写： ", micActive: "麦克风处于活动状态...", heardError: "抱歉，听不到你的声音。请再试一次。", micAccessError: "无法访问麦克风。检查权限。" }, speed: { idle: "空闲：", talk: "谈话：" } }, avatar: { loading: "正在加载头像...", title: { maximize: "最大化", minimize: "最小化", close: "关闭", clickToMaximize: "单击以最大化", clickToMinimize: "单击以最小化" }, error: { loadFailed: "头像加载失败：{{error}} ", playerNotLoaded: "AniaPlayer 未加载", passwordRequired: "加密的 .ania 文件需要密码", noSource: "未提供头像来源（avatarUrl 或 avatarData）" } }, greetings: { 0: "嗨！今天我能为您提供什么帮助？", 1: "你好！欢迎！我能为你做什么？", 2: "你好呀！很高兴与你交谈！", 3: "你好！我是来帮忙的。你需要什么？", 4: "你好！你好吗？我怎样才能变得有用？" }, waiting: { 0: "让我想想...", 1: "一会儿...", 2: "处理中...", 3: "只需一秒钟...", 4: "我正在为你检查..." } }, oi = { chat: { input: { placeholder: "輸入您的訊息...", listening: "聽..." }, enableSound: "啟用聲音", stt: { transcribing: "抄寫：", micActive: "麥克風處於活動狀態...", heardError: "抱歉，聽不到你的聲音。請再試一次。", micAccessError: "無法存取麥克風。檢查權限。" }, speed: { idle: "空閒：", talk: "談話：" } }, avatar: { loading: "正在加載頭像...", title: { maximize: "最大化", minimize: "最小化", close: "關閉", clickToMaximize: "點擊以最大化", clickToMinimize: "點擊以最小化" }, error: { loadFailed: "頭像載入失敗：{{error}}", playerNotLoaded: "AniaPlayer 未載入", passwordRequired: "加密的 .ania 檔案需要密碼", noSource: "未提供頭像來源（avatarUrl 或 avatarData）" } }, greetings: { 0: "嗨！今天我能為您提供什麼幫助？", 1: "你好！歡迎！我能為你做什麼？", 2: "你好呀！很高興與你交談！", 3: "你好！我是來幫忙的。你需要什麼？", 4: "你好！你好嗎？我怎樣才能變得有用？" }, waiting: { 0: "讓我想想...", 1: "一會兒...", 2: "處理中...", 3: "只需一秒鐘...", 4: "我正在為你檢查..." } }, li = { chat: { input: { placeholder: "Thayipha umlayezo wakho...", listening: "Ilalele..." }, enableSound: "Nika amandla Umsindo", stt: { transcribing: "Ukuloba: ", micActive: "Imakrofoni iyasebenza...", heardError: "Uxolo, angikwazanga ukukuzwa. Sicela uzame futhi.", micAccessError: "Ayikwazi ukufinyelela imakrofoni. Hlola izimvume." }, speed: { idle: "Ukungenzi lutho:", talk: "Inkulumo:" } }, avatar: { loading: "Ilayisha isithombe...", title: { maximize: "Khulisa", minimize: "Nciphisa", close: "Vala", clickToMaximize: "Chofoza ukuze ukhulise", clickToMinimize: "Chofoza ukuze unciphise" }, error: { loadFailed: "Yehlulekile ukulayisha isithombe: {{error}} ", playerNotLoaded: "I-AniaPlayer ayilayishiwe", passwordRequired: "Kudingeka iphasiwedi kufayela elibethelwe le-.ania", noSource: "Awukho umthombo wesithombe onikeziwe (i-avatarUrl noma i-avatarData)" } }, greetings: { 0: "Sawubona! Ngingakusiza ngani namuhla?", 1: "Sawubona! Siyakwamukela! Ngingakwenzelani?", 2: "Sawubona lapho! Ngijabule kakhulu ukukhuluma nawe!", 3: "Sawubona! Ngilapha ukuze ngisize. Udinga ini?", 4: "Sawubona! Unjani? Ngingaba kanjani usizo?" }, waiting: { 0: "Ake ngicabange...", 1: "Umzuzu owodwa...", 2: "Iyacubungula...", 3: "Umzuzwana nje...", 4: "Ngikuhlolela lokho..." } }, cu = { ab: N0, ace: j0, ach: P0, af: K0, ak: L0, alz: U0, am: H0, ar: q0, as: R0, awa: I0, ay: O0, az: W0, ba: _0, ban: G0, bbc: V0, be: $0, bem: J0, bew: Z0, bg: Y0, bho: Q0, bik: X0, bm: u4, bn: a4, br: e4, bs: i4, bts: r4, btx: n4, bua: t4, ca: o4, ceb: l4, cgg: A4, chm: B4, ckb: s4, cnh: D4, co: E4, crh: C4, crs: c4, cs: d4, cv: m4, cy: F4, da: k4, de: g4, din: h4, doi: p4, dov: v4, dv: y4, dz: x4, ee: b4, el: w4, en: z4, eo: f4, es: S4, et: M4, eu: T4, fa: N4, ff: j4, fi: P4, fil: K4, fj: L4, "fr-CA": U4, "fr-FR": H4, fy: q4, ga: R4, gaa: I4, gd: O4, gl: W4, gn: _4, gom: G4, gu: V4, ha: $4, haw: J4, he: Z4, hi: Y4, hil: Q4, hmn: X4, hr: ua, hrx: aa, ht: ea, hu: ia, hy: ra, id: na, ig: ta, ilo: oa, is: la, it: Aa, ja: Ba, jv: sa, ka: Da, kk: Ea, km: Ca, kn: ca, ko: da, kri: ma, ktu: Fa, ku: ka, ky: ga, la: ha, lb: pa, lg: va, li: ya, lij: xa, lmo: ba, ln: wa, lo: za, lt: fa, ltg: Sa, luo: Ma, lus: Ta, lv: Na, mai: ja, mak: Pa, mg: Ka, mi: La, min: Ua, mk: Ha, ml: qa, mn: Ra, "mni-Mtei": Ia, mr: Oa, "ms-Arab": Wa, ms: _a, mt: Ga, my: Va, ne: $a, new: Ja, nl: Za, no: Ya, nr: Qa, nso: Xa, nus: ue, ny: ae, oc: ee, om: ie, or: re, "pa-Arab": ne, pa: te, pag: oe, pam: le, pap: Ae, pl: Be, ps: se, "pt-BR": De, "pt-PT": Ee, qu: Ce, rn: ce, ro: de, rom: me, ru: Fe, rw: ke, sa: ge, scn: he, sd: pe, sg: ve, shn: ye, si: xe, sk: be, sl: we, sm: ze, sn: fe, so: Se, sq: Me, sr: Te, ss: Ne, st: je, su: Pe, sv: Ke, sw: Le, szl: Ue, ta: He, te: qe, tet: Re, tg: Ie, th: Oe, ti: We, tk: _e, tn: Ge, tr: Ve, ts: $e, tt: Je, ug: Ze, uk: Ye, ur: Qe, uz: Xe, vi: ui, xh: ai, yi: ei, yo: ii, yua: ri, yue: ni, "zh-CN": ti, "zh-TW": oi, zu: li }, ou = "pt-BR", lu = "en";
function Ai(u) {
  if (!u || typeof u != "object" || Array.isArray(u)) return !1;
  let a = Object.keys(u);
  return a.length > 0 && a.every((i) => /^\d+$/.test(i));
}
function Mu(u, a, i) {
  for (let e in u) {
    let r = u[e], n = a ? `${a}.${e}` : e;
    r && typeof r == "object" && !Array.isArray(r) && !Ai(r) ? Mu(r, n, i) : i[n] = r;
  }
  return i;
}
var j = (() => {
  let u = {};
  for (let a in cu) {
    let i = cu[a] || {};
    u[a] = Mu(i, "", {});
  }
  return u;
})();
function qi() {
  return Object.keys(j).sort();
}
function Ri(u) {
  return !!(u && j[u]);
}
function Tu(u) {
  if (u && j[u]) return j[u];
  if (u) {
    let a = String(u).split("-")[0];
    if (j[a]) return j[a];
    let i = Object.keys(j).find((e) => e.split("-")[0] === a);
    if (i) return j[i];
  }
  return j[lu] || {};
}
function du(u) {
  return Array.isArray(u) ? u : u && typeof u == "object" ? Object.keys(u).filter((a) => /^\d+$/.test(a)).sort((a, i) => Number(a) - Number(i)).map((a) => u[a]) : null;
}
function mu(u, a) {
  return !a || typeof u != "string" ? u : u.replace(/\{\{\s*(\w+)\s*\}\}/g, (i, e) => Object.prototype.hasOwnProperty.call(a, e) ? String(a[e]) : i);
}
function Bi(u, a = ou, i = {}) {
  let { vars: e, override: r } = i;
  if (r && r[u] != null && typeof r[u] == "string") return mu(r[u], e);
  let n = Tu(a)[u];
  return n == null && (n = (j[lu] || {})[u]), n == null ? u : mu(n, e);
}
function si(u, a = ou, i = {}) {
  let { override: e } = i;
  if (e && Array.isArray(e[u])) return e[u];
  let r = Tu(a), n = du(r[u]);
  if (n == null) {
    let o = j[lu] || {};
    n = du(o[u]);
  }
  return n || [];
}
function Ii(u = ou, a) {
  return { locale: u, t: (i, e) => Bi(i, u, { vars: e, override: a }), list: (i) => si(i, u, { override: a }) };
}
const Di = "wiggle", Ei = 2;
function Ci(u = {}) {
  const a = Pu(null), i = T(!1), e = T(!1), r = T([]), n = T(null), o = T(null), t = T(!1), c = T(!1);
  let A = null;
  const C = [], k = () => {
    const l = u.lipSync;
    return {
      width: u.width,
      height: u.height,
      autoplay: u.autoplay,
      idleSpeed: u.idleSpeed,
      talkSpeed: u.talkSpeed,
      autoCalculateSpeed: u.autoCalculateSpeed,
      serverUrl: u.serverUrl,
      fetchActionsFromServer: u.fetchActionsFromServer,
      locale: u.locale,
      lipSync: l ? {
        enabled: !!l.enabled,
        intensity: l.intensity,
        responsiveness: l.responsiveness,
        sustainStyle: l.sustainStyle ?? void 0,
        wiggleSpeed: l.wiggleSpeed ?? void 0,
        opennessMap: l.opennessMap ?? void 0
      } : void 0
    };
  }, m = () => {
    var l;
    r.value = ((l = a.value) == null ? void 0 : l.getAvailableActions()) ?? [];
  }, b = () => ({
    player: a.value ?? void 0,
    getActions: () => {
      var l;
      return ((l = a.value) == null ? void 0 : l.getAvailableActions()) ?? [];
    },
    triggerAction: (l) => {
      var s;
      (s = a.value) == null || s.triggerAction(l);
    },
    cancelAction: () => {
      var l;
      return (l = a.value) == null ? void 0 : l.cancelAction();
    },
    setVisible: (l) => l ? B() : E(),
    getVisible: () => c.value,
    setSpeeds: (l, s) => {
      var y;
      return (y = a.value) == null ? void 0 : y.setSpeeds(l, s);
    },
    ...u.commandContext
  });
  function w(l) {
    if (a.value) return a.value;
    const s = r0(l, k());
    return a.value = s, C.push(
      s.on("load", (x) => {
        var S;
        i.value = !0, t.value = !1, o.value = null, m(), (S = u.onLoad) == null || S.call(u, x);
      }),
      s.on("talkStart", () => {
        var x;
        e.value = !0, (x = u.onTalkStart) == null || x.call(u);
      }),
      s.on("talkEnd", () => {
        var x;
        e.value = !1, (x = u.onTalkEnd) == null || x.call(u);
      }),
      s.on("actionStart", (x) => {
        var S;
        n.value = x, (S = u.onActionStart) == null || S.call(u, x);
      }),
      s.on("actionEnd", (x) => {
        var S;
        n.value === x && (n.value = null), (S = u.onActionEnd) == null || S.call(u, x);
      }),
      s.on("error", (x) => {
        var S;
        o.value = x, t.value = !1, (S = u.onError) == null || S.call(u, x);
      })
    ), u.actions && u.actions.length > 0 && (s.configureActions(u.actions), m()), u.enablePostMessageControl && (A = l0(b(), {
      origins: u.postMessageOrigins ?? []
    })), !!(u.avatarData || u.avatarUrl) && z(), s;
  }
  async function z(l) {
    if (!a.value) return;
    const s = l ?? (u.avatarData ? { data: u.avatarData } : {
      url: u.avatarUrl,
      password: u.avatarPassword,
      authToken: u.authToken
    });
    t.value = !0, o.value = null, i.value = !1;
    try {
      const y = await a.value.load(s);
      return c.value = u.autoplay !== !1, y;
    } catch {
      return;
    }
  }
  function B() {
    var l;
    (l = a.value) == null || l.play(), c.value = !0;
  }
  function E() {
    var l;
    (l = a.value) == null || l.pause(), c.value = !1;
  }
  function g(l) {
    var s;
    (s = a.value) == null || s.setTalking(l), e.value = l;
  }
  function F(l) {
    var s;
    return ((s = a.value) == null ? void 0 : s.triggerAction(l)) ?? !1;
  }
  function h(l) {
    var s;
    (s = a.value) == null || s.cancelAction(l);
  }
  function p(l) {
    var s;
    (s = a.value) == null || s.configureActions(l), m();
  }
  function f(l) {
    var s;
    (s = a.value) == null || s.configureLipsSync(
      !!l.enabled,
      l.intensity,
      l.responsiveness,
      l.opennessMap ?? null,
      l.sustainStyle ?? Di,
      l.wiggleSpeed ?? Ei
    );
  }
  function K(l, s) {
    var y;
    (y = a.value) == null || y.setSpeeds(l, s);
  }
  function D() {
    var l;
    return ((l = a.value) == null ? void 0 : l.getAvailableActions()) ?? [];
  }
  function d(l, s) {
    if (!a.value) return { ok: !1, message: "Player not mounted." };
    const y = { ...b(), ...s };
    return zu(l, y);
  }
  function v() {
    var l;
    A == null || A(), A = null;
    for (const s of C.splice(0)) s();
    (l = a.value) == null || l.destroy(), a.value = null, i.value = !1, c.value = !1, e.value = !1, n.value = null;
  }
  return Fu(v), {
    player: a,
    loaded: i,
    isTalking: e,
    actions: r,
    activeAction: n,
    error: o,
    loading: t,
    isPlaying: c,
    mount: w,
    destroy: v,
    load: z,
    play: B,
    pause: E,
    setTalking: g,
    triggerAction: F,
    cancelAction: h,
    configureActions: p,
    configureLipsSync: f,
    setSpeeds: K,
    getAvailableActions: D,
    runCommand: d
  };
}
const ci = ["width", "height"], di = /* @__PURE__ */ ku({
  __name: "AniaAvatar",
  props: {
    avatarUrl: {},
    avatarPassword: {},
    avatarData: {},
    authToken: {},
    position: {},
    width: { default: 320 },
    height: { default: 320 },
    transparent: { type: Boolean, default: !1 },
    theme: { default: "dark" },
    locale: {},
    idleSpeed: {},
    talkSpeed: {},
    autoCalculateSpeed: { type: Boolean, default: !1 },
    lipSyncEnabled: { type: Boolean, default: !1 },
    lipSyncServerUrl: {},
    lipSyncIntensity: {},
    lipSyncResponsiveness: {},
    lipSyncSustainStyle: {},
    lipSyncWiggleSpeed: {},
    actions: {},
    enableActionHotkeys: { type: Boolean, default: !1 },
    initialAction: {},
    initialActionLoop: { type: Boolean },
    wakeWordEnabled: { type: Boolean },
    wakeWordModelUrl: {},
    wakeWordThreshold: {},
    wakeWordWasmPaths: {},
    enablePostMessageControl: { type: Boolean, default: !1 },
    postMessageOrigins: {},
    serverUrl: {},
    fetchActionsFromServer: { type: Boolean }
  },
  emits: ["load", "talkStart", "talkEnd", "actionStart", "actionEnd", "close"],
  setup(u, { expose: a, emit: i }) {
    const e = u, r = i, n = T(null), o = () => ({
      enabled: e.lipSyncEnabled,
      intensity: e.lipSyncIntensity,
      responsiveness: e.lipSyncResponsiveness,
      sustainStyle: e.lipSyncSustainStyle ?? void 0,
      wiggleSpeed: e.lipSyncWiggleSpeed ?? void 0
    }), t = Ci({
      avatarUrl: e.avatarUrl,
      avatarPassword: e.avatarPassword,
      avatarData: e.avatarData ?? null,
      authToken: e.authToken,
      width: e.width,
      height: e.height,
      idleSpeed: e.idleSpeed,
      talkSpeed: e.talkSpeed,
      autoCalculateSpeed: e.autoCalculateSpeed,
      lipSync: o(),
      actions: e.actions,
      serverUrl: e.serverUrl ?? e.lipSyncServerUrl,
      fetchActionsFromServer: e.fetchActionsFromServer,
      locale: e.locale,
      enablePostMessageControl: e.enablePostMessageControl,
      postMessageOrigins: e.postMessageOrigins,
      onLoad: (C) => r("load", C),
      onTalkStart: () => r("talkStart"),
      onTalkEnd: () => r("talkEnd"),
      onActionStart: (C) => r("actionStart", C),
      onActionEnd: (C) => r("actionEnd", C)
    });
    gu(() => {
      var C;
      if (n.value && (t.mount(n.value), e.initialAction)) {
        const k = (C = t.player.value) == null ? void 0 : C.on("load", () => {
          e.initialAction && t.triggerAction(e.initialAction), k == null || k();
        });
      }
    }), H(
      () => [e.avatarUrl, e.avatarPassword, e.authToken],
      () => {
        t.player.value && e.avatarUrl && t.load({
          url: e.avatarUrl,
          password: e.avatarPassword,
          authToken: e.authToken
        });
      }
    ), H(
      () => e.avatarData,
      (C) => {
        C && t.player.value && t.load({ data: C });
      }
    ), H(
      () => [
        e.lipSyncEnabled,
        e.lipSyncIntensity,
        e.lipSyncResponsiveness,
        e.lipSyncSustainStyle,
        e.lipSyncWiggleSpeed
      ],
      () => {
        t.player.value && t.configureLipsSync(o());
      }
    ), H(
      () => e.actions,
      (C) => {
        C && t.player.value && t.configureActions(C);
      },
      { deep: !0 }
    ), H(
      () => [e.idleSpeed, e.talkSpeed],
      () => {
        t.player.value && t.setSpeeds(e.idleSpeed, e.talkSpeed);
      }
    );
    const c = au(() => ({
      width: `${e.width}px`,
      height: `${e.height}px`,
      background: e.transparent ? "transparent" : void 0
    })), A = au(() => ({
      display: "block",
      width: "100%",
      height: "100%"
    }));
    return a({
      player: t.player,
      loaded: t.loaded,
      isTalking: t.isTalking,
      actions: t.actions,
      activeAction: t.activeAction,
      error: t.error,
      load: t.load,
      play: t.play,
      pause: t.pause,
      setTalking: t.setTalking,
      triggerAction: t.triggerAction,
      cancelAction: t.cancelAction,
      configureActions: t.configureActions,
      configureLipsSync: t.configureLipsSync,
      setSpeeds: t.setSpeeds,
      getAvailableActions: t.getAvailableActions,
      runCommand: t.runCommand
    }), (C, k) => (V(), $("div", {
      class: iu(["ania-avatar", `ania-avatar--${u.theme}`]),
      style: eu(c.value)
    }, [
      P("canvas", {
        ref_key: "canvasRef",
        ref: n,
        class: "ania-avatar__canvas",
        width: u.width,
        height: u.height,
        style: eu(A.value)
      }, null, 12, ci),
      Ku(C.$slots, "default", {
        loaded: q(t).loaded.value,
        isTalking: q(t).isTalking.value,
        activeAction: q(t).activeAction.value,
        actions: q(t).actions.value,
        error: q(t).error.value
      }, void 0, !0)
    ], 6));
  }
}), Nu = (u, a) => {
  const i = u.__vccOpts || u;
  for (const [e, r] of a)
    i[e] = r;
  return i;
}, ju = /* @__PURE__ */ Nu(di, [["__scopeId", "data-v-868b3051"]]), mi = { class: "ania-chatbot__header" }, Fi = { class: "ania-chatbot__title" }, ki = { class: "ania-chatbot__messages" }, gi = ["placeholder", "disabled"], hi = ["disabled"], pi = /* @__PURE__ */ ku({
  __name: "AvatarChatbot",
  props: {
    webhookUrl: {},
    webhookApiKey: {},
    webhookHeaders: {},
    enableTTS: { type: Boolean, default: !0 },
    autoGreeting: { type: Boolean, default: !1 },
    assistantName: { default: "Ania" },
    userName: { default: "You" },
    transparentChat: { type: Boolean },
    ttsProvider: { default: "browser" },
    ttsVoice: {},
    ttsVoiceId: {},
    ttsGender: {},
    ttsRate: {},
    ttsPitch: {},
    ttsLang: {},
    ttsModel: {},
    ttsApiKey: {},
    ttsApiUrl: {},
    piperModelUrl: {},
    piperModelConfigUrl: {},
    piperSpeakerId: {},
    piperPreload: { type: Boolean },
    enableSTT: { type: Boolean, default: !1 },
    sttProvider: {},
    sttLang: {},
    sttContinuous: { type: Boolean },
    sttInterimResults: { type: Boolean },
    sttApiKey: {},
    sttApiUrl: {},
    sttAutoSend: { type: Boolean },
    avatarUrl: {},
    avatarPassword: {},
    avatarData: {},
    authToken: {},
    position: {},
    width: { default: 320 },
    height: { default: 320 },
    transparent: { type: Boolean, default: !1 },
    theme: { default: "dark" },
    locale: {},
    idleSpeed: {},
    talkSpeed: {},
    autoCalculateSpeed: { type: Boolean },
    lipSyncEnabled: { type: Boolean },
    lipSyncServerUrl: {},
    lipSyncIntensity: {},
    lipSyncResponsiveness: {},
    lipSyncSustainStyle: {},
    lipSyncWiggleSpeed: {},
    actions: {},
    enableActionHotkeys: { type: Boolean },
    initialAction: {},
    initialActionLoop: { type: Boolean },
    wakeWordEnabled: { type: Boolean },
    wakeWordModelUrl: {},
    wakeWordThreshold: {},
    wakeWordWasmPaths: {},
    enablePostMessageControl: { type: Boolean },
    postMessageOrigins: {},
    serverUrl: {},
    fetchActionsFromServer: { type: Boolean }
  },
  emits: ["load", "talkStart", "talkEnd", "actionStart", "actionEnd", "close"],
  setup(u, { expose: a, emit: i }) {
    const e = u, r = i, n = T(null), o = Lu([]), t = T(""), c = T(!1), A = T(!0);
    let C = 1;
    const k = new fu();
    y0(k);
    let m = null;
    const b = async () => {
      if (!e.enableTTS) return null;
      if (m) return m;
      const D = v0[e.ttsProvider] ?? "tts-browser";
      k.setActive("tts", D);
      const d = await k.resolveEngine("tts", {
        config: {
          provider: e.ttsProvider,
          apiKey: e.ttsApiKey,
          apiUrl: e.ttsApiUrl,
          voiceId: e.ttsVoiceId ?? e.ttsVoice,
          model: e.ttsModel,
          lang: e.ttsLang,
          gender: e.ttsGender,
          rate: e.ttsRate,
          pitch: e.ttsPitch,
          piperModelUrl: e.piperModelUrl,
          piperModelConfigUrl: e.piperModelConfigUrl,
          piperSpeakerId: e.piperSpeakerId
        }
      });
      return m = d, d;
    }, w = async (D) => {
      var v;
      const d = n.value;
      if (!(!D || !d) && e.enableTTS)
        try {
          const l = await b();
          if (!(l != null && l.speak)) return;
          d.setTalking(!0), r("talkStart"), await l.speak(D, { lang: e.ttsLang, rate: e.ttsRate, pitch: e.ttsPitch });
        } catch {
        } finally {
          (v = n.value) == null || v.setTalking(!1), r("talkEnd");
        }
    }, z = () => {
      const D = { "Content-Type": "application/json" };
      return e.webhookApiKey && (D.Authorization = `Bearer ${e.webhookApiKey}`), { ...D, ...e.webhookHeaders ?? {} };
    }, B = (D) => {
      if (typeof D == "string") return D;
      if (D && typeof D == "object") {
        const d = D, v = d.output ?? d.reply ?? d.message ?? d.text ?? d.response;
        if (typeof v == "string") return v;
      }
      return JSON.stringify(D);
    };
    async function E(D) {
      const d = D.trim();
      if (!d) return;
      if (o.push({ id: C++, role: "user", content: d }), t.value = "", !e.webhookUrl) {
        const l = `(${e.assistantName}) No webhookUrl configured.`;
        o.push({ id: C++, role: "assistant", content: l }), w(l);
        return;
      }
      const v = { id: C++, role: "assistant", content: "…", isWaiting: !0 };
      o.push(v), c.value = !0;
      try {
        const l = await fetch(e.webhookUrl, {
          method: "POST",
          headers: z(),
          body: JSON.stringify({
            message: d,
            user: e.userName,
            assistant: e.assistantName
          })
        });
        if (!l.ok) throw new Error(`HTTP ${l.status}`);
        const s = await l.json().catch(() => l.text()), y = B(s);
        v.content = y, v.isWaiting = !1, w(y);
      } catch (l) {
        v.role = "error", v.content = `Error: ${l.message}`, v.isWaiting = !1;
      } finally {
        c.value = !1;
      }
    }
    const g = () => {
      E(t.value);
    };
    gu(() => {
      if (e.autoGreeting) {
        const D = `Hi, I'm ${e.assistantName}!`;
        o.push({ id: C++, role: "assistant", content: D }), w(D);
      }
    }), Fu(() => {
      var D, d;
      (D = m == null ? void 0 : m.stop) == null || D.call(m), (d = m == null ? void 0 : m.cleanup) == null || d.call(m);
    });
    const F = () => {
      A.value = !1, r("close");
    }, h = au(() => ({
      background: e.transparentChat ? "transparent" : void 0
    }));
    a({
      sendMessage: E,
      speak: w,
      get player() {
        var D;
        return (D = n.value) == null ? void 0 : D.player;
      },
      play: () => {
        var D;
        return (D = n.value) == null ? void 0 : D.play();
      },
      pause: () => {
        var D;
        return (D = n.value) == null ? void 0 : D.pause();
      },
      setTalking: (D) => {
        var d;
        return (d = n.value) == null ? void 0 : d.setTalking(D);
      },
      triggerAction: (D) => {
        var d;
        return (d = n.value) == null ? void 0 : d.triggerAction(D);
      },
      cancelAction: (D) => {
        var d;
        return (d = n.value) == null ? void 0 : d.cancelAction(D);
      },
      runCommand: (D) => {
        var d;
        return (d = n.value) == null ? void 0 : d.runCommand(D);
      },
      getAvailableActions: () => {
        var D;
        return ((D = n.value) == null ? void 0 : D.getAvailableActions()) ?? [];
      }
    });
    const p = (D) => r("load", D), f = (D) => r("actionStart", D), K = (D) => r("actionEnd", D);
    return (D, d) => A.value ? (V(), $("div", {
      key: 0,
      class: iu(["ania-chatbot", `ania-chatbot--${u.theme}`])
    }, [
      Uu(ju, {
        ref_key: "avatarRef",
        ref: n,
        "avatar-url": u.avatarUrl,
        "avatar-password": u.avatarPassword,
        "avatar-data": u.avatarData,
        "auth-token": u.authToken,
        width: u.width,
        height: u.height,
        transparent: u.transparent,
        theme: u.theme,
        "idle-speed": u.idleSpeed,
        "talk-speed": u.talkSpeed,
        "auto-calculate-speed": u.autoCalculateSpeed,
        "lip-sync-enabled": u.lipSyncEnabled,
        "lip-sync-intensity": u.lipSyncIntensity,
        "lip-sync-responsiveness": u.lipSyncResponsiveness,
        "lip-sync-sustain-style": u.lipSyncSustainStyle,
        "lip-sync-wiggle-speed": u.lipSyncWiggleSpeed,
        actions: u.actions,
        "enable-action-hotkeys": u.enableActionHotkeys,
        "server-url": u.serverUrl ?? u.lipSyncServerUrl,
        "fetch-actions-from-server": u.fetchActionsFromServer,
        "enable-post-message-control": u.enablePostMessageControl,
        "post-message-origins": u.postMessageOrigins,
        locale: u.locale,
        onLoad: p,
        onActionStart: f,
        onActionEnd: K
      }, null, 8, ["avatar-url", "avatar-password", "avatar-data", "auth-token", "width", "height", "transparent", "theme", "idle-speed", "talk-speed", "auto-calculate-speed", "lip-sync-enabled", "lip-sync-intensity", "lip-sync-responsiveness", "lip-sync-sustain-style", "lip-sync-wiggle-speed", "actions", "enable-action-hotkeys", "server-url", "fetch-actions-from-server", "enable-post-message-control", "post-message-origins", "locale"]),
      P("div", {
        class: "ania-chatbot__panel",
        style: eu(h.value)
      }, [
        P("header", mi, [
          P("span", Fi, Au(u.assistantName), 1),
          P("button", {
            type: "button",
            class: "ania-chatbot__close",
            "aria-label": "Close",
            onClick: F
          }, " × ")
        ]),
        P("div", ki, [
          (V(!0), $(Hu, null, qu(o, (v) => (V(), $("div", {
            key: v.id,
            class: iu(["ania-chatbot__msg", `ania-chatbot__msg--${v.role}`])
          }, Au(v.content), 3))), 128))
        ]),
        P("form", {
          class: "ania-chatbot__form",
          onSubmit: Ru(g, ["prevent"])
        }, [
          Iu(P("input", {
            "onUpdate:modelValue": d[0] || (d[0] = (v) => t.value = v),
            class: "ania-chatbot__input",
            type: "text",
            placeholder: `Message ${u.assistantName}…`,
            disabled: c.value
          }, null, 8, gi), [
            [Ou, t.value]
          ]),
          P("button", {
            type: "submit",
            class: "ania-chatbot__send",
            disabled: c.value || !t.value.trim()
          }, " Send ", 8, hi)
        ], 32)
      ], 4)
    ], 2)) : Wu("", !0);
  }
}), vi = /* @__PURE__ */ Nu(pi, [["__scopeId", "data-v-0eedefb7"]]), Oi = {
  install(u, a = {}) {
    u.component(a.avatarName ?? "AniaAvatar", ju), u.component(a.chatbotName ?? "AvatarChatbot", vi);
  }
};
export {
  ju as AniaAvatar,
  Oi as AniaAvatarPlugin,
  Zu as AniaPlayer,
  Yu as AnimationController,
  Hi as AvatarCache,
  vi as AvatarChatbot,
  p0 as BUILTIN_PLUGINS,
  wu as COMMAND_LIST,
  ou as DEFAULT_LOCALE,
  Qu as Emitter,
  lu as FALLBACK_LOCALE,
  Ni as LipSyncAnalyser,
  tu as PLUGIN_KINDS,
  fu as PluginRegistry,
  Ki as STT_PROVIDER_TO_PLUGIN,
  ji as SpeechRecognizer,
  v0 as TTS_PROVIDER_TO_PLUGIN,
  Ju as WakeWordEngine,
  qi as availableLocales,
  su as buildControllerConfig,
  e0 as buildOpennessMap,
  xu as calcSpeeds,
  Ti as calculateOptimalSpeeds,
  zi as checkPiperStatus,
  S0 as clearAvatarCache,
  r0 as createAniaPlayer,
  Ii as createTranslator,
  Xu as decryptAniaFile,
  Oi as default,
  Su as deleteCachedAvatar,
  fi as disposePiper,
  zu as executeCommand,
  a0 as fetchActionsConfig,
  u0 as fetchLipSyncConfig,
  T0 as getCacheStats,
  z0 as getCachedAvatar,
  Pi as getDefaultRegistry,
  wi as getPiperStatus,
  Bi as getString,
  si as getStringList,
  Si as getWakeWordEngine,
  Ri as hasLocale,
  $u as initPiper,
  l0 as installPostMessageControl,
  Mi as isWakeWordSupported,
  Ui as matchesHotkey,
  t0 as parseCommandLine,
  Li as parseHotkey,
  bi as piperSynthesize,
  B0 as playActionAudio,
  xi as preloadPiper,
  Cu as professionalTTSRequest,
  y0 as registerBuiltins,
  f0 as setCachedAvatar,
  Ci as useAniaAvatar,
  A0 as validatePlugin
};
//# sourceMappingURL=index.js.map
