<script>
    export let type = 'button1';
    </script>
    
    <button class="{type}">
        <slot></slot>
    </button>
    
<style>
    button {
        border: 0;
        cursor: pointer;
        border-radius: 6px;
        padding: 8px 12px;
        font-weight: bold; 
        box-shadow: 1px 2px 3px rgba(o,0,0.2);
    }

    .primary {
        background: black;
        color: white;
    }

    .secondary {
        background: blue;
        color: white;
    }
</style>