import React from 'react';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Card, CardHeader, CardContent, Divider } from '@material-ui/core';
import {
  InfoCard,
  Progress,
  StructuredMetadataTable,
} from '@backstage/core-components';

export const CICDInfoCard = () => {
  const { entity } = useEntity();
  const annotations = entity.metadata.annotations ?? {};

  const cicdInfo = {
    'Build Number': annotations['backstage.io/ci-build-number'],
    'Last Build': new Date(
      annotations['backstage.io/ci-last-build'],
    ).toLocaleString(),
    Status: annotations['backstage.io/ci-status'],
    'Build Duration': `${annotations['backstage.io/ci-build-duration']} seconds`,
    'Code Coverage': annotations['backstage.io/code-coverage'],
    'Deployment Frequency': annotations['backstage.io/deployment-frequency'],
    'Last Deployment': new Date(
      annotations['backstage.io/last-deployment'],
    ).toLocaleString(),
    'Open Pull Requests': annotations['backstage.io/open-pull-requests'],
  };

  const ciUrl = annotations['backstage.io/ci-url'];

  return (
    <InfoCard title="CI/CD Information">
      <CardContent>
        <StructuredMetadataTable metadata={cicdInfo} />
        {ciUrl && (
          <>
            <Divider style={{ margin: '16px 0' }} />
            <a href={ciUrl} target="_blank" rel="noopener noreferrer">
              View in CI/CD Tool
            </a>
          </>
        )}
      </CardContent>
    </InfoCard>
  );
};

export default CICDInfoCard;
