import { executeStepWithDependencies } from '@jupiterone/integration-sdk-testing';

import { buildStepTestConfigForStep } from '../../../test/config';
import { Recording, setupProjectRecording } from '../../../test/recording';
import { IntegrationSteps } from '../constants';

// See test/README.md for details
let recording: Recording;
afterEach(async () => {
  await recording.stop();
});

test('fetch-device-apps', async () => {
  recording = setupProjectRecording({
    directory: __dirname,
    name: 'fetch-device-apps',
  });

  const stepConfig = buildStepTestConfigForStep(
    IntegrationSteps.FETCH_DEVICE_APPS,
  );
  const stepResult = await executeStepWithDependencies(stepConfig);
  expect(stepResult).toMatchStepMetadata(stepConfig);
});
