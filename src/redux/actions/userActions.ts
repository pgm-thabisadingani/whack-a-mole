// Action Types
export const SET_USER_DATA = 'SET_USER_DATA';

// Interface for Set User Data Action
interface SetUserDataAction {
  type: typeof SET_USER_DATA;
  payload: {
    id: string;
    name: string;
  };
}

// Union Type for User Actions
export type UserActionTypes = SetUserDataAction;

// Action Creator
export const setUserData = (id: string, name: string): UserActionTypes => ({
  type: SET_USER_DATA,
  payload: { id, name },
});
