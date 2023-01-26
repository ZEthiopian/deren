import axios from "axios";
import React, { useContext } from "react";
//import { useNavigate, useParams } from "react-router-dom";
import { Store } from "../component/Store";
import { toast } from "react-toastify";
import { getError } from "../component/utils.js";
//import Moment from "react-moment";
import "moment-timezone";
import moment from "moment-timezone";

function PlaceOrderScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const stamp = moment(new Date());

  function keyGen(keyLength) {
    var i,
      key = "",
      characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    var charactersLength = characters.length;

    for (i = 0; i < keyLength; i++) {
      key += characters.substr(
        Math.floor(Math.random() * charactersLength + 1),
        1
      );
    }

    return key;
  }

  const placeOrderHandler = () => {
    if (cart.cartItems.bank === "Awash Bank") {
      axios
        .post("/api/orderbank", {
          amount: cart.cartItems.price,
          transaction_Id: keyGen(12),
          timeStamp: stamp
            .tz("Africa/Addis Ababa")
            .format("YYYY-MM-DD HH:mm:ss"),
          accountNumber: cart.customerInfo.accountNumber,
          //phoneNumber: cart.customerInfo.phone,
        })
        .then((response) => {
          console.log(response);
        })
        //ctxDispatch({ type: "CART_CLEAR" });
        //dispatch({ type: "CREATE_SUCCESS" });

        // navigate(`/order/${data.order._id}`);
        .catch((err) => {
          // dispatch({ type: "CREATE_FAIL" });
          toast.error(getError(err));
        });
      localStorage.removeItem(cart.cartItems);
    }
  };

  return (
    <div className="form">
      <strong>Bank:</strong> {cart.cartItems.bank} <br />
      <strong>Account Number:</strong> {cart.customerInfo.accountNumber} <br />
      <strong>Product:</strong> {cart.cartItems.name} <br />
      <strong>Price:</strong> {cart.cartItems.price} <br />
      <strong>Phone Number:</strong> {cart.customerInfo.phone} <br />
      <button className="btn" onClick={placeOrderHandler}>
        Submit
      </button>
    </div>
  );
}

export default PlaceOrderScreen;
