<script>
	import { onMount } from 'svelte';
	import Header from './components/Header.svelte';
	import Balance from './components/Balance.svelte';
	import IncomeExpenses from './components/IncomeExpenses.svelte';
	import TransactionList from './components/TransactionList.svelte';
	import AddTransaction from './components/AddTransaction.svelte';
	import store from './store/store-transactions';
	import axios from 'axios';

	let transactions;
	onMount( async () => {
		try {
            const res = await axios.get("/.netlify/functions/express");
            store.set(
                {
                    transactions: res.data.data
                }
			);
			store.subscribe( (existingStore) =>{
				transactions = existingStore.transactions;
			});
        } catch (error) {
			// update the store with error and show error message in the page ==> TODO
			transactions = [{}];
        }
	});
</script>

<Header/>
{ #if !transactions }
	<p>Loading...</p>
{ :else }
	<div class="container">
		<Balance transactions={transactions}/>
		<IncomeExpenses transactions={transactions}/>
		<TransactionList transactions={transactions}/>
		<AddTransaction />
	</div>
{/if}