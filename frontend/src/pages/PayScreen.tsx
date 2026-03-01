import logo from '../assets/images.jfif'
import { ArrowDown, CreditCard } from 'lucide-react';

const PayScreen = () => {

    const amount = 3500;

     return (
        <main 
        className="bg-[#FFFFF0] h-screen w-screen flex">
        <div className='bg-primary w-screen h-140 pt-15 flex flex-col items-center'>
            <img src={logo} alt="uba logo" className='h-35 w-35' />
            <h1 className='text-white text-center mt-5 text-4xl font-bold'>HTTC PAY</h1>
            <p className='text-white text-center mt-5 text-2xl'>
                Secure and fast payments of student-dues
            </p>
            <button className='mx-auto py-4 px-6 mt-5 bg-white text-primary rounded-md font-bold cursor-pointer flex items-center'>
                Proceed to Pay <ArrowDown className='inline-block ml-2 h-5 w-5 animate-bounce' />
            </button>
            <p className='text-white text-center mt-5 text flex items-center'>
                <CreditCard className='inline-block mr-2 h-6 w-6 text-secondary' /> {amount}/Student
            </p>
        </div>
        </main>
     )
}

export default PayScreen