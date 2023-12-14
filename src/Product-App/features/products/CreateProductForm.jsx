import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  getProductsState,
  updateCreateProduct,
} from "./productsSlice";

export default function CreateProductForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const dispatch = useDispatch();
  const {
    createProduct: { isLoading: isCreating, isError, isSuccess },
  } = useSelector(getProductsState);

  function reset(){
    setName('');
    setCategory('');
    setCompany('');
    setImage('');
    setPrice('');
    setQuantity('')
  }

  useEffect(
    function () {
      if (isSuccess) {
        updateCreateProduct();
        reset()
      }
    },
    [dispatch, isSuccess]
  );

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      createProduct({ name, category, company, image, price, quantity })
    );
  }

  return (
    <div className="formContainer">
      <h4 className="formTitle">Add New Product</h4>
      <form
        className="space-y-4 text-[#534F4F]"
        id="lws-addProductForm"
        onSubmit={handleSubmit}
      >
        <div className="space-y-2">
          <label htmlFor="lws-inputName">Product Name</label>
          <input
            className="addProductInput"
            id="lws-inputName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="lws-inputCategory">Category</label>
          <input
            className="addProductInput"
            id="lws-inputCategory"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="lws-inputCompany">Company</label>
          <input
            className="addProductInput"
            id="lws-inputCompany"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="lws-inputImage">Image Url</label>
          <input
            className="addProductInput"
            id="lws-inputImage"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-8 pb-4">
          <div className="space-y-2">
            <label htmlFor="ws-inputPrice">Price</label>
            <input
              className="addProductInput"
              type="number"
              id="lws-inputPrice"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="lws-inputQuantity">Quantity</label>
            <input
              className="addProductInput"
              type="number"
              id="lws-inputQuantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
            />
          </div>
        </div>
        <button type="submit" id="lws-inputSubmit" className="submit">
          {isCreating ? "creating" : "Add Product"}
        </button>
      </form>
    </div>
  );
}
