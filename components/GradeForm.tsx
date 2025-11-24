import React, { useState, useCallback } from 'react';
import { PlusCircle, Calculator } from 'lucide-react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Student } from '../types';
import { WEIGHTS, MAX_GRADE, MIN_GRADE } from '../constants';

interface GradeFormProps {
  onAddStudent: (student: Omit<Student, 'id'>) => void;
}

export const GradeForm: React.FC<GradeFormProps> = ({ onAddStudent }) => {
  const [name, setName] = useState('');
  const [workGrade, setWorkGrade] = useState('');
  const [activityGrade, setActivityGrade] = useState('');
  const [examGrade, setExamGrade] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateGrade = (val: string, fieldName: string): string | null => {
    if (val === '') return 'Campo obrigatório';
    const num = Number(val);
    if (isNaN(num)) return 'Deve ser um número';
    if (!Number.isInteger(num)) return 'Apenas números inteiros';
    if (num < MIN_GRADE || num > MAX_GRADE) return `Entre ${MIN_GRADE} e ${MAX_GRADE}`;
    return null;
  };

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Nome é obrigatório';
    
    const workErr = validateGrade(workGrade, 'Nota do Trabalho');
    if (workErr) newErrors.work = workErr;

    const actErr = validateGrade(activityGrade, 'Nota das Atividades');
    if (actErr) newErrors.activity = actErr;

    const examErr = validateGrade(examGrade, 'Nota da Prova');
    if (examErr) newErrors.exam = examErr;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const w = parseInt(workGrade, 10);
    const a = parseInt(activityGrade, 10);
    const p = parseInt(examGrade, 10);

    // Calculation Logic: (Trabalho * 0.4) + (Atividades * 0.3) + (Prova * 0.3)
    // Rounding: Standard Javascript Math.round (>= .5 goes up)
    const weightedSum = (w * WEIGHTS.work) + (a * WEIGHTS.activity) + (p * WEIGHTS.exam);
    const finalAverage = Math.round(weightedSum);

    onAddStudent({
      name: name.trim(),
      workGrade: w,
      activityGrade: a,
      examGrade: p,
      finalAverage
    });

    // Reset Form
    setName('');
    setWorkGrade('');
    setActivityGrade('');
    setExamGrade('');
    setErrors({});
  }, [name, workGrade, activityGrade, examGrade, onAddStudent]);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 md:p-8">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-brand-100 text-brand-600 rounded-lg mr-3">
          <Calculator size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Novo Registro</h2>
          <p className="text-sm text-slate-500">Insira os dados do aluno para cálculo</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Nome do Aluno"
          placeholder="Ex: João Silva"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input
            label="Trabalho (40%)"
            type="number"
            placeholder="0-10"
            min={MIN_GRADE}
            max={MAX_GRADE}
            step="1"
            forceInteger
            value={workGrade}
            onChange={(e) => setWorkGrade(e.target.value)}
            error={errors.work}
          />
          <Input
            label="Atividades (30%)"
            type="number"
            placeholder="0-10"
            min={MIN_GRADE}
            max={MAX_GRADE}
            step="1"
            forceInteger
            value={activityGrade}
            onChange={(e) => setActivityGrade(e.target.value)}
            error={errors.activity}
          />
          <Input
            label="Prova Paulista (30%)"
            type="number"
            placeholder="0-10"
            min={MIN_GRADE}
            max={MAX_GRADE}
            step="1"
            forceInteger
            value={examGrade}
            onChange={(e) => setExamGrade(e.target.value)}
            error={errors.exam}
          />
        </div>

        <div className="pt-2">
           <Button type="submit" className="w-full md:w-auto w-full" leftIcon={<PlusCircle size={18} />}>
             Calcular e Registrar
           </Button>
        </div>
      </form>
    </div>
  );
};