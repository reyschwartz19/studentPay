import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';

interface CheckoutFormProps {
    onSuccess: () => void;
    onError: (error: string) => void;
    amount: number;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ 
    onSuccess, 
    onError,
    amount 
}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        try {
            
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/payment-success`, 
                },
                redirect: 'if_required', 
            });

            if (error) {
                
                onError(error.message || 'Payment failed');
            } else if (paymentIntent && paymentIntent.status === 'succeeded') {
                
                onSuccess();
            }
        
        } catch (err) {
            onError('An unexpected error occurred',err);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-600 mb-2">Amount to pay:</p>
                <p className="text-2xl font-bold text-primary">{amount} XAF</p>
            </div>
            
          
            <PaymentElement />
            
            <button
                type="submit"
                disabled={!stripe || isProcessing}
                className="py-3 px-6 bg-primary text-white rounded-md font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isProcessing ? 'Processing Payment...' : 'Pay Now'}
            </button>
        </form>
    );
};