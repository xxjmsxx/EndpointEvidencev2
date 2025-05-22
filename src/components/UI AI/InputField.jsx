'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartPulse, AlignEndHorizontal, ChevronUp, Cpu, Dot, Maximize2, Loader2, ArrowUp, RefreshCw} from 'lucide-react';
import { BeakerIcon, ServerStackIcon } from '@heroicons/react/24/outline';
import ModeSelector from '@/components/ModeSelector/ModeSelector';
import PlusSelector from '@/components/ModeSelector/PlusSelector';

export default function InputField({
  input,
  status,
  error,
  customHandleSubmit,
  handleInputChange,
  handleSubmit,
  centered = false,
  mode,
  plus,
  setPlus,
  setMode,
  append,
  textareaRef,
  isCanvasOpen,
  setIsCanvasOpen,
}) {

  const [isFocused, setIsFocused] = useState(false);

  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().includes('MAC');
  const shortcutSymbol = isMac ? '⌘' : 'Ctrl';

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const isCmdK =
        (isMac && e.metaKey && e.key.toLowerCase() === 'k') ||
        (!isMac && e.ctrlKey && e.key.toLowerCase() === 'k');


      if (isCmdK) {
        e.preventDefault();
        textareaRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  const exampleQuestions = [
    'What are real-world outcomes for Trop-2 high NSCLC on ADCs?',
    'How many mNSCLC patients are eligible for IMMU-132-15  in Germany?',
    'How does Trodelvy + Keytruda compare to Keytruda + chemo in PD-L1 high ovarian cancer?',
    'Grade 3+ AEs in ADC-treated breast cancer?'
  ];

  const endpointMonitor = (
    <div
      onClick={()=>{setIsCanvasOpen(prev => !prev)}}
      className={`flex flex-row justify-between items-center cursor-pointer max-w-3xl hover:bg-zinc-50 transition px-4 ${isCanvasOpen?"w-[85%]":"w-[50%]"} bg-white border-zinc-300 rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.1)]`}>
      <div className="text-zinc-500 font-extralight text-sm p-2 flex flex-row items-center gap-2">
        <Cpu className="size-3 text-zinc-500 hover:text-zinc-700 cursor-pointer" strokeWidth={1.5}/>
        Endpoint monitor
        <Dot className="size-6 text-green-700"/>
      </div>
      <div className="flex flex-row gap-2">
        <Maximize2 className="size-3 text-zinc-500 hover:text-zinc-700 cursor-pointer" />
      </div>
    </div>
  )

  const form = (
    <form
      className={`flex flex-col max-w-3xl gap-1 ${isCanvasOpen?"w-[85%]":"w-[50%]"} px-4 py-3 mb-5 bg-white border-zinc-300 rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.1)]`}
      onSubmit={customHandleSubmit} // here update state to move input from intial position
    >
      <div className="relative w-full">

        <textarea
          ref={textareaRef}
          className="w-full placeholder-zinc-500 overflow-y-auto max-h-[12rem] resize-none overflow-hidden px-1 py-2 rounded-xl text-sm font-extralight focus:outline-none"
          value={input}
          placeholder='Type your research question...'
          rows={1}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            // Focus on input field with Enter
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              customHandleSubmit(e);
            }
            // Unfocus from input field with Esc
            if (e.key === 'Escape') {
              textareaRef.current?.blur();
            }
          }}
          disabled={status !== 'ready' || error != null}
        />
      </div>


      {/* Mode Selector + Submit Button */}
      <div className="flex flex-row justify-between">

        {/* Mode Selector */}
        <div className="flex flex-row items-end gap-3">
          <PlusSelector plus={plus} setPlus={setPlus} />
          <ModeSelector mode={mode} setMode={setMode} />
        </div>
        <button
          type="submit"
          disabled={status !== 'ready' || error != null}
          className="cursor-pointer w-9 h-9 flex items-center justify-center rounded-full bg-black text-white transition hover:bg-zinc-800 rotate-270"
        >
          {(status === 'streaming' || status === 'submitted') ? (
            // <Loader2 className="w-5 h-5 animate-spin text-white" />
            // <LoaderCircle className="w-5 h-5 animate-spin text-white" />
            <span className="block w-2.5 h-2.5 bg-white rounded-xs" />
          ) : (
            <ArrowUp className="w-5 h-5 text-white rotate-90" />
          )}
        </button>
      </div>
    </form>
  );

  const examples = (
    <div className={`mt-2 max-w-3xl ${isCanvasOpen?"w-[85%]":"w-[50%]"}`}>
      <div className="grid grid-cols-2 gap-4">
        {exampleQuestions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => append({ role: 'user', content: q })}
            className="cursor-pointer text-left px-3 py-2 text-sm font-light text-zinc-500  bg-white rounded-xl hover:bg-zinc-100 shadow-[0_0_10px_rgba(0,0,0,0.1)]"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <AnimatePresence mode="wait">
      {centered ? (
        <motion.div
          key="centered"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="w-full h-dvh flex flex-col items-center justify-center"
        >
          <p className="mb-10 text-2xl text-black font-extralight">Evidence begins with a research question.</p>
          {form}
          {examples}
        </motion.div>
      ) : (
        <motion.div
          key="bottom"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 w-full sticky bottom-0 z-10"
        >
          {endpointMonitor}
          {form}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
