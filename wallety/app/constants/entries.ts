export const expenseCategories = {
  food: "Alimentação",
  transport: "Transporte",
  housing: "Moradia",
  public_services: "Serviços públicos",
  personal_care: "Cuidados pessoais",
  health: "Saúde",
  education: "Educação",
  entertainment: "Entretenimento",
  other: "Outros",
};

export const incomeCategories = {
  salary: "Salário",
  freelance: "Freelance",
  gift: "Presente",
  refund: "Reembolso",
  other: "Outros",
};

export const categoryLabels = {
  ...expenseCategories,
  ...incomeCategories,
};

export const incomeIcons = {
  salary: "💼",
  freelance: "💼",
  gift: "🎁",
  refund: "💰",
  other: "💰",
};

export const expenseIcons = {
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

export const categoryIcons = {
  ...incomeIcons,
  ...expenseIcons,
};
