
import React from 'react';
import Navbar from '@/components/Layout/Navbar';
import PageTransition from '@/components/Layout/PageTransition';
import { ScrollArea } from '@/components/ui/scroll-area';

const Collections = () => {
  return (
    <ScrollArea className="h-screen w-full">
      <PageTransition>
        <div className="min-h-screen">
          {/* Navbar */}
          <Navbar />
          
          {/* Main Content */}
          <main className="pt-28 px-4 md:px-10 max-w-7xl mx-auto">
            <section className="py-12">
              <h1 className="h1 mb-8">Collections</h1>
              <p className="p-large text-muted-foreground max-w-3xl mb-12">
                Explore our thoughtfully designed collections, each telling a unique story through premium materials and expert craftsmanship.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="rounded-md border border-border bg-card p-6 shadow-sm flex flex-col justify-center items-center text-center h-64">
                  <h3 className="h4 mb-2">Winter Collection</h3>
                  <p className="text-muted-foreground">
                    Coming this Fall - Stay tuned for updates.
                  </p>
                </div>
                <div className="rounded-md border border-border bg-card p-6 shadow-sm flex flex-col justify-center items-center text-center h-64">
                  <h3 className="h4 mb-2">Summer Essentials</h3>
                  <p className="text-muted-foreground">
                    Coming this Fall - Stay tuned for updates.
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

export default Collections;
