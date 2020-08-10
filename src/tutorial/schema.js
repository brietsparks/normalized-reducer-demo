export default {
  profile: {
    bookmarkIds: {
      type: 'bookmark',
      cardinality: 'many',
      reciprocal: 'profileId',
    }
  },
  bookmark: {
    profileId: {
      type: 'profile',
      cardinality: 'one',
      reciprocal: 'bookmarkIds',
    },
  },
};
