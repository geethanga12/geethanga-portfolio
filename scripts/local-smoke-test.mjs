const baseUrl = process.env.LOCAL_API_BASE_URL || 'http://127.0.0.1:4000/api/v1';

const log = (msg) => console.log(`[local-check] ${msg}`);

const assertOk = async (response, label) => {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${label} failed (${response.status}): ${text}`);
  }
};

const run = async () => {
  log(`Using API base URL: ${baseUrl}`);

  const health = await fetch(`${baseUrl}/health`);
  await assertOk(health, 'Health endpoint');
  const healthJson = await health.json();
  if (!healthJson.ok) throw new Error('Health payload returned ok=false');
  log('Health endpoint passed');

  const project = await fetch(`${baseUrl}/projects/smartbiz`);
  await assertOk(project, 'Project endpoint');
  const projectJson = await project.json();
  if (!projectJson.ok || !projectJson.data) throw new Error('Project payload invalid');
  log('Project endpoint passed');

  const contact = await fetch(`${baseUrl}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Local Tester',
      email: 'local.tester@example.com',
      subject: 'Local smoke test',
      message: 'This is a local automated smoke test submission.',
      website: '',
      turnstileToken: '',
    }),
  });
  await assertOk(contact, 'Contact endpoint');
  const contactJson = await contact.json();
  if (!contactJson.ok) throw new Error('Contact payload returned ok=false');
  log('Contact endpoint passed');

  log('All local smoke tests passed.');
};

run().catch((error) => {
  console.error(`[local-check] FAILED: ${error.message}`);
  process.exit(1);
});
