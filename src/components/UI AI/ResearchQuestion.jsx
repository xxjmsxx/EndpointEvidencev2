"use client"

import React from 'react'
import { useForm } from "react-hook-form";

export default function ResearchQuestion({userInformation}) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const payload = {
        researchQuestionTitle: data["Research Question Title"],
        population: data["Population"],
        intervention: data["Intervention"],
        control: data["Control"],
        outcome: data["Outcome"],
        timeframe: data["Timeframe"],
        organization: userInformation["Organization"],
        firstName: userInformation["First Name"],
        lastName: userInformation["Last Name"],
        email: userInformation["Email"],
      };

      // const response = await axios.post("/submit", payload);

      console.log("✅ Response from FastAPI:", response.data);
    } catch (err) {
      console.error("❌ Submission failed:", err);
    }
  };

  return (
    <>
    {/* Left side component */}
    <div className="flex flex-col bg-white w-[55%] rounded-xl py-[25px] px-[35px] shadow-[0_0_15px_0_rgba(0,0,0,0.8)]">
        {/* Header section */}
        <div className="flex flex-col gap-2">
          <h1 className="text-[20px] font-semibold mb-10">Enter your research question</h1>
          <div className="flex flex-row gap-4">
            <button className="rounded-md px-3 py-1 bg-blue-100 text-[14px] font-semibold">Enter as Study Parameters</button>
            <button className="rounded-md px-3 py-1 bg-white border border-gray-300 text-[14px]">Enter as Free Text</button>
          </div>
          <p className="text-[10px] mt-3">To submit your study to the clinical team, please enter study details using the PICOT structure or as free text.</p>
        </div>

        {/* Form */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className=" mt-8 space-y-[15px]">

            {/* 1 Field */}
            <div>
              <label className="block text-sm font-semibold">Research Question Title</label>
              <input
                {...register("Research Question Title", { required: "This field is required" })}
                placeholder='Ex: Incidence of cardiovascular events among male patients with NSCLC treated with ...'
                className="px-2.5 text-[12px] mt-2 block w-full rounded border border-gray-300 h-[32px] placeholder-xs focus:placeholder-gray-200"
              />
              {errors.field1 && <span className="text-red-500">{errors.field1.message}</span>}
            </div>

             {/* 2 Field */}
             <div>
              <label className="block text-sm font-semibold">Population</label>
              <input
                {...register("Population", { required: "This field is required" })}
                placeholder="Male patients diagnosed with NSCLC"
                className="px-2.5 text-[12px] mt-2 block w-full rounded border border-gray-300 h-[32px] placeholder-xs focus:placeholder-gray-200"
              />
              {errors.field1 && <span className="text-red-500">{errors.field1.message}</span>}
            </div>

             {/* 3 Field */}
             <div>
              <label className="block text-sm font-semibold">Intervention</label>
              <input
                {...register("Intervention", { required: "This field is required" })}
                placeholder="Treatment with osimertinib"
                className="px-2.5 text-[12px] mt-2 block w-full rounded border border-gray-300 h-[32px] placeholder-xs focus:placeholder-gray-200"
              />
              {errors.field1 && <span className="text-red-500">{errors.field1.message}</span>}
            </div>

            {/* 4 Field */}
            <div>
              <label className="block text-sm font-semibold">Control</label>
              <input
                {...register("Control", { required: "This field is required" })}
                placeholder="Treatment with gefitinib"
                className="px-2.5 text-[12px] mt-2 block w-full rounded border border-gray-300 h-[32px] placeholder-xs focus:placeholder-gray-200"
              />
              {errors.field1 && <span className="text-red-500">{errors.field1.message}</span>}
            </div>

            {/* 5 Field */}
            <div>
              <label className="block text-sm font-semibold">Outcome</label>
              <input
                {...register("Outcome", { required: "This field is required" })}
                placeholder="Incidence of cardiovascular events"
                className="px-2.5 text-[12px] mt-2 block w-full rounded border border-gray-300 h-[32px] placeholder-xs focus:placeholder-gray-200"
              />
              {errors.field1 && <span className="text-red-500">{errors.field1.message}</span>}
            </div>

            {/* 6 Field */}
            <div>
              <label className="block text-sm font-semibold">Timeframe</label>
              <input
                {...register("Timeframe", { required: "This field is required" })}
                placeholder="24 months"
                className="px-2.5 text-[12px] mt-2 block w-full rounded border border-gray-300 h-[32px] placeholder-xs focus:placeholder-gray-200"
              />
              {errors.field1 && <span className="text-red-500">{errors.field1.message}</span>}
            </div>

            <button
              type="submit"
              className="mt-8 bg-blue-700 text-white text-[14px] w-[250px] rounded-md py-2 px-4 hover:bg-blue-600"
            >
              Send Request
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
