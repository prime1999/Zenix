import Creating from "@/components/Loaders/Creating";

const FullPageLoader = () => {
  return (
    <main
      className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 relative overflow-hidden"
      style={{
        backgroundColor: "#ebe6ed",
        backgroundImage:
          "radial-gradient(circle at 50% 45%, rgba(188, 131, 245, 0.45) 0%, rgba(235, 230, 237, 0) 65%)",
      }}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <Creating />
        <h6 className="font-sans">Just a sec... </h6>
      </div>
    </main>
  );
};

export default FullPageLoader;
