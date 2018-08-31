import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

export default {
    input: 'src/main.js',
    output: {
        file: 'dist/starling.min.js',
        format: 'iife',
        name: 'starling',
    },
    plugins: [
        resolve(),
        commonjs(),
        babel({
            exclude: 'node_modules/**',
        }),
        uglify({
            compress: {
                drop_console: true,
                passes: 2,
            },
        }),
    ],
};
