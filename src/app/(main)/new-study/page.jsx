import React from 'react'
import ResearchQuestion from "@/components/UI AI/ResearchQuestion"
import Dropdown from '@/components/Miscelaneous/Dropdow'

export default function Homepage() {

  const userInformation={"Organization":"Abbvie", "First Name":"John", "Last Name":"Doe", "Email": "johndoe@abbvie.com"}
  const options_1 = ["Market Access", "HEOR", "Label Expansion", "Indication Expansion", "Patient Recruitment"];
  const options_2 = ["Market Access", "HEOR", "Label Expansion", "Indication Expansion", "Patient Recruitment"];

  return (
    <div className="flex flex-row justify-center gap-12 mt-24">

      {/* Left side component */}
      <ResearchQuestion userInformation={userInformation}/>

       {/* Right side component */}
      <div className="flex flex-col bg-white w-[35%] rounded-xl py-[25px] px-[35px] shadow-[0_0_15px_0_rgba(0,0,0,0.8)]">
        <h1 className="text-[20px] font-semibold mb-10">Request details</h1>


        <div className="flex flex-col gap-20">
          {/* first block */}
          <div className="flex flex-col gap-2">
          {Object.keys(userInformation).map(key => (
            <div key={key}>
              <h3 className="font-light text-[14px]">{key}</h3>
              <p className="font-semibold text-[14px]">{userInformation[key]}</p>
            </div>
          ))}
          </div>

          {/* second block */}
          <div className="flex flex-col gap-5">
            <div>
              <h3 className="text-[14px] font-semibold">What’s the motivation for this request?</h3>
              <Dropdown options={options_1}/>
            </div>
            <div>
              <h3 className="text-[14px] font-semibold">Data sources</h3>
              <Dropdown options={options_2}/>
            </div>
          </div>

          {/* third block */}
          <div className="flex flex-col gap-5">
            <h3 className="text-[14px] font-semibold">Document Upload</h3>
            <h3 className="text-[14px] font-semibold">Other settings</h3>
            <button className="mt-4 bg-black hover:bg-gray-900 text-white text-[14px] w-[200px] rounded-md py-2 px-4 hover:bg-bl-600"> Save details </button>
          </div>
        </div>
      </div>
    </div>
  )
}
