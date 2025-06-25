/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useCart } from "@/hooks/useCart";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const cartItems = state?.cart || [];
  const user = state?.user || {};
  const [form, setForm] = useState({
    name: [user.first_name, user.last_name].filter(Boolean).join(" "),
    address: "",
    phone: "",
  });
  const { clearCart } = useCart();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [dialog, setDialog] = useState({
    open: false,
    message: "",
    success: false,
  });

  const subtotal = cartItems.reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0
  );

  const shipping = 50; // flat shipping for example
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = async () => {
    try {
      const { name, address, phone } = form;
      if (!name.trim() || !address.trim() || !phone.trim()) {
        setDialog({
          open: true,
          message: "Please fill in all required fields.",
          success: false,
        });
        return;
      }
      await axios.post(
        "https://vibrant-variant-venue-routes-handler-10100989956.development.catalystappsail.com/checkout",
        {
          address: form.address,
          phone: form.phone,
          orders: JSON.stringify(cartItems),
          total: subtotal,
          userId: user.user_id,
        }
      );

      setDialog({
        open: true,
        message: "Your order was placed successfully!",
        success: true,
      });

      clearCart();

      setTimeout(() => {
        navigate("/orders");
      }, 1500);
    } catch (error) {
      console.log("error - ", error);
      setDialog({
        open: true,
        message: "Failed to place your order. Please try again.",
        success: false,
      });
    }
  };

  return (
    <div className="pt-32 max-w-6xl mx-auto pb-20 px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Left: Form */}

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Shipping Details</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-md px-4 py-2"
        />
        <textarea
          name="address"
          placeholder="Shipping Address"
          value={form.address}
          onChange={handleChange}
          className="w-full border rounded-md px-4 py-2"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full border rounded-md px-4 py-2"
        />
      </div>

      {/* Right: Order Summary */}
      <div className="border p-6 rounded-md shadow-sm space-y-6">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <div className="space-y-4 max-h-72 overflow-y-auto">
          {cartItems.map((item: any) => (
            <div key={item.id} className="flex items-start gap-4 border-b pb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <div className="text-sm text-muted-foreground">
                  Size: {item.size.toUpperCase()}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  Color: {item.color}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {item.quantity} × ${item.price.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold pt-2 border-t">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full mt-4"
          onClick={handlePlaceOrder}
        >
          Place Order
        </Button>
      </div>

      {/* Dialog */}
      <Dialog
        open={dialog.open}
        onOpenChange={() => setDialog({ ...dialog, open: false })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialog.success ? "Success" : "Error"}</DialogTitle>
          </DialogHeader>
          <p>{dialog.message}</p>
          <DialogFooter>
            <Button onClick={() => setDialog({ ...dialog, open: false })}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckoutPage;
