<script lang="ts">
    import "../app.css";
    import "../toaster.css";

    import { onMount } from "svelte";

    import Header from "../components/header.svelte"

	function showToast(msg: string) {
          const x: HTMLElement | null = document.getElementById("toaster")
          if (x) {
            x.innerText =  msg
            x.className = "show"
            setTimeout(() => { 
              x.className = x.className.replace("show", "")
            }, 3000)
          }      
    }

	onMount( () => {
		window.onunhandledrejection = (e) => {
			console.error('Weather Dog Error: ', e.reason)
			showToast('An unhandled error occured')
		}
	})

</script>
  
<Header />

<div class="w-full mt-7">
    <slot />
    <div id="toaster" class=""></div> 
</div>

