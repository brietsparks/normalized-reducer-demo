import { BatchActions } from '../../demos/batch-actions';
import { PageLayout } from '../../components/layout';
import { Links } from '../../nav';

export default function BatchPage() {
  return (
    <PageLayout
      main={<BatchActions/>}
      sidebar={<Links/>}
    />
  );
}
