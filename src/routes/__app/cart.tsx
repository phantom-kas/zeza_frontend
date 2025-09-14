import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Heart, Loader2Icon, Minus, PlusIcon, XIcon } from 'lucide-react'
import { useCartStore } from '../../store/cart';
import axios from '../../lib/axios';
import { anyCurrency, debounce } from '../../composabels/utils';
import MediaImage from '../../components/mediaImage';
import DOMPurify from "dompurify"
import { useEffect, useMemo, useState } from 'react';
import PaystackCheckout from '../../components/paystackPopUp';

export const Route = createFileRoute('/__app/cart')({
    component: RouteComponent,
})




function RouteComponent() {
    const [initPay, setInitPay] = useState(false)
    const queryClient = useQueryClient()

    const { setItemsCount } = useCartStore();
    const handleRemoveItem = async (cart_item_id: any, count = -1) => {
        await axios.delete('/cart/remove-item', { data: { cart_item_id, count } }).then(res => {
            console.log('-----------------------remove=------------------')
            console.log(res.data.status)
            if (res.data.status != 'success') return

            setItemsCount(res.data.data.total.totalUnits)

            queryClient.setQueryData(['cart'], () => {
                console.log(res.data.data)
                console.log('-----------------------remove=------------------')
                return res.data.data
            })
            return
        })
    }
    const updateCount = async (cart_item_id: any, c: number) => {
        return axios.post('/cart/update-item-count', { cart_item_id, count: c }, { _showAllMessages: true }).then(res => {
            console.log('-----------------------remove=------------------')
            console.log(res.data.status)
            if (res.data.status != 'success') return
            setItemsCount(res.data.data.total.totalUnits)
            queryClient.setQueryData(['cart'], () => {
                console.log(res.data.data)
                console.log('-----------------------remove=------------------')


                return res.data.data
            })
            return
        })
    }


    const cc = () => {
        window.alert('sdasdsa')
    }
    // const debounceUpdate = debounce(async (cart_item_id: number, count: number) => window.alert('sdasdsa'), 3000)
    // const debOunceUpdate = debounce(async (cart_item_id: number, count: number) => await updateCount(cart_item_id, count), 1000)

    const debouncedUpdate = useMemo(
        () => debounce(updateCount, 1000),
        []
    );


    const { data, error, isPending } = useQuery({
        queryKey: ['cart'],
        queryFn: async () =>
            await axios.get('/cart').then(res => {
                if (res.data.status != 'success') return
                setItemsCount(res.data.data.total.totalUnits)
                return res.data.data
            }),
    })


    const updateUi = (cart_item_id: number, count = 1) => {
        let newQuantity: number | null = null;
        queryClient.setQueryData(['cart'], (old: any) => {
            if (!old) return old;

            const updatedCartItems = old.cartItems.map((ci: any) => {
                if (ci.id === cart_item_id) {
                    newQuantity = ci.quantity + count;  // store new quantity
                    return { ...ci, quantity: newQuantity, loading: true };
                }
                return ci;
            });

            return { ...old, cartItems: updatedCartItems };
        });

        if (newQuantity !== null) debouncedUpdate(cart_item_id, newQuantity);
    }


    if (isPending) return <div className=' mx-auto w-max1200 px-6 my-20'>loading...</div>

    if (error) return <div className=' mx-auto w-max1200 px-6 my-20'>An error has occurred:  + {error.message}</div>

    if (initPay) return <PaystackCheckout />
    return <section className="bg-white py-8 antialiased dark:bg-black md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white sm:text-2xl">Shopping Cart</h2>

            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                    {data.cartItems.map(item =>
                        <div key={item.id} className="space-y-6 mb-6 relative">
                            <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 md:p-6">
                                <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                    <a href="#" className="shrink-0 md:order-1">
                                        <MediaImage className=' max-w-20' media={item.media} />
                                    </a>

                                    <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                                        <div className="flex items-center">
                                            <button onClick={() => { updateUi(item.id, -1); }} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-neutral-300 bg-neutral-100 hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-100 dark:border-neutral-600 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:focus:ring-neutral-700">

                                                <Minus className='text-neutral-300' />
                                            </button>
                                            <input min={0} type="text" id="counter-input" data-input-counter className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-neutral-900 focus:outline-none focus:ring-0 dark:text-white" placeholder="" value={item.quantity} required />

                                            <button onClick={() => { updateUi(item.id); }} type="button" id="increment-button" data-input-counter-increment="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-neutral-300 bg-neutral-100 hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-100 dark:border-neutral-600 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:focus:ring-neutral-700">
                                                <PlusIcon className='text-neutral-300' />
                                            </button>

                                            {item.loading && <Loader2Icon className=' ml-3 animate-spin right-5 bottom-5 absolute' />}
                                        </div>
                                        <div className="text-end md:order-4 md:w-32">
                                            <p className="text-base font-bold text-neutral-900 dark:text-white">{anyCurrency(item.amount)}</p>
                                        </div>
                                    </div>

                                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                        <a href="#" className="text-base font-medium text-neutral-900 hover:underline dark:text-white" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.description) }}>

                                        </a>

                                        <div className="flex items-center gap-4">
                                            <button type="button" className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-neutral-900 hover:underline dark:text-neutral-400 dark:hover:text-white">
                                                <Heart size={17} />
                                                Add to Favorites
                                            </button>

                                            <button onClick={() => handleRemoveItem(item.id, -1)} type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                                                < XIcon />
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>)
                    }

                </div>

                <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                    <div className="space-y-4 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 sm:p-6">
                        <p className="text-xl font-semibold text-neutral-900 dark:text-white">Order summary</p>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <dl className="flex items-center justify-between gap-4">
                                    <dt className="text-base font-normal text-neutral-500 dark:text-neutral-400">Original price</dt>
                                    <dd className="text-base font-medium text-neutral-900 dark:text-white">{anyCurrency(data.total.total)}</dd>
                                </dl>

                                {/* <dl className="flex items-center justify-between gap-4">
                                    <dt className="text-base font-normal text-neutral-500 dark:text-neutral-400">Savings</dt>
                                    <dd className="text-base font-medium text-green-600">-$299.00</dd>
                                </dl> */}
                                {/* 
                                <dl className="flex items-center justify-between gap-4">
                                    <dt className="text-base font-normal text-neutral-500 dark:text-neutral-400">Store Pickup</dt>
                                    <dd className="text-base font-medium text-neutral-900 dark:text-white">{anyCurrency()}</dd>
                                </dl> */}

                                <dl className="flex items-center justify-between gap-4">
                                    <dt className="text-base font-normal text-neutral-500 dark:text-neutral-400">Tax</dt>
                                    <dd className="text-base font-medium text-neutral-900 dark:text-white">GHS 0</dd>
                                </dl>
                            </div>

                            <dl className="flex items-center justify-between gap-4 border-t border-neutral-200 pt-2 dark:border-neutral-700">
                                <dt className="text-base font-bold text-neutral-900 dark:text-white">Total</dt>
                                <dd className="text-base font-bold text-neutral-900 dark:text-white">{anyCurrency(data.total.total)}</dd>
                            </dl>
                        </div>

                        <button className=" bg-blue flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={() => setInitPay(true)}>Proceed to Checkout</button>

                        {/* <div className="flex items-center justify-center gap-2">
                            <span className="text-sm font-normal text-neutral-500 dark:text-neutral-400"> or </span>
                            <a href="#" title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                                Continue Shopping
                                <ArrowRight />
                            </a>
                        </div> */}
                    </div>

                    <div className="space-y-4 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 sm:p-6">
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="voucher" className="mb-2 block text-sm font-medium text-neutral-900 dark:text-white"> Do you have a voucher or gift card? </label>
                                <input type="text" id="voucher" className="block w-full rounded-lg border border-neutral-300 bg-neutral-50 p-2.5 text-sm text-neutral-900 focus:border-primary-500 focus:ring-primary-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder:text-neutral-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="" required />
                            </div>
                            <button type="submit" className="bg-blue flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Apply Code</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
}
