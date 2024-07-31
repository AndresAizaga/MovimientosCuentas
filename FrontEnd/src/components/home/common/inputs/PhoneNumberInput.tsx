import { FC, useCallback } from 'react';
import { InputAdornment, MenuItem, Select, TextField, TextFieldProps, Typography } from '@mui/material';
import { CountryIso2, FlagEmoji, defaultCountries, parseCountry, usePhoneInput } from 'react-international-phone';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { useDebounce } from 'use-debounce';
import { SetAction } from '../../../../types';

export interface PhoneNumberInputProps extends Omit<TextFieldProps, 'onChange' | 'value'>{
  onChangePhoneNumber: SetAction<string | undefined>;
  phoneNumber: string;
  setErrorPhoneNumber: SetAction<boolean>;
}

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

export const PhoneNumberInput: FC<PhoneNumberInputProps> = (props) => {
  const { onChangePhoneNumber, phoneNumber, setErrorPhoneNumber } = props;

  const { phone, handlePhoneValueChange, inputRef, country, setCountry } =
      usePhoneInput({
        defaultCountry: 'ec',
        value: phoneNumber,
        countries: defaultCountries,
        defaultMask: '.. ... ....',
        forceDialCode: true,
        onChange: (data) => {
          if (data.phone !== '+593 ') {
            onChangePhoneNumber(data.phone);
          }
        },
      });

  const validatePhoneNumber = useCallback(() => {
    const isValid = isPhoneValid(phoneNumber);
    if (!isValid && phoneNumber) {
      setErrorPhoneNumber(true);
      return 'Número telefónico no válido';
    } else {
      setErrorPhoneNumber(false);
      return '';
    }
  }, [setErrorPhoneNumber, phoneNumber]);

  const [errorPhoneNumber] = useDebounce(validatePhoneNumber(), 500);
    
  return (
    <TextField
      error={errorPhoneNumber !== ''}
      helperText={errorPhoneNumber}
      variant="outlined"
      label="Número telefónico"
      placeholder="Ingrese Número"
      value={phone}
      onChange={handlePhoneValueChange}
      type="tel"
      inputRef={inputRef}
      InputProps={{
        startAdornment: (
          <InputAdornment
            position="start"
            style={{ marginRight: '2px', marginLeft: '-8px' }}
          >
            <Select
              MenuProps={{
                style: {
                  height: '300px',
                  width: '360px',
                  top: '10px',
                  left: '-34px',
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
                },
              }}
              sx={{
                width: 'max-content',
                fieldset: {
                  display: 'none',
                },
                '&.Mui-focused:has(div[aria-expanded="false"])': {
                  fieldset: {
                    display: 'block',
                  },
                },
                '.MuiSelect-select': {
                  padding: '8px',
                  paddingRight: '24px !important',
                },
                svg: {
                  right: 0,
                },
              }}
              value={country}
              onChange={(e) => setCountry(e.target.value as CountryIso2)}
              renderValue={(value) => (
                <FlagEmoji iso2={value} size={25} style={{ display: 'flex' }} />
              )}
            >
              {defaultCountries.map((c) => {
                const country = parseCountry(c);
                return (
                  <MenuItem key={country.iso2} value={country.iso2}>
                    <FlagEmoji
                      iso2={country.iso2}
                      size={25}
                      style={{ marginRight: '8px' }}
                    />
                    <Typography marginRight="8px">{country.name}</Typography>
                    <Typography color="gray">+{country.dialCode}</Typography>
                  </MenuItem>
                );
              })}
            </Select>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};