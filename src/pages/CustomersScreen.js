import React, { useContext, useState } from "react";
import "../component/FormStyles.css";
import { useNavigate } from "react-router-dom";
import { Store } from "../component/Store";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../component/utils.js";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const CustomerScreen = () => {
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems, customerInfo },
  } = state;

  const [phoneNumber, setPhone] = useState(customerInfo.phone || "");
  const [accountNumber, setAccount] = useState(
    customerInfo.accountNumber || ""
  );

  const handleClick = (e) => {
    e.preventDefault();

    try {
      axios.post("/api/order", {
        cartItems,
        phoneNumber,
        accountNumber,
      });
      ctxDispatch({
        type: "CUSTOMER_INFO",
        payload: { phoneNumber, accountNumber },
      });
      localStorage.setItem(
        "customerInfo",
        JSON.stringify({
          phoneNumber,
          accountNumber,
        })
      );
      //console.log(stamp.format("yyyy-MM-dd HH:mm:ss"));
      console
        .log
        /*<Moment format="yyyy-MM-dd HH:mm:ss" unix tz="Africa/Addis Ababa">
          {stamp}
        </Moment>*/
        ();
      navigate("/placeorder");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div className="form">
      <form>
        <label>Phone Number</label>

        <input
          type="text"
          placeholder="25191*******"
          required
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        ></input>

        <label>Account Number</label>
        <input
          type="accNo"
          required
          onChange={(e) => {
            setAccount(e.target.value);
          }}
        ></input>

        <button className="btn" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CustomerScreen;
