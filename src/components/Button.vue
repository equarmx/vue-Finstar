<template>
  <button
    :disabled="disableButton"
    :class="[btnClass, colorVariants]"
    :variant="variant"
    :variant-type="variantType"
    :size="size"
    @click="onClick()"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

interface Classes {
  "base-spinner": boolean;
  "cursor-not-allowed": boolean;
  "base-button inline-flex align-middle align-items-center justify-center font-medium focus:outline-none border-2": boolean;
  "rounded-lg": boolean;
  "rounded-full": boolean;
  "px-6 py-3": boolean;
  "px-4 py-2": boolean;
}

@Component({
  name: "Button",
})
export default class Button extends Vue {
  @Prop({ type: Boolean, default: false }) readonly disabled: boolean | undefined;
  @Prop({ type: String, default: "primary" }) readonly variant: string | undefined;
  @Prop({ type: String, default: "normal" }) readonly variantType: string | undefined;
  @Prop({ type: String, default: "normal" }) readonly size: string | undefined;
  @Prop({ type: String, default: "medium" }) readonly rounded: string | undefined;

  loading = false;
  disableButton = false;

  get btnClass(): Classes {
    return {
      "base-spinner": this.loading,
      "cursor-not-allowed": this.getDisabled,
      "base-button inline-flex align-middle align-items-center justify-center font-medium focus:outline-none border-2":
        true,

      "rounded-lg": this.rounded === "medium",
      "rounded-full": this.rounded === "large",

      "px-6 py-3": this.size == "normal",
      "px-4 py-2": this.size == "small",
    };
  }

  get colorVariants(): string | undefined {
    if (!this.variant) return "";
    if (this.variant === "primary") {
      if (this.variantType === "normal") {
        return this.getDisabled
          ? "border-blue-300 bg-blue-300 text-white"
          : "border-blue-600 bg-blue-600 hover:bg-blue-700 hover:border-blue-700 text-white";
      } else return "";
    } else if (this.variant === "danger") {
      if (this.variantType === "normal") {
        return this.getDisabled
          ? "border-red-300 bg-red-300 text-white"
          : "border-red-600 bg-red-600 hover:bg-red-700 hover:border-red-700 text-white";
      } else return "";
    } else if (this.variant === "warning") {
      return "border-orange-600 bg-orange-600 hover:bg-orange-700 hover:border-orange-700 text-white";
    } else if (this.variant === "success") {
      if (this.variantType === "normal") {
        return this.getDisabled
          ? "border-green-300 bg-green-300 text-white"
          : "border-green-600 bg-green-600 hover:bg-green-700 hover:border-green-700 text-white";
      } else return "";
    } else return "";
  }

  get getDisabled(): boolean {
    return this.disableButton || !!this.disabled;
  }

  @Watch("disabled")
  onDisabledChanged(v: boolean): void {
    this.disableButton = v;
  }
  @Watch("$store.state.loadingList")
  onLoadingEnd(v: boolean): void {
    if (!v) this.stopLoading();
  }

  startLoading(): void {
    this.loading = true;
    this.disableButton = true;
  }
  stopLoading(): void {
    this.loading = false;
    this.disableButton = false;
  }
  onClick(): void {
    this.$emit("clickEvent");
    this.startLoading();
  }
}
</script>

<style lang="scss" scoped>
.base-button + .base-button {
  margin-left: 1em;
}
.base-button {
  min-width: 160px !important;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

.base-spinner {
  position: relative;
  overflow: hidden;
  &:before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    background-color: inherit;
    width: 100%;
    height: 100%;
    display: block;
    z-index: 1;
    top: 0;
    left: 0;
  }
  &:after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin-top: -10px;
    margin-left: -10px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.45);
    border-top-color: inherit;
    animation: spinner 0.6s linear infinite;
    z-index: 2;
  }
}
</style>
