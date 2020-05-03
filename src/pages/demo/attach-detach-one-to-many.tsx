import AttachDetach from '../../demos/attach-detach';
import { PageLayout } from '../../components/layout';
import { Links } from '../../nav';

export default function OneToManyPage() {
  return (
    <PageLayout
      main={<AttachDetach.OneToMany/>}
      sidebar={<Links/>}
    />
  );
}
