import React from 'react';
import JsonView from 'react-json-view';

export interface Props{
  state?: any,
  name?: string,
  level?: number,
}

function StateView({ state, name = 'state', level = 5 }: Props) {
  return (
    <JsonView
      style={{ paddingTop: 15, paddingLeft: 15, minHeight: '100vh' }}
      src={state}
      name={name}
      theme="monokai"
      collapsed={level}
      displayObjectSize={false}
      enableClipboard={false}
      displayDataTypes={false}
    />
  )
}

export default StateView;
