import Image from "next/image";
import { memo } from "react";

const Divider = memo(function(){
    return(
      <div className="flex w-full flex-col my-8 md:my-16 p-2 md:px-4 lg:px-0 gap-4 z-10 lg:max-w-9/12 mx-auto">
        <div className="divider">
          <Image src="/images/logos/Logo.webp" width={100} height={100} loading="lazy" alt="page divider logo" className="w-[16Şarem] z-10">
          </Image>
        </div>
      </div>
    )
})

export default Divider;