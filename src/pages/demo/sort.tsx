import { Sort } from '../../demos/sort';
import { PageLayout } from '../../components/layout';
import { Links } from '../../nav';

export default function SortPage() {
  return (
    <PageLayout
      main={<Sort/>}
      sidebar={<Links/>}
    />
  );
}
