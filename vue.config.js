const { defineConfig } = require("@vue/cli-service");
const UnpluginVue2ScriptSetup =
	require("unplugin-vue2-script-setup/webpack").default; // Используйте .default, если это ESM

module.exports = defineConfig({
	configureWebpack: {
		plugins: [
			UnpluginVue2ScriptSetup(), // вызываем правильно плагин
		],
	},
});
