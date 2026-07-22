import Footer from "@/components/Footer";
import { Suspense } from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen">
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-centertext-sm font-sans">
            Loading...
          </div>
        }
      >
        {children}
        <Footer />
      </Suspense>
    </main>
  );
};

export default layout;
