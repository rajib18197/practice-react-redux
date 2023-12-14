import CreateProductForm from "../features/products/CreateProductForm";
import ProductList from "../features/products/ProductList";
import Main from "../ui/Main";

export default function Products() {

  return (
    <Main>
      <div className="productWrapper">
        <ProductList />
        <CreateProductForm />
      </div>
    </Main>
  );
}
