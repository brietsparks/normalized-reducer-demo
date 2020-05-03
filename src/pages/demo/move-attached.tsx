import { MoveAttached } from '../../demos/move-attached';
import { PageLayout } from '../../components/layout';
import { Links } from '../../nav';

export default function MoveAttachedPage() {
  return (
    <PageLayout
      main={<MoveAttached/>}
      sidebar={<Links/>}
    />
  );
}
