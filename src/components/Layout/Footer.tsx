import React, { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubscribe = () => {
    if (!validateEmail(email)) {
      setDialogMessage("Invalid email address. Please enter a valid one.");
      setIsError(true);
    } else {
      setDialogMessage("Thanks for joining our newsletter.");
      setIsError(false);
    }
    setDialogOpen(true);
  };

  return (
    <>
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="h3">Join Our Community</h2>
          <p className="text-muted-foreground">
            Subscribe to our newsletter for exclusive offers, style updates, and
            first access to new collections.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            <button
              onClick={handleSubscribe}
              className="bg-primary text-primary-foreground h-10 px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary/90"
            >
              Subscribe
            </button>
            {dialogOpen && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
                  <h2
                    className={`text-lg font-semibold mb-2 ${
                      isError ? "text-red-600" : "text-gray-700"
                    }`}
                  >
                    {isError ? "Error" : "You're Subscribed!"}
                  </h2>
                  <p className="text-muted-foreground">{dialogMessage}</p>
                  <button
                    onClick={() => setDialogOpen(false)}
                    className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-muted py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h3 className="font-display text-xl">Elegance</h3>
            <p className="text-muted-foreground text-sm">
              Timeless pieces crafted with exceptional attention to detail and
              quality.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Shop</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Bestsellers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Collections
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Accessories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Sale
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Company</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Press
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Customer Care</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Size Guide
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground order-2 md:order-1">
            © {new Date().getFullYear()} Elegance. All rights reserved.
          </div>
          <div className="flex gap-6 order-1 md:order-2">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
