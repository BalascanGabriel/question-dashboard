
import { HTMLAttributes, ReactNode } from 'react';

export interface GlassMorphicCardProps extends HTMLAttributes<HTMLDivElement> {
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  
  // These properties are used in StatusDisplay cards
  icon?: ReactNode;
  value?: ReactNode;
  loading?: boolean;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}
