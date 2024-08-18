import React from 'react'
import Layout from '../components/Layout'
import HomePage from '../pages/home' 

const routes = [
  {
    path: '/',
    lazy: async () => {
      const AppShell = await import('../components/app-shell')
      return { Component: AppShell.default }
    },
  },
]

export default routes;