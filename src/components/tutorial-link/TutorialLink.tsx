import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import React from 'react';

export interface TutorialLinkProps {
  part: number
}

const style = {
  marginTop: 8
}

export function TutorialLink({ part }: TutorialLinkProps) {
  return (
    <Container maxWidth="sm" style={style}>
      <Typography>
        Tutorial: <a href={`https://brietsparks.com/normalized-reducer-part-${part}`}>Easy relational React state with Normalized Reducer, Part {part}</a>
      </Typography>
    </Container>
  );
}
