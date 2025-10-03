import EntryCard from "~/components/EntryCard";
import type { Route } from "./+types/home";
import type { Entry } from "~/types/entries";
import BalanceCard from "~/components/BalanceCard";
import { useUser } from "~/contexts/UserContext";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { user } = useUser();
  const entries: Entry[] = [
    {
      id: "1",
      userId: "1",
      title: "Salário",
      value: 5000,
      date: "2025-09-22",
      type: "income",
      category: "salary",
      description: "Salário mensal",
      createdAt: "2025-09-22",
      updatedAt: "2025-09-22",
    },
    {
      id: "2",
      userId: "1",
      title: "Almoço",
      value: 35,
      date: "2025-09-20",
      type: "expense",
      category: "food",
      description: "Almoço com amigos",
      createdAt: "2025-09-20",
      updatedAt: "2025-09-20",
    },
    {
      id: "3",
      userId: "1",
      title: "Presente",
      value: 100,
      date: "2025-09-18",
      type: "income",
      category: "gift",
      description: "Presente para a mãe",
      createdAt: "2025-09-18",
      updatedAt: "2025-09-18",
    },
    {
      id: "4",
      userId: "1",
      title: "Viagem",
      value: 100,
      date: "2025-09-18",
      type: "expense",
      category: "transport",
      description: "Viagem para a praia",
      createdAt: "2025-09-18",
      updatedAt: "2025-09-18",
    },
  ];

  const totalBalance = entries.reduce((acc, entry) => {
    return acc + entry.value;
  }, 0);

  const totalIncome = entries
    .filter((entry) => entry.type === "income")
    .reduce((acc, entry) => {
      return acc + entry.value;
    }, 0);

  const totalExpense = entries
    .filter((entry) => entry.type === "expense")
    .reduce((acc, entry) => {
      return acc + entry.value;
    }, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-4 md:gap-y-0 gap-y-4">
      <div className="w-full">
        <BalanceCard
          totalBalance={totalBalance}
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          user={user}
        />
      </div>

      <div className="flex flex-col gap-4 col-span-2">
        <div className="flex items-center gap-4 justify-between">
          <h1 className="text-xl md:text-2xl leading-none font-bold">Ultimas entradas</h1>
          <button className="button">Adicionar entrada</button>
        </div>

        <div className="flex flex-col gap-2">
          {entries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </div>
  );
}
