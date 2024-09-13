<script lang="ts">
  import { page } from '$app/stores';
  import { fade, fly, slide } from 'svelte/transition';
  
  const navItems = [
    { href: '/', label: 'الرئيسية', icon: '🏠' },
    { href: '/tariffs', label: 'التعرفة', icon: '💰' },
    { href: '/energy-saving', label: 'توفير الطاقة', icon: '💡' },
    { href: '/appliance-calculator', label: 'حاسبة الأجهزة', icon: '🔌' },
    { href: '/faq', label: 'الأسئلة الشائعة', icon: '❓' },
  ];

  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<header class="bg-gradient-to-r from-blue-600 to-indigo-800 text-white shadow-lg" in:fade="{{ duration: 300 }}">
  <div class="container mx-auto px-4">
    <nav class="flex items-center justify-between h-16">
      <a href="/" class="text-2xl font-bold hover:text-blue-200 transition-colors duration-200" in:fly="{{ y: -20, duration: 300, delay: 150 }}">
        ⚡ PowerCalc
      </a>
      
      <ul class="hidden lg:flex space-x-1">
        {#each navItems as item, index}
          <li in:fly="{{ x: 20, duration: 300, delay: 150 + index * 100 }}">
            <a
              href={item.href}
              class="px-4 py-2 rounded-md hover:bg-blue-500 transition-colors duration-200 flex items-center"
              class:bg-blue-700={$page.url.pathname === item.href}
            >
              <span class="mr-2">{item.icon}</span>
              {item.label}
            </a>
          </li>
        {/each}
      </ul>
      
      <div class="flex items-center">
        <button 
          class="lg:hidden ml-4 p-2 rounded-md hover:bg-blue-500 transition-colors duration-200"
          on:click={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </nav>
  </div>
</header>

{#if isMenuOpen}
  <div 
    class="lg:hidden bg-blue-800 text-white"
    transition:slide="{{ duration: 300 }}"
  >
    <nav class="container mx-auto px-4 py-2">
      <ul class="space-y-2">
        {#each navItems as item}
          <li>
            <a
              href={item.href}
              class="block px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
              class:bg-blue-900={$page.url.pathname === item.href}
              on:click={() => isMenuOpen = false}
            >
              <span class="mr-2">{item.icon}</span>
              {item.label}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
{/if}

<style>
  /* إضافة دعم للغة العربية */
  :global(html[lang="ar"]) header {
    direction: rtl;
  }
  
  :global(html[lang="ar"]) .space-x-1 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 1;
  }
  
  :global(html[lang="ar"]) .mr-2 {
    margin-left: 0.5rem;
    margin-right: 0;
  }

  :global(html[lang="ar"]) .ml-4 {
    margin-right: 1rem;
    margin-left: 0;
  }
</style>