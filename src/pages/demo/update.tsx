import { Update } from '../../demos/update';
import { PageLayout } from '../../components/layout';
import { Links } from '../../nav';

export default function UpdatePage() {
  return (
    <PageLayout
      main={<Update/>}
      sidebar={<Links/>}
    />
  );
}
