import PaystackPop from '@paystack/inline-js';
import axios from 'axios';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useCartStore } from '../store/cart';

export default function PaystackCheckout() {
    const { setItemsCount } = useCartStore();

    useEffect(() => {
        const startPayment = async () => {
            try {
                // call backend to initialize
                const res = await axios.post('/initpay');
                const accessCode = res.data.data.access_code;
                // resume Paystack transaction with access code
                const popup = new PaystackPop();
                popup.resumeTransaction(accessCode).callbacks.onSuccess = () => {
                    axios.get('paystack-callback/?ref=' + res.data.data.reference, { _showAllMessages: true, _load2: true })
                        .then(res => {
                            if (res.data.status == 'success') {
                                setItemsCount(0)
                            }
                        })
                }
            } catch (error) {
                console.error("Payment initialization failed:", error);
            }
        };

        startPayment();
    }, []);

    return <div className=' dark:text-white2  dark:bg-black not-dark:bg-white2 w-dvw h-dvh fixed top-0 left-0 z-[999999] flex flex-col justify-center items-center'>
        <LoaderCircle className='animate-spin' size={60} />
    </div>;
}
