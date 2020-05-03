import { Move } from '../../demos/move';
import { PageLayout } from '../../components/layout';
import { Links } from '../../nav';

export default function MovePage() {
  return (
    <PageLayout
      main={<Move/>}
      sidebar={<Links/>}
    />
  );
}
