<template>

  <StackLayout>

    <Label class="drawer-item" text="Documents->" />
    <Label class="drawer-item" :text="folders.documentsFolder" />
    <Label class="drawer-item" text="App ->" />
    <Label class="drawer-item" :text="folders.currentAppFolder" />
    <Label class="drawer-item" text="tmp -->" />
    <Label class="drawer-item" :text="folders.tempFolder" />

  </StackLayout>

</template>

<script>
//dev only...
const fileSystemModule = require('tns-core-modules/file-system');

export default {
	name: 'settings',
	data() {
		return {};
	},
	computed: {
		folders: {
			get: function() {
				let folders = {};
				folders.documentsFolder = fileSystemModule.knownFolders.documents().path;
				folders.currentAppFolder = fileSystemModule.knownFolders.currentApp().path;
				folders.tempFolder = fileSystemModule.knownFolders.temp().path;
				return folders;
			},
		},
	},
	methods: {},

	mounted() {
		console.log('Settings mounted...');
	},
	beforeMount() {},
};
</script>

<style scoped>
</style>
