import React from 'react';
import JsonView from 'react-json-view';

export interface Props{
  state?: any,
  name?: string,
  level?: number,
  fullHeight?: boolean
}

function StateView({
  state,
  name = 'state',
  level = 5,
  fullHeight = true
}: Props) {
  return (
    <JsonView
      style={{ paddingTop: 15, paddingLeft: 15, minHeight: fullHeight ? '100vh' : undefined }}
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
