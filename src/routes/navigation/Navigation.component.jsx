import { Fragment, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg'
import './Navigation.styles.scss'
import {UserContext} from '../../components/contexts/user.context';
import {authSignOut} from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart.dropdown.component';
import { CartContext } from '../../components/contexts/cart.context';

const Navigation = () => {

  const { currentUser } = useContext(UserContext)
  const { isCartOpen } = useContext(CartContext)

  const signOutHandler = async () => {
    await authSignOut()
  }

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrownLogo className='logo'/>
        </Link>
        <div className="nav-links-container">
          <Link to="/shop" className="nav-link">
            Shop
          </Link>
          { !currentUser 
            ? <Link to="/auth" className="nav-link">Sign In</Link> 
            : <Link className='nav-link' onClick={signOutHandler}>Sign Out</Link>
          }
          <Link className='nav-link'><CartIcon /></Link>
          { isCartOpen && <CartDropdown /> }
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
