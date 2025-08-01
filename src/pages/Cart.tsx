/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/Layout/PageTransition";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } =
    useCart();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email_id: "",
    first_name: "",
    last_name: "",
    user_type: "",
    user_id: "",
  });

  useEffect(() => {
    const catalyst = (window as any).catalyst;
    const userManagement = catalyst.userManagement;
    const currentUserPromise = userManagement.getCurrentProjectUser();
    currentUserPromise
      .then((response) => {
        setUser(response.content);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleCheckout = () => {
    navigate("/checkout", { state: { cart, user } });
  };

  return (
    <PageTransition>
      <div className="min-h-screen">
        <main className="pt-28 px-4 md:px-10 max-w-7xl mx-auto">
          <section className="py-12">
            <h1 className="h1 mb-8">Your Cart</h1>

            {cart.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="h3 mb-4">Your cart is empty</h2>
                <p className="text-muted-foreground mb-8">
                  Looks like you haven't added any items to your cart yet.
                </p>
                <Button asChild>
                  <Link to="/shop">Continue Shopping</Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {cart.map((item) => (
                    <div
                      key={`${item.id}-${item.color}-${item.size}`}
                      className="flex flex-col sm:flex-row gap-4 border border-border rounded-md p-4"
                    >
                      <div className="w-full sm:w-24 h-24 bg-muted rounded-md overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.color && `Color: ${item.color}`}
                            {item.size && item.color && " | "}
                            {item.size && `Size: ${item.size}`}
                          </p>
                          <p className="font-medium mt-1">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none"
                              onClick={() =>
                                updateQuantity(
                                  item,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={16} />
                            </Button>
                            <span className="w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none"
                              onClick={() =>
                                updateQuantity(item, item.quantity + 1)
                              }
                            >
                              <Plus size={16} />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="w-full sm:w-auto"
                  >
                    Clear Cart
                  </Button>
                </div>

                <div className="lg:col-span-1">
                  <div className="border border-border rounded-md p-6 space-y-6 sticky top-28">
                    <h3 className="font-medium text-lg">Order Summary</h3>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>Calculated at checkout</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax</span>
                        <span>Calculated at checkout</span>
                      </div>

                      <Separator />

                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    <Button className="w-full" onClick={handleCheckout}>
                      Proceed to Checkout
                    </Button>

                    <p className="text-xs text-muted-foreground text-center pt-4">
                      Shipping and taxes calculated at checkout
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </PageTransition>
  );
};

export default Cart;
