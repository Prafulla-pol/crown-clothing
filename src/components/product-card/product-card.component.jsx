import {useContext} from 'react';
import Button from '../button/button.component';
import './product-card.styles.scss'
import {CartContext} from '../contexts/cart.context';


const ProductCard = ({product}) => {

    const {addItemToCart} = useContext(CartContext);

    const handleCardAdd = () => {
        addItemToCart(product);
    }

    const {name, price, imageUrl} = product
    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={name}/>
            <div className='footer'>
                <span>{name}</span>
                <span>{price}</span>
            </div>
            <Button buttonType='inverted' onClick={handleCardAdd}>Add to cart</Button>
        </div>
    );
}

export default ProductCard;