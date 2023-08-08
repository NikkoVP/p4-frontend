
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ContextProvider from './components/ContextProvider';
import HistoryPage from './HistoryPage';
import Homepage from './Homepage';
import RouterProvider from './components/RouterProvider';
import Login from './LoginPage';
import Registration from './RegistrationPage'
import Account from './Account';

function App() {

  const routes = [
    {
      path: '/',
      element: <Login></Login>
    },
    {
      path: 'https://pitaka-react-project.onrender.com/Homepage',
      element: <Homepage></Homepage>
    },
    {
      path: 'https://pitaka-react-project.onrender.com/HistoryPage',
      element: <HistoryPage> </HistoryPage>
    },
    {
      path: 'https://pitaka-react-project.onrender.com/RegistrationPage',
      element:<Registration></Registration>
    },
    {
      path: 'https://pitaka-react-project.onrender.com/Account',
      element:<Account></Account>
    }  

  ];

  return (
    <ContextProvider>

      <div><RouterProvider router={routes}> </RouterProvider></div>

    </ContextProvider>
  );
}

export default App;
