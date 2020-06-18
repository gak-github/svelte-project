<script>
    import commas from '../utils/format';
    export let transactions;

    const total = transactions
    .map(transaction => transaction.amount)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

    let sign = total > 0 ? "+" : "-";

    if (Math.abs(total) === 0) {
        sign = ""
    }
</script>

<div>
<h4>Your Balance</h4>
<h1 id="balance">
    {sign}${commas(Math.abs(total))}
</h1>
</div>
