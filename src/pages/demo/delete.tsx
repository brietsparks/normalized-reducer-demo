import Delete from '../../demos/delete';
import { PageLayout } from '../../components/layout';
import { Links } from '../../nav';

export default function DeletePage() {
  return (
    <PageLayout
      main={<Delete.Basic/>}
      sidebar={<Links/>}
    />
  );
}
