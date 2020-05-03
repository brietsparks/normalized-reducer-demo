import Create from '../../demos/create';
import { PageLayout } from '../../components/layout';
import { Links } from '../../nav';

export default function CreatePage() {
  return (
    <PageLayout
      main={<Create.Basic/>}
      sidebar={<Links/>}
    />
  );
}
