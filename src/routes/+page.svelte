<script lang="ts">
  import EnergyCalculator from '$lib/components/EnergyCalculator.svelte';
  import { fade, fly } from 'svelte/transition';
  import { onMount } from 'svelte';

  let isLoaded = false;

  onMount(() => {
    isLoaded = true;
  });
</script>

<svelte:head>
  <title>PowerCalc - حاسبة فاتورة الكهرباء</title>
  <meta name="description" content="احسب فاتورة الكهرباء الخاصة بك وتعلم كيفية توفير الطاقة بسهولة وسرعة" />
</svelte:head>

<main class="min-h-screen bg-gray-100 text-gray-800" dir="rtl">
  <div class="container mx-auto px-4 py-12">
    {#if isLoaded}
      <header class="text-center mb-16" in:fade={{duration: 1000, delay: 300}}>
        <h1 class="text-5xl font-bold mb-4 text-gray-900">
          PowerCalc
        </h1>
        <p class="text-2xl text-gray-700">حاسبة فاتورة الكهرباء الذكية</p>
      </header>

      <div class="bg-white rounded-xl shadow-md p-8 mb-16" in:fly={{y: 50, duration: 1000, delay: 600}}>
        <EnergyCalculator />
      </div>

      <section class="mt-16 text-center" in:fade={{duration: 1000, delay: 900}}>
        <h2 class="text-3xl font-semibold mb-12 text-gray-800">كيف يعمل PowerCalc؟</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {#each ['أدخل استهلاكك', 'اختر نوع التعرفة', 'احصل على التقدير', 'وفر الطاقة'] as step, i}
            <div 
              class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300" 
              in:fly={{y: 50, duration: 1000, delay: 1200 + i * 200}}
            >
              <div class="text-4xl font-bold text-blue-600 mb-4">{i + 1}</div>
              <h3 class="text-xl font-semibold mb-4 text-gray-800">{step}</h3>
              <p class="text-gray-600 text-right">
                {#if i === 0}
                  أدخل استهلاكك الشهري من الكهرباء بالكيلوواط ساعة.
                {:else if i === 1}
                  اختر نوع التعرفة المناسب لك (سكني، تجاري، صناعي، إلخ).
                {:else if i === 2}
                  اضغط على زر الحساب للحصول على تقدير لفاتورتك.
                {:else}
                  استكشف نصائح توفير الطاقة لتقليل استهلاكك وفاتورتك.
                {/if}
              </p>
            </div>
          {/each}
        </div>
      </section>

 
    {:else}
      <div class="flex justify-center items-center h-screen">
        <div class="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    {/if}
  </div>
</main>

<style>
  :global(body) {
    @apply bg-gray-100;
  }
</style>