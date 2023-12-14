import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import { decreaseProductQuantity, deleteProduct, getProductsState, updateDeleteProduct } from "./productsSlice";
import { useEffect } from "react";
import { addToCart } from "../cart/cartSlice";

export default function ProductItem({ product }) {
  const { id, name, category, company, image, price, quantity } = product;
  const dispatch = useDispatch();
  const {
    deleteProduct: { isLoading: isDeleting, isSuccess },
  } = useSelector(getProductsState);
  console.log(isDeleting, isSuccess);

  useEffect(function(){
    if(isSuccess){
      dispatch(updateDeleteProduct())
    }
  }, [dispatch, isSuccess])

  function handleDelete() {
    dispatch(deleteProduct(id));
  }

  function handleCart(){
    dispatch(addToCart({...product, quantity: 1}))
    dispatch(decreaseProductQuantity(id))
  }


  return (
    <div className="lws-productCard">
      <img className="lws-productImage" src={image} alt={name} />
      <div className="p-4 space-y-2">
        <h4 className="lws-productName uppercase">{name}</h4>
        <p className="lws-productCategory uppercase">
          {category} || {company}
        </p>
        <div className="flex items-center justify-between pb-2">
          <p className="productPrice">
            BDT <span className="lws-price">{price}</span>
          </p>
          <p className="productQuantity">
            QTY <span className="lws-quantity">{quantity}</span>
          </p>
        </div>
        <div className="flex justify-between items-center">
          <button className="lws-btnAddToCart" onClick={handleCart}>Add To Cart</button>

          <Modal>
            <Menus.Menu>
              <Menus.Toggle opens={id} />
              <Menus.List windowName={id}>
                <Menus.Button>Duplicate </Menus.Button>

                <Menus.Button>Update</Menus.Button>

                <Modal.Open opens={"confirm-delete"}>
                  <Menus.Button>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>
            <Modal.Window windowName={"confirm-delete"}>
              <ConfirmDelete
                resourceName={name}
                onClick={handleDelete}
                isDeleting={isDeleting}
              />
            </Modal.Window>
          </Modal>
        </div>
      </div>
    </div>
  );
}

// Menus is in the top of the product list because we want only 1 menu list is open at the same time if we did not provide the 'id' or any other unique value in the opens props instead we provide a string which will be same in all the menus then if one of the menu changes the openName state then all of the menus would open.
// same thing for modal. we provide modal in each invidual product item so that if one product item changes the state of the modal context then  other prodcut item would not reflect. each prodcut has its own instance of the modal.

// If each of the product has the <Menus> component then It would not be a problem if we provide the string in the opens props beacuse each of them operates independently.
// But If we have only one <Menus> component of all the product items then the structure would be like this
/** 
 <Menus>
  <Menus.Menu>
  </Menus.Menu />

  <Menus.Menu>
  </Menus.Menu />

  <Menus.Menu>
  </Menus.Menu />
 </Menus>

so one component change the state of Menus and since the string value is same for all the Menu so all the Menu will open at the same time. so the workaround for this to give each of the Menu a unique open props so the they does not open at the same time.

*/
