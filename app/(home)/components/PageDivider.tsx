import { memo } from "react";
import logo from "../assets/img/Logo.webp";

const Divider = memo(function(){
    return(
      <div className="flex w-full flex-col my-8 md:my-16 p-2 md:px-4 lg:px-0 gap-4 z-10 lg:max-w-9/12 mx-auto">
        <div className="divider">
          <img src="./images/Logo.webp" loading="lazy" alt="page divider logo" className="w-24 z-10">
          </img>
        </div>
      </div>
    )
})

export default Divider;