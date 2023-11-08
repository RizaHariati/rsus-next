// this is the pattern for column changes

import { ColumnAssignmentType } from "../patientTypes";

// three small open one close or two large open two close pattern
export const OOO: ColumnAssignmentType = {
  column1: true,
  column2: true,
  column3: true,
};
export const OOC: ColumnAssignmentType = {
  column1: true,
  column2: true,
  column3: false,
};

export const COO: ColumnAssignmentType = {
  column1: false,
  column2: true,
  column3: true,
};

export const CCO: ColumnAssignmentType = {
  column1: false,
  column2: false,
  column3: true,
};

export const OCO: ColumnAssignmentType = {
  column1: true,
  column2: false,
  column3: true,
};

export const OCC: ColumnAssignmentType = {
  column1: true,
  column2: false,
  column3: false,
};

export const COC: ColumnAssignmentType = {
  column1: false,
  column2: true,
  column3: false,
};
