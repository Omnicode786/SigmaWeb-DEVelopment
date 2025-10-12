
import { RiBookMarkedFill } from '@remixicon/react'

function HiringCard({id,companyLogo,companyName,timePosted,role,jobType,rate,location}){

return  (
<>
  <div className="w-[300px] h-[360px] bg-white p-[10px] m-3 rounded-[8px]">
        <div className="flex items-center justify-between p-[10px] text-[10px] text-[rgb(191,188,188)]">
          <img
            className="w-[60px] h-[60px] rounded-full border-2 border-[rgba(185,183,183,0.678)]"
            src={companyLogo}
            alt="logo"
          />
          <button className="flex w-18 justify-between items-center bg-white py-[2px] px-[16px] border border-[rgb(235,229,229)] rounded-[6px]">
            Save <RiBookMarkedFill className="w-[15px]" />
          </button>
        </div>

        <div className="h-[60%] mt-[20px] flex flex-col">
          <div className="flex items-center">
            <h2 className="text-[20px] font-[500]">
            {companyName}
            </h2>
            <p className="text-[12px] flex items-center text-[rgb(191,188,188)] mt-[5px] ml-[5px]">{timePosted}</p>
          </div>

          <h1 className="text-[26px] font-[630] w-full">{role}</h1>

          <div className="flex items-center">
            <button className="text-[14px] bg-[rgb(232,237,237)] mr-1 py-[6px] px-[8px] mt-[10px] rounded-[6px] font-[620]">{jobType[0]}</button>
            <button className="text-[14px] bg-[rgb(232,237,237)] mr-1 py-[6px] px-[8px] mt-[10px] rounded-[6px] font-[620]">{jobType[1]} </button>
          </div>
        </div>

        <div className="flex p-2 -mt-4 items-center justify-between border-t border-[rgb(204,201,201)]">
          <div className="flex flex-col justify-center">
            <h4 className="text-[18px] font-[600]">{rate}</h4>
            <p className="text-[10px] text-[rgb(158,153,153)] font-[500]"> {location}</p>
          </div>
          <button className="bg-black text-white py:[6px] px:[8px] py-[6px] px-[8px] rounded-[6px] mr-1 text-[14px] font-[500]">Apply Now</button>
        </div>
      </div>
</>

)


}

export default HiringCard