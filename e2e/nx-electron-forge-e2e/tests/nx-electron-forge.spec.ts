import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';
describe('nx-electron-forge e2e', () => {
  it('should create nx-electron-forge', async () => {
    const plugin = uniq('nx-electron-forge');
    ensureNxProject(
      '@orbiter/nx-electron-forge',
      'dist/packages/nx-electron-forge'
    );
    await runNxCommandAsync(
      `generate @orbiter/nx-electron-forge:nx-electron-forge ${plugin}`
    );

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain('Executor ran');
  }, 120000);

  describe('--directory', () => {
    it('should create src in the specified directory', async () => {
      const plugin = uniq('nx-electron-forge');
      ensureNxProject(
        '@orbiter/nx-electron-forge',
        'dist/packages/nx-electron-forge'
      );
      await runNxCommandAsync(
        `generate @orbiter/nx-electron-forge:nx-electron-forge ${plugin} --directory subdir`
      );
      expect(() =>
        checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)
      ).not.toThrow();
    }, 120000);
  });

  describe('--tags', () => {
    it('should add tags to nx.json', async () => {
      const plugin = uniq('nx-electron-forge');
      ensureNxProject(
        '@orbiter/nx-electron-forge',
        'dist/packages/nx-electron-forge'
      );
      await runNxCommandAsync(
        `generate @orbiter/nx-electron-forge:nx-electron-forge ${plugin} --tags e2etag,e2ePackage`
      );
      const nxJson = readJson('nx.json');
      expect(nxJson.projects[plugin].tags).toEqual(['e2etag', 'e2ePackage']);
    }, 120000);
  });
});
