import React, { useEffect, useState, useContext, useReducer } from "react";
import "../component/FormStyles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Store } from "../component/Store";
import { toast } from "react-toastify";
import { getError } from "../component/utils.js";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const ProductScreen = () => {
  const navigate = useNavigate();

  //const [products, setProducts] = useState([]);
  const [filter, setFilters] = useState("");
  const [bank, setBank] = useState("");

  const [{ loading, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
  });

  useEffect(() => {
    if (filter !== "") {
      const fetchData = async () => {
        dispatch({ type: "FETCH_REQUEST" });
        try {
          const result = await axios.get(`/api/products/name/${filter}`);
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
          //setProducts(result.data);
        } catch (err) {
          dispatch({ type: "FETCH_FAIL" });
          toast.error(getError(err));
        }
      };
      fetchData();
    }
  }, [filter]);

  const handleFilters = async (e) => {
    setFilters(e.target.value);
  };

  const handleBank = async (e) => {
    setBank(e.target.value);
  };

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const cart = state;

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, bank },
    });

    navigate("/customer");
  };
  console.log(cart);
  return (
    <div className="form">
      <form>
        <label>Liter</label>
        <select name="liter" onChange={handleFilters}>
          <option>Select Liter</option>
          <option>0.5L Water</option>
          <option>1L Water</option>
          <option>2L Water</option>
          <option>3L Water</option>
          <option>5L Water</option>
        </select>

        <label>Bank</label>
        <select name="bank" onChange={handleBank}>
          <option>Select Bank</option>
          <option>Awash Bank</option>
          <option>Abyssinia Bank</option>
          <option>Commercail Bank of Ethiopia</option>
          <option>Telebirr</option>
          <option>Buna Bank</option>
        </select>
        <label>Price</label>
        <input name="price" type="text" value={product.price} disabled={true} />

        <button className="btn" onClick={submitHandler}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductScreen;
