test('web-template.mjs can be imported without error', async () => {
  process.env.LOG_LEVEL = 'none';
  await import('../web-template.mjs');
  expect(true).toBe(true);
});
