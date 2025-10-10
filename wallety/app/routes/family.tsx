import EntryCard from "~/components/EntryCard";

import BalanceCard from "~/components/BalanceCard";

import { useUser } from "~/contexts/UserContext";
import type { Route } from "./+types/family";
import type { FamilyEntry } from "~/types/entries";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Wallety Family" },
    { name: "description", content: "Your Family finance dashboard" },
  ];
}

export default function Family() {
  const { user } = useUser();

  const [familyEntries, setFamilyEntries] = useState<FamilyEntry[]>([]);

  const totalIncome = familyEntries?.filter((entry) => entry.type === "income")
    ?.reduce((acc, entry) => acc + entry.value, 0) ?? 0;

  const totalExpense = familyEntries?.filter((entry) => entry.type === "expense")
    ?.reduce((acc, entry) => acc + entry.value, 0) ?? 0;

  const totalUserIncome = familyEntries?.filter((entry) => entry.type === "income" && entry.userId == user?.id)
    ?.reduce((acc, entry) => acc + entry.value, 0) ?? 0;

  const totalUserExpense = familyEntries?.filter((entry) => entry.type === "expense" && entry.userId == user?.id)
    ?.reduce((acc, entry) => acc + entry.value, 0) ?? 0;

  const totalBalance = totalIncome - totalExpense;

  useEffect(() => {
    if (!user) return;
    const fetchFamilyEntries = async () => {
      const response = await fetch(`http://localhost:3001/family/${user.currentFamilyId}/entries`);
      const data = await response.json();
      setFamilyEntries(data);
    };
    fetchFamilyEntries();
  }, [user]);
  
  if (!user) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-4 md:gap-y-0 gap-y-4">
      <div className="w-full">
        <BalanceCard
          totalBalance={totalBalance}
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          userIncome={totalUserIncome}
          userExpense={totalUserExpense}
          user={user}
          isFamilyView
        />
      </div>
      <div className="flex flex-col gap-4 col-span-2">
        <div className="flex items-center gap-4 justify-between">
          <h1 className="text-xl text-white md:text-2xl font-bold">Últimas Entradas da Família</h1>
        </div>
        <div className="flex flex-col gap-2">
          {familyEntries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </div>
  );
}

