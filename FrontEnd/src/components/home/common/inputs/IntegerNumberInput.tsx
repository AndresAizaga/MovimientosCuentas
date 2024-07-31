import { forwardRef } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { CustomProps } from './inputs.types.ts';

export const IntegerNumberInput = forwardRef<NumericFormatProps, CustomProps>(
  function IntegerNumberInput(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        isAllowed={(values) => {
          const { floatValue } = values;
          return floatValue ? floatValue > 0 : true;
        }}
        decimalScale={0}
        valueIsNumericString
      />
    );
  },
);
