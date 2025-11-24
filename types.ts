export interface Student {
  id: string;
  name: string;
  workGrade: number; // Peso 40%
  activityGrade: number; // Peso 30%
  examGrade: number; // Peso 30%
  finalAverage: number;
}

export interface GradeWeights {
  work: number;
  activity: number;
  exam: number;
}