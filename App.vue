<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch')
		},
		onShow: function() {
			// console.log('App Show')
			wx.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
				// menus: ['shareAppMessage']
			})
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style>
.page-bg {
	/* background-image: url(/static/page-bg1.jpeg); */
	background-image: url(/static/page-bg.jpeg);
	background-size: 100% 100%;
	background-repeat: repeat;
	min-height: 100vh;
}
/*每个页面公共css */
page {
	--red: #e54d42;
	--orange: #f37b1d;
	--yellow: #fbbd08;
	--olive: #8dc63f;
	--green: #39b54a;
	--cyan: #1cbbb4;
	--blue: #0081ff;
	--purple: #6739b6;
	--mauve: #9c26b0;
	--pink: #e03997;
	--brown: #a5673f;
	--grey: #8799a3;
	--black: #333;
	--darkGray: #666;
	--gray: #aaa;
	--ghostWhite: #f1f1f1;
	--white: #fff;
	--redLight: #fadbd9;
	--orangeLight: #fde6d2;
	--yellowLight: #fef2ce;
	--oliveLight: #e8f4d9;
	--greenLight: #d7f0db;
	--cyanLight: #d2f1f0;
	--blueLight: #cce6ff;
	--purpleLight: #e1d7f0;
	--mauveLight: #ebd4ef;
	--pinkLight: #f9d7ea;
	--brownLight: #ede1d9;
	--greyLight: #e7ebed;
	--gradualRed: linear-gradient(45deg,#f43f3b,#ec008c);
	--gradualOrange: linear-gradient(45deg,#ff9700,#ed1c24);
	--gradualGreen: linear-gradient(45deg,#39b54a,#8dc63f);
	--gradualPurple: linear-gradient(45deg,#9000ff,#5e00ff);
	--gradualPink: linear-gradient(45deg,#ec008c,#6739b6);
	--gradualBlue: linear-gradient(45deg,#0081ff,#1cbbb4);
	--ShadowSize: 6rpx 6rpx 8rpx;
	--redShadow: rgba(204,69,59,0.2);
	--orangeShadow: rgba(217,109,26,0.2);
	--yellowShadow: rgba(224,170,7,0.2);
	--oliveShadow: rgba(124,173,55,0.2);
	--greenShadow: rgba(48,156,63,0.2);
	--cyanShadow: rgba(28,187,180,0.2);
	--blueShadow: rgba(0,102,204,0.2);
	--purpleShadow: rgba(88,48,156,0.2);
	--mauveShadow: rgba(133,33,150,0.2);
	--pinkShadow: rgba(199,50,134,0.2);
	--brownShadow: rgba(140,88,53,0.2);
	--greyShadow: rgba(114,130,138,0.2);
	--grayShadow: rgba(114,130,138,0.2);
	--blackShadow: rgba(26,26,26,0.2);
	background-color: var(--ghostWhite);
	font-size: 28rpx;
	color: var(--black);
	font-family: Helvetica Neue,Helvetica,sans-serif;
}
button,image,label,navigator,swiper,textarea,view {
  box-sizing: border-box;
}
.round {
  border-radius: 5000rpx;
}
.radius {
  border-radius: 6rpx;
}
image {
	max-width: 100%;
	display: inline-block;
	position: relative;
	z-index: 0;
}
image.loading:before {
	content: "";
	background-color: #f5f5f5;
	display: block;
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: -2;
}
image.loading:after {
	content: "\e7f1";
	font-family: cuIcon;
	position: absolute;
	top: 0;
	left: 0;
	width: 32rpx;
	height: 32rpx;
	line-height: 32rpx;
	right: 0;
	bottom: 0;
	z-index: -1;
	font-size: 32rpx;
	margin: auto;
	color: #ccc;
	animation: cuIcon-spin 2s linear infinite;
	display: block;
}
.response {
	width: 100%;
}
checkbox,radio,switch {
	position: relative;
}
switch:after,switch:before {
	font-family: cuIcon;
	content: "\e645";
	position: absolute;
	color: var(--white)!important;
	top: 0;
	left: 0rpx;
	font-size: 26rpx;
	line-height: 26px;
	width: 50%;
	text-align: center;
	pointer-events: none;
	transform: scale(0,0);
	transition: all .3s ease-in-out 0s;
	z-index: 9;
	bottom: 0;
	height: 26px;
	margin: auto;
}
switch:before {
	content: "\e646";
	right: 0;
	left: auto;
}
switch.checked:after,switch:before,switch[checked]:after {
	transform: scale(1,1);
}
switch.checked:before,switch[checked]:before {
	transform: scale(0,0);
}
switch .wx-switch-input {
	border: none;
	padding: 0 24px;
	width: 48px;
	height: 26px;
	margin: 0;
	border-radius: 100rpx;
}
switch .wx-switch-input:not([class*=bg-]) {
	background: var(--grey)!important;
}
switch .wx-switch-input:after {
	margin: auto;
	width: 26px;
	height: 26px;
	border-radius: 100rpx;
	left: 0rpx;
	top: 0rpx;
	bottom: 0rpx;
	position: absolute;
	transform: scale(.9,.9);
	transition: all .1s ease-in-out 0s;
}
switch .wx-switch-input.wx-switch-input-checked:after {
	margin: auto;
	left: 22px;
	box-shadow: none;
	transform: scale(.9,.9);
}
radio-group {
	display: inline-block;
}
switch.radius .wx-switch-input,switch.radius .wx-switch-input:after,switch.radius .wx-switch-input:before {
	border-radius: 10rpx;
}
@-webkit-keyframes progress-stripes {
	0% {
		background-position: 72rpx 0;
	}
	to {
		background-position: 0 0;
	}
}
@keyframes progress-stripes {
	0% {
		background-position: 72rpx 0;
	}
	to {
		background-position: 0 0;
	}
}
.cu-load {
	display: block;
	line-height: 3em;
	text-align: center;
}
.cu-load:before {
	font-family: cuIcon;
	display: inline-block;
	margin-right: 6rpx;
}
.cu-load.loading:before {
	content: "\e67a";
	animation: cuIcon-spin 2s linear infinite;
}
.cu-load.loading:after {
	content: "加载中...";
}
.cu-load.over:before {
	content: "\e64a";
}
.cu-load.over:after {
	content: "没有更多了";
}
.cu-load.erro:before {
	content: "\e658";
}
.cu-load.erro:after {
	content: "加载失败";
}
.cu-load.load-icon:before {
	font-size: 32rpx;
}
.cu-load.load-icon.over,.cu-load.load-icon:after {
	display: none;
}
.cu-load.load-modal {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 140rpx;
	left: 0;
	margin: auto;
	width: 260rpx;
	height: 260rpx;
	background-color: var(--white);
	border-radius: 10rpx;
	box-shadow: 0 0 0rpx 2000rpx rgba(0,0,0,.5);
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	font-size: 28rpx;
	z-index: 9999;
	line-height: 2.4em;
}
.cu-load.load-modal [class*=cuIcon-] {
	font-size: 60rpx;
}
.cu-load.load-modal image {
	width: 70rpx;
	height: 70rpx;
}
.cu-load.load-modal:after {
	content: "";
	position: absolute;
	background-color: var(--white);
	border-radius: 50%;
	width: 200rpx;
	height: 200rpx;
	font-size: 10px;
	border: 6rpx solid rgba(0,0,0,.05);
	border-left: 6rpx solid var(--orange);
	animation: cuIcon-spin 1s linear infinite;
	z-index: -1;
}
.cu-form-group {
	background-color: var(--white);
	padding: 1rpx 30rpx;
	display: flex;
	align-items: center;
	min-height: 100rpx;
	justify-content: space-between;
}
.cu-form-group+.cu-form-group {
	border-top: 1rpx solid #eee;
}
.cu-form-group .title {
	text-align: justify;
	padding-right: 30rpx;
	font-size: 30rpx;
	position: relative;
	height: 60rpx;
	line-height: 60rpx;
}
.cu-form-group input {
	flex: 1;
	font-size: 30rpx;
	color: #555;
	padding-right: 20rpx;
}
.cu-form-group>text[class*=cuIcon-] {
	font-size: 36rpx;
	padding: 0;
	box-sizing: border-box;
}
.cu-form-group textarea {
	margin: 32rpx 0 30rpx;
	height: 4.6em;
	width: 100%;
	line-height: 1.2em;
	flex: 1;
	font-size: 28rpx;
	padding: 0;
}
.cu-form-group.align-start .title {
	height: 1em;
	margin-top: 32rpx;
	line-height: 1em;
}
.cu-form-group picker {
	flex: 1;
	padding-right: 40rpx;
	overflow: hidden;
	position: relative;
}
.cu-form-group picker .picker {
	line-height: 100rpx;
	font-size: 28rpx;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	width: 100%;
	text-align: right;
}
.cu-form-group picker:after {
	font-family: cuIcon;
	display: block;
	content: "\e6a3";
	position: absolute;
	font-size: 34rpx;
	color: var(--grey);
	line-height: 100rpx;
	width: 60rpx;
	text-align: center;
	top: 0;
	bottom: 0;
	right: -20rpx;
	margin: auto;
}
.cu-form-group textarea[disabled],.cu-form-group textarea[disabled] .placeholder {
	color: transparent;
}
.cu-modal {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 1110;
	opacity: 0;
	outline: 0;
	text-align: center;
	transform: scale(1.185);
	backface-visibility: hidden;
	perspective: 2000rpx;
	background: rgba(0,0,0,.6);
	transition: all .3s ease-in-out 0s;
	pointer-events: none;
}
.cu-modal:before {
	content: "\200B";
	display: inline-block;
	height: 100%;
	vertical-align: middle;
}
.cu-modal.show {
	opacity: 1;
	transition-duration: .3s;
	transform: scale(1);
	overflow-x: hidden;
	overflow-y: auto;
	pointer-events: auto;
}
.cu-dialog {
	position: relative;
	display: inline-block;
	vertical-align: middle;
	margin-left: auto;
	margin-right: auto;
	width: 680rpx;
	max-width: 100%;
	background-color: #f8f8f8;
	border-radius: 10rpx;
	overflow: hidden;
}
.cu-modal.bottom-modal:before {
	vertical-align: bottom;
}
.cu-modal.bottom-modal .cu-dialog {
	width: 100%;
	border-radius: 0;
}
.cu-modal.bottom-modal {
	margin-bottom: -1000rpx;
}
.cu-modal.bottom-modal.show {
	margin-bottom: 0;
}
.cu-modal.drawer-modal {
	transform: scale(1);
	display: flex;
}
.cu-modal.drawer-modal .cu-dialog {
	height: 100%;
	min-width: 200rpx;
	border-radius: 0;
	margin: initial;
	transition-duration: .3s;
}
.cu-modal.drawer-modal.justify-start .cu-dialog {
	transform: translateX(-100%);
}
.cu-modal.drawer-modal.justify-end .cu-dialog {
	transform: translateX(100%);
}
.cu-modal.drawer-modal.show .cu-dialog {
	transform: translateX(0);
}
.cu-modal .cu-dialog>.cu-bar:first-child .action {
	min-width: 100rpx;
	margin-right: 0;
	min-height: 100rpx;
}
.flex {
	display: flex;
}
.basis-xs {
	flex-basis: 20%;
}
.basis-sm {
	flex-basis: 40%;
}
.basis-df {
	flex-basis: 50%;
}
.basis-lg {
	flex-basis: 60%;
}
.basis-xl {
	flex-basis: 80%;
}
.flex-sub {
	flex: 1;
}
.flex-twice {
	flex: 2;
}
.flex-treble {
	flex: 3;
}
.flex-direction {
	flex-direction: column;
}
.flex-wrap {
	flex-wrap: wrap;
}
.align-start {
	align-items: flex-start;
}
.align-end {
	align-items: flex-end;
}
.align-center {
	align-items: center;
}
.self-start {
	align-self: flex-start;
}
.self-center {
	align-self: flex-center;
}
.self-end {
	align-self: flex-end;
}
.self-stretch {
	align-self: stretch;
}
.align-stretch {
	align-items: stretch;
}
.justify-start {
	justify-content: flex-start;
}
.justify-end {
	justify-content: flex-end;
}
.justify-center {
	justify-content: center;
}
.justify-between {
	justify-content: space-between;
}
.justify-around {
	justify-content: space-around;
}
.margin-0 {
	margin: 0;
}
.margin-xs {
	margin: 10rpx;
}
.margin-sm {
	margin: 20rpx;
}
.margin {
	margin: 30rpx;
}
.margin-lg {
	margin: 40rpx;
}
.margin-xl {
	margin: 50rpx;
}
.margin-top-xs {
	margin-top: 10rpx;
}
.margin-top-sm {
	margin-top: 20rpx;
}
.margin-top {
	margin-top: 30rpx;
}
.margin-top-lg {
	margin-top: 40rpx;
}
.margin-top-xl {
	margin-top: 50rpx;
}
.margin-right-xs {
	margin-right: 10rpx;
}
.margin-right-sm {
	margin-right: 20rpx;
}
.margin-right {
	margin-right: 30rpx;
}
.margin-right-lg {
	margin-right: 40rpx;
}
.margin-right-xl {
	margin-right: 50rpx;
}
.margin-bottom-xs {
	margin-bottom: 10rpx;
}
.margin-bottom-sm {
	margin-bottom: 20rpx;
}
.margin-bottom {
	margin-bottom: 30rpx;
}
.margin-bottom-lg {
	margin-bottom: 40rpx;
}
.margin-bottom-xl {
	margin-bottom: 50rpx;
}
.margin-left-xs {
	margin-left: 10rpx;
}
.margin-left-sm {
	margin-left: 20rpx;
}
.margin-left {
	margin-left: 30rpx;
}
.margin-left-lg {
	margin-left: 40rpx;
}
.margin-left-xl {
	margin-left: 50rpx;
}
.margin-lr-xs {
	margin-left: 10rpx;
	margin-right: 10rpx;
}
.margin-lr-sm {
	margin-left: 20rpx;
	margin-right: 20rpx;
}
.margin-lr {
	margin-left: 30rpx;
	margin-right: 30rpx;
}
.margin-lr-lg {
	margin-left: 40rpx;
	margin-right: 40rpx;
}
.margin-lr-xl {
	margin-left: 50rpx;
	margin-right: 50rpx;
}
.margin-tb-xs {
	margin-top: 10rpx;
	margin-bottom: 10rpx;
}
.margin-tb-sm {
	margin-top: 20rpx;
	margin-bottom: 20rpx;
}
.margin-tb {
	margin-top: 30rpx;
	margin-bottom: 30rpx;
}
.margin-tb-lg {
	margin-top: 40rpx;
	margin-bottom: 40rpx;
}
.margin-tb-xl {
	margin-top: 50rpx;
	margin-bottom: 50rpx;
}
.padding-0 {
	padding: 0;
}
.padding-xs {
	padding: 10rpx;
}
.padding-sm {
	padding: 20rpx;
}
.padding {
	padding: 30rpx;
}
.padding-lg {
	padding: 40rpx;
}
.padding-xl {
	padding: 50rpx;
}
.padding-top-xs {
	padding-top: 10rpx;
}
.padding-top-sm {
	padding-top: 20rpx;
}
.padding-top {
	padding-top: 30rpx;
}
.padding-top-lg {
	padding-top: 40rpx;
}
.padding-top-xl {
	padding-top: 50rpx;
}
.padding-right-xs {
	padding-right: 10rpx;
}
.padding-right-sm {
	padding-right: 20rpx;
}
.padding-right {
	padding-right: 30rpx;
}
.padding-right-lg {
	padding-right: 40rpx;
}
.padding-right-xl {
	padding-right: 50rpx;
}
.padding-bottom-xs {
	padding-bottom: 10rpx;
}
.padding-bottom-sm {
	padding-bottom: 20rpx;
}
.padding-bottom {
	padding-bottom: 30rpx;
}
.padding-bottom-lg {
	padding-bottom: 40rpx;
}
.padding-bottom-xl {
	padding-bottom: 50rpx;
}
.padding-left-xs {
	padding-left: 10rpx;
}
.padding-left-sm {
	padding-left: 20rpx;
}
.padding-left {
	padding-left: 30rpx;
}
.padding-left-lg {
	padding-left: 40rpx;
}
.padding-left-xl {
	padding-left: 50rpx;
}
.padding-lr-xs {
	padding-left: 10rpx;
	padding-right: 10rpx;
}
.padding-lr-sm {
	padding-left: 20rpx;
	padding-right: 20rpx;
}
.padding-lr {
	padding-left: 30rpx;
	padding-right: 30rpx;
}
.padding-lr-lg {
	padding-left: 40rpx;
	padding-right: 40rpx;
}
.padding-lr-xl {
	padding-left: 50rpx;
	padding-right: 50rpx;
}
.padding-tb-xs {
	padding-top: 10rpx;
	padding-bottom: 10rpx;
}
.padding-tb-sm {
	padding-top: 20rpx;
	padding-bottom: 20rpx;
}
.padding-tb {
	padding-top: 30rpx;
	padding-bottom: 30rpx;
}
.padding-tb-lg {
	padding-top: 40rpx;
	padding-bottom: 40rpx;
}
.padding-tb-xl {
	padding-top: 50rpx;
	padding-bottom: 50rpx;
}
.cf:after,.cf:before {
	content: " ";
	display: table;
}
.cf:after {
	clear: both;
}
.fl {
	float: left;
}
.fr {
	float: right;
}
.line-red:after,.lines-red:after {
	border-color: var(--red);
}
.line-orange:after,.lines-orange:after {
	border-color: var(--orange);
}
.line-yellow:after,.lines-yellow:after {
	border-color: var(--yellow);
}
.line-olive:after,.lines-olive:after {
	border-color: var(--olive);
}
.line-green:after,.lines-green:after {
	border-color: var(--green);
}
.line-cyan:after,.lines-cyan:after {
	border-color: var(--cyan);
}
.line-blue:after,.lines-blue:after {
	border-color: var(--blue);
}
.line-purple:after,.lines-purple:after {
	border-color: var(--purple);
}
.line-mauve:after,.lines-mauve:after {
	border-color: var(--mauve);
}
.line-pink:after,.lines-pink:after {
	border-color: var(--pink);
}
.line-brown:after,.lines-brown:after {
	border-color: var(--brown);
}
.line-grey:after,.lines-grey:after {
	border-color: var(--grey);
}
.line-gray:after,.lines-gray:after {
	border-color: var(--gray);
}
.line-black:after,.lines-black:after {
	border-color: var(--black);
}
.line-white:after,.lines-white:after {
	border-color: var(--white);
}
.bg-red {
	background-color: var(--red);
	color: var(--white);
}
.bg-orange {
	background-color: var(--orange);
	color: var(--white);
}
.bg-yellow {
	background-color: var(--yellow);
	color: var(--black);
}
.bg-olive {
	background-color: var(--olive);
	color: var(--white);
}
.bg-green {
	background-color: var(--green);
	color: var(--white);
}
.bg-cyan {
	background-color: var(--cyan);
}
.bg-blue,.bg-cyan {
	color: var(--white);
}
.bg-blue {
	background-color: var(--blue);
}
.bg-purple {
	background-color: var(--purple);
	color: var(--white);
}
.bg-mauve {
	background-color: var(--mauve);
	color: var(--white);
}
.bg-pink {
	background-color: var(--pink);
	color: var(--white);
}
.bg-brown {
	background-color: var(--brown);
	color: var(--white);
}
.bg-grey {
	background-color: var(--grey);
	color: var(--white);
}
.bg-gray {
	background-color: #f0f0f0;
	color: var(--black);
}
.bg-black {
	background-color: var(--black);
	color: var(--white);
}
.bg-white {
	background-color: var(--white);
	color: var(--darkGray);
}
.bg-shadeTop {
	background-image: linear-gradient(#000,rgba(0,0,0,.01));
	color: var(--white);
}
.bg-shadeBottom {
	background-image: linear-gradient(rgba(0,0,0,.01),#000);
	color: var(--white);
}
.bg-red.light {
	color: var(--red);
	background-color: var(--redLight);
}
.bg-orange.light {
	color: var(--orange);
	background-color: var(--orangeLight);
}
.bg-yellow.light {
	color: var(--yellow);
	background-color: var(--yellowLight);
}
.bg-olive.light {
	color: var(--olive);
	background-color: var(--oliveLight);
}
.bg-green.light {
	color: var(--green);
	background-color: var(--greenLight);
}
.bg-cyan.light {
	color: var(--cyan);
	background-color: var(--cyanLight);
}
.bg-blue.light {
	color: var(--blue);
	background-color: var(--blueLight);
}
.bg-purple.light {
	color: var(--purple);
	background-color: var(--purpleLight);
}
.bg-mauve.light {
	color: var(--mauve);
	background-color: var(--mauveLight);
}
.bg-pink.light {
	color: var(--pink);
	background-color: var(--pinkLight);
}
.bg-brown.light {
	color: var(--brown);
	background-color: var(--brownLight);
}
.bg-grey.light {
	color: var(--grey);
	background-color: var(--greyLight);
}
.bg-gradual-red {
	background-image: var(--gradualRed);
	color: var(--white);
}
.bg-gradual-orange {
	background-image: var(--gradualOrange);
	color: var(--white);
}
.bg-gradual-green {
	background-image: var(--gradualGreen);
	color: var(--white);
}
.bg-gradual-purple {
	background-image: var(--gradualPurple);
	color: var(--white);
}
.bg-gradual-pink {
	background-image: var(--gradualPink);
	color: var(--white);
}
.bg-gradual-blue {
	background-image: var(--gradualBlue);
	color: var(--white);
}
.bg-img {
	background-size: cover;
	background-position: 50%;
	background-repeat: no-repeat;
}
.bg-mask {
	background-color: var(--black);
	position: relative;
}
.bg-mask:after {
	content: "";
	border-radius: inherit;
	width: 100%;
	height: 100%;
	display: block;
	background-color: rgba(0,0,0,.4);
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
}
.bg-mask cover-view,.bg-mask view {
	z-index: 5;
	position: relative;
}
.bg-video {
	position: relative;
}
.bg-video video {
	display: block;
	height: 100%;
	width: 100%;
	object-fit: cover;
	position: absolute;
	top: 0;
	z-index: 0;
	pointer-events: none;
}
.text-xs {
	font-size: 20rpx;
}
.text-sm {
	font-size: 24rpx;
}
.text-df {
	font-size: 28rpx;
}
.text-lg {
	font-size: 32rpx;
}
.text-xl {
	font-size: 36rpx;
}
.text-xxl {
	font-size: 44rpx;
}
.text-sl {
	font-size: 80rpx;
}
.text-xsl {
	font-size: 120rpx;
}
.text-Abc {
	text-transform: Capitalize;
}
.text-ABC {
	text-transform: Uppercase;
}
.text-abc {
	text-transform: Lowercase;
}
.text-price:before {
	content: "¥";
	font-size: 80%;
	margin-right: 4rpx;
}
.text-cut {
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
.text-bold {
	font-weight: 700;
}
.text-center {
	text-align: center;
}
.text-content {
	line-height: 1.6;
}
.text-left {
	text-align: left;
}
.text-right {
	text-align: right;
}
.line-red,.lines-red,.text-red {
	color: var(--red);
}
.line-orange,.lines-orange,.text-orange {
	color: var(--orange);
}
.line-yellow,.lines-yellow,.text-yellow {
	color: var(--yellow);
}
.line-olive,.lines-olive,.text-olive {
	color: var(--olive);
}
.line-green,.lines-green,.text-green {
	color: var(--green);
}
.line-cyan,.lines-cyan,.text-cyan {
	color: var(--cyan);
}
.line-blue,.lines-blue,.text-blue {
	color: var(--blue);
}
.line-purple,.lines-purple,.text-purple {
	color: var(--purple);
}
.line-mauve,.lines-mauve,.text-mauve {
	color: var(--mauve);
}
.line-pink,.lines-pink,.text-pink {
	color: var(--pink);
}
.line-brown,.lines-brown,.text-brown {
	color: var(--brown);
}
.line-grey,.lines-grey,.text-grey {
	color: var(--grey);
}
.line-gray,.lines-gray,.text-gray {
	color: var(--gray);
}
.line-black,.lines-black,.text-black {
	color: var(--black);
}
.line-white,.lines-white,.text-white {
	color: var(--white);
}
.mc-bg-main {
	background-color: #f0f2f5;
	color: var(--black);
}
.mc-highlight-text {
	color: #e54d42;
	font-size: 50rpx;
}
.mc-tip-title {
	color: #454544;
	font-size: 36rpx;
}
.mc-tip-min {
	color: #696969;
	font-size: 30rpx;
}
.mc-tip-text {
	color: #343453;
	font-size: 35rpx;
}
.scrollPage {
	height: 100vh;
}
.nav-list {
	display: flex;
	flex-wrap: wrap;
	padding: 24rpx 40rpx;
	justify-content: space-between;
}
.nav-li {
	width: 45%;
}
.nav-li,.nav-li-2 {
	padding: 30rpx;
	border-radius: 12rpx;
	margin: 0 2.5% 40rpx;
	background-image: url(/static/card-bg.png);
	background-size: cover;
	background-position: 50%;
	position: relative;
	z-index: 1;
}
.nav-li-2 {
	width: 100%;
}
.nav-li:after .nav-li-2:after {
	content: "";
	position: absolute;
	z-index: -1;
	background-color: inherit;
	width: 100%;
	height: 100%;
	left: 0;
	bottom: -10%;
	border-radius: 10rpx;
	opacity: .2;
	transform: scale(.9,.9);
}
.nav-li.cur .nav-li-2.cur {
	color: #fff;
	background: #5eb95e;
	box-shadow: 4rpx 4rpx 6rpx rgba(94,185,94,.4);
}
.nav-title {
	font-size: 32rpx;
	font-weight: 300;
}
.nav-title:first-letter {
	font-size: 40rpx;
	margin-right: 4rpx;
}
.nav-name {
	font-size: 28rpx;
	text-transform: Capitalize;
	margin-top: 20rpx;
	position: relative;
}
.nav-name:before {
	width: 40rpx;
	height: 6rpx;
	right: 0;
	opacity: .5;
}
.nav-name:after,.nav-name:before {
	content: "";
	position: absolute;
	display: block;
	background: #fff;
	bottom: 0;
}
.nav-name:after {
	width: 100rpx;
	height: 1px;
	right: 40rpx;
	opacity: .3;
}
.nav-name:first-letter {
	font-weight: 700;
	font-size: 36rpx;
	margin-right: 1px;
}
.nav-li text {
	position: absolute;
	right: 30rpx;
	top: 30rpx;
	font-size: 52rpx;
	width: 60rpx;
	height: 60rpx;
	text-align: center;
	line-height: 60rpx;
}
.text-light {
	font-weight: 300;
}
</style>
