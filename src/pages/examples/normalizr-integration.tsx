import { NormalizrIntegration } from '../../examples/normalizr-integration';
import { PageLayout } from '../../components/layout';
import { Links } from '../../nav';

export default function NormalizrIntegrationPage() {
  return (
    <PageLayout
      main={<NormalizrIntegration/>}
      sidebar={<Links/>}
    />
  );
}
