import { memo } from "react"; // Veya başka bir tick ikonu kullanabilirsin

type PageStep = "booking" | "extras" | "details" | "summary";

const stepOrder: PageStep[] = ["booking", "extras", "details", "summary"];

type PageIndicatorProps = {
  activeStep: PageStep;
};

const PageIndicator = memo(function ({ activeStep }: PageIndicatorProps) {
  return (
    <ul className="flex w-full items-center justify-between rounded-box bg-base-300 mb-3 px-2 py-4 md:px-4">
      {stepOrder.map((step, index) => (
        <div key={step} className="flex items-center">
            <Step
              page={capitalize(step)}
              status={getStepStatus(step, activeStep)}
            />
          {index < stepOrder.length - 1 && <Line />}
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

  return (
    <li className="flex flex-col items-center">
      <div
        className={`border-2 size-8 flex items-center justify-center rounded-sm
          ${isActive ? "border-warning" : "border-gray"}
          ${isCompleted ? "[&>svg]:block [&>div]:hidden" : ""}
        `}
      >
        {isCompleted ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        ) : (
          <div
            className={`size-4 rounded-sm ${
              isActive ? "bg-warning" : "bg-gray"
            }`}
          ></div>
        )}
      </div>
      <h1>{page}</h1>
    </li>
  );
}

function Line() {
  return (
    <span className="md:grow-1 hidden lg:block w-[%33] grow-0 border-gray border-b-2 m-1 mb-7"></span>
  );
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default PageIndicator;
