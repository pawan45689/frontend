import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
const apiUrl = process.env.REACT_APP_API_URL;

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = () => {
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  // Remove item from cart
  const removeCartItem = (pid) => {
    let updatedCart = cart.filter((item) => item._id !== pid);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item removed from cart");
  };

  // Fetch Braintree client token
  const getToken = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/v1/product/braintree/token`);
      setClientToken(data.clientToken);
    } catch (error) {
      console.error("Error fetching Braintree token:", error);
    }
  };

  useEffect(() => {
    if (auth?.token) getToken();
  }, [auth?.token]);

  // Handle payment
  const handlePayment = async () => {
    if (!instance) {
      toast.error("Payment gateway not initialized. Please wait.");
      return;
    }
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post( `${apiUrl}/api/v1/product/braintree/payment`, {
        nonce,
        cart,
      });

      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Successful!");
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("Payment Failed. Try again.");
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="cart-page py-4">
  <div className="container">
    {/* Greeting */}
    <div className="text-center mb-4">
      <h1 className="fw-bold text-primary">
        {auth?.user ? `Hello, ${auth.user.username}` : "Hello Guest"}
      </h1>
      <p className="text-muted fs-5">
        {cart.length
          ? `You have ${cart.length} items in your cart ${
              auth?.token ? "" : "Please login to checkout!"
            }`
          : "Your Cart is Empty 🛒"}
      </p>
    </div>

    <div className="row g-4">
      {/* Cart Items */}
      <div className="col-lg-7">
        <div className="card shadow-sm border-0 p-3">
          <h4 className="mb-3 text-secondary">Your Items</h4>
          {cart.length === 0 ? (
            <p className="text-muted">No products in cart</p>
          ) : (
            cart.map((p) => (
              <div
                className="card mb-3 border-0 shadow-sm"
                key={p._id}
                style={{ borderRadius: "12px" }}
              >
                <div className="row g-0 align-items-center">
                  {/* Product Image */}
                  <div className="col-md-3">
                    <img
                      src={`${apiUrl}/api/v1/product/get-image/${p._id}`}
                      className="img-fluid rounded-start"
                      alt={p.name}
                      style={{ height: "120px", objectFit: "cover" }}
                    />
                  </div>
                  {/* Product Info */}
                  <div className="col-md-6">
                    <div className="card-body">
                      <h6 className="fw-bold">{p.name}</h6>
                      <p className="text-muted small mb-1">
                        {p.description.substring(0, 40)}...
                      </p>
                      <p className="fw-semibold text-primary mb-0">
                        ${p.price}
                      </p>
                    </div>
                  </div>
                  {/* Remove Button */}
                  <div className="col-md-3 text-end pe-3">
                    <button
                      className="btn btn-sm btn-outline-danger rounded-pill px-3"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Cart Summary */}
      <div className="col-lg-5">
        <div className="card shadow-sm border-0 p-4">
          <h4 className="fw-bold text-secondary">Cart Summary</h4>
          <hr />
          <h5 className="mb-3">
            Total: <span className="text-success">{totalPrice()}</span>
          </h5>

          {/* Address Section */}
          {auth?.user?.address ? (
            <div className="mb-3">
              <h6 className="text-muted">Delivery Address</h6>
              <p className="fw-semibold">{auth.user.address}</p>
              <button
                className="btn btn-sm btn-outline-primary rounded-pill"
                onClick={() => navigate("/dashboard/user/profile")}
              >
                Update Address
              </button>
            </div>
          ) : (
            <div className="mb-3">
              {auth?.token ? (
                <button
                  className="btn btn-sm btn-outline-primary rounded-pill"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Add Delivery Address
                </button>
              ) : (
                <button
                  className="btn btn-sm btn-warning rounded-pill"
                  onClick={() => navigate("/login", { state: "/cart" })}
                >
                  Please Login to Checkout
                </button>
              )}
            </div>
          )}

          {/* Payment Section */}
          {clientToken && auth?.token && cart.length > 0 && (
            <div className="mt-3">
              <DropIn
                options={{
                  authorization: clientToken,
                  paypal: { flow: "vault" },
                }}
                onInstance={(inst) => setInstance(inst)}
              />
              <button
                className="btn btn-success w-100 mt-2 fw-bold py-2"
                onClick={handlePayment}
                disabled={loading || !instance || !auth?.user?.address}
                style={{ borderRadius: "10px" }}
              >
                {loading ? "Processing..." : "💳 Make Payment"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</div>

    </Layout>
  );
};

export default CartPage;
