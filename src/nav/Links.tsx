import React from 'react';
import Link  from 'next/link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import GithubIcon from '@material-ui/icons/GitHub';
import MuiLink from '@material-ui/core/Link';

import routes from './routes';
import { useStyles } from './styles';

export default function Links() {
  const classNames = useStyles();

  return (
    <List
      component="nav"
      className="nav-links"
      subheader={
        <ListSubheader component="div" className={classNames.titleHeader}>
          <MuiLink
            href="https://github.com/brietsparks/normalized-reducer"
            target="_blank"
            rel="noopener noreferrer"
            className={classNames.titleLink}
          >
            Normalized Reducer <GithubIcon className={classNames.titleIcon} />
          </MuiLink>
        </ListSubheader>
      }
    >

      <List dense component="div">
        <ListItem className={classNames.linkSectionHeader}>Demos</ListItem>
        <Link href={routes.create}>
          <ListItem button>Create</ListItem>
        </Link>
        <Link href={routes.createIndexed}>
          <ListItem button>Create, indexed</ListItem>
        </Link>
        <Link href={routes.update}>
          <ListItem button>Update</ListItem>
        </Link>
        <Link href={routes.move}>
          <ListItem button>Move</ListItem>
        </Link>
        <Link href={routes.deleteBasic}>
          <ListItem button>Delete</ListItem>
        </Link>
        <Link href={routes.oneToMany}>
          <ListItem button>Attach/detach, one-to-many</ListItem>
        </Link>
        <Link href={routes.manyToMany}>
          <ListItem button>Attach/detach, many-to-many</ListItem>
        </Link>
        <Link href={routes.oneToOne}>
          <ListItem button>Attach/detach, one-to-one</ListItem>
        </Link>
        <Link href={routes.moveAttached}>
          <ListItem button>Move attached</ListItem>
        </Link>
        <Link href={routes.deleteAndDetach}>
          <ListItem button>Delete + detach</ListItem>
        </Link>
        <Link href={routes.sort}>
          <ListItem button>Sort</ListItem>
        </Link>
        <Link href={routes.sortAttached}>
          <ListItem button>Sort attached</ListItem>
        </Link>
        <Link href={routes.batch}>
          <ListItem button>Batch</ListItem>
        </Link>
        <Link href={routes.setState}>
          <ListItem button>Set state</ListItem>
        </Link>
        <Divider/>
      </List>

      <List dense component="div">
        <ListItem className={classNames.linkSectionHeader}>Example Usage</ListItem>

        <Link href={routes.sortableTags}>
          <ListItem button>Sortable tags list</ListItem>
        </Link>

        <Link href={routes.commentTree}>
          <ListItem button>Comment tree</ListItem>
        </Link>


        <Link href={routes.directoryTree}>
          <ListItem button>Directory tree (composite tree)</ListItem>
        </Link>

        <Link href={routes.normalizrIntegration}>
          <ListItem button>Normalizr Integration</ListItem>
        </Link>

        <Link href={routes.withReduxToolkit}>
          <ListItem button>Redux Toolkit Integration</ListItem>
        </Link>
        <Divider/>
      </List>

      <List dense component="div">
        <ListItem className={classNames.linkSectionHeader}>Tutorial</ListItem>

        <Link href={routes.tutorialPart1}>
          <ListItem button>Part 1</ListItem>
        </Link>

        <Link href={routes.tutorialPart2}>
          <ListItem button>Part 2</ListItem>
        </Link>

        <Link href={routes.tutorialPart3}>
          <ListItem button>Part 3</ListItem>
        </Link>
      </List>
    </List>
  );
}
