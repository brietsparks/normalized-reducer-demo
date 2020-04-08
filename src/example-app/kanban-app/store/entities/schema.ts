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
    laneId: { type: 'lane', cardinality: ONE, reciprocal: 'taskIds' },
    tagIds: { type: 'tag', cardinality: MANY, reciprocal: 'taskIds' },
    rootCommentIds: { type: 'comment', cardinality: MANY, reciprocal: 'taskId' }
  },
  lane: {
    boardId: { type: 'board', cardinality: ONE, reciprocal: 'laneIds' },
    taskIds: { type: 'task', cardinality: MANY, reciprocal: 'laneId' }
  },
  board: {
    laneIds: { type: 'lane', cardinality: MANY, reciprocal: 'boardId' }
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
