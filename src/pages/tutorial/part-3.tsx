import React from 'react';
import { PageLayout } from '../../components/layout';
import App from '../../tutorial/part-3';
import { Links } from '../../nav';
import { TutorialLink } from '../../components/tutorial-link/TutorialLink';

export default function Part3() {
  const main = (
    <div>
      <TutorialLink part={3} />
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
