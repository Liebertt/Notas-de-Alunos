import React from 'react';
import { Trash2, GraduationCap, TrendingUp, TrendingDown } from 'lucide-react';
import { Student } from '../types';
import { MAX_GRADE } from '../constants';

interface StudentListProps {
  students: Student[];
  onRemoveStudent: (id: string) => void;
}

export const StudentList: React.FC<StudentListProps> = ({ students, onRemoveStudent }) => {
  if (students.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 border-dashed p-12 text-center">
        <div className="mx-auto w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-400">
          <GraduationCap size={24} />
        </div>
        <h3 className="text-lg font-medium text-slate-900">Nenhum aluno registrado</h3>
        <p className="text-slate-500 mt-1">Utilize o formulário acima para adicionar registros.</p>
      </div>
    );
  }

  const getStatusColor = (grade: number) => {
    // Assuming pass grade is 60% of max (e.g. 6 out of 10)
    const ratio = grade / MAX_GRADE;
    if (ratio >= 0.7) return 'text-green-600 bg-green-50 border-green-200';
    if (ratio >= 0.5) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-900">Resultados da Sessão</h2>
        <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-semibold">
          {students.length} {students.length === 1 ? 'Aluno' : 'Alunos'}
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider font-semibold">
              <th className="px-6 py-4">Nome do Aluno</th>
              <th className="px-6 py-4 text-center">Trabalho (40%)</th>
              <th className="px-6 py-4 text-center">Atividades (30%)</th>
              <th className="px-6 py-4 text-center">Prova (30%)</th>
              <th className="px-6 py-4 text-center">Média Final</th>
              <th className="px-6 py-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">{student.name}</div>
                </td>
                <td className="px-6 py-4 text-center text-slate-500 tabular-nums">
                  {student.workGrade}
                </td>
                <td className="px-6 py-4 text-center text-slate-500 tabular-nums">
                  {student.activityGrade}
                </td>
                <td className="px-6 py-4 text-center text-slate-500 tabular-nums">
                  {student.examGrade}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-bold border ${getStatusColor(student.finalAverage)}`}>
                    {student.finalAverage}
                    {student.finalAverage >= (MAX_GRADE * 0.6) ? 
                      <TrendingUp size={14} className="ml-1.5" /> : 
                      <TrendingDown size={14} className="ml-1.5" />
                    }
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => onRemoveStudent(student.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors p-1.5 rounded-md hover:bg-red-50"
                    title="Remover"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};