"use client";

import { ClientSideSuspense } from "@liveblocks/react";
import Link from "next/link";
import { RoomProvider, useMutation } from "../../../../liveblocks.config";
import { nanoid } from "nanoid";
import { LiveList } from "@liveblocks/client";
import { toast } from "sonner";

export default function Page({ params }: { params: { type: string } }) {
  return (
    <RoomProvider
      id="orders"
      initialPresence={{}}
      initialStorage={{ orders: new LiveList([]) }}
      autoConnect
    >
      <ClientSideSuspense fallback={null}>
        {() => <Component type={params.type} />}
      </ClientSideSuspense>
    </RoomProvider>
  );
}

const TOPPINGS = [
  { label: "🧀 Cheese", value: "cheese" },
  { label: "🧅 Onion", value: "onion" },
  { label: "🔥 Toasted Buns", value: "toasted" },
];

const Component = ({ type }: { type: string }) => {
  const addOrder = useMutation(({ storage }, newOrder) => {
    console.log(newOrder);
    storage.get("orders").push(newOrder);
    toast.success("Order submitted!");
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <div className="w-fit">
        <Link
          href="/"
          className="rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Back to Menu
        </Link>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const hasCheese = formData.get("cheese") === "on";
          const hasOnion = formData.get("onion") === "on";
          const hasToasted = formData.get("toasted") === "on";

          const order: {
            id: string;
            name: string;
            orderedAt: string;
            hasCheese: boolean;
            hasOnion: boolean;
            hasToasted: boolean;
            type: string;
          } = {
            id: nanoid(),
            name: formData.get("first-name") as string,
            orderedAt: new Date().toISOString(),
            hasCheese,
            hasOnion,
            hasToasted,
            type: formData.get("type") as string,
          };
          addOrder(order);
        }}
      >
        <div className="space-y-6">
          <div className="">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 px-2"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pb-12">
            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-white">
                  Add-ons
                </legend>
                <div className="mt-6 space-y-6">
                  {TOPPINGS.map(({ label, value }) => {
                    return (
                      <div className="relative flex gap-x-3" key={value}>
                        <div className="flex h-6 items-center">
                          <input
                            id={value}
                            name={value}
                            type="checkbox"
                            className="h-4 w-4 rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                          />
                        </div>
                        <div className="text-lg leading-6">
                          <label
                            htmlFor={value}
                            className="font-medium text-white"
                          >
                            {label}
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="sr-only">
          <input type="text" value={type} id="type" name="type" readOnly />
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Submit Order to Grill Master
          </button>
        </div>
      </form>
    </div>
  );
};
