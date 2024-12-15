import { memo } from "react";
import Link from "next/link";

function MainNode({
  data,
}: {
  data: { name: string; description: React.ReactNode };
}) {
  return (
    <div className="w-96 h-96 p-4 bg-white rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="text-xl mb-4 text-black font-title font-bold">
        {data.name}
      </div>
      <div className="text-black text-xs font-body">{data.description}</div>
    </div>
  );
}

export default memo(MainNode);
