import React from 'react';
import { PageLayout } from '../../components/layout';
import App from '../../tutorial/part-1';
import { Links } from '../../nav';

export default function Part1() {
  return (
    <PageLayout
      main={<App/>}
      sidebar={<Links/>}
    />
  );
}
