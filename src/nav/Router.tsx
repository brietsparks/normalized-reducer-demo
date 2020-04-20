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
import { SetState } from '../demo-actions/set-state';

import { SortableTags } from '../example-features/sortable-tags';
import { NormalizrIntegration } from '../example-features/normalizr-integration';
import { CommentTree } from '../example-features/comment-tree';
import { DirectoryTree } from '../example-features/directory-tree';
import { WithReduxToolkit } from '../example-features/with-redux-toolkit';

import routes from './routes';

export default function Router() {
  return (
    <BrowserRouter basename="normalized-reducer-demo">
      <Route exact path="/"><Create.Basic/></Route>
      <Route exact path={routes.create}><Create.Basic/></Route>
      <Route exact path={routes.createIndexed}><Create.WithIndex/></Route>
      <Route exact path={routes.update}><Update/></Route>
      <Route exact path={routes.move}><Move/></Route>
      <Route exact path={routes.deleteBasic}><Delete.Basic/></Route>
      <Route exact path={routes.oneToMany}><AttachDetach.OneToMany/></Route>
      <Route exact path={routes.manyToMany}><AttachDetach.ManyToMany/></Route>
      <Route exact path={routes.oneToOne}><AttachDetach.OneToOne/></Route>
      <Route exact path={routes.moveAttached}><MoveAttached/></Route>
      <Route exact path={routes.deleteAndDetach}><Delete.WithAttachments/></Route>
      <Route exact path={routes.sort}><Sort/></Route>
      <Route exact path={routes.sortAttached}><SortAttached/></Route>
      <Route exact path={routes.batch}><BatchActions/></Route>
      <Route exact path={routes.setState}><SetState/></Route>

      <Route exact path={routes.sortableTags}><SortableTags/></Route>
      <Route exact path={routes.commentTree}><CommentTree/></Route>
      <Route exact path={routes.directoryTree}><DirectoryTree/></Route>
      <Route exact path={routes.normalizrIntegration}><NormalizrIntegration/></Route>
      <Route exact path={routes.withReduxToolkit}><WithReduxToolkit/></Route>
    </BrowserRouter>
  );
}
