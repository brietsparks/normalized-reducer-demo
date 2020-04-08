import React from 'react';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

import Card, { CardsContainer } from './Card';

export default function Example() {
  const body = <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>;

  return (
    <Container maxWidth="xs" style={{ paddingTop: 20, paddingBottom: 20 }}>
      <CardsContainer>
        <Card
          isSelectable={true}
          isSelected={true}
          left={<Checkbox color="primary"/>}
          body={body}
        />
        <Card
          isSelectable={true}
          right={<IconButton><DeleteIcon/></IconButton>}
          body={body}
        />
        <Card
          left={<Checkbox color="primary" disabled />}
          right={<IconButton><DeleteIcon/></IconButton>}
          body={body}
        />
      </CardsContainer>
    </Container>
  );
}
