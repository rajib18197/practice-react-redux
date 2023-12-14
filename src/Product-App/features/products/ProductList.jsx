import {  useDispatch, useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import { fetchAllProducts, getProductsState } from "./productsSlice";
import { useEffect} from "react";
import Menus from "../../ui/Menus";

export default function ProductList() {
  const {
    products: { results: productResults, isLoading, isError },
  } = useSelector(getProductsState);
  const dispatch = useDispatch();

  console.log(productResults);


  useEffect(
    function () {
      dispatch(fetchAllProducts());
    },
    [dispatch]
  );

  return (
    <Menus>
      <div className="productContainer" id="lws-productContainer">
        {isLoading && <h2>Loading Products</h2>}
        {!isLoading && isError && <h2>Error</h2>}
        {!isLoading && !isError && productResults.length === 0 && (
          <h2>No Products Found</h2>
        )}

        {!isLoading &&
          !isError &&
          productResults.length > 0 &&
          productResults.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
      </div>
    </Menus>
  );
}
