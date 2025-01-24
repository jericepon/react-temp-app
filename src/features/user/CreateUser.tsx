import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppDispatch } from "@/store";
import { updateUserName } from "@/store/features/user";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const CreateUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    const formValues = Object.fromEntries(formData.entries());

    dispatch(updateUserName(formValues.username));
    navigate("/order/new");
  };
  return (
    <form onSubmit={handleOnSubmit} className="max-w-[400px] w-full mt-5 space-y-8">
      <Input name="username" className="ring-2 ring-primary" />
      <Button>Order Now</Button>
    </form>
  );
};

export default CreateUser;
