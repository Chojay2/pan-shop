import { PdInput } from '@/components/ui-kit/input';
import { PdLabel } from '@/components/ui-kit/label';

interface PdInputWithLabelProps {
  type: string;
  label: string;
  placeholder: string;
}

export function PdInputWithLabel(props: PdInputWithLabelProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <PdLabel htmlFor={props.type}>{props.label}</PdLabel>
      <PdInput
        type={props.placeholder}
        id={props.label}
        placeholder={props.placeholder}
      />
    </div>
  );
}
