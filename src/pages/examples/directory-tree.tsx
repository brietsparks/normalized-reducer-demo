import { DirectoryTree } from '../../examples/directory-tree';
import { PageLayout } from '../../components/layout';
import { Links } from '../../nav';

export default function DirectoryTreePage() {
  return (
    <PageLayout
      main={<DirectoryTree/>}
      sidebar={<Links/>}
    />
  );
}
