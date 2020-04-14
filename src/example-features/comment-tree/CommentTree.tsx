import React, { useState } from 'react';
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import ReplyIcon from '@material-ui/icons/ModeComment';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import normalizedSlice, { Schema, Cardinalities, Id } from 'normalized-reducer';

import { Layout } from '../../components/layout';
import { useStyles } from './styles';
import { randomString } from '../../util';

interface Comment {
  value: string,
  childIds?: Id[],
  parentId?: Id
}

const schema: Schema = {
  comment: {
    parentId: {
      type: 'comment',
      cardinality: Cardinalities.ONE,
      reciprocal: 'childIds'
    },
    childIds: {
      type: 'comment',
      cardinality: Cardinalities.MANY,
      reciprocal: 'parentId'
    }
  }
};

export interface State {
  entities: {
    comment: Record<Id, Comment>
  },
  ids: {
    comment: Id[]
  }
}

export const {
  emptyState,
  actionCreators,
  reducer,
  selectors,
  actionTypes,
} = normalizedSlice(schema);

const initialState: State = {
  entities: {
    comment: {
      'c1': {
        childIds: ['c1.1'],
        value: 'Boboddy - what does the first b stand for?',
      },
      'c1.1': {
        parentId: 'c1',
        value: 'Biznus!'
      },
      'c2': {
        childIds: ['c2.1'],
        value: 'Maybe there is some sort of animal we can make a sacrifice to - like a giant buffalo.',
      },
      'c2.1': {
        parentId: 'c2', childIds: ['c2.1.1'],
        value: 'Or some sort of monster like something with the body of a walrus with the head of a sea lion.',
      },
      'c2.1.1': {
        parentId: 'c2.1', childIds: ['c2.1.1.1'],
        value: 'Or something with the body of an egret with the head of a meerkat.'
      },
      'c2.1.1.1': {
        parentId: 'c2.1.1',
        value: 'Or just the head of a monkey with the antlers of a reindeer...with the body of a porcupine.'
      }
    }
  },
  ids: {
    comment: ['c1', 'c2', 'c1.1', 'c2.1', 'c2.1.1', 'c2.1.1.1']
  }
};

const store = createStore(reducer, initialState);

export default function Example() {
  return (
    <Provider store={store}>
      <Main/>
    </Provider>
  );
}

const getRootCommentIds = (state: State) => {
  const ids = selectors.getIds(state, { type: 'comment' });
  return ids.filter(id => {
    const comment = selectors.getEntity<Comment>(state, { type: 'comment', id });
    return !!comment && !comment.parentId;
  });
};

function Main() {
  const ids = useSelector<State, Id[]>(state => getRootCommentIds(state));
  const state = useSelector(state => state);

  const dispatch = useDispatch();
  const createRootComment = (value: string) => {
    const id = randomString();
    dispatch(actionCreators.create('comment', id, { value }));
  };

  const main = (
    <Container maxWidth="sm">
      <div>
        <div>
          {ids.map(id => (
            <CommentViewer key={id} id={id} />
          ))}
        </div>
        <NewComment
          onSubmit={createRootComment}
          label="Comment"
        />
      </div>
    </Container>
  );

  return (
    <Layout
      main={main}
      state={state}
    />
  );
}

const cascade = () => ({ childIds: cascade });

interface CommentViewerProps {
  id: Id,
  isLast?: boolean
}
function CommentViewer({ id, isLast }: CommentViewerProps) {
  const comment = useSelector<State, Comment|undefined>(state => selectors.getEntity(state, { type: 'comment', id }));

  const [isButtonsOpen, setIsButtonsOpen] = useState(false);
  const openButtons = () => setIsButtonsOpen(true);
  const closeButtons = () => setIsButtonsOpen(false);

  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const openReply = () => setIsReplyOpen(true);
  const closeReply = () => setIsReplyOpen(false);

  const dispatch = useDispatch();

  const classNames = useStyles({ isLast });

  if (!comment) {
    return null;
  }

  const cancelReply = () => {
    closeReply();
  };

  const submitReply = (value: string) => {
    if (value) {
      const childId = randomString();
      dispatch(actionCreators.batch(
        actionCreators.create('comment', childId, { value }),
        actionCreators.attach('comment', childId, 'parentId', id)
      ));

      closeReply();
      closeButtons();
    }
  };

  const deleteComment = () => dispatch(actionCreators.delete('comment', id, cascade));

  return (
    <div className={classNames.comment}>
      {comment.childIds &&
      <div className={classNames.commentSideline} />
      }

      <div className={classNames.commentContent}>
        <Typography>{comment.value}</Typography>

        {!isButtonsOpen &&
        <IconButton onClick={openButtons}>
          <MoreHoriz fontSize="small" />
        </IconButton>
        }

        {isButtonsOpen && !isReplyOpen &&
        <ClickAwayListener onClickAway={closeButtons}>
          <div>
            <IconButton onClick={openReply}>
              <ReplyIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={deleteComment}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        </ClickAwayListener>
        }

        {isReplyOpen &&
          <div className={classNames.reply}>
            <NewComment
              autoFocus
              onSubmit={submitReply}
              onCancel={cancelReply}
              showCancel={true}
              label="Reply"
            />
          </div>
        }

        {comment.childIds?.map((childId, index) => (
          <CommentViewer
            key={childId}
            id={childId}
            isLast={index >= (comment.childIds?.length || 0) - 1}
          />
        ))}
      </div>
    </div>
  );
}

interface ReplyProps {
  onSubmit: (value: string) => void,
  onCancel?: () => void,
  showCancel?: boolean,
  label: string,
  autoFocus?: boolean,
}
function NewComment({
  onSubmit,
  onCancel,
  showCancel,
  label,
  autoFocus
}: ReplyProps) {
  const classNames = useStyles();

  const [value, setValue] = useState('');

  const handleClickCancel = () => {
    if (onCancel) {
      onCancel();
    }
    setValue('');
  };

  const handleClickSubmit = () => {
    const cleaned = value.trim();
    if (cleaned) {
      onSubmit(cleaned);
      setValue('');
    }
  };

  return (
    <div>
      <TextField
        autoFocus={autoFocus}
        fullWidth
        placeholder="What are your thoughts?"
        onChange={e => setValue(e.target.value)}
        value={value}
      />

      <div>
        {showCancel &&
        <Button
          variant="text"
          className={classNames.replyCancel}
          onClick={handleClickCancel}
        >Cancel</Button>
        }
        <Button
          color="primary"
          onClick={handleClickSubmit}
        >{label}</Button>
      </div>
    </div>
  );
}


// <div className={classNames.reply}>
//   <TextField
//     autoFocus
//     fullWidth
//     placeholder="What are your thoughts?"
//     onChange={e => setReply(e.target.value)}
//     value={reply}
//   />
//
//   <div>
//     <Button
//       variant="text"
//       className={classNames.replyCancel}
//       onClick={cancelReply}
//     >Cancel</Button>
//     <Button
//       color="primary"
//       onClick={submitReply}
//     >Reply</Button>
//   </div>
// </div>
