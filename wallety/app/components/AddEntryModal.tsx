import { useState } from "react";
import { useUser } from "~/contexts/UserContext";
import { expenseCategories, incomeCategories } from "~/constants/entries";
import type { Entry } from "~/types/entries";

type AddEntryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  createEntry: (data: Entry) => Promise<void>;
};

const initialData = {
    title: "",
    value: "",
    date: new Date().toISOString().split("T")[0],
    category: "food",
    description: "",
}

export default function AddEntryModal({ isOpen, onClose, createEntry }: AddEntryModalProps) {
  const { user } = useUser();
  const [entryType, setEntryType] = useState<"expense" | "income">("expense");
  const [formData, setFormData] = useState(initialData);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     const value = parseFloat(formData.value) / 100;

     if (!user || !value) return;

    const newEntryData =  {
      ...formData,
      value,
      type: entryType,
      userId: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };


    try {
      await createEntry(newEntryData as Entry)
      setFormData(initialData);
    } catch {} 
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    let { name, value } = e.target;

    if(name == "value")
        value = value.replace(/\D/g, '');

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const categories = entryType === "expense" ? expenseCategories : incomeCategories;

return (
  <div className="fixed inset-0 backdrop-blur-lg z-60 flex justify-center items-center p-4">
    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Adicionar Entrada</h2>
        <button 
          onClick={onClose} 
          className="text-gray-400 hover:text-gray-700 transition-colors cursor-pointer rounded-full p-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-6">
        <button
          onClick={() => {
            setEntryType("expense");
            setFormData(prev => ({ ...prev, category: 'food' }));
          }}
          className={`w-full p-2.5 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer focus:outline-none ${
            entryType === 'expense' 
            ? 'bg-red-500 text-white shadow-sm hover:bg-red-600 focus:ring-red-500' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 focus:ring-gray-300'
          }`}
        >
          Despesa
        </button>
        <button
          onClick={() => {
            setEntryType("income");
            setFormData(prev => ({ ...prev, category: 'salary' }));
          }}
          className={`w-full p-2.5 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer focus:outline-none ${
            entryType === 'income' 
            ? 'bg-green-500 text-white shadow-sm hover:bg-green-600' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 focus:ring-gray-300'
          }`}
        >
          Receita
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-600 mb-1">Título</label>
          <input 
            type="text" 
            name="title" 
            id="title" 
            value={formData.title} 
            onChange={handleInputChange} 
            required 
            className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label htmlFor="value" className="block text-sm font-medium text-gray-600 mb-1">Valor (R$)</label>
          <input 
            type="text" 
            name="value" 
            id="value" 
            value={
              new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(Number(formData.value) / 100)
            } 
            onChange={handleInputChange} 
            required 
            placeholder="R$ 0,00"
            className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-600 mb-1">Data</label>
            <input 
              type="date" 
              name="date" 
              id="date" 
              value={formData.date} 
              onChange={handleInputChange} 
              required 
              className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>
          <div className="relative">
            <label htmlFor="category" className="block text-sm font-medium text-gray-600 mb-1">Categoria</label>
            <select 
              name="category" 
              id="category" 
              value={formData.category} 
              onChange={handleInputChange} 
              className="w-full appearance-none px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            >
              {Object.entries(categories).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-1">Descrição (Opcional)</label>
          <textarea 
            name="description" 
            id="description" 
            value={formData.description} 
            onChange={handleInputChange} 
            rows={3} 
            className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          ></textarea>
        </div>
        <button 
          type="submit" 
          className="w-full py-3 px-4 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer transition-all"
        >
          Salvar Entrada
        </button>
      </form>
    </div>
  </div>
);
}