import { Header } from "./Header";

export const Success = () => {
  return (
    <div className="w-screen h-screen bg-[#F4F4F4] flex flex-col justify-center items-center ">
      <div className="w-[480px]  bg-white flex flex-col ">
        <div className="px-8 text-black">
          <Header />
          <div className=" text-black font-semibold text-2x">
            You're All Set 🔥
          </div>
          <div className="text-gray-500 mb-7">
            We have received your submission. Thank you!
          </div>
        </div>
      </div>
    </div>
  );
};
