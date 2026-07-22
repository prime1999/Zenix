import Link from "next/link";

const Footer = () => {
  return (
    <footer className="sticky bottom-3 flex gap-1 items-center justify-center font-sans text-sm">
      built by{" "}
      <Link
        href="https://priime-portfolio.vercel.app"
        target="_blank"
        className="font-nevera tracking-widest cursor-pointer duration-500 transition hover:font-semibold"
      >
        priime
      </Link>
    </footer>
  );
};

export default Footer;
