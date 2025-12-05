import type { User } from "~/types/user";

export default function BalanceCard({
  totalBalance,
  totalIncome,
  totalExpense,
  user,
  isFamilyView,
  userIncome,
  userExpense,
}: {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  user: User;
  isFamilyView?: boolean;
  userIncome?: number;
  userExpense?: number;
}) {
  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex items-center gap-3">
        {/* TODO: Get family avatar from api */}
        {isFamilyView && user?.family?.avatar && (
          <img
            src={user.family.avatar}
            alt={user.family.name || "Família"}
            className="w-12 h-12 rounded-full bg-gray-200"
          />
        )}
        <div className="flex flex-col gap-1">
          <span className="text-xs md:text-sm text-gray-500">
            {isFamilyView ? "Balanço da Família" : "Olá,"}
          </span>
          <span className="font-bold text-xl md:text-2xl leading-none">
            {isFamilyView ? user.family?.name : `${user.firstName}!`}
          </span>
        </div>
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
      {isFamilyView ? (
        <div className="flex flex-col gap-4 border-t border-gray-200 pt-4">
          <div>
            <span className="text-sm font-semibold text-gray-600">
              Total da Família
            </span>
            <div className="flex items-center gap-4 mt-1">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Entradas</span>
                <span className="font-bold text-green-700 text-sm md:text-base">
                  {totalIncome.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Gastos</span>
                <span className="font-bold text-red-700 text-sm md:text-base">
                  {totalExpense.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            </div>
          </div>

          <div>
            <span className="text-sm font-semibold text-gray-600">
              Sua Contribuição
            </span>
            <div className="flex items-center gap-4 mt-1">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Entradas</span>
                <span className="font-bold text-green-700 text-sm md:text-base">
                  {(userIncome ?? 0).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Gastos</span>
                <span className="font-bold text-red-700 text-sm md:text-base">
                  {(userExpense ?? 0).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
}
