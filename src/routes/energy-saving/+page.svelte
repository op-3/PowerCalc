<script lang="ts">
  import { energySavingTips } from '$lib/utils/energySavingTips';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { LightBulb } from '@steeze-ui/heroicons';
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  const categoryIcons = {
      Lighting: '💡',
      Cooling: '❄️',
      Appliances: '🔌',
      Water: '💧',
  };
</script>

<svelte:head>
  <title>PowerCalc - نصائح توفير الطاقة</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-6" dir="rtl">
  <div class="max-w-7xl mx-auto">
      <h1 class="text-5xl font-bold text-center mb-12 text-green-800" in:fade="{{ duration: 600, delay: 300 }}">
          نصائح توفير الطاقة
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          {#each energySavingTips as category, index}
              <div 
                  class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  in:fly="{{ y: 50, duration: 500, delay: 150 * index, easing: quintOut }}"
              >
                  <div class="p-6 relative">
                      <div class="absolute top-0 right-0 m-4 text-6xl opacity-10">
                          {categoryIcons[category.category] || '🌿'}
                      </div>
                      <h2 class="text-2xl font-semibold text-green-700 mb-6 relative z-10">{category.category}</h2>
                      <ul class="space-y-4">
                          {#each category.tips as tip, tipIndex}
                              <li class="flex items-start" in:fade="{{ duration: 300, delay: 100 * tipIndex }}">
                                  <Icon src={LightBulb} class="w-6 h-6 text-green-500 ml-2 flex-shrink-0 mt-1" />
                                  <span class="text-gray-700">{tip}</span>
                              </li>
                          {/each}
                      </ul>
                  </div>
              </div>
          {/each}
      </div>
  </div>
</div>

<style>
  :global(body) {
      @apply bg-gradient-to-br from-green-50 to-blue-100;
  }
</style>