export const createUpdateFormValueFn = (updateState) => {
  return (e) => updateState(e.target.value);
};

export const setCheckboxValues = (state, setState) => {
  return (e) => {
    let newState = [...state];
    if (e.target.checked) {
      newState.push(e.target.value);
    } else {
      newState = newState.filter((value) => value !== e.target.value);
    }
    setState(newState);
  };
};
