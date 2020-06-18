<script>
    import axios from "axios";
    import store from '../store/store-transactions';
    let text = "";
    let amount = 0;

    const addTransaction = async (transaction) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        try {
            const res = await axios.post("/.netlify/functions/express", transaction, config);
            // update the store with recently added transaction
            store.update( (existingStore) => {
                return { transactions: [...existingStore.transactions, transaction] };
            });

        } catch (error) {
            console.log("===error while adding new transaction===", error);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault()
        if (text === "" || amount === 0) {
            return
        }
        const newTransaction = {
            id: Math.floor(Math.random() * 1000000),
            text,
            amount: +amount,
        }
        addTransaction(newTransaction);
        text = '';
        amount = 0;
    };

    const setAmount = (e) => {
        amount = e.target.value;
    };
    const setText = (e) => {
        text = e.target.value;
    };
</script>


<h3>Add new transaction</h3>
<form on:submit={onSubmit}>
    <div>
        <label>Text</label>
        <input
        type="text"
        bind:value={text}
        on:change={ setText }
        placeholder="Enter text..."
        on:focus={ e => e.target.value = ''}
        on:blur={ e => e.target.value = text }
        />
    </div>
    <div>
        <label>
        Amount <br />
        (negative -expense, positive - income)
        </label>
        <input
        type="number"
         bind:value={amount}
        on:change={ setAmount }
        id="amount"
        placeholder="Enter amount..."
        on:focus={ e => e.target.value = '' }
        on:blur={ e => e.target.value = amount }
        />
    </div>
    <button class="btn">Add transaction</button>
</form>