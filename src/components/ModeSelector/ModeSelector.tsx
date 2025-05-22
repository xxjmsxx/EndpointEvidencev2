import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { AlignEndHorizontal, ChevronDown, Globe, BookOpen, FlaskConical } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const modes = [
  // {
  //   label: 'Clinical assistant',
  //   value: 'clinical assistant',
  //   icon: <HeartPulse className="h-4 w-4 mr-1" strokeWidth={1.5} />,
  // },
  // {
  //   label: 'Comparative analysis',
  //   value: 'comparative analysis',
  //   icon: <AlignEndHorizontal className="h-4 w-4 mr-1" strokeWidth={1.5} />,
  // },
  // {
  //   label: 'RWE report',
  //   value: 'rwe report generation',
  //   icon: <BeakerIcon className="h-4 w-4 mr-1" />,
  // },
  {
    label: 'Cohort study',
    value: 'cohort study',
    icon: <FlaskConical className="h-4 w-4 mr-1" />,
  },
  {
    label: 'Case-control study',
    value: 'case-control study',
    icon: <AlignEndHorizontal className="h-4 w-4 mr-1" />,
  },
  {
    label: 'Self-controlled case series',
    value: 'self-controlled case series',
    icon: <Globe className="h-4 w-4 mr-1" />,
  },
  {
    label: 'Case report and case series',
    value: 'case report and case series',
    icon: <BookOpen className="h-4 w-4 mr-1" />,
  },
];

export default function ModeDropdown({ mode, setMode }: { mode: string; setMode: (m: string) => void }) {
  const current = modes.find((m) => m.value === mode);
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <button
          className="inline-flex min-w-[160px] items-center justify-between gap-1 px-3 py-2 h-[85%] cursor-pointer border text-sm font-light border-b-blue-600 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
        >
          <div className="flex flex-row items-center gap-2">
            {current?.icon}
            {current?.label}
          </div>
          <ChevronDown
            className={`h-3 w-3 ml-1 transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <AnimatePresence>
          {open && (
            <DropdownMenu.Content
            forceMount
            asChild
            className="max-h-50 cursor-pointer overflow-auto z-50 mt-1 min-w-[210px] rounded-lg border border-zinc-200 bg-white p-1 text-zinc-700 font-light shadow-md"
            align="start"
            sideOffset={5}
          >
            <motion.div
              key="dropdown-content"
              initial={{ opacity: 0, y: -4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="space-y-1"
            >
              {modes.map((item) => (
                <DropdownMenu.Item
                  key={item.value}
                  onSelect={() => {
                    setMode(item.value);
                    setOpen(false);
                  }}
                  className={`
                    flex items-center gap-2 w-full px-2.5 py-1.5
                    text-sm font-light rounded-md cursor-pointer
                    focus:outline-none
                    transition-colors
                    data-[highlighted]:bg-zinc-100
                    data-[highlighted]:text-zinc-900
                    ${mode === item.value ? 'bg-blue-50 text-blue-600 font-light' : ''}
                  `}
                >
                  {item.icon}
                  {item.label}
                </DropdownMenu.Item>
              ))}
            </motion.div>
          </DropdownMenu.Content>

          )}
        </AnimatePresence>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
