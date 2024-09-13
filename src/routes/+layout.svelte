<script lang="ts">
    import '../app.css';
    import Header from '$lib/components/Header.svelte';
  </script>
  
  <div class="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <Header />
    
      <slot />
    
   
  </div>