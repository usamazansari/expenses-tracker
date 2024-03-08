import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: './openapi.json',
  apiFile: '../src/app/store/api/base.api.ts',
  apiImport: 'baseApi',
  outputFile: '../src/app/store/api/generated.api.ts',
  exportName: 'generatedApi',
  hooks: { queries: true, lazyQueries: true, mutations: true },
};

export default config;
