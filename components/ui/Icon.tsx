import type { SVGProps } from 'react';

export type IconName =
  | 'seal'
  | 'arrow-up-right'
  | 'check'
  | 'alert'
  | 'pulse'
  | 'ledger'
  | 'clock'
  | 'lock'
  | 'refresh'
  | 'search'
  | 'dollar'
  | 'users'
  | 'percent'
  | 'sparkles'
  | 'trend-up'
  | 'trend-down'
  | 'plus'
  | 'close'
  | 'export'
  | 'share'
  | 'bell'
  | 'database';

export interface IconProps extends SVGProps<SVGSVGElement> {
  readonly name: IconName;
  readonly size?: number;
}

export function BrandLogoMark({ size = 24 }: { readonly size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect
        x="16"
        y="2"
        width="8.5"
        height="8.5"
        rx="2"
        transform="rotate(45 16 2)"
        fill="#FF944D"
      />
      <rect
        x="24"
        y="10"
        width="8.5"
        height="8.5"
        rx="2"
        transform="rotate(45 24 10)"
        fill="#F27427"
      />
      <rect
        x="8"
        y="10"
        width="8.5"
        height="8.5"
        rx="2"
        transform="rotate(45 8 10)"
        fill="#F27427"
      />
      <rect
        x="16"
        y="18"
        width="8.5"
        height="8.5"
        rx="2"
        transform="rotate(45 16 18)"
        fill="#D95B12"
      />
    </svg>
  );
}

export function Icon({
  name,
  size = 18,
  className = '',
  ...props
}: IconProps) {
  const sharedProps = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
    className: `shrink-0 ${className}`,
    ...props,
  };

  switch (name) {
    case 'dollar':
      return (
        <svg {...sharedProps}>
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      );
    case 'users':
      return (
        <svg {...sharedProps}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'percent':
      return (
        <svg {...sharedProps}>
          <line x1="19" y1="5" x2="5" y2="19" />
          <circle cx="6.5" cy="6.5" r="2.5" />
          <circle cx="17.5" cy="17.5" r="2.5" />
        </svg>
      );
    case 'sparkles':
      return (
        <svg {...sharedProps}>
          <path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3z" />
        </svg>
      );
    case 'trend-up':
      return (
        <svg {...sharedProps}>
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
      );
    case 'trend-down':
      return (
        <svg {...sharedProps}>
          <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
          <polyline points="16 17 22 17 22 11" />
        </svg>
      );
    case 'plus':
      return (
        <svg {...sharedProps}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case 'close':
      return (
        <svg {...sharedProps}>
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      );
    case 'export':
      return (
        <svg {...sharedProps}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      );
    case 'share':
      return (
        <svg {...sharedProps}>
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      );
    case 'bell':
      return (
        <svg {...sharedProps}>
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      );
    case 'database':
      return (
        <svg {...sharedProps}>
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      );
    case 'seal':
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v10M7 12h10" />
        </svg>
      );
    case 'arrow-up-right':
      return (
        <svg {...sharedProps}>
          <path d="M7 17L17 7" />
          <path d="M8 7h9v9" />
        </svg>
      );
    case 'check':
      return (
        <svg {...sharedProps}>
          <path d="M20 6L9 17l-5-5" />
        </svg>
      );
    case 'alert':
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v5" />
          <path d="M12 16h.01" />
        </svg>
      );
    case 'pulse':
      return (
        <svg {...sharedProps}>
          <path d="M3 12h4l3-7 4 14 3-7h4" />
        </svg>
      );
    case 'ledger':
      return (
        <svg {...sharedProps}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 10h18M9 4v16" />
        </svg>
      );
    case 'clock':
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case 'lock':
      return (
        <svg {...sharedProps}>
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 018 0v4" />
        </svg>
      );
    case 'refresh':
      return (
        <svg {...sharedProps}>
          <path d="M21 12a9 9 0 11-2.64-6.36L21 8" />
          <path d="M21 3v5h-5" />
        </svg>
      );
    case 'search':
      return (
        <svg {...sharedProps}>
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
      );
  }
}
