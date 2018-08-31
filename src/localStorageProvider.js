const localStorageProvider = {
  hydrateStateWithLocalStorage: (currentState) => {
    const newState = Object.keys(currentState)
      .filter( key => localStorage.hasOwnProperty(key))
      .map(key => { 
        let value = localStorage.getItem(key);

        try {
          return { key, value: JSON.parse(value) };
        } catch (e) {
          // handle empty string
          return { key, value };
        }
      }).reduce((reducer, iterationValue) => {
        reducer[iterationValue.key] = iterationValue.value;
        return reducer;
      }, {});
    return newState;
  },
  saveStateToLocalStorage: (currentState) => {
    for (let key in currentState) {
      localStorage.setItem(key, JSON.stringify(currentState[key]));
    }
  }
}

export default localStorageProvider;