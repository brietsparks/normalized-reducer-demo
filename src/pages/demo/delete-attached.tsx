import Delete from '../../demos/delete';
import { PageLayout } from '../../components/layout';
import { Links } from '../../nav';

export default function DeleteAttachedPage() {
  return (
    <PageLayout
      main={<Delete.WithAttachments/>}
      sidebar={<Links/>}
    />
  );
}
