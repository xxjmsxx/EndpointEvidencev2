import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

// Plus can be: oncology, neurology, hematology, cardiology, immunology -> check type
const pluses= [
  {
    label: 'Lung Cancer',
    value: 'lung-cancer',
  },
  {
    label: 'Colorectal Cancer',
    value: 'colorectal-cancer',
  },
  {
    label: 'Breast Cancer',
    value: 'breast-cancer',
  },
  {
    label: 'Prostate Cancer',
    value: 'prostate-cancer',
  },
  {
    label: 'Hematology malignancies',
    value: 'hematology-malignancies',
  },
  {
    label: 'Other malignancies',
    value: 'other-malignancies',
  },
];

export default function PlusSelector({ plus, setPlus }: { plus: string; setPlus: (m: string) => void }) {
  // const current = pluses.find((p) => p.value === plus);
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <button
          className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center border border-zinc-300 bg-white hover:bg-zinc-100 transition ${open ? 'bg-zinc-100' : ''}`}
          aria-label="Open dropdown"
        >
          <Plus
            className={`h-4 w-4 transition-transform text-zinc-400`}
          />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <AnimatePresence>
          {open && (
            <DropdownMenu.Content
            forceMount
            asChild
            className="max-h-50 cursor-pointer overflow-auto z-50 mt-1 min-w-[150px] rounded-lg border border-zinc-200 bg-white p-1 text-zinc-700 shadow-md"
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
              {pluses.map((item) => (
                <DropdownMenu.Item
                  key={item.value}
                  onSelect={() => {
                    setPlus(item.value);
                    setOpen(false);
                  }}
                  className={`
                    flex items-center gap-2 w-full px-2.5 py-1.5
                    text-sm font-light rounded-md cursor-pointer
                    focus:outline-none
                    transition-colors
                    data-[highlighted]:bg-zinc-100
                    data-[highlighted]:text-zinc-900
                    ${plus === item.value ? 'bg-blue-50 text-blue-600 font-light' : ''}
                  `}
                >
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
