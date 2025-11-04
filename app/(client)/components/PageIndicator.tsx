"use client";
import { memo } from "react";

type PageStep = "booking" | "extras" | "details" | "summary";

const stepOrder: PageStep[] = ["booking", "extras", "details", "summary"];

type PageIndicatorProps = {
  activeStep: PageStep;
};

const PageIndicator = memo(function ({ activeStep }: PageIndicatorProps) {
  return (
    <ul className="flex w-full items-center justify-between rounded-xl bg-base-200 shadow-sm mb-5 px-3 py-5 md:px-6 border border-base-300">
      {stepOrder.map((step, index) => (
        <div key={step} className="flex items-center relative">
          <Step page={capitalize(step)} status={getStepStatus(step, activeStep)} />
          {index < stepOrder.length - 1 && <Line isActive={step === activeStep} />}
        </div>
      ))}
    </ul>
  );
});

type StepStatus = "completed" | "active" | "upcoming";

function getStepStatus(step: PageStep, activeStep: PageStep): StepStatus {
  const stepIndex = stepOrder.indexOf(step);
  const activeIndex = stepOrder.indexOf(activeStep);

  if (stepIndex < activeIndex) return "completed";
  if (stepIndex === activeIndex) return "active";
  return "upcoming";
}

type StepProps = {
  page: string;
  status: StepStatus;
};

function Step({ page, status }: StepProps) {
  const isCompleted = status === "completed";
  const isActive = status === "active";

  const color =
    isActive ? "bg-warning text-base-100 border-warning" :
    isCompleted ? "bg-success text-base-100 border-success" :
    "bg-base-300 text-base-content border-base-300";

  return (
    <li className="flex flex-col items-center text-center mx-2">
      <div
        className={`relative flex items-center justify-center border-2 size-9 rounded-full transition-all duration-300 ${color}`}
      >
        {isCompleted ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        ) : (
          <span className={`block w-3 h-3 rounded-full ${isActive ? "bg-base-100" : "bg-gray-400"}`} />
        )}
      </div>
      <span
        className={`mt-2 text-xs sm:text-sm font-medium ${
          isActive ? "text-warning" : isCompleted ? "text-success" : "text-gray-500"
        }`}
      >
        {page}
      </span>
    </li>
  );
}

function Line({ isActive }: { isActive?: boolean }) {
  return (
    <div
      className={`hidden lg:block h-[2px] w-16 sm:w-24 md:w-32 mx-1 transition-all duration-500 ${
        isActive ? "bg-warning" : "bg-gray-300"
      }`}
    ></div>
  );
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default PageIndicator;