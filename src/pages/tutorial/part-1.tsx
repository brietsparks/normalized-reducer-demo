import React from 'react';
import { PageLayout } from '../../components/layout';
import App from '../../tutorial/part-1';
import { Links } from '../../nav';
import { TutorialLink } from '../../components/tutorial-link/TutorialLink';

export default function Part1() {
  const main = (
    <div>
      <TutorialLink part={1} />
      <App/>
    </div>
  )

  return (
    <PageLayout
      main={main}
      sidebar={<Links/>}
    />
  );
}
