import { Suspense } from "react";
import Footer from "@/components/Footer";
import FullPageLoader from "@/components/Loaders/FullPageLoader";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<FullPageLoader />}>
        {children}
        <Footer />
      </Suspense>
    </main>
  );
};

export default layout;
