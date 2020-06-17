<script>
import commas from "../utils/format";
import axios from "axios";
import store from '../store/store-transactions';

export let transaction;

const sign = transaction.amount >= 0 ? "+" : "-";
const design = sign === "+" ? "plus" : "minus";

const deleteTransaction = async (id) => {
    try {
      await axios.delete(`/.netlify/functions/express/${id}`);
      store.update(id => {
          return store.transactions.filter( item => item._id !== id);
      });
      
    } catch (error) {
      console.log("error while deleting===", error);
    }
};
</script>

<li class={design}>
      {transaction.text}{" "}
      <span>
        {sign}${commas(Math.abs(transaction.amount))}
      </span>
      <button class='delete-btn' on:click={() => deleteTransaction(transaction._id)}>
        x
      </button>
</li>