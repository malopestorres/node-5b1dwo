import { Outlet, LiveReload, Link } from 'remix';
import globalStylesUrl from '/styles/global.css'

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
        <link rel="stylesheet" href={globalStylesUrl}/>

        <title>{title ? title : 'Remix App'}</title>
      </head>

      <body>
        {children}
        <LiveReload />
      </body>
    </html>
  );
}


function Layout({children}){
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
  </ul>

  <div className="container">
    {children}
  </div>
   
</nav>
    </>
  )
}