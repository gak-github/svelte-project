<script>    
    import commas from "../utils/format";
    export let transactions;
    const income = transactions
        .map(transactions => transactions.amount)
        .filter(amount => amount >= 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expense = transactions
        .map(transactions => transactions.amount)
        .filter(amount => amount < 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

</script>

<div class="inc-exp-container">
    <div>
    <h4>INCOME</h4>
    <p id="money-plus" class="money plus">
        ${commas(income)}
    </p>
    </div>

    <div>
    <h4>EXPENSE</h4>
    <p id="money-minus" class="money minus">
        ${Math.abs(commas(expense))}
    </p>
    </div>
</div>
