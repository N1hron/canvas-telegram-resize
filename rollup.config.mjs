import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default {
	input: './ts/main.ts',
	output: {
		file: 'main.js',
		format: 'es',
		sourcemap: true,
	},
    plugins: [typescript(), terser()]
};