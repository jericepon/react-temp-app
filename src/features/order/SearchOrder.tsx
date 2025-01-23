import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";

const SearchOrder = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Input
        placeholder="Search order #"
        className="bg-yellow-300 text-primary-foreground border-none ring-0 focus-visible:ring-transparent"
        onInput={(e) => setQuery(e.currentTarget.value)}
      />
    </form>
  );
};

export default SearchOrder;
