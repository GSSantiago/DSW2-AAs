import EntryCard from "~/components/EntryCard";
import type { Route } from "./+types/home";
import type { Entry } from "~/types/entries";
import BalanceCard from "~/components/BalanceCard";
import { useUser } from "~/contexts/UserContext";
import { useEffect, useState } from "react";
import AddEntryModal from "~/components/AddEntryModal";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Wallety" },
  ];
}

export default function Home() {
  const { user } = useUser();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isOpen, setIsOpen] = useState(false); 

  const totalBalance = entries?.reduce((acc, entry) => {
    if (entry.type === 'income') {
      return acc + entry.value;
    }
    return acc - entry.value;
  }, 0);

  const totalIncome = entries
    ?.filter((entry) => entry.type === "income")
    .reduce((acc, entry) => {
      return acc + entry.value;
    }, 0);

  const totalExpense = entries
    ?.filter((entry) => entry.type === "expense")
    .reduce((acc, entry) => {
      return acc + entry.value;
    }, 0);

  const fetchEntries = async () => {
     const response = await fetch(`http://localhost:3001/users/${user?.id}/entries?_sort=date&_order=desc`);
     const data = await response.json();
     setEntries(data);
   };

  const createEntry = async (entry: Entry) => {
      try {
        const response = await fetch(`http://localhost:3001/entries`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(entry),
        });

        if (!response.ok) throw new Error("Falha ao criar a entrada.");

        await response.json();

        fetchEntries()     

      } catch (error) {
        console.error("Erro:", error);
        alert("Não foi possível salvar a entrada. Tente novamente.");
      } finally {
        setIsOpen(false)
      }
  };

  useEffect(() => {
    if (!user) return;
    fetchEntries();
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <>
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
            <h1 className="text-xl md:text-2xl text-white text-shadow-md leading-none font-bold">Últimas entradas</h1>
            <button onClick={() => setIsOpen(true)} className="button">Adicionar entrada</button>
          </div>

          <div className="flex flex-col gap-2">
            {entries.map((entry) => (
              <EntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        </div>
      </div>
      
      <AddEntryModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        createEntry={createEntry}
      />
    </>
  );
}