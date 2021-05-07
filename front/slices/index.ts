import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import userSlice from './user';
import postSlice from './post';

const rootReducer = (state: any, action: any) => {
  switch (action.type) {
    case HYDRATE:
      // console.log('HYDRATE', action);
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        user: userSlice.reducer,
        post: postSlice.reducer,
      });
      return combineReducer(state, action);
    }
  }
};

// const rootReducer = combineReducers({
//   user: user.reducer,
//   post: post.reducer,
// });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
