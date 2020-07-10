<template>
	<div id="app">
		<h1>Vue 2x 研究</h1>
		<Nav></Nav>
		<hr />
		<div class="main"><router-view></router-view></div>
	</div>
</template>

<script>
import Nav from '@/components/Nav';
export default {
	name: 'App',
	components: {
		Nav
	}
};
</script>

<style lang="scss" scoped>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	.main {
		width: 1280px;
		margin: auto;
	}
}
</style>
