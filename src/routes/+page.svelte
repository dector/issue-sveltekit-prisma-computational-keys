<script>
    export let data;
</script>

<ul>
    {#each data.users as user}
        <li>{user.greet}</li>
    {/each}
</ul>
