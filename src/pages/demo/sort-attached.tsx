import { SortAttached } from '../../demos/sort-attached';
import { PageLayout } from '../../components/layout';
import { Links } from '../../nav';

export default function SortAttachedPage() {
  return (
    <PageLayout
      main={<SortAttached/>}
      sidebar={<Links/>}
    />
  );
}
