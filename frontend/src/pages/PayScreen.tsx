import logo from '../assets/images.jfif'
import { ArrowDown, CreditCard } from 'lucide-react';

const PayScreen = () => {

    const amount = 3500;

     return (
        <main
        className="bg-[#E5E4E2] min-h-screen w-screen flex flex-col items-center font-primary">
        <section className='bg-primary w-screen h-140 pt-15 flex flex-col items-center'>
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
        </section>
        <section className='my-9 w-[90%] bg-white rounded-lg p-6 shadow-md'>
            <p className='text-center text-2xl font-bold'>Payment Form</p>
            <hr className='my-4 mt-5 border-gray-400'></hr>
            <form className='flex flex-col gap-4'>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="name" className='text-sm font-medium'>Full Name</label>
                    <input type="text" id="name" className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary' placeholder='Enter your full name' />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="matricule" className='text-sm font-medium'>Matricule Number</label>
                    <input type="text" id="matricule" className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary' placeholder='Enter your matricule number' />
                </div>
                <button type="submit" className='py-3 px-6 bg-primary text-white rounded-md font-bold cursor-pointer mt-4'>Pay Now</button>
            </form>
        </section>
        </main>
     )
}

export default PayScreen