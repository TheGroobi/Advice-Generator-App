<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@800&display=swap" rel="stylesheet">
    <title>Advice Generator App</title>
</svelte:head>

<script>
    import { onMount } from 'svelte';
    import { getAdvice } from './utils/+page.js';

    // @ts-nocheck
    let active = false;
    let clicked = false;
    let promise = getAdvice();
    let blockTimer = false;

    function handleClick() {
        if (!blockTimer) {
            promise = getAdvice();
            blockTimer = true;
            clicked = true;
            setTimeout (() => {
                blockTimer = false;
                clicked = false;
            }, 1000);
        }
    }

    function hoverEnter() {
        active = true;
    }
    function hoverLeave() {
        active = false;
    }
    onMount(() => getAdvice())
</script>


<main class="wrapper">
    <div class="card">
        <p>ADVICE #
            {#await promise then advice}
                <span>{advice?.slip.id}</span>
            {:catch error}
                <span>{error.message}</span>
            {/await}
        </p>
        <h1 class="advice-text">
            {#await promise}
                <span>Loading...</span>
            {:then advice}
                <span>"{advice?.slip.advice}"</span>
            {:catch error}
                <span>{error.message}</span>
            {/await}
        </h1>
        <svg class="divider" width="444" height="16" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#4F5D74" d="M0 8h196v1H0zM248 8h196v1H248z"/><g transform="translate(212)" fill="#CEE3E9"><rect width="6" height="16" rx="3"/><rect x="14" width="6" height="16" rx="3"/></g></g></svg>    
        <svg class="mobile-divider" width="295" height="16" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#4F5D74" d="M0 8h122v1H0zM173 8h122v1H173z"/><g transform="translate(138)" fill="#CEE3E9"><rect width="6" height="16" rx="3"/><rect x="14" width="6" height="16" rx="3"/></g></g></svg>
            <button class="dice" class:hover={active} class:click={clicked} on:mouseenter={hoverEnter} on:mouseleave={hoverLeave} on:click={handleClick}>
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M20 0H4a4.005 4.005 0 0 0-4 4v16a4.005 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4V4a4.005 4.005 0 0 0-4-4ZM7.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" fill="#202733"/></svg>
        </button>
    </div>
</main>

<style>
    :global(body) {
        margin: 0;
        font-family: 'Manrope', sans-serif;
    }

    .wrapper {
        background: hsl(218, 23%, 16%);
        min-height: 100vh;
        display: grid;
        place-items: center;
    }

    .card {
        background: hsl(217, 19%, 24%);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 3rem;
        padding-bottom: 2.5rem;
        position: relative;
        width: min(450px, 90% - 3rem);
        border-radius: 15px;
        word-wrap: break-word;
        text-align: center;
        box-shadow: 10px 10px 30px hsl(215, 23%, 13%);
    }

    .divider {
        color: hsl(193, 38%, 86%);
        margin: 2.5rem 0;
        width: 100%;
        overflow: hidden;
        position: relative;
    }

    .card h1 {
        color: hsl(193, 38%, 86%);
        font-size: 28px;
        width: 100%;
        margin-bottom: 0;
    }

    .card p {
        color: hsl(150, 100%, 66%);
        letter-spacing: 5px;
        font-size: 12px;
    }

    .dice {
        padding: 1rem;
        background: hsl(150, 100%, 66%);
        width: 4rem;
        aspect-ratio: 1;
        align-items: center;
        display: flex;
        justify-content: center;
        border-radius: 50px;
        position: absolute;
        bottom: -2rem;
    }

    button {
        border: none;
    }

    .hover.dice {
        transform: rotate(90deg) scale(1.15);
    }

    .click.dice {
        transform: rotate(270deg) scale(1.20);
    } 

    .hover {
        cursor: pointer;
        box-shadow: 0 0 20px hsl(150, 100%, 66%);
        transition: 0.3s all ease-out;
    }
    .mobile-divider {
        color: hsl(193, 38%, 86%);
        margin: 2.5rem 0;
        display: none;
        overflow: hidden;
    }

    @media screen and (max-width: 500px) {
        .card p {
            font-size: 10px;
            
        }
        .card h1 {
            font-size: 24px;
        }
        .wrapper {
            padding: 1.5rem;
        }
        .card {
            margin-bottom: 10rem;
        }
    }
    @media screen and (max-width: 400px) {
        .divider {
            display: none !important;
        }
        .mobile-divider {
            display: block !important;
        }
        .wrapper {
            padding: 0;
        }
        .card {
            width: 70%;
            padding: 2rem;
        }
    }
</style>
