import EntryCard from "~/components/EntryCard";

import BalanceCard from "~/components/BalanceCard";

import { useUser } from "~/contexts/UserContext";
import type { Route } from "./+types/family";
import type { FamilyEntry } from "~/types/entries";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Wallety Family" },
    { name: "description", content: "Your Family finance dashboard" },
  ];
}

export default function Family() {
  const { user } = useUser();

  const familyEntries: FamilyEntry[] = [
    {
      id: "1", userId: "1", title: "Supermercado (Compras do mês)", value: 750.50, date: "2025-10-03", type: "expense", category: "food", description: "Compras mensais", createdAt: "2025-10-03", updatedAt: "2025-10-03",
      user: { id: "1", name: "Ana Silva", avatarUrl: `https://i.pravatar.cc/48?u=sam` }
    },
    {
      id: "2", userId: "2", title: "Salário", value: 6500, date: "2025-10-05", type: "income", category: "salary", description: "Salário mensal", createdAt: "2025-10-05", updatedAt: "2025-10-05",
      user: { id: "2", name: "Pedro Silva", avatarUrl: `https://i.pravatar.cc/48?u=pedro` }
    },
    {
      id: "3", userId: "2", title: "Conta de Luz", value: 230.00, date: "2025-10-04", type: "expense", category: "housing", description: "Pagamento da conta de energia", createdAt: "2025-10-04", updatedAt: "2025-10-04",
      user: { id: "2", name: "Pedro Silva", avatarUrl: `https://i.pravatar.cc/48?u=pedro` }
    },
    {
      id: "4", userId: "1", title: "Gasolina", value: 150.00, date: "2025-10-01", type: "expense", category: "transport", description: "Abastecimento do carro", createdAt: "2025-10-01", updatedAt: "2025-10-01",
      user: { id: "1", name: "Ana Silva", avatarUrl: `https://i.pravatar.cc/48?u=sam` }
    },
  ];

  const totalIncome = familyEntries
    .filter((entry) => entry.type === "income")
    .reduce((acc, entry) => acc + entry.value, 0);

  const totalExpense = familyEntries
    .filter((entry) => entry.type === "expense")
    .reduce((acc, entry) => acc + entry.value, 0);

  const totalBalance = totalIncome - totalExpense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-4 md:gap-y-0 gap-y-4">
      <div className="w-full">
        <BalanceCard
          totalBalance={totalBalance}
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          user={user}
          isFamilyView
        />
      </div>
      <div className="flex flex-col gap-4 col-span-2">
        <div className="flex items-center gap-4 justify-between">
          <h1 className="text-xl md:text-2xl leading-none font-bold">Últimas Entradas da Família</h1>
          <button className="button bg-blue-600 hover:bg-blue-700">Adicionar despesa familiar</button>
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

