<script>
    import { onMount } from 'svelte';
    import Transaction from './Transaction.svelte';
    import store from '../store/store-transactions';
    import axios from 'axios';

    let transactions = [{_id: "1", text: "test", amount: "100"}]; //store.transactions;
    console.log("fetch=====", fetch);
    const getTransactions = async () => {
        console.log("========= is it hitting here==");
        try {
            const res = await axios.get("/.netlify/functions/express");
            store.set(
                {
                    transactions: res.data.data
                }
            );

        } catch (error) {
            console.log("=== error while getting transactions list===", error);
        }
    };

    onMount( async () => {
        await getTransactions()
    });

</script>

<h3>History</h3>
    <ul id="list" class="list">
    { #each transactions as transaction }
        <Transaction transaction={transaction} />
    { /each }
</ul>