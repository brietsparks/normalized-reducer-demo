import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Create from '../demo-actions/create';
import AttachDetach from '../demo-actions/attach-detach';
import { Update } from '../demo-actions/update';
import Delete from '../demo-actions/delete';
import { Move } from '../demo-actions/move';
import { MoveAttached } from '../demo-actions/move-attached';
import { Sort } from '../demo-actions/sort';
import { SortAttached } from '../demo-actions/sort-attached';
import { BatchActions } from '../demo-actions/batch-actions';
import { SetState }  from '../demo-actions/set-state';

import { SortableTags } from '../example-features/sortable-tags';
import { NormalizrIntegration } from '../example-features/normalizr-integration';
import { CommentTree } from '../example-features/comment-tree';
import { DirectoryTree } from '../example-features/directory-tree';

import routes from './routes';

export default function Router() {
  return (
    <BrowserRouter>
      <Route path={routes.create}><Create.Basic/></Route>
      <Route path={routes.createIndexed}><Create.WithIndex/></Route>
      <Route path={routes.update}><Update/></Route>
      <Route path={routes.move}><Move/></Route>
      <Route path={routes.deleteBasic}><Delete.Basic/></Route>
      <Route path={routes.oneToMany}><AttachDetach.OneToMany/></Route>
      <Route path={routes.manyToMany}><AttachDetach.ManyToMany/></Route>
      <Route path={routes.oneToOne}><AttachDetach.OneToOne/></Route>
      <Route path={routes.moveAttached}><MoveAttached/></Route>
      <Route path={routes.deleteAndDetach}><Delete.WithAttachments/></Route>
      <Route path={routes.sort}><Sort/></Route>
      <Route path={routes.sortAttached}><SortAttached/></Route>
      <Route path={routes.batch}><BatchActions/></Route>
      <Route path={routes.setState}><SetState/></Route>

      <Route path={routes.sortableTags}><SortableTags/></Route>
      <Route path={routes.commentTree}><CommentTree/></Route>
      <Route path={routes.directoryTree}><DirectoryTree/></Route>
      <Route path={routes.normalizrIntegration}><NormalizrIntegration/></Route>
    </BrowserRouter>
  );
}
