import type { ROIAssumptions, ROIResults } from "./types";

const DEVIN_COST_PER_DEVELOPER_PER_YEAR = 500;

export function getDefaultAssumptions(numberOfDevelopers?: number): ROIAssumptions {
  const devs = numberOfDevelopers ?? 100;
  const annualDevinInvestment = Math.max(
    50_000,
    devs * DEVIN_COST_PER_DEVELOPER_PER_YEAR,
  );

  return {
    numberOfDevelopers: devs,
    fullyLoadedDeveloperCost: 180_000,
    repetitiveWorkPercentage: 0.3,
    productivityUplift: 0.15,
    numberOfInitiatives: 5,
    monthsAccelerated: 3,
    monthlyBusinessValue: 500_000,
    annualDevinInvestment,
  };
}

export function calculateROI(assumptions: ROIAssumptions): ROIResults {
  const annualProductivityValue =
    assumptions.numberOfDevelopers *
    assumptions.fullyLoadedDeveloperCost *
    assumptions.repetitiveWorkPercentage *
    assumptions.productivityUplift;

  const projectAccelerationValue =
    assumptions.monthlyBusinessValue * assumptions.monthsAccelerated * assumptions.numberOfInitiatives;

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
