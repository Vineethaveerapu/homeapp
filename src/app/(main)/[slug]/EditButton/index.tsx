"use client";
import { useRouter } from "next/navigation";

const EditButton = ({ slug }: { slug: string }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/${slug}/edit`);
  };

  return (
    <button onClick={handleClick} className="button-tertiary">
      Edit Post
    </button>
  );
};

export default EditButton;
