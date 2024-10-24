import React from 'react'
import { Form, NavLink, Outlet, redirect, useLoaderData, useNavigation, useSubmit } from 'react-router-dom';
import { createContact, getContacts } from '../contacts'

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  const contacts = await getContacts(q);
  return { contacts, q };
}

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
  return { contact };
}

export default function Root() {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  // console.log({ location: window.location, navigation });
  const submit = useSubmit();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "q"
    );
//  console.log(navigation.location)
  return (
     <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              className={searching ? 'loading' : ''}
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={!searching}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
         {contacts.length ? (
            <ul>
              <li>
                <NavLink to={'code-block'} className={({ isActive, isPending }) => {
                    // console.log({ isActive, isPending })
                    return isActive
                      ? "active"
                      : isPending
                      ? "pending"
                      : ""
                  }
                    }>code block</NavLink>
              </li>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink to={`contacts/${contact.id}`} className={({ isActive, isPending }) => {
                    // console.log({ isActive, isPending })
                    return isActive
                      ? "active"
                      : isPending
                      ? "pending"
                      : ""
                  }
                    } state={{ state: contact.id }}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail" className={navigation.state === 'loading' ? 'loading' : ''}>
        <Outlet />
      </div>
    </>
  );
}
