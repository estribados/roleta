import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode, useRef } from 'react';

import { dialogPanel } from './styles';

interface IDefaultModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  content: ReactNode;
  icon?: ReactNode;
  margin?:string
  width?:string
}

const DefaultModal: React.FC<IDefaultModalProps> = ({
  setIsOpen,
  isOpen,
  margin,
  content,
  width
}) => {
  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50  bg-white"
        initialFocus={cancelButtonRef}
        onClose={setIsOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className=" blur-sm brightness-105 fixed inset-0 bg-black backdrop-sepia-0 bg-opacity-20 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel style={{margin:margin,width:width}} className={dialogPanel}>{content}</Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export { DefaultModal };

