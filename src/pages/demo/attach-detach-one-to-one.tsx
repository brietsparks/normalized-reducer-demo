import AttachDetach from '../../demos/attach-detach';
import { PageLayout } from '../../components/layout';
import { Links } from '../../nav';

export default function OneToOnePage() {
  return (
    <PageLayout
      main={<AttachDetach.OneToOne/>}
      sidebar={<Links/>}
    />
  );
}
