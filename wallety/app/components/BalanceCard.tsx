import type { User } from "~/types/user";

export default function BalanceCard({
  totalBalance,
  totalIncome,
  totalExpense,
  user,
}: {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  user: User;
}) {
  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex flex-col gap-1">
        <span className="text-xs md:text-sm text-gray-500">Olá,</span>
        <span className="font-bold text-xl md:text-2xl leading-none">{user.firstName}!</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs md:text-sm text-gray-500">Saldo total</span>
        <span className="font-bold text-xl md:text-2xl leading-none">
          {totalBalance.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <span className="text-xs md:text-sm text-gray-500">Entradas</span>
          <span className="font-bold text-green-700 text-sm md:text-base">
            {totalIncome.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
        <div className="w-px h-10 bg-gray-200"></div>
        <div className="flex flex-col">
          <span className="text-xs md:text-sm text-gray-500">Gastos</span>
          <span className="font-bold text-red-700 text-sm md:text-base">
            {totalExpense.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
