import React, { useCallback, useEffect, useRef, useState } from "react";

import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { BackButton, ButtonAnimated } from "components/Buttons";
import { Input, InputMask } from "components/Form";
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
import { v4 as uuid } from "uuid";

const DynamicComponentWithNoSSR = dynamic(() => import("components/Roullete"), {
  ssr: false,
});

interface dataRoulleteProps {
  color?: string | undefined;
  valueQuota?: number | undefined;
  percentQuota?: number;
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
  const [valueCategory, setValueCategory] = useState<string | undefined>("");
  const [quotaId, setQuotaId] = useState<string | undefined>("");
  const [percentageRoullete, setPercentageRoullete] = useState("");
  const [lineInput, setLineInput] = useState<dataRoulleteProps>();
  const [nameForm, setNameForm] = useState(() => {
    if (id) {
      if (roullete?.quotas) {
        return roullete?.quotas;
      } else {
        return [
          {
            valueQuota: 0,
            color: "#000000",
            percentQuota: undefined,
          },
          {
            valueQuota: 0,
            color: "#e90e0e",
            percentQuota: undefined,
          },
        ];
      }
    } else {
      return [
        { valueQuota: 0, color: "#000000", percentQuota: undefined },
        {
          valueQuota: 0,
          color: "#e90e0e",
          percentQuota: undefined,
        },
      ];
    }
  });

  const changeValues = (
    { valueQuota, color, percentQuota }: dataRoulleteProps,
    index: number
  ) => {
    setLineInput({ valueQuota });
    if (valueQuota) nameForm[index].valueQuota = valueQuota;
    if (color) nameForm[index].color = color;
    if (percentQuota) nameForm[index].percentQuota = percentQuota;
  };

  const duplicateInput = () => {
    setNameForm((oldArray) => [
      ...oldArray,
      { valueQuota: undefined, color: "#000000" },
    ]);
  };

  const removeLineInput = async (index: number, id: string | undefined) => {
    const updateList = [...nameForm];

    if (nameForm.length > 1) {
      updateList.splice(index, 1);
      setNameForm(updateList);
    }

    if (id) {
      await api.delete(`quotas/delete/`, {
        params: {
          id,
        },
      });
    }
  };

  const updateRoullete = async ({
    id,
    itens,
    roullete,
  }: {
    id: string;
    roullete: {
      nameCategory: string;
      valueCategory: number;
      percentageRoullete: number;
    };
    itens: dataRoulleteProps;
  }) => {
    await api.put("roulletes/update", {
      id,
      itens,
      roullete,
    });
  };

  useEffect(() => {
    setValueCategory(roullete?.price_roullete.toString());
  }, [roullete?.price_roullete]);

  const createRoullete = useCallback(
    async ({
      itens,
      roullete,
    }: {
      roullete: {
        nameCategory: string;
        valueCategory: string;
        percentageRoullete: number;
      };
      itens: dataRoulleteProps;
    }) => {
      await api.post("roulletes/create", {
        nameCategory: roullete.nameCategory,
        price_roullete: Number(valueCategory),
        percentageRoullete: roullete.percentageRoullete,
        quotas: itens,
      });
    },
    [valueCategory]
  );

