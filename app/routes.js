// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business

import { getAsyncInjectors } from 'utils/asyncInjectors';

import { clearError } from 'containers/App/actions';

import { makeSelectAuthenticatedUser } from 'containers/AuthProvider/selectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  /**
  * Checks authentication status on route change
  * @param  {object}   nextState The state we want to change into when we change routes
  * @param  {function} replace Function provided by React Router to replace the location
  */
  const checkAuth = (nextState, replace) => {
    const authenticatedUser = makeSelectAuthenticatedUser()(store.getState());

    store.dispatch(clearError());

    // Check if the path isn't the writing page. That way we can apply specific logic to display/render the path we want to
    if (['/login', '/signup'].includes(nextState.location.pathname)) {
      if (authenticatedUser) {
        if (nextState.location.state && nextState.location.pathname) {
          replace(nextState.location.pathname);
        } else {
          replace('/write');
        }
      }
    } else if (!authenticatedUser && nextState.location.pathname !== '/') {
      replace('/');
    }
  };

  // react-boilerplate modified for global sagas
  // See: https://github.com/react-boilerplate/react-boilerplate/pull/1545
  const childRoutes = [
    {
      path: '/',
      name: 'home',
      onEnter: checkAuth,
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/write',
      name: 'writingPage',
      onEnter: checkAuth,
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/WritingPage/reducer'),
          import('containers/WritingPage/sagas'),
          import('containers/WritingPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('writingPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/login',
      name: 'loginPage',
      onEnter: checkAuth,
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/LoginPage/reducer'),
          import('containers/LoginPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer('loginPage', reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/signup',
      name: 'signupPage',
      onEnter: checkAuth,
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/SignupPage/reducer'),
          import('containers/SignupPage/sagas'),
          import('containers/SignupPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('signupPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/logout',
      name: 'logout',
      getComponent(location, cb) {
        import('containers/Logout')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];

  return {
    getComponent(nextState, cb) {
      const importModules = Promise.all([
        import('containers/App'),
      ]);

      const renderRoute = loadModule(cb);

      importModules.then(([component]) => {
        renderRoute(component);
      });

      importModules.catch(errorLoading);
    },
    childRoutes,
  };
}
