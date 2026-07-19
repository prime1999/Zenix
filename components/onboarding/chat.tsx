import { ArrowUp } from "lucide-react";
import { Textarea } from "../ui/textarea";

const chat = () => {
  return (
    <main className="relative">
      <Textarea
        placeholder="Fill free to express yourself..."
        className="backdrop-blur-6xl mt-6 h-24"
      />
      <button className="absolute right-3 bottom-2 bg-primary-purple text-white rounded-full p-2 cursor-pointer duration-500 hover:bottom-3">
        <ArrowUp size={13} />
      </button>
    </main>
  );
};

export default chat;
