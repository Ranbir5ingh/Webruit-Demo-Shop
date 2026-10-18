import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import  terser  from '@rollup/plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default [
  // 1. UMD build (for <script> tag usage) - NO TYPES
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/webruit.min.js',
      format: 'iife',
      name: 'Webruit',
      sourcemap: production,
    },
    plugins: [
      nodeResolve({ browser: true }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,        // ✅ No declarations
        declarationMap: false,     // ✅ No declaration maps
      }),
      production && terser({
        compress: {
          drop_console: true,
          passes: 2,
        },
        mangle: {
          toplevel: true,
        },
        format: {
          comments: false,
        },
      }),
    ],
  },
  
  // 2. ESM build (for npm import) - WITH TYPES
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.esm.js',
      format: 'es',
      sourcemap: true,
    },
    plugins: [
      nodeResolve({ browser: true }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,          // ✅ Generate .d.ts
        declarationDir: 'dist',     // ✅ Put types in dist/
        declarationMap: true,       // ✅ Generate .d.ts.map
      }),
    ],
  },
  
  // 3. CommonJS build (for Node.js) - NO TYPES (already generated)
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'auto',
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,         // ✅ Don't generate again
        declarationMap: false,      // ✅ Don't generate again
      }),
    ],
  },
];