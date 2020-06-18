<script>
    import { onMount } from 'svelte';
    import Transaction from './Transaction.svelte';
    import store from '../store/store-transactions';
    import axios from 'axios';

    export let transactions;
    // const getTransactions = async () => {
    //     try {
    //         const res = await axios.get("/.netlify/functions/express");
    //         store.set(
    //             {
    //                 transactions: res.data.data
    //             }
    //         );
    //         store.subscribe( (existingStore) =>{
    //             transactions = existingStore.transactions;
    //         });
    //     } catch (error) {
    //         // update the store with error and show error message in the page ==> TODO
    //     }
    // };

    // onMount( async () => {
    //     await getTransactions()
    // });

</script>

<h3>History</h3>
{#if !transactions}
    <p>Loading....</p>
{:else}
    <ul id="list" class="list">
        { #each transactions as transaction }
            <Transaction transaction={transaction} />
        { /each }
    </ul>
{/if}