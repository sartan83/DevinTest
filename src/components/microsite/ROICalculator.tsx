"use client";

import { useState, useMemo } from "react";
import type { MicrositeData } from "@/lib/types";
import type { ROIAssumptions } from "@/lib/types";
import { calculateROI } from "@/lib/roi-engine";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatNumber } from "@/lib/utils";
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Clock,
  BarChart3,
  Info,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface ROICalculatorProps {
  data: MicrositeData;
}

interface AssumptionFieldProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  format: "currency" | "percentage" | "number" | "months";
  min?: number;
  max?: number;
  step?: number;
}

function AssumptionField({
  label,
  value,
  onChange,
  format,
  min = 0,
  max,
  step = 1,
}: AssumptionFieldProps) {
  function displayValue(v: number): string {
    switch (format) {
      case "currency":
        return formatCurrency(v);
      case "percentage":
        return `${(v * 100).toFixed(0)}%`;
      case "months":
        return `${v} months`;
      default:
        return formatNumber(v);
    }
  }

  function inputValue(): number {
    return format === "percentage" ? Math.round(value * 100) : value;
  }

  function handleChange(raw: number) {
    onChange(format === "percentage" ? raw / 100 : raw);
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-sm font-semibold text-indigo-700">
          {displayValue(value)}
        </span>
      </div>
      <input
        type="range"
        min={format === "percentage" ? (min ?? 0) * 100 : min}
        max={
          format === "percentage" ? (max ?? 1) * 100 : max
        }
        step={format === "percentage" ? 1 : step}
        value={inputValue()}
        onChange={(e) => handleChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
      />
    </div>
  );
}

const CHART_COLORS = ["#4f46e5", "#7c3aed", "#06b6d4", "#10b981"];

export function ROICalculator({ data }: ROICalculatorProps) {
  const [assumptions, setAssumptions] = useState<ROIAssumptions>(
    data.roiAssumptions,
  );

  const results = useMemo(() => calculateROI(assumptions), [assumptions]);

  function update(field: keyof ROIAssumptions, value: number) {
    setAssumptions((prev) => ({ ...prev, [field]: value }));
  }

  const barData = [
    {
      name: "Productivity",
      value: results.annualProductivityValue,
      fill: CHART_COLORS[0],
    },
    {
      name: "Acceleration",
      value: results.projectAccelerationValue,
      fill: CHART_COLORS[1],
    },
    {
      name: "Total",
      value: results.totalEstimatedValue,
      fill: CHART_COLORS[2],
    },
    {
      name: "Investment",
      value: assumptions.annualDevinInvestment,
      fill: CHART_COLORS[3],
    },
  ];

  const pieData = [
    {
      name: "Productivity Value",
      value: results.annualProductivityValue,
    },
    {
      name: "Acceleration Value",
      value: results.projectAccelerationValue,
    },
  ];

  return (
    <section id="roi-calculator" className="py-16 sm:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="h-6 w-6 text-indigo-600" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            ROI estimate
          </h2>
        </div>
        <p className="text-gray-500 mb-10 max-w-2xl">
          Interactive calculator with editable assumptions. All values are
          estimates.
        </p>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Assumptions panel */}
          <div className="lg:col-span-2 space-y-5">
            <Card>
              <CardContent className="p-6 space-y-5">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-indigo-600" />
                  Editable Assumptions
                </h3>

                <AssumptionField
                  label="Number of developers"
                  value={assumptions.numberOfDevelopers}
                  onChange={(v) => update("numberOfDevelopers", v)}
                  format="number"
                  min={10}
                  max={5000}
                  step={10}
                />

                <AssumptionField
                  label="Fully loaded developer cost"
                  value={assumptions.fullyLoadedDeveloperCost}
                  onChange={(v) => update("fullyLoadedDeveloperCost", v)}
                  format="currency"
                  min={80000}
                  max={400000}
                  step={10000}
                />

                <AssumptionField
                  label="Repetitive work %"
                  value={assumptions.repetitiveWorkPercentage}
                  onChange={(v) => update("repetitiveWorkPercentage", v)}
                  format="percentage"
                  min={0.05}
                  max={0.6}
                  step={0.05}
                />

                <AssumptionField
                  label="Productivity uplift"
                  value={assumptions.productivityUplift}
                  onChange={(v) => update("productivityUplift", v)}
                  format="percentage"
                  min={0.05}
                  max={0.5}
                  step={0.05}
                />

                <AssumptionField
                  label="Initiatives impacted"
                  value={assumptions.numberOfInitiatives}
                  onChange={(v) => update("numberOfInitiatives", v)}
                  format="number"
                  min={1}
                  max={20}
                  step={1}
                />

                <AssumptionField
                  label="Months accelerated"
                  value={assumptions.monthsAccelerated}
                  onChange={(v) => update("monthsAccelerated", v)}
                  format="months"
                  min={1}
                  max={12}
                  step={1}
                />

                <AssumptionField
                  label="Monthly business value per initiative"
                  value={assumptions.monthlyBusinessValue}
                  onChange={(v) => update("monthlyBusinessValue", v)}
                  format="currency"
                  min={50000}
                  max={5000000}
                  step={50000}
                />

                <AssumptionField
                  label="Annual Devin investment"
                  value={assumptions.annualDevinInvestment}
                  onChange={(v) => update("annualDevinInvestment", v)}
                  format="currency"
                  min={50000}
                  max={5000000}
                  step={50000}
                />
              </CardContent>
            </Card>
          </div>

          {/* Results panel */}
          <div className="lg:col-span-3 space-y-5">
            {/* KPI counters */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-indigo-50 to-white border-indigo-100">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="h-4 w-4 text-indigo-600" />
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Estimated Value
                    </p>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-indigo-700">
                    {formatCurrency(results.totalEstimatedValue)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">per year</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-emerald-50 to-white border-emerald-100">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ROI Multiple
                    </p>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-emerald-700">
                    {results.roiMultiple.toFixed(1)}x
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    return on investment
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="h-4 w-4 text-purple-600" />
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Productivity Value
                    </p>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-purple-700">
                    {formatCurrency(results.annualProductivityValue)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">per year</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-100">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-amber-600" />
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payback Period
                    </p>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-amber-700">
                    {results.paybackPeriodMonths.toFixed(1)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">months</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <Card>
              <CardContent className="p-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-4">
                  Value Breakdown
                </h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 12, fill: "#6b7280" }}
                      />
                      <YAxis
                        tick={{ fontSize: 12, fill: "#6b7280" }}
                        tickFormatter={(v: number) => formatCurrency(v)}
                      />
                      <Tooltip
                        formatter={(value) => [
                          formatCurrency(Number(value)),
                          "Value",
                        ]}
                        contentStyle={{
                          borderRadius: "8px",
                          border: "1px solid #e5e7eb",
                        }}
                      />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                        {barData.map((entry, index) => (
                          <Cell key={index} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-4">
                  Value Composition
                </h4>
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name ?? ""}: ${((percent ?? 0) * 100).toFixed(0)}%`
                        }
                      >
                        {pieData.map((_, index) => (
                          <Cell
                            key={index}
                            fill={CHART_COLORS[index]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => formatCurrency(Number(value))}
                        contentStyle={{
                          borderRadius: "8px",
                          border: "1px solid #e5e7eb",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Formula transparency */}
            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="p-5 space-y-3">
                <h4 className="text-sm font-semibold text-gray-700">
                  Formula Transparency
                </h4>
                <div className="space-y-2 text-xs text-gray-600 font-mono">
                  <p>
                    Annual Productivity Value = Developers x Cost x
                    Repetitive% x Uplift = {formatCurrency(results.annualProductivityValue)}
                  </p>
                  <p>
                    Project Acceleration Value = Monthly Value x Months
                    Accelerated = {formatCurrency(results.projectAccelerationValue)}
                  </p>
                  <p>
                    Total Estimated Value = Productivity + Acceleration ={" "}
                    {formatCurrency(results.totalEstimatedValue)}
                  </p>
                  <p>
                    ROI Multiple = Total Value / Investment ={" "}
                    {results.roiMultiple.toFixed(1)}x
                  </p>
                  <p>
                    Payback = Investment / Total Value x 12 ={" "}
                    {results.paybackPeriodMonths.toFixed(1)} months
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-start gap-2 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs">
              <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <p>
                This is an estimated ROI hypothesis based on public information,
                relevant public Cognition/Devin proof points where available,
                and editable assumptions. It is not a certified financial
                analysis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
