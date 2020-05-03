import { WithReduxToolkit } from '../../examples/with-redux-toolkit';
import { PageLayout } from '../../components/layout';
import { Links } from '../../nav';

export default function WithReduxToolkitPage() {
  return (
    <PageLayout
      main={<WithReduxToolkit/>}
      sidebar={<Links/>}
    />
  );
}
