import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import CreateExample from '../examples-basic/create';

export default function Router() {
  return (
    <BrowserRouter>
      <Route path="/basic/create">
        <CreateExample/>
      </Route>
    </BrowserRouter>
  );
}
