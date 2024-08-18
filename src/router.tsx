import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        lazy: async () => {
          const AppShell = await import('./components/app-shell')
          return { Component: AppShell.default }
        },
        children: [
            {
              index: true,
              lazy: async () => ({
                Component: (await import('./App')).default,
              }),
            },
            {
              path: 'timeline',
              lazy: async () => ({
                Component: (await import('./pages/timeline')).default,
              }),
            },
        ]
      },
]);

export default router;