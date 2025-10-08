import type { Entry } from "~/types/entries";
import type { User } from "~/types/user";

const incomeIcons = {
  salary: "💼",
  freelance: "💼",
  gift: "🎁",
  refund: "💰",
  other: "💰",
};

const expenseIcons = {
  food: "🍔",
  transport: "🚗",
  housing: "🏠",
  public_services: "🏢",
  personal_care: "💄",
  health: "🏥",
  education: "🎓",
  entertainment: "🎉",
  other: "💰",
};

const categoryIcons = {
  ...incomeIcons,
  ...expenseIcons,
};

const categoryLabels = {
  food: "Alimentação",
  transport: "Transporte",
  housing: "Moradia",
  public_services: "Serviços públicos",
  personal_care: "Cuidados pessoais",
  health: "Saúde",
  education: "Educação",
  entertainment: "Entretenimento",
  other: "Outros",
  salary: "Salário",
  freelance: "Freelance",
  gift: "Presente",
  refund: "Reembolso",
};

export default function EntryCard({
  entry,
}: {
  entry: Entry & { user?: User };
}) {
  return (
    <div className="flex justify-between items-center rounded-lg bg-white p-4 border border-gray-200">
      <div className="flex items-center gap-4">
        <div
          className={`flex items-center justify-center size-10 rounded-full ${
            entry.type === "income" ? "bg-green-200" : "bg-red-200"
          }`}
        >
          {entry.user?.avatar ? (
            <img
              src={entry.user.avatar}
              alt={`${entry.user.firstName} ${entry.user.lastName}`}
              className="size-10 rounded-full object-cover"
            />
          ) : (
            categoryIcons[entry.category]
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-base md:text-lg leading-none font-bold">
            {entry.title}
          </span>
          <span className="text-sm text-gray-500">
            {entry.user && `${entry.user?.firstName} ${entry.user?.lastName} -`} {categoryLabels[entry.category]}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span
          className={`${
            entry.type === "income" ? "text-green-700" : "text-red-700"
          } text-sm md:text-base font-semibold`}
        >
          {entry.type === "income" ? "+" : "-"}{" "}
          {entry.value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
        <span className="text-xs md:text-sm text-gray-500">
          {new Date(entry.date).toLocaleDateString("pt-BR")}
        </span>
      </div>
    </div>
  );
}