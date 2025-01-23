import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RootState } from "@/store";
import { updateUserName } from "@/store/features/user";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="flex grow justify-center items-center h-full">
      <div className="page-inner flex flex-col items-center text-center md:pb-80">
        <h1 className="text-3xl font-display tracking-widest">The best pizza.</h1>
        <div className="text-4xl mt-4 text-primary font-semibold text-primary">
          Straight out the oven, straight to you.
        </div>
        <div className="text-lg mt-6">Welcome!, Please start by telling us your name:</div>
        <Input
          className="ring-2 ring-primary max-w-[400px] w-full mt-5"
          onChange={(e) => dispatch(updateUserName(e.target.value))}
        />
        <Button
          className={`mt-8 ${user.username === "" ? "opacity-0 pointer-events-none" : ""}`}
          onClick={() => navigate("/order/new")}
        >
          Order Now
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
