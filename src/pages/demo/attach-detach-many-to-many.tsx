import AttachDetach from '../../demos/attach-detach';
import { PageLayout } from '../../components/layout';
import { Links } from '../../nav';

export default function ManyToManyPage() {
  return (
    <PageLayout
      main={<AttachDetach.ManyToMany/>}
      sidebar={<Links/>}
    />
  );
}
