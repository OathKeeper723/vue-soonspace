<template>
  <div
    id="xwContainer"
    :class="customClass"
    :style="customStyle"
  ></div>
</template>

<script>
	import eventEnum from "../SoonSpaceEvent/eventEnum";

	export default {
		name: "soon-space-container",
		props: {
			skyBoxStyle: {
				type: String,
				default: "sunny"
			},
			customClass: String,
			customStyle: {
				type: Object,
				default: function() {
					return {};
				}
			}
		},
		data() {
			return {
				skyBoxPath: "https://unpkg.com/vue-soonspace/assets/images/skybox/"
			};
		},
		methods: {
			// 模型点击
			libraryClick(param) {
				this.$vse.$emit(eventEnum.MODELCLICK, param);
			},
			// 模型双击
			libraryDblClick(param) {
				this.$vse.$emit(eventEnum.MODELDBCLICK, param);
			},
			// 鼠标点击选择点
			selectPosition(param) {
				this.$vse.$emit(eventEnum.SELECTPOSITION, param);
			},
			// 空间相机切换
			cameraChanged(param) {
				this.$vse.$emit(eventEnum.CAMERACHANGED, param)
			},
			// 初始化场景
			initScene() {
				if (window.SoonSpace) {
					window.SoonSpace.init(
						"xwContainer",
						{
							libraryClick: this.libraryClick,
							libraryDblClick: this.libraryDblClick,
							selectPosition: this.selectPosition,
							cameraChanged: this.cameraChanged
						},
						{
							showGrid: false,
							enableSelect: true,
							enableBoundedSelection: true,
							enableBloomEffect: true
						}
					);
					window.SoonSpace.setBackgroundColor("#000204");
					window.SoonSpace.setSelectMode(
						window.SoonSpace.editor.SELECTMODE.deviceobject
					);
					window.SoonSpace.SetDefaultLight();
					window.SoonSpace.createSkyBackground(
						`${this.skyBoxPath}${this.skyBoxStyle}/`,
						["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]
					);
					this.$vse.$emit(eventEnum.INITSCENE, true);
				} else {
					setTimeout(() => {
						this.initScene();
					}, 500);
				}
			}
		},
		mounted() {
			this.initScene();
			this.$vse.eventTarget = new EventTarget
		},
		beforeDestroy() {
			window.SoonSpace.clear();
			this.$vse.destroy();
		}
	};
</script>

<style scoped>
#xwContainer {
  width: 100%;
  height: 100%;
}
</style>
