import { AppContext } from '../pages/_app';

export const withContext = (Child) => (props) =>
  (
    <AppContext.Consumer>
      {(context) => <Child {...props} {...context} />}
    </AppContext.Consumer>
  );
