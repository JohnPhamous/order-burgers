import Link from "next/link";

export default function Home() {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-1 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 w-full"
    >
      {files.map((file) => (
        <li key={file.source} className="relative">
          <Link href={`/burger/${file.type}`}>
            <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={file.source}
                alt=""
                className="pointer-events-none object-cover group-hover:opacity-75"
              />
              <button
                type="button"
                className="absolute inset-0 focus:outline-none"
              >
                <span className="sr-only">View details for {file.title}</span>
              </button>
            </div>
          </Link>

          <p className="pointer-events-none mt-2 block truncate text-base font-medium text-gray-500">
            {file.title}
          </p>
        </li>
      ))}
    </ul>
  );
}

const files = [
  {
    title: "Burger",
    size: "3.9 MB",
    type: "meat",
    source:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=4338&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Veggie Burger",
    size: "3.9 MB",
    type: "veggie",
    source:
      "https://images.unsplash.com/photo-1521305916504-4a1121188589?auto=format&fit=crop&q=80&w=3370&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
