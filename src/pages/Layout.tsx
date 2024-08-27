import { NavLink, Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <>
      <header className="header">
        <nav className="navigation">
          <h1>Zoorummet</h1>
          <ul>
            <li>
              <NavLink to={"/"}>Hem</NavLink>
            </li>
            <li>
              <NavLink to={"/animals"}>Djur</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  )
}

export default Layout