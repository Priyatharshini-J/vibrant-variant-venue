import PageTransition from "@/components/Layout/PageTransition";

const Collections = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <main className="pt-28 px-4 md:px-10 max-w-7xl mx-auto">
          <section className="py-12">
            <h1 className="h1 mb-8">Collections</h1>
            <p className="p-large text-muted-foreground max-w-3xl mb-12">
              Explore our thoughtfully designed collections, each telling a
              unique story through premium materials and expert craftsmanship.
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
                  Coming this Autumn - Stay tuned for updates.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </PageTransition>
  );
};

export default Collections;
