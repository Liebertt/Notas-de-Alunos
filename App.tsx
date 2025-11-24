import React, { useState, useCallback } from 'react';
import { GradeForm } from './components/GradeForm';
import { StudentList } from './components/StudentList';
import { Student } from './types';
import { GraduationCap } from 'lucide-react';

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);

  const handleAddStudent = useCallback((newStudentData: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...newStudentData,
      id: crypto.randomUUID(),
    };
    // Add to the beginning of the list for better visibility
    setStudents((prev) => [newStudent, ...prev]);
  }, []);

  const handleRemoveStudent = useCallback((id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-brand-600 text-white p-1.5 rounded-lg shadow-sm">
              <GraduationCap size={24} />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-700 to-brand-500">
              CalcMédias
            </h1>
          </div>
          <div className="text-sm text-slate-500 hidden sm:block">
            Gestão Escolar Simplificada
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Intro / Instructions */}
        <section className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight sm:text-4xl mb-4">
            Cálculo de Rendimento
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Insira as notas (0 a 10) inteiras. O sistema calcula automaticamente a média ponderada com arredondamento padrão.
          </p>
        </section>

        {/* Grade Form */}
        <section className="animate-slideUp">
          <GradeForm onAddStudent={handleAddStudent} />
        </section>

        {/* Results List */}
        <section className="animate-slideUp" style={{ animationDelay: '0.1s' }}>
          <StudentList 
            students={students} 
            onRemoveStudent={handleRemoveStudent} 
          />
        </section>

      </main>

      {/* Footer */}
      <footer className="mt-auto py-8 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} Sistema Escolar. Todas as notas são arredondadas para inteiros.</p>
      </footer>
    </div>
  );
};

export default App;