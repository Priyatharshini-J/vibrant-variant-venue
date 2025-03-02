
import React from 'react';
import Navbar from '@/components/Layout/Navbar';
import PageTransition from '@/components/Layout/PageTransition';
import { ScrollArea } from '@/components/ui/scroll-area';

const About = () => {
  return (
    <ScrollArea className="h-screen w-full">
      <PageTransition>
        <div className="min-h-screen">
          {/* Navbar */}
          <Navbar />
          
          {/* Main Content */}
          <main className="pt-28 px-4 md:px-10 max-w-7xl mx-auto">
            <section className="py-12">
              <h1 className="h1 mb-8">Our Story</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div>
                  <p className="p-large mb-6">
                    Founded in 2018, Elegance was born from a passion for timeless design and sustainable craftsmanship. Our journey began with a simple vision: to create premium quality garments that stand the test of time, both in style and durability.
                  </p>
                  <p className="mb-6">
                    We believe that true luxury lies in the quality of materials, the skill of the craftspeople, and the consideration of our impact on the planet. That's why we partner exclusively with ethical manufacturers and source only the finest sustainable materials from around the world.
                  </p>
                  <p>
                    Every piece in our collection is designed with intention, balancing contemporary aesthetics with enduring appeal. We create garments meant to be cherished and worn for years to come, not discarded with passing trends.
                  </p>
                </div>
                <div className="rounded-md overflow-hidden aspect-square">
                  <img 
                    src="https://images.unsplash.com/photo-1551446591-142875a901a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                    alt="Elegance workshop" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </section>
            
            <section className="py-12">
              <h2 className="h2 mb-8">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="border border-border rounded-md p-6">
                  <h3 className="h4 mb-4">Quality</h3>
                  <p className="text-muted-foreground">
                    We select only the finest materials and work with skilled artisans who share our commitment to excellence.
                  </p>
                </div>
                <div className="border border-border rounded-md p-6">
                  <h3 className="h4 mb-4">Sustainability</h3>
                  <p className="text-muted-foreground">
                    From responsible sourcing to ethical production, we consider our environmental impact at every step.
                  </p>
                </div>
                <div className="border border-border rounded-md p-6">
                  <h3 className="h4 mb-4">Timelessness</h3>
                  <p className="text-muted-foreground">
                    We design pieces that transcend seasons and trends, creating a wardrobe of lasting favorites.
                  </p>
                </div>
              </div>
            </section>
          </main>
          
          {/* Footer */}
          <footer className="bg-muted py-16 px-6">
            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-muted-foreground order-2 md:order-1">
                © {new Date().getFullYear()} Elegance. All rights reserved.
              </div>
              <div className="flex gap-6 order-1 md:order-2">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cookies
                </a>
              </div>
            </div>
          </footer>
        </div>
      </PageTransition>
    </ScrollArea>
  );
};

export default About;
