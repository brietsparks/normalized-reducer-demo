import React from 'react';
import { PageLayout } from '../../components/layout';
import App from '../../tutorial/part-2';
import { Links } from '../../nav';

export default function Part2() {
  return (
    <PageLayout
      main={<App/>}
      sidebar={<Links/>}
    />
  );
}
