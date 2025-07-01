import { memo } from "react";

const PageIndicator = memo(function () {
  return (
    <ul className="flex w-full items-center justify-between rounded-box bg-base-300 mb-3 px-2 py-4 md:px-4">
      <a href="/vehicle-features">
        <Step page="Vehicle" active={"border-warning [&>div]:bg-warning"} />
      </a>
      <span className="md:grow-1 grow-0 border-gray border-b-2 m-1 mb-7"></span>
      <a href="/Extras">
        <Step page="Extras"/>
      </a>
      <span className="md:grow-1 grow-0 border-gray border-b-2 m-1 mb-7"></span>
      <a href="/Details">
        <Step page="Details"/>
      </a>
      <span className="md:grow-1 grow-0 border-gray border-b-2 m-1  mb-7"></span>
      <a href="/Summary">
        <Step page="Summary"/>
      </a>
    </ul>
  );
});

type StepProps = {
  page: string;
  active?: string;
};


function Step(props:StepProps) {
  return (
    <li className="flex flex-col cursor-pointer items-center">
      <div
        className={`border-gray ${props.active} border-1 size-8 flex items-center justify-center rounded-sm`}
      >
        <div className={`size-4  bg-gray rounded-sm`}></div>
      </div>
      <h1>{props.page}</h1>
    </li>
  );
}

export default PageIndicator;
