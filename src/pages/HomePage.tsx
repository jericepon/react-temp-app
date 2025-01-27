import ButtonLink from "@/components/ButtonLink";
import CreateUser from "@/features/user/CreateUser";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { username } = useSelector((state: RootState) => state.user);

  return (
    <div className="flex grow justify-center items-center h-full">
      <div className="page-inner flex flex-col items-center text-center md:pb-80 justify-center items-center">
        <h1 className="text-3xl font-display tracking-widest">The best pizza.</h1>
        <div className="text-4xl mt-4 text-primary font-semibold text-primary">
          Straight out the oven, straight to you.
        </div>

        <div className="text-lg mt-6">Welcome!, Please start by telling us your name:</div>

        {!username ? (
          <CreateUser />
        ) : (
          <ButtonLink className="mt-6" to="/menu">
            Order Now
          </ButtonLink>
        )}
      </div>
    </div>
  );
};

export default HomePage;
