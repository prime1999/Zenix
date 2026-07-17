import LoginForm from "@/components/login-form";

const Page = () => {
  return (
    <div
      className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 relative overflow-hidden"
      style={{
        backgroundColor: "#ebe6ed",
        backgroundImage:
          "radial-gradient(circle at 50% 45%, rgba(188, 131, 245, 0.45) 0%, rgba(235, 230, 237, 0) 65%)",
      }}
    >
      <div className="w-full max-w-sm z-10">
        <LoginForm />
      </div>
    </div>
  );
};

export default Page;
