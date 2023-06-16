import { NavLink, useLocation } from "react-router-dom"
import { DropdownMenu } from "./DropdownMenu"
import { HamburguesaIcon } from "../Icons"
import { MenuShoppingCard } from "../MenuShoppingCard"

export const links = [
  {
    label: "Menú",
    to: "menu"
  },
  {
    label: "Restaurantes",
    to: "restaurantes"
  },
  {
    label: "Eventos",
    to: "eventos"
  },
  {
    label: "Nosotros",
    to: "nosotros"
  },
  {
    label: "Contáctenos",
    to: "contactenos"
  }
]

export const Navbar = () => {
  const location = useLocation()
  const { pathname } = location
  const baseLinkClass = "text-lg border-b-4 hover:text-intense-orange hover:border-intense-orange text-chocolate-brown font-bold transition ease"
  const linkClass = `${baseLinkClass} border-intense-orange text-intense-orange`

  return (
    <header className="fixed w-full z-40 bg-light-ivory">
      <div className="mx-auto max-w-5xl flex justify-between items-center">
        <div className="h-24 sm:h-28 md:h-32 flex items-center">
          <NavLink to="">
            <img className="w-36 sm:w-60" src="/assets/LOGO-PW.png" alt="Logo" />
          </NavLink>
        </div>
        <nav className="hidden md:inline-flex">
          <ul className="flex flex-row items-center">
            {links.map(({label, to}) => (
              <li key={label} className="mx-2.5">
                <NavLink 
                  to={to} 
                  className={({ isActive }) =>
                    isActive ? linkClass : `${baseLinkClass} border-transparent`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
            {
              pathname === "/menu" 
                ?
                (
                  <li className="ml-2 py-2 h-full bg-fire-red flex items-center">
                    <MenuShoppingCard />
                  </li>
                )
                : (<li className="ml-2 py-6 h-full bg-fire-red flex items-center">
                  <NavLink to="/menu" className="flex flex-col justify-center px-9 gap-1">
                    <div className="w-20 h-auto fill-white">
                      <HamburguesaIcon />
                    </div>
                    <span className="text-center font-bold text-white">Pide aquí</span>
                  </NavLink>
                </li>)
            }
          </ul>
        </nav>
        <DropdownMenu />
        <div className="absolute right-0 top-28 md:hidden">
          {
            pathname === "/menu" 
              ?
              (
                <li className="h-full bg-fire-red flex items-center">
                  <MenuShoppingCard />
                </li>
              )
              : (<li className="h-full bg-fire-red flex items-center">
                <a href="" className="flex flex-col justify-center py-5 pl-8 pr-12 gap-1">
                  <div className="w-20 h-auto fill-white">
                    <HamburguesaIcon />
                  </div>
                  <span className="text-center font-bold text-white">Pide aquí</span>
                </a>
              </li>)
          }
        </div>
      </div>
    </header>
  )
}


