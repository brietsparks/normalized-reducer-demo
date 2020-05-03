import { SortableTags } from '../../examples/sortable-tags';
import { PageLayout } from '../../components/layout';
import { Links } from '../../nav';

export default function SortableTagsPage() {
  return (
    <PageLayout
      main={<SortableTags/>}
      sidebar={<Links/>}
    />
  );
}
