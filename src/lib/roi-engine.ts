import type { ROIAssumptions, ROIResults } from "./types";

export function getDefaultAssumptions(): ROIAssumptions {
  return {
    numberOfDevelopers: 100,
    fullyLoadedDeveloperCost: 180_000,
    repetitiveWorkPercentage: 0.3,
    productivityUplift: 0.15,
    numberOfInitiatives: 5,
    monthsAccelerated: 3,
    monthlyBusinessValue: 500_000,
    annualDevinInvestment: 500_000,
  };
}

export function calculateROI(assumptions: ROIAssumptions): ROIResults {
  const annualProductivityValue =
    assumptions.numberOfDevelopers *
    assumptions.fullyLoadedDeveloperCost *
    assumptions.repetitiveWorkPercentage *
    assumptions.productivityUplift;

  const projectAccelerationValue =
    assumptions.monthlyBusinessValue * assumptions.monthsAccelerated;

  const totalEstimatedValue = annualProductivityValue + projectAccelerationValue;

  const roiMultiple =
    assumptions.annualDevinInvestment > 0
      ? totalEstimatedValue / assumptions.annualDevinInvestment
      : 0;

  const paybackPeriodMonths =
    totalEstimatedValue > 0
      ? (assumptions.annualDevinInvestment / totalEstimatedValue) * 12
      : 0;

  return {
    annualProductivityValue,
    projectAccelerationValue,
    totalEstimatedValue,
    roiMultiple,
    paybackPeriodMonths,
  };
}
