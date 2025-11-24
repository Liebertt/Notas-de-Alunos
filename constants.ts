import { GradeWeights } from './types';

export const WEIGHTS: GradeWeights = {
  work: 0.4,
  activity: 0.3,
  exam: 0.3,
};

// Maximum value for grades (assuming 0-10 based on standard context, but flexible if needed)
export const MAX_GRADE = 10;
export const MIN_GRADE = 0;