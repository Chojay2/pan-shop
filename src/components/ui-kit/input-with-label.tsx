import { PdInput } from '@/components/ui-kit/input';
import { PdLabel } from '@/components/ui-kit/label';

interface PdInputWithLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  label: string;
  placeholder: string;
}

export function PdInputWithLabel(props: PdInputWithLabelProps) {
  return (
    <div className="grid w-full items-center gap-[16px]">
      <PdLabel htmlFor={props.type}>{props.label}</PdLabel>
      <PdInput {...props} />
    </div>
  );
}
