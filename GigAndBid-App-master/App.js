import AuthProvider from './Context/AuthProvider';
import AppNavigator from './Navigation/routes';
import {Provider} from 'react-redux';
import store from './Redux/store';
const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </Provider>
  );
};

export default App;
