import React from 'react';
import { PageLayout } from '../../components/layout';
import App from '../../tutorial/part-2';
import { Links } from '../../nav';
import { TutorialLink } from '../../components/tutorial-link/TutorialLink';

export default function Part2() {
  const main = (
    <div>
      <TutorialLink part={2} />
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
