import React from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';

import routes from './routes';
import './overrides.css';

export default function Links() {
  return (
    <List dense component="nav" className="nav-links">
      <List
        dense
        component="div"
        subheader={
          <ListSubheader
            component="div">Actions Demo
          </ListSubheader>
        }
      >
        <Link to={routes.create}>
          <ListItem button>
            <ListItemText>Create</ListItemText>
          </ListItem>
        </Link>
        <Link to={routes.createIndexed}>
          <ListItem button>
            <ListItemText>Created, indexed</ListItemText>
          </ListItem>
        </Link>
        <Link to={routes.update}>
          <ListItem button>
            <ListItemText>Update</ListItemText>
          </ListItem>
        </Link>
        <Link to={routes.move}>
          <ListItem button>
            <ListItemText>Move</ListItemText>
          </ListItem>
        </Link>
        <Link to={routes.deleteBasic}>
          <ListItem button>
            <ListItemText>Delete</ListItemText>
          </ListItem>
        </Link>
        <Link to={routes.oneToMany}>
          <ListItem button>
            <ListItemText>Attach/detach, one-to-many</ListItemText>
          </ListItem>
        </Link>
        <Link to={routes.manyToMany}>
          <ListItem button>
            <ListItemText>Attach/detach, many-to-many</ListItemText>
          </ListItem>
        </Link>
        <Link to={routes.oneToOne}>
          <ListItem button>
            <ListItemText>Attach/detach, one-to-one</ListItemText>
          </ListItem>
        </Link>
        <Link to={routes.moveAttached}>
          <ListItem button>
            <ListItemText>Move attached</ListItemText>
          </ListItem>
        </Link>
        <Link to={routes.deleteAndDetach}>
          <ListItem button>
            <ListItemText>Delete + detach</ListItemText>
          </ListItem>
        </Link>
        <Link to={routes.sort}>
          <ListItem button>
            <ListItemText>Sort</ListItemText>
          </ListItem>
        </Link>
        <Link to={routes.sortAttached}>
          <ListItem button>
            <ListItemText>Sort attached</ListItemText>
          </ListItem>
        </Link>
        <Link to={routes.batch}>
          <ListItem button>
            <ListItemText>Batch</ListItemText>
          </ListItem>
        </Link>
        <Link to={routes.setState}>
          <ListItem button>
            <ListItemText>Set state</ListItemText>
          </ListItem>
        </Link>
        <Divider/>
      </List>

      <List
        dense
        component="div"
        subheader={
          <ListSubheader
            component="div">Example Uses
          </ListSubheader>
        }
      >

        <Link to={routes.sortableTags}>
          <ListItem button>
            <ListItemText>Sortable tags list</ListItemText>
          </ListItem>
        </Link>

        <Link to={routes.commentTree}>
          <ListItem button>
            <ListItemText>Comment tree</ListItemText>
          </ListItem>
        </Link>


        <Link to={routes.directoryTree}>
          <ListItem button>
            <ListItemText>Directory tree (composite tree)</ListItemText>
          </ListItem>
        </Link>

        <Link to={routes.normalizrIntegration}>
          <ListItem button>
            <ListItemText>Normalizr Integration</ListItemText>
          </ListItem>
        </Link>
      </List>
    </List>
  );
}
