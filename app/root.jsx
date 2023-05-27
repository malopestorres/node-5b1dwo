import { Outlet, LiveReload, Link, Links, Meta, useLoaderData } from '@remix-run/react'
import globalStylesUrl from './styles/global.css';
import { getUser } from './utils/session.server';

export const links = () => [{ rel: 'stylesheet', href: globalStylesUrl }];

export const meta = () => {
  const description = 'A cool Blog built with remix';
  const keywords = 'remix, react, javascript';
  return {
    description,
    keywords
  }
}

export const loader = async ({ request }) => {
  const user = await getUser(request)
  const data = {
    user
  }
  return data
}

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

export function Document({ children, title }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <title>{title ? title : 'Remix App'}</title>
        <Links />
      </head>
      <body>
        {children}

        {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
      </body>
    </html>
  );
}


function Layout({ children }) {

  const { user } = useLoaderData();

  return (
    <>
      <nav className="navbar">

        <Link to="/" className="logo">
          Remix
        </Link>

        <ul className="nav">

          <li>
            <Link to="/posts">Posts</Link>
          </li>

          {user ? (
            <li>
              <form action="/logout"
                method="POST"
              >
                <button className="btn" type="submit">
                  Logout {user.username}
                </button>

              </form>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}


        </ul>

      </nav>
      <div className="container">s
        {children}
      </div>
    </>
  )
}

export function ErrorBoundary({ error }) {
  console.log(error);
  return (
    <Document>
      <Layout></Layout>
      <h1>Error</h1>
      <p>{error.message}</p>
    </Document>
  )
}