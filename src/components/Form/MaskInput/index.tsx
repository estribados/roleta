import React, { InputHTMLAttributes, useCallback } from "react";

import { cep, currency, cpf } from "./masks";


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  mask: "cep" | "currency" | "cpf";
  getValue(value:string):void
}



const MaskInput: React.FC<InputProps> = ({ mask,getValue, ...props }) => {
  const handleKeyUp = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {

      if (mask === "cep") {
        cep(e);
      }
      if (mask === "currency") {
       currency(e);
      }
      if (mask === "cpf") {
        cpf(e);
      }

      getValue(e.currentTarget.value)

    },
    [getValue, mask]
  );

  return (
      <div className="form-control">
      <label className="input-group">
        <span className="bg-gold100 px-2">R$</span>
        <input className="md:mb-0 mb-2 text-black  input-sm bg-white input input-bordered input-warning w-full max-w-xs" {...props} onKeyUp={handleKeyUp} />
      </label>
    </div>

  );
};

export {MaskInput};