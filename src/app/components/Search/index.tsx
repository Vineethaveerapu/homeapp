"use client";
import { SetStateAction, useState, useEffect } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import { getSearchPosts } from "@/utils/supabase/queries";
import { useQuery } from "@tanstack/react-query";

const SearchInput = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [debouncedInput, setDebouncedInput] = useState<string>("");

  // Debounce the input to prevent excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInput(userInput);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [userInput]);

  const { data } = useQuery({
    queryKey: ["search-results", debouncedInput],
    queryFn: async () => {
      const { data, error } = await getSearchPosts(debouncedInput);
      if (error) throw new Error();
      return data;
    },
    enabled: debouncedInput.length > 2, // Only search with 3+ characters
    staleTime: 2 * 60 * 1000 // 2 minutes cache for search results
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
      {data && Array.isArray(data) && data.length > 0 && (
        <div
          onClick={() => setUserInput("")}
          className="flex flex-col gap-2 mt-2 bg-gray-100 rounded-2xl p-2"
        >
          {data.map(({ title, slug }: { title: string; slug: string }) => (
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
