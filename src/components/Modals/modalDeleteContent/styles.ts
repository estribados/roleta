import tw from 'tailwind-styled-components';

const ButtonConfirm = tw.div`
w-full
inline-flex 
justify-center 
rounded-md 
border 
border-transparent 
shadow-sm 
px-4 
py-3 
text-base 
font-bold  
bg-green-400
sm:col-start-2
sm:text-sm
uppercase
hover:brightness-90
transition-all
cursor-pointer
`;
const CancelButton = tw.button`
uppercase
mt-3 
w-full 
inline-flex 
justify-center 
rounded-md 
border 
shadow-sm 
px-4
py-3 
text-base 
font-bold
bg-red-500
sm:mt-0 
sm:col-start-1 
sm:text-sm
hover:brightness-90
transition-all

`;
export { ButtonConfirm, CancelButton };

