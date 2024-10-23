import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render as rtlRender } from '@testing-library/react';
import rootReducer, { RootState } from '../redux/reducers'; // Ensure rootReducer points to the right file

// Define the options including the preloaded state
interface RenderOptions {
  preloadedState?: Partial<RootState>;
}

function renderWithWAMProvider(
  ui: React.ReactElement,
  { preloadedState }: RenderOptions = {}
) {
  // Create the store using Redux Toolkit's configureStore
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  // Define a wrapper to pass the store to the component tree
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  // Render the UI with the provided store wrapper
  return rtlRender(ui, { wrapper: Wrapper });
}

export * from '@testing-library/react';
export { renderWithWAMProvider };
