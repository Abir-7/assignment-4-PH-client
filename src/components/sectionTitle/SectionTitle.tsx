const SectionTitle = ({ text }: { text: string }) => {
  return (
    <div className="flex justify-center items-center">
      <div className=" text-xl sm:text-2xl rounded-xl  px-4 pt-1 pb-2 text-green-600 text-center my-3 border-green-600 border-b-2 font-bold">
        <h1> {text}</h1>
      </div>
    </div>
  );
};

export default SectionTitle;
