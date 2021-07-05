import classes from "../../styles/Navbar.module.css";

function NavBar(props) {

    return <header className={classes.navbar}>
        <nav className={classes.navbar__navigation}>
            <div></div>
            <div className={classes.navbar__logo}>
                <a>Logo</a>
            </div>
            <div className={classes.navbar__navigationItems}><ul>
                <li>
                    <a>Products</a>
                </li>
                <li>USers</li>

            </ul>
            </div>
        </nav>
    </header>
}
export default NavBar;