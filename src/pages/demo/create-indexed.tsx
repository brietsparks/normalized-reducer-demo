import Create from '../../demos/create';
import { PageLayout } from '../../components/layout';
import { Links } from '../../nav';

export default function CreateIndexedPage() {
  return (
    <PageLayout
      main={<Create.WithIndex/>}
      sidebar={<Links/>}
    />
  );
}
