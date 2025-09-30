"use client";
import { SetStateAction, useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import { getSearchPosts } from "@/utils/supabase/queries";
import { useQuery } from "@tanstack/react-query";

const SearchInput = () => {
  const [userInput, setUserInput] = useState<string>("");

  const { data } = useQuery({
    queryKey: ["search-results", userInput],
    queryFn: async () => {
      const { data, error } = await getSearchPosts(userInput);
      if (error) throw new Error();
      return data;
    },
    enabled: userInput && userInput.length > 0 ? true : false
  });

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setUserInput(e.target.value);
  };

  return (
    <div className="grid gap-2">
      <div className="border-2 border-gray-700 rounded-2xl p-2 relative flex items-center gap-2">
        <Search size={32} />
        <input
          className="block w-full bg-transparent outline-none "
          name="search"
          placeholder="Search"
          value={userInput}
          onChange={handleChange}
        />
      </div>
      {data && (
        <div
          onClick={() => setUserInput("")}
          className="flex flex-col gap-2 mt-2 bg-gray-100 rounded-2xl p-2"
        >
          {data.map(({ title, slug }) => (
            <Link className="block" href={`${slug}`} key={slug}>
              {title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