  const handleSubmit = useCallback(
    async (data: {
      nameCategory: string;
      valueCategory: string;
      percentageRoullete: number;
    }) => {
      try {
        formRef.current?.setErrors({});

        if (id) {
          await updateRoullete({
            id,
            itens: nameForm as dataRoulleteProps,
            roullete: {
              percentageRoullete: Number(data.percentageRoullete),
              nameCategory: data.nameCategory,
              valueCategory: Number(valueCategory),
            },
          });
        } else {
          await createRoullete({
            itens: nameForm as dataRoulleteProps,
            roullete: {
              nameCategory: data.nameCategory,
              valueCategory: valueCategory || "",
              percentageRoullete: data.percentageRoullete,
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
    [createRoullete, id, nameForm, notify, push, valueCategory]
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
                percentageRoullete: roullete?.percentageRoullete,
              }}
              className="pr-5 mt-5 w-full overflow-y-auto max-h-[500px]"
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

                  <InputMask
                    placeholder={`Valor da Cota`}
                    maskType="money"
                    {...(id && { defaultValue: Number(valueCategory) })}
                    classStyle="md:mb-0 mb-2 text-black bg-white input input-bordered input-warning w-full max-w-xs"
                    onChangeCurrency={({ formattedValue, value }: any) => {
                      setValueCategory(value);
                    }}
                  />
                </Label>

                <Label htmlFor="percentageRoullete">
                  <p className="text-gray-300 font-bold">
                    Porcentagem premio roleta
                  </p>

                  <Input
                    style={{ color: "black" }}
                    id="percentageRoullete"
                    name="percentageRoullete"
                    type="text"
                    placeholder="Premio"
                  />
                </Label>
              </ContainerLabel>
              <button
                type="button"
                onClick={() => {
                  setHasOpen(true);
                }}
                className=" md:hidden mt-5 flex items-center btn btn-outline btn-info btn-sm"
              >
                Ver Roleta <AiFillEye className="ml-5" />
              </button>

              {nameForm?.map((item, index) => {
                const firstLine = index === 0;
                const secondLine = index === 1;
                return (
                  <div
                    onClick={() => {
                      setQuotaId(item?.id);
                    }}
                    key={index}
                    className={`${
                      firstLine &&
                      "border-solid border border-gold100 bg-gold100"
                    }

                      ${
                        secondLine &&
                        "border-solid border border-red-500 bg-redborder-red-500"
                      }
                    
                      bg-black50 shadow-sm my-2 p-2 rounded-md flex flex-col md:flex-row  justify-between gap-0 md:gap-5 w-full items-end`}
                  >
                    {firstLine && (
                      <div className="text-xs">Premio bonus semanal</div>
                    )}

                    {secondLine && (
                      <div className="text-xs">Premio bonus fixo</div>
                    )}

                    <div className=" flex flex-col  w-full">
                      <label htmlFor="" className=" text-sm">
                        Valor
                      </label>
                      <InputMask
                        placeholder={`Valor da Cota`}
                        maskType="money"
                        defaultValue={Number(item?.valueQuota)}
                        classStyle="md:mb-0 mb-2 text-black  input-sm bg-white input input-bordered input-warning w-full max-w-xs"
                        onChangeCurrency={({ formattedValue, value }: any) => {
                          changeValues(
                            {
                              ...lineInput,
                              valueQuota: value,
                            },
                            index
                          );
                        }}
                      />
                    </div>
                    {firstLine && (
                      <div>
                        <label className="text-sm flex flex-col  w-full">
                          Porcentagem
                        </label>
                        <input
                          max={100}
                          defaultValue={item.percentQuota}
                          onChange={(e) => {
                            changeValues(
                              {
                                ...lineInput,
                                percentQuota: Number(e.target.value),
                              },
                              index
                            );
                          }}
                          className="md:mb-0 mb-4 input-sm bg-white text-black  input input-bordered input-warning w-full max-w-xs"
                          type="text"
                        />
                      </div>
                    )}
                    {secondLine && (
                      <>
                        <div>
                          <label className="text-sm flex flex-col  w-full">
                            Porcentagem
                          </label>
                          <input
                            max={100}
                            defaultValue={item.percentQuota}
                            onChange={(e) => {
                              changeValues(
                                {
                                  ...lineInput,
                                  percentQuota: Number(e.target.value),
                                },
                                index
                              );
                            }}
                            className="md:mb-0 mb-4 input-sm bg-white text-black  input input-bordered input-warning w-full max-w-xs"
                            type="text"
                          />
                        </div>
                      </>
                    )}
                    <div className=" flex flex-col w-full">
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
                    {nameForm.length > 1 && !firstLine && !secondLine && (
                      <button
                        type="button"
                        onClick={() => {
                          removeLineInput(index, item.id);
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
          <div className=" md:m-auto md:block hidden">
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

            <div className="flex items-center justify-center w-full h-full">
              <DynamicComponentWithNoSSR disabled item={{ data: nameForm }} />
            </div>
          </div>
        }
      />
    </>
  );
};

export default FormRoullete;
