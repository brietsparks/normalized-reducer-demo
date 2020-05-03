import { SetState } from '../../demos/set-state';
import { PageLayout } from '../../components/layout';
import { Links } from '../../nav';

export default function SetStatePage() {
  return (
    <PageLayout
      main={<SetState/>}
      sidebar={<Links/>}
    />
  );
}
