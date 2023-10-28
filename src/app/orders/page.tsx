"use client";

import { ClientSideSuspense } from "@liveblocks/react";
import Link from "next/link";
import { nanoid } from "nanoid";
import { LiveList } from "@liveblocks/client";
import { toast } from "sonner";
import {
  RoomProvider,
  useMutation,
  useStorage,
} from "../../../liveblocks.config";

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
  const orders = useStorage((root) => root.orders);

  console.log(orders);
  return (
    <div className="flex flex-col gap-1">
      <ul className="flex flex-col gap-2">
        {orders.map((order) => {
          return (
            <li key={order.id} className="bg-slate-800">
              <p>{order.name}</p>
              <p>{order.hasCheese && "🧀"}</p>
              <p>{order.hasOnion && "🧅"}</p>
              <p>{order.hasToasted && "🔥"}</p>
              <p>{order.orderedAt}</p>
              <p>{order.type}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
