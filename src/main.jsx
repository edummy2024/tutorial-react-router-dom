import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, createBrowserRouter, createHashRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom'
import Root, { loader as rootLoader, action as rootAction } from './routes/root';
import ErrorPage from './error-page';
import Contact, { loader as contactLoader, action as contactAction } from './routes/contact';
import EditContact, { action as editAction } from './routes/edit';
import { action as destroyAction } from './routes/destroy';
import Index from './routes';
import CodeBlockPage from './routes/code-block';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Index />
          },
          {
            path: 'contacts/:contactId',
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: 'contacts/:contactId/edit',
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: 'contacts/:contactId/destroy',
            action: destroyAction,
            errorElement: <div>oke ada yang salah, silakan cuba lagi</div>
          },
        ],
      }
    ]
  },
], {
  basename: '/tutorial'
});

const routerComponent = createBrowserRouter(
  createRoutesFromElements(
      <Route path='/' element={<Root />} errorElement={<ErrorPage />} loader={rootLoader} action={rootAction} >
          <Route errorElement={<ErrorPage />} >
            <Route index 
              // element={<Index />}
               Component={Index}/>
            <Route path='code-block' element={<CodeBlockPage />}/>
            <Route path='contacts/:contactId' element={<Contact />} loader={contactLoader} action={contactAction} />
            <Route path='contacts/:contactId/edit' element={<EditContact />} loader={contactLoader} action={editAction} />
            <Route path='contacts/:contactId/destroy' action={destroyAction} errorElement={<div>oke ada yang salah, silakan cuba lagi.</div>} />
          </Route>
        </Route>
  ), {
    // basename: '/tutorial',
  },
  
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <RouterProvider router={router} /> */}
    <RouterProvider router={routerComponent} future={{ v7_startTransition: true }} fallbackElement={<div>fallback element</div>} />
    {/* <BrowserRouter>
      <Routes>
        <Route path='/' element={<Root />} errorElement={<ErrorPage />} loader={rootLoader} action={rootAction} >
          <Route errorElement={<ErrorPage />} >
            <Route index element={<Index />} />
            <Route path='contacts/:contactId' element={<Contact />} loader={contactLoader} action={contactAction} />
            <Route path='contacts/:contactId/edit' element={<EditContact />} loader={contactLoader} action={editAction} />
            <Route path='contacts/:contactId/destroy' action={destroyAction} errorElement={<div>oke ada yang salah, silakan cuba lagi.</div>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter> */}
  </StrictMode>,
)
