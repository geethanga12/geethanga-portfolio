const BUTTON_BASE =
  'focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors duration-150 motion-reduce:transition-none';

/* bg-indigo-600 keeps white text above 4.5:1 in both themes; --accent doesn't */
export const PRIMARY_BUTTON = `${BUTTON_BASE} bg-indigo-600 text-white hover:bg-indigo-700`;

export const SECONDARY_BUTTON = `${BUTTON_BASE} border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--surface-raised)]`;

export const TEXT_LINK =
  'focus-ring inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-medium text-[var(--text-secondary)] transition-colors duration-150 hover:text-[var(--text)] motion-reduce:transition-none';
