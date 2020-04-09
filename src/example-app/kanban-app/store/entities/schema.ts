import { Cardinalities, Schema } from 'normalized-reducer';

const { MANY, ONE } = Cardinalities;

const schema: Schema = {
  user: {
    createdTaskIds: { type: 'task', cardinality: MANY, reciprocal: 'creatorId' },
    assignedTaskIds: { type: 'task', cardinality: MANY, reciprocal: 'assigneeId' }
  },
  task: {
    creatorId: { type: 'user', cardinality: MANY, reciprocal: 'createdTaskIds' },
    assigneeId: { type: 'user', cardinality: MANY, reciprocal: 'assignedTaskIds' },
    statusId: { type: 'status', cardinality: ONE, reciprocal: 'taskIds' },
    tagIds: { type: 'tag', cardinality: MANY, reciprocal: 'taskIds' },
    rootCommentIds: { type: 'comment', cardinality: MANY, reciprocal: 'taskId' }
  },
  status: {
    boardId: { type: 'board', cardinality: ONE, reciprocal: 'statusIds' },
    taskIds: { type: 'task', cardinality: MANY, reciprocal: 'statusId' }
  },
  board: {
    statusIds: { type: 'status', cardinality: MANY, reciprocal: 'boardId' }
  },
  tag: {
    taskIds: { type: 'task', cardinality: MANY, reciprocal: 'tagIds' }
  },
  comment: {
    taskId: { type: 'task', cardinality: ONE, reciprocal: 'rootCommentIds', },
    parentCommentId: { type: 'comment', cardinality: ONE, reciprocal: 'childCommentIds' },
    childCommentIds: { type: 'comment', cardinality: MANY, reciprocal: 'parentCommentId' }
  }
};

export default schema;
