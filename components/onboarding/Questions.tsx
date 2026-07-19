type QuestionsProps = {
  question: string;
};

const Questions = ({ question }: QuestionsProps) => {
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold">{question}</h2>
    </div>
  );
};

export default Questions;
