import React, { useState, InputHTMLAttributes, CSSProperties } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { IconBaseProps } from "react-icons";
import { useTheme } from "styled-components";
import NumberFormat, { NumberFormatValues } from "react-number-format";

import { MaskProps, switchMaskInput } from "./switchMaskInput";

import * as S from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  labelIcon?: string;
  icon?: React.ComponentType<IconBaseProps> | string;
  onClickIcon?: () => void;
  customRef?: React.RefObject<HTMLInputElement>;
  maskType?: MaskProps;
  fontSize?: number;
  hasError?: string;
  readOnly?: boolean;
  onFocusClearError?: () => void;
  handleEditingBlur?: () => void;
  valueCurrency?: number | string | null;
  onChangeCurrency?: (values: NumberFormatValues) => void;
  containerStyle?: CSSProperties | undefined;
  inputName?: string;
  paddingRight?: number;
  classStyle?: string;
}

export function Input({
  name,
  maskType,
  fontSize = 12,
  hasError = "",
  customRef,
  readOnly = false,
  onFocusClearError,
  handleEditingBlur,
  valueCurrency,
  onChangeCurrency,
  labelIcon = "",
  icon,
  onClickIcon,
  containerStyle,
  inputName,
  paddingRight,
  classStyle,
  defaultValue,
  ...rest
}: InputProps) {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const mask = switchMaskInput(maskType!);

  function handleInputBlur() {
    setIsFocused(false);
    handleEditingBlur?.();
  }

  function handleOnfocus() {
    if (onFocusClearError) {
      onFocusClearError();
    }
    setIsFocused(true);
  }

  return (
    <>
      {!!name && <S.Label fontSize={fontSize}>{name}</S.Label>}
      <S.Container
        style={containerStyle}
        isErrored={!!hasError}
        isFocused={isFocused}
        isReadOnly={readOnly}
        className={classStyle}
      >
        {/* {Icon && <Icon size="20" />} */}
        {maskType === "money" && (
          <NumberFormat
            prefix="R$ "
            placeholder="R$ 0,00"
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            name={inputName}
            fixedDecimalScale
            value={defaultValue as string}
            onValueChange={onChangeCurrency}
            onFocus={() => handleOnfocus()}
            onBlur={() => handleInputBlur()}
            readOnly={readOnly}
          />
        )}

        {maskType && maskType !== "money" && (
          <S.MaskInput
            mask={mask}
            readOnly={readOnly}
            name={inputName}
            onFocus={() => handleOnfocus()}
            onBlur={() => handleInputBlur()}
            {...rest}
          />
        )}

        {!maskType && (
          <input
            style={{ paddingRight: paddingRight ? paddingRight : 0 }}
            onFocus={handleOnfocus}
            name={inputName}
            onBlur={handleInputBlur}
            readOnly={readOnly}
            ref={customRef}
            // defaultValue={defaultValue}
            // ref={inputRef}
            {...rest}
          />
        )}

        {!!icon && typeof icon === "string" && (
          <S.ButtonIcon title={labelIcon} onClick={onClickIcon}>
            {/* <img src={icon} alt="icone de editar input" /> */}
          </S.ButtonIcon>
        )}

        {!!hasError && (
          <S.Error title={hasError}>
            <FiAlertCircle color={"red"} size="20" />
          </S.Error>
        )}
      </S.Container>
    </>
  );
}
