import React, { useCallback, useRef, useState } from "react";

import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { BackButton, ButtonAnimated } from "components/Buttons";
import { Input } from "components/Form";
import { DefaultModal } from "components/Modals/DefaultModal";
import dynamic from "next/dynamic";
import { AiFillEye, AiOutlineClose } from "react-icons/ai";
import { FiX } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { Container } from "styles/global";
import { ContainerLabel, Label } from "styles/roletas/roletas";
import getValidationErrors from "utils/getValidationErros";
import * as Yup from "yup";
import api from "services/api";
import { IRoulleteQuota } from "interfaces/types";
import { useToast } from "hooks/useToast";
import { useRouter } from "next/router";

const DynamicComponentWithNoSSR = dynamic(() => import("components/Roullete"), {
  ssr: false,
});

interface dataRoulleteProps {
  color?: string | undefined;
  valueQuota?: number | undefined;
  percentageQuota?: number | undefined;
}
interface FormProps {
  id?: string;
  roullete?: IRoulleteQuota;
}

const FormRoullete: React.FC<FormProps> = ({ id, roullete }) => {
  const { notify } = useToast();
  const { push } = useRouter();

  const formRef = useRef<FormHandles>(null);
  const [hasOpen, setHasOpen] = useState(false);
  const [lineInput, setLineInput] = useState<dataRoulleteProps>();
  const [nameForm, setNameForm] = useState(() => {
    if (id) {
      if (roullete?.quotas) {
        return roullete?.quotas;
      } else {
        return [
          {
            valueQuota: undefined,
            percentageQuota: undefined,
            color: "#000000",
          },
        ];
      }
    } else {
      return [
        { valueQuota: undefined, percentageQuota: undefined, color: "#000000" },
      ];
    }
  });

  const changeValues = (
    { valueQuota, percentageQuota, color }: dataRoulleteProps,
    index: number
  ) => {
    setLineInput({ valueQuota, percentageQuota, color });
    if (percentageQuota) nameForm[index].percentageQuota = percentageQuota;
    if (valueQuota) nameForm[index].valueQuota = valueQuota;
    if (color) nameForm[index].color = color;
  };

  const duplicateInput = () => {
    setNameForm((oldArray) => [
      ...oldArray,
      { valueQuota: undefined, percentageQuota: undefined, color: "#000000" },
    ]);
  };

  const removeLineInput = (index: number) => {
    const updateList = [...nameForm];

    if (nameForm.length > 1) {
      updateList.splice(index, 1);
      setNameForm(updateList);
    }
  };

  const updateRoullete = async ({
    id,
    itens,
    roullete,
  }: {
    id: string;
    roullete: { nameCategory: string; valueCategory: number };
    itens: dataRoulleteProps;
  }) => {
    await api.put("roulletes/update", {
      id,
      itens,
      roullete,
    });
  };

  const createRoullete = async ({
    itens,
    roullete,
  }: {
    roullete: { nameCategory: string; valueCategory: string };
    itens: dataRoulleteProps;
  }) => {
    await api.post("roulletes/create", {
      nameCategory: roullete.nameCategory,
      price_roullete: Number(roullete.valueCategory),
      quotas: itens,
    });
  };

  const handleSubmit = useCallback(
    async (data: { nameCategory: string; valueCategory: string }) => {
      try {
        formRef.current?.setErrors({});

        if (id) {
          await updateRoullete({
            id,
            itens: nameForm as dataRoulleteProps,
            roullete: {
              nameCategory: data.nameCategory,
              valueCategory: Number(data.valueCategory),
            },
          });
        } else {
          await createRoullete({
            itens: nameForm as dataRoulleteProps,
            roullete: {
              nameCategory: data.nameCategory,
              valueCategory: data.valueCategory,
            },
          });
        }

        notify({
          message: `Roleta ${id ? "atualizada" : "criada"} com sucesso`,
          types: "success",
        });
        push("/painel/roletas");
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
      }
    },
    [id, nameForm, notify, push]
  );

  return (
    <>
      <Container>
        <div className="w-full h-full flex justify-between md:mt-2 mt-5  ">
          <div className="w-full md:w-1/2 border-r-2 px-5">
            <div className="flex justify-between items-center">
              <h1 className="md:text-2xl md:text-center text-left text-1xl">
                CADASTRO DE ROLETA
              </h1>
              <BackButton path="/painel/roletas" title={"Cadastrar"} />
            </div>

            <Form
              initialData={{
                nameCategory: roullete?.nameCategory,
                valueCategory: roullete?.price_roullete,
              }}
              className="mt-5 w-full overflow-y-auto max-h-[500px]"
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <ContainerLabel>
                <Label htmlFor="nome">
                  <p className="text-gray-300 font-bold">Categoria da Roleta</p>
                  <Input
                    style={{ color: "black" }}
                    id="nameCategory"
                    name="nameCategory"
                    type="text"
                    placeholder="Ex: Prata,Ouro"
                  />
                </Label>

                <Label htmlFor="nome">
                  <p className="text-gray-300 font-bold">Valor da Categoria</p>
                  <Input
                    style={{ color: "black" }}
                    id="valueCategory"
                    name="valueCategory"
                    type="text"
                    placeholder="Valor por jogada"
                  />
                </Label>
              </ContainerLabel>
              <button
                onClick={() => {
                  setHasOpen(true);
                }}
                className=" md:hidden mt-5 flex items-center btn btn-outline btn-info btn-sm"
              >
                Ver Roleta <AiFillEye className="ml-5" />
              </button>
              {nameForm?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bg-black50 shadow-sm my-2 p-2 rounded-md flex flex-col md:flex-row  justify-between gap-0 md:gap-5 w-full items-end"
                  >
                    <div className="  w-full">
                      <label htmlFor="" className=" text-sm">
                        Valor
                      </label>
                      {/* <MaskInput getValue={(e) =>{changeValues({...lineInput,valueQuota:Number(e.replace(/([^\d])+/gim, ''))},index)}} mask='currency'/> */}
                      <input
                        defaultValue={item?.valueQuota}
                        onChange={(e) => {
                          changeValues(
                            {
                              ...lineInput,
                              valueQuota: Number(e.target.value),
                            },
                            index
                          );
                        }}
                        type="number"
                        placeholder="Cota"
                        className="md:mb-0 mb-2 text-black  input-sm bg-white input input-bordered input-warning w-full max-w-xs"
                      />
                    </div>

                    <div className="  w-full">
                      <label className="text-sm" htmlFor="">
                        Porcentagem{" "}
                      </label>
                      <input
                        defaultValue={item.percentageQuota}
                        onChange={(e) => {
                          changeValues(
                            {
                              ...lineInput,
                              percentageQuota: Number(e.target.value),
                            },
                            index
                          );
                        }}
                        type="text"
                        placeholder="% Acerto"
                        className="md:mb-0 mb-2 text-black input-sm  bg-white input input-bordered input-warning w-full max-w-xs"
                      />
                    </div>

                    <div className=" w-full">
                      <label htmlFor="" className="text-sm">
                        Cor de fundo
                      </label>
                      <input
                        defaultValue={item.color}
                        type={"color"}
                        placeholder="Type here"
                        onChange={(e) => {
                          changeValues(
                            { ...lineInput, color: e.target.value },
                            index
                          );
                        }}
                        className="md:mb-0 mb-4 input-sm bg-white input input-bordered input-warning w-full max-w-xs"
                      />
                    </div>

                    {nameForm.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          removeLineInput(index);
                        }}
                        className={
                          "md:w-10 w-full btn btn-outline btn-error btn-sm"
                        }
                      >
                        <AiOutlineClose color="red" size={20} />
                      </button>
                    )}
                  </div>
                );
              })}
              <div className="my-5 flex gap-5">
                <ButtonAnimated
                  type="button"
                  onClick={duplicateInput}
                  animation={false}
                >
                  <IoMdAdd />
                </ButtonAnimated>
                <ButtonAnimated type="submit" animation={false}>
                  Salvar
                </ButtonAnimated>
              </div>
            </Form>
          </div>
          <div className="md:block hidden">
            <DynamicComponentWithNoSSR disabled item={{ data: nameForm }} />
          </div>
        </div>
      </Container>

      <DefaultModal
        width="100%"
        margin="auto 0"
        isOpen={hasOpen}
        setIsOpen={() => {
          setHasOpen(true);
        }}
        content={
          <div className="relative">
            <header className="flex w-full justify-between items-center text-black mb-5">
              ROLETA
              <FiX
                cursor={"pointer"}
                onClick={() => {
                  setHasOpen(false);
                }}
              />
            </header>

            <div className="ml-5 flex items-center justify-center w-full h-full">
              <DynamicComponentWithNoSSR disabled item={{ data: nameForm }} />
            </div>
          </div>
        }
      />
    </>
  );
};

export default FormRoullete;
