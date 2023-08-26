import Image from "next/image";

const Loader = () => {
  return (
    <div className="flex w-full items-center justify-center h-full">
      <Image
        className="animate-ping"
        src="/assets/icons/loader.svg"
        alt="loader"
        width={60}
        height={60}
      />
    </div>
  );
};

export default Loader;
