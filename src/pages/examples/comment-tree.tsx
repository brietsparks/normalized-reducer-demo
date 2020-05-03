import { CommentTree } from '../../examples/comment-tree';
import { PageLayout } from '../../components/layout';
import { Links } from '../../nav';

export default function CommentTreePage() {
  return (
    <PageLayout
      main={<CommentTree/>}
      sidebar={<Links/>}
    />
  );
}
