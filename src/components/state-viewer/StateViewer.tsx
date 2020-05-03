import React from 'react';
import dynamic from 'next/dynamic'

// https://github.com/mac-s-g/react-json-view/issues/121#issuecomment-437267883
const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false });

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
    <DynamicReactJson
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
