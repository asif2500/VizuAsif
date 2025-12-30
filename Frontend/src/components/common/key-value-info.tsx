import type { ReactNode } from "react";

export const KeyValueInfo = ({
    label,
    value,
  }: {
    label: string;
    value: string | ReactNode;
  }) => (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
  