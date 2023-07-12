const esbuild = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');
const { esbuildDecorators } = require('@anatine/esbuild-decorators')

const shared = {
    entryPoints: ['./src/index.ts'],
    bundle: true,
    treeShaking: true,
    platform: 'node',
    target: 'node18',
    plugins: [nodeExternalsPlugin()],
}

esbuild.build({
    ...shared,
    outfile: 'dist/index.cjs.js',
    format: 'cjs',
    plugins: [
        esbuildDecorators({
            tsconfig: 'tsconfig.build.json',
            cwd: process.cwd(),
          }),
          ...shared.plugins,
        ]
}).catch((err) => {
    console.error(err);
    process.exit(1);
});

esbuild.build({
    ...shared,
    outfile: 'dist/index.esm.js',
    format: 'esm',
}).catch((err) => {
    console.error(err);
    process.exit(1);
});