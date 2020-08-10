import React from 'react';
import { PageLayout } from '../../components/layout';
import App from '../../tutorial/part-3';
import { Links } from '../../nav';

export default function Part3() {
  return (
    <PageLayout
      main={<App/>}
      sidebar={<Links/>}
    />
  );
}
